import React, { Component } from "react";
import HackerService from "../../service/hackerService";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRupeeSign } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import _ from "lodash";

export class HackersRank extends Component {
  state = {
    hackers: {},
  };

  componentDidMount() {
    HackerService.getHackersRank().then((res) => {
      this.setState({ hackers: res.data });
    });
  }

  render() {

    const {hackers}=this.state;
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
      <Card className={classes.root} variant="outlined">
        <CardContent>
          <Typography className={classes.title} color="initial" gutterBottom>
            Top 3 Hackers
          </Typography>
          {Object.keys(hackers).map(function (x) {
            return (
              <div key={x}>
                <Typography variant="h5" component="h2">
                  {hackers[x].name}   
                </Typography>
                <Typography className={classes.title} color="initial" gutterBottom>
                Username: {hackers[x].username} 
          </Typography>
              </div>
            );
          })}
          
        </CardContent>
        
      </Card>
    );
  }
}

export default HackersRank;
