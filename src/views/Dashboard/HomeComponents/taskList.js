import React from 'react';

import { Progress } from 'reactstrap';

import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

import { apiURL } from './../../../config';

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

const MyTasks = props => {
  const classes = useStyles();
  
  var rows = []
  if (props.tasks){
    var rows = []
    props.tasks.forEach((value, index) => {
      rows.push(
        <tr 
          key = { index } 
          onClick = { () => props.select(value, index) }
          className = { 
            props.selected ? 
              props.selected._id === value._id ?
                "bg-secondary text-white d-flex" 
              :
                "d-flex"
            : 
              "d-flex"
            }>
          {/* <th className="col-1" scope="row">{index + 1}</th> */}
          <td className="col-2">{ value.name }</td>
          <td className="col-3"><Progress max="100" color="success" value={value.percent}>{value.percent}%</Progress></td>
          <td className="col-1">{ value.labels.length }</td>
          <td className="col-1">{ value.photos.length }</td>
          <td className="col-1">{ value.assignedTo.length }</td>
          <td className="col-2">{ value.createdAt.substr(0, 10) }</td>
          <td className="col-2">{ value.dueDate ? value.dueDate.substr(0, 10): null}</td>
        </tr>
      )
    })
  }

  return(
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Tasks assigned to you...</h4>
            </CardHeader>
            <CardBody>
              <table className="table table-hover">
                <thead>
                  <tr className="d-flex">
                    {/* <th scope="col" className="col-1">#</th> */}
                    <th scope="col" className="col-2">Name</th>
                    <th scope="col" className="col-3">Progress</th>
                    <th scope="col" className="col-1">Labels</th>
                    <th scope="col" className="col-1">Photos</th>
                    <th scope="col" className="col-1">Assignees</th>
                    <th scope="col" className="col-2">Creation data</th>
                    <th scope="col" className="col-2">Due Date</th>
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
  )
}

export default MyTasks;