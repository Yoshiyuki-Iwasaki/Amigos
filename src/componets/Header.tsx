import React from "react";
import { Avatar, Button, IconButton } from "@material-ui/core";
import styles from "./TweetInput.module.css";
import { auth, db, storage } from "../firebase";

const Header = () => {
  return (
    <header>
      <Button
        className={styles.tweet_sendBtn}
        onClick={async () => {
          await auth.signOut();
        }}
      >
        Logout
      </Button>
    </header>
  );
};

export default Header;
