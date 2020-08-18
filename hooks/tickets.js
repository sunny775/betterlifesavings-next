import { useState, useEffect } from "react";
import { app } from "../config/firebase";

function useMessages() {
  const [messages, setMessages] = useState({});
  const [loading, setLoading] = useState(false);
  const [successText, setSuccessText] = useState(null);

  const { auth, db } = app;
  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      const { uid } = user;
      const unsubscribe = db
        .collection("messages")
        .where("client", "==", `${uid}`)
        .onSnapshot(function (querySnapshot) {
          var messages = [];
          querySnapshot.forEach(function (doc) {
            messages.push({ id: doc.id, ...doc.data() });
          });
          setMessages(messages);
        });

      return () => unsubscribe();
    }
  }, [db, user]);

  const postMessage = ({
      details,
      senderInfo
  }) => {
    //if (user) {
        console.log('sending...')
      setLoading(true);
      db.collection("messages")
        .add({
          ...details,
          senderInfo,
          date: new Date().toISOString(),
        })
        .then(function () {
            console.log('sent')
          setLoading(false);
          setSuccessText(
            'Your message has been sent'
          );
        })
        .catch(function (error) {
          console.error("Error adding transaction: ", error);
        });
    //}
  };

  const hideAlert = () => setSuccessText(null);

  return {
    messages,
    postMessage,
    successText,
    hideAlert,
    loading
  };
}

export default useMessages;
