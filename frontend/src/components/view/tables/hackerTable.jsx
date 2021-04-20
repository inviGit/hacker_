import { Button, IconButton } from "@material-ui/core";
import _ from "lodash";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "../../common/table";
import { InfoTwoTone } from "@material-ui/icons";

export class HackerTable extends Component {
  handleRoleForDelete = () => {
    if (localStorage.getItem("role") === "admin") {
      return {
        key: "delete",
        content: (hacker) => (
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={() => this.props.onDelete(hacker)}
          >
            Delete
          </Button>
        ),
      };
    } else {
      return null;
    }
  };

  columns = [
    {
      path: "name",
      label: "Name",
      content: (hacker) => (
        <div>
          <Link
            to={{
              pathname: `/hacker/${hacker.id}/`
            }}
          >
            {hacker.name}
          </Link>
          <IconButton
            color="primary"
            style={{ float: "right" }}
            onClick={() => this.props.onHackerInfoSelect(hacker)}
          >
            <InfoTwoTone />
          </IconButton>
        </div>
      ),
    },
    { path: "solutions_submitted", label: "Submitted" },
    { path: "challenges_solved", label: "Solved" },
    { path: "location", label: "Country" },
    this.handleRoleForDelete(),
  ];

  render() {
    const { hackers, onSort, sortColumn } = this.props;
    return (
      <div>
        <Table
          columns={_.compact(this.columns)}
          data={hackers}
          sortColumn={sortColumn}
          onSort={onSort}
        />
      </div>
    );
  }
}

export default HackerTable;
