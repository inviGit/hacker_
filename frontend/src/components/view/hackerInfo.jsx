import React, { Component } from "react";
import HackerService from "../../service/hackerService";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Grid, Paper } from "@material-ui/core";
import _ from "lodash";

export class HackersInfo extends Component {
  state = {
    hacker: {},
  };

  componentDidMount() {
    HackerService.getHacker(2).then((res) => {
      this.setState({ hacker: res.data });
    });
  }

  render() {
    const { hacker } = this.state;
    const classes = makeStyles((theme) => ({
      root: {
        minWidth: 275,
        "& > *": {
          margin: theme.spacing(1),
        },
      },
      bullet: {
        display: "inline-block",
        margin: "0 2px",
        transform: "scale(0.8)",
      },
      title: {
        fontSize: 14,
      },
      pos: {
        marginBottom: 12,
      },
      extendedIcon: {
        marginRight: theme.spacing(1),
      },
    }));

    return (
      <div style={{ flexGrow: "1", marginTop: "20px" }}>
        <Grid container direction="row" justify="center" alignItems="center">
          <Card className={classes.root} variant="outlined">
            <CardContent>
              <Typography
                className={classes.title}
                color="initial"
                gutterBottom
              >
                Hacker Details:
              </Typography>
              <Typography variant="h5" component="h2">
                Name: {hacker.name}
              </Typography>
              <Typography variant="h6" component="h2">
                Username: {hacker.username}
              </Typography>
              <Typography variant="h6" component="h2">
                Education: {hacker.education}
              </Typography>
              <Typography variant="h6" component="h2">
                Location: {hacker.location}
              </Typography>
              <Typography variant="h6" component="h2">
                Challenges Solved: {hacker.challenges_solved}
              </Typography>
              <Typography variant="h6" component="h2">
                Solutions Submitted: {hacker.solutions_submitted}
              </Typography>
              <Typography variant="h6" component="h2">
                Device: {hacker.device_type}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </div>
    );
  }
}

export default HackersInfo;
