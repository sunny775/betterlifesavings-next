import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { app } from "../config/firebase";
import { successNotice } from "../utils/alerts/userUpdate.success";

function useGetUser() {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [error, setError] = useState(null);
  const [newUser, setNewUser] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);
  const [dpLoading, setDpLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [detailsUpdated, setDetailsUpdated] = useState(false);

  const { auth, db, storageRef } = app;
  const user = auth.currentUser;

  useEffect(() => {
    const unregisterAuthObserver = auth.onAuthStateChanged(function (user) {
      if (user) {
        console.log(user);
        const { uid, phoneNumber } = user;
        setData({ isAuth: !!user, uid, phoneNumber });
        db.collection("users")
          .doc(uid)
          .set(
            {
              uid,
              phoneNumber,
              role: 0,
            },
            { merge: true }
          )
          .then(function () {
            console.log("login successful!");
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        setData({ isAuth: !!user });
        setUserDetails({});
        setError(null);
      }
    });
    return unregisterAuthObserver;
  }, [auth]);

  useEffect(() => {
    if (data) {
      if (data.uid) {
        const unsubscribe = db
          .collection("users")
          .doc(data.uid)
          .onSnapshot(function (doc) {
            const data = doc.data();
            setUserDetails(data);
            data && setDetailsUpdated(!!data.username);
            console.log("Current data: ", doc.data());
            console.log("user:", data);
            console.log("details:", userDetails);
          });
        return () => unsubscribe();
      }
    }
  }, [db, data]);

  console.log("details:", userDetails);

  const whenAuth = (isNewUser) => {
    setNewUser(isNewUser);
  };

  const hidePreview = () => setShowPreview(false);
  const openPreview = () => setShowPreview(true);
  
  const selectUserPhoto = (options) => {
    setFile(options.file);
    setImagePreviewUrl(options.imagePreviewUrl);
    openPreview();
  };

  const updateDetails = async (details) => {
    if (user) {
      setDetailLoading(true);
      try {
        db.collection("users")
          .doc(user.uid)
          .set(
            {
              ...details,
            },
            { merge: true }
          )
          .then(() => {
            user
              .updateProfile({
                displayName: details.displayName,
              })
              .then(function () {
                setDetailLoading(false);
                router.push("/account");
              });
          });
      } catch (error) {
        setError(error);
        console.log(error);
        return error;
      }
    }
  };

  const putNewFile = (fileName, metadata, uid) => {
    storageRef
      .child("user-images/" + fileName)
      .put(file, metadata)
      .then(function (snapshot) {
        snapshot.ref.getDownloadURL().then(function (url) {
          console.log("File available at", url);
          db.collection("users")
            .doc(uid)
            .set(
              {
                ...snapshot.metadata.customMetadata,
                url,
              },
              { merge: true }
            )
            .then(() => {
              successNotice("Profile photo successfully updated.");
              setDpLoading(false);
            });
        });
      });
  };

  const uploadDp = (file) => {
    const fileName = user.uid + "-" + file.name;
    const { phoneNumber, uid } = user;
    const metadata = {
      contentType: file.type,
      customMetadata: {
        phoneNumber,
        fileName,
      },
    };
    setDpLoading(true);
    try {
      if (userDetails.fileName) {
        var ref = storageRef.child(`user-images/${userDetails.fileName}`);
        ref.delete().then(function () {
          putNewFile(fileName, metadata, uid);
        });
      } else {
        putNewFile(fileName, metadata, uid);
      }
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  const signOut = () =>
    auth
      .signOut()
      .then(function () {
        setData(null);
        setUserDetails(null);
        console.log("sign out successful");
      })
      .catch(function (error) {
        console.log("error");
      });

  return {
    data,
    userDetails,
    detailsUpdated,
    newUser,
    detailLoading,
    dpLoading,
    whenAuth,
    file,
    showPreview,
    imagePreviewUrl,
    selectUserPhoto,
    hidePreview,
    openPreview,
    error,
    updateDetails,
    uploadDp,
    signOut,
  };
}

export default useGetUser;
