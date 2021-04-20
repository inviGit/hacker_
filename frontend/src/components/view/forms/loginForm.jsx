import React, { Component } from "react";
import loginAndRegistrationService from "../../../service/loginAndRegistraionService";
import { Form } from "../../common/form";
import { toast } from "react-toastify";

export class Login extends Component {
  state = {
    email: "",
    password: "",
    status: "",
    title: "Login Form",
  };

  componentDidMount() {
    if (localStorage.getItem("email") !== null) {
      toast("Already Logged In");
      this.handleRoute(localStorage.getItem("role"));
    }
  }

  handleFormValueChange = (event) => {
    const name = event.target.name;
    if (name === "email") {
      this.setState({ email: event.target.value });
    } else {
      this.setState({ password: event.target.value });
    }
  };

  handleSuccess = ({data}) => {
    localStorage.setItem("email", this.state.email);
    localStorage.setItem("role", data.role);
    toast("Loged in Successfully");
    this.handleRoute(data.role);
  };

  handleFailure = (message) => {
    toast(message);
  };

  handleSubmit = () => {
    const user = {
      email: this.state.email,
      password: this.state.password,
    };

    loginAndRegistrationService
      .login(user)
      .then((res) => {
        console.log(res)
        this.handleSuccess(res);
      })
      .catch((error) => {
        // console.log(error)
        this.handleFailure("Wrong Credentials");
      });
  };

  handleCancel = () => {
    this.props.history.push({
      pathname: `/home`,
    });
  };

  handleRoute = (role) => {
    window.location.href = "http://localhost:3000/hackers";

  };

  render() {
    const { email, password, title } = this.state;
    const user = { email: email, password: password };
    return (
      <div>
        <Form
          formObject={user}
          title={title}
          onFormValueChange={this.handleFormValueChange}
          onSubmit={this.handleSubmit}
          onCancel={this.handleCancel}
        />
      </div>
    );
  }
}

export default Login;
