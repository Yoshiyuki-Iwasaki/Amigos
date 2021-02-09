import React, { useState } from "react";
import styles from "./Auth.module.css";
import { updateUserProfile } from "../features/userSlice";
import { useDispatch } from "react-redux";
import { auth, provider, storage } from "../firebase";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  IconButton,
} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import CameraIcon from "@material-ui/icons/Camera";
import EmailIcon from "@material-ui/icons/Email";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%,-${left}%`,
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Auth: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [email, setEmail] = useState(""); // Auth component内でemailを入力した際のステート
  const [password, setPassword] = useState(""); // Auth component内でpasswordを入力した際のステート
  const [username, setUsername] = useState(""); // Auth component内でusernameを入力した際のステート
  const [avatarImage, setAvatarImage] = useState<File | null>(null); // Auth component内でusernameを入力した際のステート
  const [isLogin, setIsLogin] = useState(true); // Auth component内でloginしているかどうか識別するステート
  const [openModal, setOpenModal] = React.useState(false); // Auth component内でmodalがopenしているかどうか識別するステート
  const [resetEmail, setResetEmail] = useState(""); // Auth component内でReset PassWordを保持するステート

  const sendResetEmail = async (e: React.MouseEvent<HTMLElement>) => {
    await auth
      .sendPasswordResetEmail(resetEmail)
      .then(() => {
        setOpenModal(false);
        setResetEmail("");
      })
      .catch(err => {
        alert(err.message);
        setResetEmail("");
      });
  };

  const onChangeImageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files![0]) {
      setAvatarImage(e.target.files![0]);
      e.target.value = "";
    }
  };
  const signInEmail = async () => {
    await auth.signInWithEmailAndPassword(email, password);
  };

  const signUpEmail = async () => {
    const authUser = await auth.createUserWithEmailAndPassword(email, password);
    let url = "";
    if (avatarImage) {
      // filenameに乱数を咥えるための関数
      const S =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      const N = 16;
      const randomChar = Array.from(crypto.getRandomValues(new Uint32Array(N)))
        .map(n => S[n % S.length])
        .join("");
      const filename = randomChar + "_" + avatarImage.name;

      await storage.ref(`avatars/${filename}`).put(avatarImage);
      url = await storage.ref("avatars").child(filename).getDownloadURL();
    }

    await authUser.user?.updateProfile({
      displayName: username,
      photoURL: url,
    });
    dispatch(
      updateUserProfile({
        displayName: username,
        photoUrl: url,
      })
    );
  };
  const signInGoogle = async () => {
    await auth.signInWithPopup(provider).catch(err => console.log(err.message));
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {isLogin ? "Login" : "Register"}
        </Typography>
        <form className={classes.form} noValidate>
          {/* !isLoginがfalseの時 */}
          {!isLogin && (
            <>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                value={username}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setUsername(e.target.value);
                }}
              />
              <Box textAlign="center">
                <IconButton>
                  <label>
                    <AccountCircleIcon
                      fontSize="large"
                      className={
                        avatarImage
                          ? styles.login_addIconLoaded
                          : styles.login_addIcon
                      }
                    />
                    <input
                      className={styles.login_hiddenIcon}
                      type="file"
                      onChange={onChangeImageHandler}
                    />
                  </label>
                </IconButton>
              </Box>
            </>
          )}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setEmail(e.target.value);
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setPassword(e.target.value);
            }}
          />
          <Button
            disabled={
              isLogin
                ? // ログインしている時 emailがない時またはpasswordの長さが6文字以下の時
                  !email || password.length < 6
                : // ログインしていない時 email,username,avatarImageがない時またはpasswordの長さが6文字以下の時
                  !username || !email || password.length < 6 || !avatarImage
            }
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            startIcon={<EmailIcon />}
            onClick={
              isLogin
                ? async () => {
                    try {
                      await signInEmail();
                    } catch (err) {
                      alert("error");
                      console.log(err.message);
                    }
                  }
                : async () => {
                    try {
                      await signUpEmail();
                    } catch (err) {
                      alert("error");
                      console.log(err.message);
                    }
                  }
            }
          >
            {isLogin ? "Login" : "Register"}
          </Button>
          <Grid container>
            <Grid item xs>
              <span
                className={styles.login_reset}
                onClick={() => {
                  setOpenModal(true);
                }}
              >
                Forgot password?
              </span>
            </Grid>
            <Grid item>
              <a
                href="#"
                className={styles.login_toggleMode}
                onClick={() => {
                  setIsLogin(!isLogin);
                }}
              >
                {isLogin ? "Create new account ?" : "Back to login"}
              </a>
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={signInGoogle}
          >
            SignIn with Google
          </Button>
        </form>
      </div>
    </Container>
  );
};
export default Auth;
