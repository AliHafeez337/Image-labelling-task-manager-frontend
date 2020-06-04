import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import AssignmentLateIcon from '@material-ui/icons/AssignmentLate';
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardFooter from "components/Card/CardFooter.js";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

const useStyles = makeStyles(styles);

const ArchivedTasks = props => {
  const classes = useStyles();

  return (
    <div>
      <Card>
        <CardHeader color="warning" stats icon>
          <CardIcon color="warning">
            <AssignmentLateIcon />
          </CardIcon>
          <br />
          <h1 style={{color: 'black'}} className={classes.cardTitle}>
            { props.archived }
          </h1>
        </CardHeader>
        <CardFooter stats>
          <div className={classes.stats}>
            No. of archived tasks.
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default ArchivedTasks;
