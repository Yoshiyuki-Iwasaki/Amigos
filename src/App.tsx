import React, { useEffect } from "react";
import styles from "./App.module.css";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, login, logout } from "./features/userSlice";
import { auth } from "./firebase";
import Feed from "./componets/Feed";
import Auth from "./componets/Auth";
import Footer from "./componets/Footer";
import Header from "./componets/Header";

const App: React.FC = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const unSub = auth.onAuthStateChanged(authUser => {
      if (authUser) {
        dispatch(
          login({
            uid: authUser.uid,
            photoUrl: authUser.photoURL,
            displayName: authUser.displayName,
          })
        );
      } else {
        dispatch(logout());
      }
      return () => {
        unSub();
      };
    });
  }, [dispatch]);

  return (
    <div>
      <Header />
      {user.uid ? (
        <div className={styles.app}>
          <Feed />
        </div>
      ) : (
        <div className={styles.app}>
          <Auth />
        </div>
      )}
      <Footer />
    </div>
  );
};

export default App;
