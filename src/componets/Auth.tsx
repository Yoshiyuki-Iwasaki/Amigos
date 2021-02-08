import React, { useState } from "react";
import styles from "./Auth.module.css";
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
} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import CameraIcon from "@material-ui/icons/Camera";
import EmailIcon from "@material-ui/icons/Email";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";

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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const signInEmail = async () => {
    await auth.signInWithEmailAndPassword(email, password);
  };

  const signUpEmail = async () => {
    await auth.createUserWithEmailAndPassword(email, password);
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
              <a href="#" className={styles.login_reset}>
                Forgot password?
              </a>
            </Grid>
            <Grid item xs>
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
