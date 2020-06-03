import React from "react";
import { connect } from 'react-redux';
import { Progress } from 'reactstrap';

// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Tasks from "components/Tasks/Tasks.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import Button from "components/CustomButtons/Button.js";

import axios from '../../axiosSet'

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      styles : {
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
      },
      mytasks: null,
      selectedTask: null,
      rows: null,
    }
  }

  componentDidMount() {
    axios.get('/task/mine/')
      .then(res => {
        console.log(res.data)
        this.setState({ mytasks: res.data })
        var rows = []
        res.data.forEach((value, index) => {
          rows.push(
            <tr 
              key = { index } 
              onClick = { () => this.setState({ selectedTask: value }) }
              className = { this.state.selectedTask === value ? "bg-success d-flex" : "d-flex"}>
              {/* <th className="col-1" scope="row">{index + 1}</th> */}
              <td className="col-2">{value.name}</td>
              <td className="col-3"><Progress max="100" color="success" value={value.percent}>{value.percent}%</Progress></td>
              <td className="col-1">{value.labels.length}</td>
              <td className="col-1">{value.photos.length}</td>
              <td className="col-1">{value.assignedTo.length}</td>
              <td className="col-2">{value.createdAt.substr(0, 10)}</td>
              <td className="col-2">{value.dueDate.substr(0, 10)}</td>
            </tr>
          )
        })
        this.setState({ rows })
      })
  }

  render() {
    const classes=makeStyles(this.state.styles);
    return (
      <div>      
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Tasks assigned to you...</h4>
              </CardHeader>
              <CardBody>
                <table className="table">
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
                    { this.state.rows }
                  </tbody>
                </table>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

const mapStoreToProps = state => {
  return {
    taskId: state.recentTaskId
  }
}

export default connect(mapStoreToProps, null)(HomePage);