import React, { Component } from "react";
import AlertDialog from "../../common/alertDialog";
import { Button } from "@material-ui/core";
import _ from "lodash";

export class HackerInfoDialog extends Component {
  data = [
    {
      key: "title",
      title: "Hacker Details",
    },
    {
      key: "content",
      content: `Name: ${this.props.data.name}`,
    },
    {
      key: "content2",
      content: `User Name: ${this.props.data.username}`,
    },
    {
      key: "content3",
      content: `Country: ${this.props.data.location}`,
    },
    {
      key: "content4",
      content: `Solutions Submitted: ${this.props.data.solutions_submitted}`,
    },
    {
      key: "content5",
      content: `Challenges Solved: ${this.props.data.challenges_solved}`,
    },
    {
      key: "action",
      action: (
        <div>
          <Button color="primary" onClick={this.props.onDialogClose}>
            Close
          </Button>
        </div>
      ),
    },
  ];

  render() {
    const { open, data } = this.props;
    return (
      <div>
        <AlertDialog open={open} data={this.data} />
      </div>
    );
  }
}

export default HackerInfoDialog;
