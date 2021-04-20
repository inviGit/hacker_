import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Login from "./components/view/forms/loginForm";
import Hacker from "./components/view/hacker";
import HackerForm from "./components/view/forms/hackerForm";
import RegisterUser from "./components/view/forms/registerUserForm";
import NotFound from "./components/pageHandling/notFound";
import NotAuthorized from "./components/pageHandling/notAuthorized";
import NavBar from "./components/view/navbar/navbar";
import NotAuthenticated from "./components/pageHandling/notAuthenticated";
import { ToastContainer } from "react-toastify";
import { makeStyles } from "@material-ui/core/styles";
import { Logout } from "./components/pageHandling/logout";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { HackersInfo } from "./components/view/hackerInfo";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    flexGrow: 1,
  },
  // https://source.unsplash.com/random?&query=nas
  image: {
    flexGrow: "1",
    backgroundImage:
      "url(https://images.unsplash.com/photo-1497124401559-3e75ec2ed794?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

function App() {
  let isAuthenticated = false;
  const classes = useStyles();
  if (localStorage.getItem("email") !== null) {
    isAuthenticated = true;
  }

  return (
    <React.Fragment>
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item sm={12} md={12} with="100%" className={classes.image}>
          <ToastContainer />
          <NavBar />

          <div className="content">
            <Switch>
            <Route
                path="/hacker/:hackerId/"
                component={isAuthenticated ? HackersInfo : NotAuthenticated}
              />
              <Route
                path="/hacker/:hackerId/hacker-form"
                component={isAuthenticated ? HackerForm : NotAuthenticated}
              />
              <Route
                path="/hacker-form"
                component={isAuthenticated ? HackerForm : NotAuthenticated}
              />
              <Route
                path="/hackers"
                component={isAuthenticated ? Hacker : NotAuthenticated}
              />
              <Route path="/logout" component={Logout} />
              <Route path="/not-found" component={NotFound} />
              <Route path="/not-authorized" exact component={NotAuthorized} />
              <Route path="/not-authenticated" component={NotAuthenticated} />
              <Route path="/register" exact component={RegisterUser} />
              <Route path="/login" exact component={Login} />
              <Route path="/" exact component={Login} />
              <Redirect to="/not-found" />
            </Switch>
          </div>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default App;
