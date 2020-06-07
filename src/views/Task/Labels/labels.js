import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

import Tooltip from "@material-ui/core/Tooltip";
// import IconButton from "@material-ui/core/IconButton";
import Done from "@material-ui/icons/Done";
import Clear from "@material-ui/icons/Clear";

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

const LabelsCard = (props) => {
  const classes = useStyles();
  const rows = []
    
  // console.log(props.labelNames)
  props.labelObjects.forEach((value, indx) => {
    // console.log(value)
    rows.push(
      <tr 
        key = { indx } 
        onClick = { () => props.onSelectLabel(value, indx) }
        className = { props.selectedLabel === indx ? "bg-success text-white" : null}
        >
        <th scope="row">{indx + 1}</th>
        <td>{value.name}</td>
        <td>
          {
            value.done ?
            <Tooltip
              id="tooltip-top"
              title="Labelled."
              placement="top"
              classes={{ tooltip: classes.tooltip }}
              >
              <Done
                className={
                  classes.tableActionButtonIcon + " " + classes.edit
                }
              />
            </Tooltip>
            :
            <Tooltip
              id="tooltip-top"
              title="Not Labelled"
              placement="top"
              classes={{ tooltip: classes.tooltip }}
              >
              <Clear
                className={
                  classes.tableActionButtonIcon + " " + classes.edit
                }
              />
            </Tooltip>
          }
        </td>
      </tr>
    )
  })

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Labels</h4>
            </CardHeader>
            <CardBody>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Names</th>
                    <th scope="col">Labelled?</th>
                  </tr>
                </thead>
                <tbody>
                  { rows }
                </tbody>
              </table>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}

export default LabelsCard;
