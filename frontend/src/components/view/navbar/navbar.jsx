import React, { Component } from "react";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, NavLink, Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import HackerService from "../../../service/hackerService";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import { Button, Fab, makeStyles } from "@material-ui/core";
import _ from "lodash";

export class NavBar extends Component {
  state = {
    username: localStorage.getItem("email"),
    hackers: [],
  };

  componentDidMount() {
    HackerService.getAllHackers().then((res) => {
      console.log(res.data);
      this.setState({ hackers: res.data });
    });
  }

  classes = makeStyles((theme) => ({
    root: {
      ...theme.typography.button,
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(1),
    },
  }));

  handleLog = () => {
    const { username } = this.state;
    if (username !== null) {
      return (
        <div>
          <ul className="navbar-nav ">
            <li className="nav-item ">
              <NavLink
                className="nav-link"
                to="/"
                onClick={(e) => e.preventDefault()}
              >
                Hello, {localStorage.getItem("email")}
              </NavLink>
            </li>
            <li className="nav-item ">
              <NavLink className="nav-link" to="/logout">
                <Button variant="contained" color="secondary">
                  Logout
                </Button>
              </NavLink>
            </li>
          </ul>
        </div>
      );
    } else if (username === null) {
      return (
        <div>
          <ul className="navbar-nav ">
            <li className="nav-item dropdown">
              <NavLink className="nav-link" to="/register">
                Register
              </NavLink>
            </li>
            <li className="nav-item ">
              <NavLink className="nav-link" to="/">
                Login
              </NavLink>
            </li>
          </ul>
        </div>
      );
    }
  };

  handleHackerSelect = () => {};
  render() {
    const { hackers, isDisabled } = this.state;
    const classes = makeStyles((theme) => ({
      root: {
        "& > *": {
          margin: theme.spacing(1),
        },
      },
      extendedIcon: {
        marginRight: theme.spacing(1),
      },
    }));
    return (
      <div>
        <nav className="navbar navbar-toggleable-xl navbar-expand-lg navbar-light bg-light ">
          <Link className="navbar-brand" to="/">
            HACKWEB
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" to="/hackers">
                  hackers
                </NavLink>
              </li>
            </ul>
            <Autocomplete
              id={"hackers"}
              options={hackers}
              fullWidth
              getOptionLabel={(option) => option.username}
              color="danger"
              onChange={this.handleHackerSelect}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Find hacker by username"
                  variant="outlined"
                  color="secondary"
                />
              )}
            />
            {this.handleLog()}
            <button
              className="nav-item badge badge-dark"
              style={{ marginRight: "10px", marginLeft: "30px" }}
              disabled
            >
              Welcome
            </button>
            <FontAwesomeIcon icon={faUserCircle} />
          </div>
        </nav>
      </div>
    );
  }
}

export default NavBar;
