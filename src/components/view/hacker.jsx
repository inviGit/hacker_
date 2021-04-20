import React, { Component } from "react";
import HackerService from "../../service/hackerService";
import { paginate } from "../../utils/paginate";
import Pagination from "../common/pagination";
import HackerTable from "./tables/hackerTable";
import _ from "lodash";
import { toast } from "react-toastify";
import AutocompleteInput from "../common/autocompleteInput";
import { Button, Grid, Paper } from "@material-ui/core";
import DeleteDialog from "./alertDialog/deleteDialog";
import { HackerInfoDialog } from "./alertDialog/hackerInfoDialog";
import { HackersRank } from "./hackersRank";

export class Hackers extends Component {
  state = {
    allHackers: [],
    hackers: [],
    selectedHacker: "",
    openDeleteDialog: false,
    openHackerInfoDialog: false,
    pageSize: 4,
    currentPage: 1,
    sortColumn: { path: "title", order: "asc" },
  };

  componentDidMount() {
    HackerService.getAllHackers().then((res) => {
      this.setState({ hackers: res.data, allHackers: res.data });
    });
  }

  handleAutoCompleteSelect = (event, hackers) => {
    let a = {};
    if (_.isNull(hackers)) {
      a = { ...this.state.allHackers };
      this.setState({ hackers: a });
    } else {
      a = [hackers];
      this.setState({ hackers: a });
    }
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      allHackers,
      hackers,
    } = this.state;

    const sorted = _.orderBy(hackers, [sortColumn.path], [sortColumn.order]);

    const filteredHackers = paginate(sorted, currentPage, pageSize);

    return { totalCount: allHackers.length, data: filteredHackers };
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleSuccess = (message) => {
    window.location.reload();
    toast(message);
  };

  handleFailure = (message) => {
    toast(message);
  };

  handleHackersForm = () => {
    this.props.history.push("/hacker-form");
  };

  handleDelete = (hacker) => {
    this.setState({ selectedHacker: Hackers, openDeleteDialog: true });
  };

  handleDeleteDialogClose = () => {
    this.setState({ openDeleteDialog: false });
  };

  handleDeleteDialogConfirm = () => {
    HackerService.removeHacker(this.state.selectedHacker.id).then((res) => {
      const { data } = res;
      data.status === 1
        ? this.handleSuccess(data.message)
        : this.handleFailure(data.message);
    });
  };

  handleUpdate = (hacker) => {
    this.props.history.push({
      pathname: `/hacker/${hacker.id}/hacker-form`,
      state: { hacker: hacker },
    });
  };

  handleHackerInfoSelect = (hacker) => {
    this.setState({ selectedHacker: hacker, openHackerInfoDialog: true });
  };

  handleHackerInfoDialogClose = () => {
    this.setState({ selectedHacker: "", openHackerInfoDialog: false });
  };

  render() {
    const {
      pageTitle,
      allHackers,
      selectedHacker,
      openDeleteDialog,
      openHackerInfoDialog,
      sortColumn,
      pageSize,
      currentPage,
    } = this.state;

    const { totalCount, data: filteredHackers } = this.getPagedData();

    return (
      <div style={{ flexGrow: "1", marginTop: "20px" }}>
        {!_.isEmpty(selectedHacker) && !_.isNull(selectedHacker) ? (
          <HackerInfoDialog
            open={openHackerInfoDialog}
            data={selectedHacker}
            onDialogClose={this.handleHackerInfoDialogClose}
          />
        ) : (
          <h1></h1>
        )}

        <DeleteDialog
          open={openDeleteDialog}
          title={`Delete Hacker?`}
          content={`This action is irreversible. Hacker will be deleted permanently`}
          onCancel={this.handleDeleteDialogClose}
          onConfirm={this.handleDeleteDialogConfirm}
        />

        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item xs={10}>
            <div style={{marginBottom: "20px"}}>
            <HackersRank />

            </div>
          </Grid>
          <Grid item xs={10}>
            <Paper>
              {" "}
              <AutocompleteInput
                data={allHackers}
                label={"username"}
                onItemSelect={this.handleAutoCompleteSelect}
              />
            </Paper>
          </Grid>
          <Grid item xs={10}>
            <Paper>
              <div className="col py-3 px-lg-5  bg-light">
                <HackerTable
                  hackers={filteredHackers}
                  sortColumn={sortColumn}
                  onHackerInfoSelect={this.handleHackerInfoSelect}
                  onDelete={this.handleDelete}
                  onUpdate={this.handleUpdate}
                  onSort={this.handleSort}
                />
                <Pagination
                  itemsCount={totalCount}
                  pageSize={pageSize}
                  currentPage={currentPage}
                  onPageChange={this.handlePageChange}
                />
              </div>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Hackers;
