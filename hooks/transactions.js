import { useState, useEffect } from "react";
import { app } from "../config/firebase";
import { successNotice } from "../utils/alerts/userUpdate.success";

function useTransactions() {
  const [userTransactions, setUserTransactions] = useState({});
  const [depositOpen, setDepositOpen] = useState(false);
  const [transLoading, setTransLoading] = useState(false);
  const [withdrawalOpen, setWithdrawalOpen] = useState(false);
  const [planOpen, setPlanOpen] = useState(null);

  const { auth, db } = app;
  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      const { uid } = user;
      const unsubscribe = db
        .collection("transactions")
        .where("owner", "==", `${uid}`)
        .onSnapshot(function (querySnapshot) {
          var transactions = [];
          querySnapshot.forEach(function (doc) {
            transactions.push({ id: doc.id, ...doc.data() });
          });
          setUserTransactions(transactions);
        });

      return () => unsubscribe();
    }
  }, [db, user]);

  const hidePlan = () => setPlanOpen(false);
  const openPlan = () => setPlanOpen(true);
  const hideDeposit = () => setDepositOpen(false);
  const openDeposit = () => setDepositOpen(true);
  const hideWithdrawal = () => setWithdrawalOpen(false);
  const openWithdrawal = () => {
    setWithdrawalOpen(true);
    console.log('withdrawal opened');
    console.log(withdrawalOpen)
  }

  const postTransaction = async ({
    details,
    owner,
  }) => {
    if (user) {
      setTransLoading(true);
      db.collection("transactions")
        .add({
          ...details,
          owner: owner.uid,
          date: new Date().toISOString(),
          ownerDetails: {
            name: owner.displayName,
            address: owner.address1,
            city: owner.city,
            state: owner.state,
          },
        })
        .then(function () {
          setTransLoading(false);
          hideDeposit();
          hideWithdrawal();
          successNotice(
            `Your ${details.type} request has been sent. Our agents will contact you on further steps`
          );
        })
        .catch(function (error) {
          console.error("Error adding transaction: ", error);
        });
    }
  };

  const setPlan = async (plan) => {
    if (user) {
      setTransLoading(true);
      try {
        db.collection("users")
          .doc(user.uid)
          .set(
            {
              plan,
            },
            { merge: true }
          )
          .then(() => {
            setTransLoading(false);
            hidePlan();
          });
      } catch (error) {
        console.log(error);
        return error;
      }
    }
  };


  return {
    userTransactions,
    postTransaction,
    depositOpen,
    hideDeposit,
    openDeposit,
    transLoading,
    withdrawalOpen,
    hideWithdrawal,
    openWithdrawal,
    setPlan,
    planOpen,
    hidePlan,
    openPlan
  };
}

export default useTransactions;
