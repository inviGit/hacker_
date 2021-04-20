import React, { Component } from "react";
import {Form} from "../../common/form";
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

  handleCustomerRegister = (user) => {
    loginAndRegistrationService.registerCustomer(user).then((res) => {
      console.log(res.data);
      const { data } = res;
      data.status === 1
        ? this.handleSuccess(data.message)
        : this.handleFailure(data.message);
    });
  };

  handleVendorRegister = (vendorId, user) => {
    loginAndRegistrationService.registerVendor(vendorId, user).then((res) => {
      console.log(res.data);
      const { data } = res;
      data.status === 1
        ? this.handleSuccess(data.message)
        : this.handleFailure(data.message);
    });
  };

  handleSubmit = () => {
    const { vendorId, username, password } = this.state;
    let user = {
      username: username,
      password: password,
    };
    if (this.props.match.params.user === "customer") {
      this.handleCustomerRegister(user);
    } else if (this.props.match.params.user === "vendor") {
      this.handleVendorRegister(vendorId, user);
    }
  };

  handleCancel = () => {
    this.props.history.push({
      pathname: `/`,
    });
  };

  render() {
    const { vendorId, username, password, title } = this.state;
    const user = this.handleUserObject(vendorId, username, password);
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
