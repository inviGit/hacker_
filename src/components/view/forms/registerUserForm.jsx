import React, { Component } from "react";
import { Form } from "../../common/form";
import loginAndRegistrationService from "../../../service/loginAndRegistraionService";
import { toast } from "react-toastify";

export class RegisterUser extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    title: "Registration Form",
  };

  handleFormValueChange = (event) => {
    const name = event.target.name;
    if (name === "name") {
      this.setState({ name: event.target.value });
    } else if (name === "password") {
      this.setState({ password: event.target.value });
    } else if (name === "email") {
      this.setState({ email: event.target.value });
    }
  };

  handleSuccess = (message) => {
    toast(message);
    this.props.history.push(`/`);
  };

  handleFailure = (message) => {
    toast(message);
  };

  handleRegister = (user) => {
    loginAndRegistrationService.registerUser(user).then((res) => {
      console.log(res)
      const { data, status } = res;
      status === 200
        ? this.handleSuccess(data.message)
        : this.handleFailure(data.message);
    });
  };

  handleSubmit = () => {
    const { email, name, password } = this.state;
    let user = {
      email: email,
      name: name,
      password: password,
    };
    this.handleRegister(user);
  };

  handleCancel = () => {
    this.props.history.push({
      pathname: `/`,
    });
  };

  render() {
    const { email, username, password, title } = this.state;
    const user = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
    };
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

export default RegisterUser;
