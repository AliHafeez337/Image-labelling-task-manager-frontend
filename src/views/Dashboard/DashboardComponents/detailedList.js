import React from 'react';

import { Progress } from 'reactstrap';

import { makeStyles } from "@material-ui/core/styles";
import List from '@material-ui/icons/List';
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import Tooltip from "@material-ui/core/Tooltip";
import Edit from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';
import ArchiveIcon from '@material-ui/icons/Archive';
import UnarchiveIcon from '@material-ui/icons/Unarchive';
import GetAppIcon from '@material-ui/icons/GetApp';

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

const TaskList = props => {
  const classes = useStyles();
  // console.log(props.labellers)

  var rows = []
  if (props.tasks){
    props.tasks.forEach((task, index) => {
      var col = 4, col1 = [], col2 = [], col3 = [], col4 = []
      // var col5 = []

      if(props.labellers.length > 0){
        task.assignedTo.forEach((labellerId, index1) =>{
          var thisLabeller = null
          props.labellers.forEach(labeller => {
            if (labeller.task === task._id && labeller._id === labellerId){
              thisLabeller = labeller
            }
          })
          if (thisLabeller){
            // console.log(thisLabeller, task, labellerId, col % 4)
            // console.log(thisLabeller.labels.length)
            switch (col % 4){
              case 0:
                col1.push(<div key={ index1 }><img alt={ thisLabeller.name } src={ apiURL + '/' + thisLabeller.photo } style={{"width":"100%"}} /><div><span style={{ 'fontWeight': 'bold'}}>Name:</span><span>&nbsp;{ thisLabeller.name }</span><br/><span style={{ 'fontWeight': 'bold'}}>Email:</span><span>&nbsp;{ thisLabeller.email }</span><br /><Progress max="100" color="success" value={ thisLabeller.labels.length / task.labels.length * 100 }>{ thisLabeller.labels.length / task.labels.length * 100 }%</Progress></div></div>)
                break
              case 1:
                col2.push(<div key={ index1 }><img alt={ thisLabeller.name } src={ apiURL + '/' + thisLabeller.photo } style={{"width":"100%"}} /><div><span style={{ 'fontWeight': 'bold'}}>Name:</span><span>&nbsp;{ thisLabeller.name }</span><br/><span style={{ 'fontWeight': 'bold'}}>Email:</span><span>&nbsp;{ thisLabeller.email }</span><br /><Progress max="100" color="success" value={ thisLabeller.labels.length / task.labels.length * 100 }>{ thisLabeller.labels.length / task.labels.length * 100 }%</Progress></div></div>)
                break;
              case 2:
                col3.push(<div key={ index1 }><img alt={ thisLabeller.name } src={ apiURL + '/' + thisLabeller.photo } style={{"width":"100%"}} /><div><span style={{ 'fontWeight': 'bold'}}>Name:</span><span>&nbsp;{ thisLabeller.name }</span><br/><span style={{ 'fontWeight': 'bold'}}>Email:</span><span>&nbsp;{ thisLabeller.email }</span><br /><Progress max="100" color="success" value={ thisLabeller.labels.length / task.labels.length * 100 }>{ thisLabeller.labels.length / task.labels.length * 100 }%</Progress></div></div>)
                break;
              case 3:
                col4.push(<div key={ index1 }><img alt={ thisLabeller.name } src={ apiURL + '/' + thisLabeller.photo } style={{"width":"100%"}} /><div><span style={{ 'fontWeight': 'bold'}}>Name:</span><span>&nbsp;{ thisLabeller.name }</span><br/><span style={{ 'fontWeight': 'bold'}}>Email:</span><span>&nbsp;{ thisLabeller.email }</span><br /><Progress max="100" color="success" value={ thisLabeller.labels.length / task.labels.length * 100 }>{ thisLabeller.labels.length / task.labels.length * 100 }%</Progress></div></div>)
                break;
              // case 4:
              //   col5.push(<div key={ index1 }><img alt={ thisLabeller.name } src={ apiURL + '/' + thisLabeller.photo } style={{"width":"100%"}} /><div><span style={{ 'fontWeight': 'bold'}}>Name:</span><span>&nbsp;{ thisLabeller.name }</span><br/><span style={{ 'fontWeight': 'bold'}}>Email:</span><span>&nbsp;{ thisLabeller.email }</span><br /><Progress max="100" color="success" value={ thisLabeller.labels.length / task.labels.length * 100 }>{ thisLabeller.labels.length / task.labels.length * 100 }%</Progress></div></div>)
              //   break;
            }
          }
          col++ 
        })
      }
      rows.push(
        <tr 
          key = { index } 
          // onClick = { () => console.log(task) }
          >
          <td className="col-3">
            <div className="row">
              <div className="col-lg-3 col-md-4 col-sm-4 col-xs-6">
                <div className="row">
                  <div className="col-lg-12">
                    <span style={{'fontWeight':'bold'}}>Name:</span>&nbsp;{ task.name }
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <span style={{'fontWeight':'bold'}}>Labels:</span>&nbsp;{ task.labels.length }&nbsp;&nbsp;<span style={{'fontWeight':'bold'}}>Photos:</span>&nbsp;{ task.photos.length }
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <span style={{'fontWeight':'bold'}}>Created At:</span>&nbsp;{ task.createdAt ? task.createdAt.substr(0, 10) : task.createdAt }
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <span style={{'fontWeight':'bold'}}>Due Date:</span>&nbsp;{ task.dueDate ? task.dueDate.substr(0, 10) : task.dueDate }
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <Progress max="100" color="success" value={ task.percent }>{ task.percent }%</Progress>
                  </div>
                </div>
                {/* <div className="row">
                  <div className="col-lg-12">
                    <span style={{'fontWeight':'bold'}}>Archived?:</span>&nbsp;{ task.archived }
                  </div>
                </div> */}
                <div className="row">
                  <div className="col-lg-12">
                    <Tooltip
                      id="tooltip-top"
                      title="Download Task"
                      placement="bottom"
                      classes={{ tooltip: classes.tooltip }}
                      onClick = { () => props.downloadTask(task) }
                    >
                      <IconButton
                        aria-label="Download"
                        className={classes.tableActionButton}
                      >
                        <GetAppIcon
                          className={
                            classes.tableActionButtonIcon + " " + classes.edit
                          }
                        />
                      </IconButton>
                    </Tooltip>
                    <Tooltip
                      id="tooltip-top"
                      title="Edit Task"
                      placement="bottom"
                      classes={{ tooltip: classes.tooltip }}
                      onClick = { () => props.editTask(task) }
                    >
                      <IconButton
                        aria-label="Edit"
                        className={classes.tableActionButton}
                      >
                        <Edit
                          className={
                            classes.tableActionButtonIcon + " " + classes.edit
                          }
                        />
                      </IconButton>
                    </Tooltip>
                    {
                      task.archived ?
                      <Tooltip
                        id="tooltip-top"
                        title="Unarchive Task"
                        placement="bottom"
                        classes={{ tooltip: classes.tooltip }}
                        onClick = { () => props.archiveTask(task) }
                      >
                        <IconButton
                          aria-label="Unarchive"
                          className={classes.tableActionButton}
                        >
                          <UnarchiveIcon
                            className={
                              classes.tableActionButtonIcon + " " + classes.edit
                            }
                          />
                        </IconButton>
                      </Tooltip>
                      :
                      <Tooltip
                        id="tooltip-top"
                        title="Archive Task"
                        placement="bottom"
                        classes={{ tooltip: classes.tooltip }}
                        onClick = { () => props.archiveTask(task) }
                      >
                        <IconButton
                          aria-label="Archive"
                          className={classes.tableActionButton}
                        >
                          <ArchiveIcon
                            className={
                              classes.tableActionButtonIcon + " " + classes.edit
                            }
                          />
                        </IconButton>
                      </Tooltip>
                    }
                    <Tooltip
                      id="tooltip-top"
                      title="Delete Task"
                      placement="bottom"
                      classes={{ tooltip: classes.tooltip }}
                      onClick = { () => {
                        const confirmed = window.confirm(`Do you really want to delete the task: ${ task.name }?`); 
                        if (confirmed)
                          props.deleteTask(task) 
                      }}
                    >
                      <IconButton
                        aria-label="Delete"
                        className={classes.tableActionButton}
                      >
                        <DeleteIcon
                          className={
                            classes.tableActionButtonIcon + " " + classes.edit
                          }
                        />
                      </IconButton>
                    </Tooltip>
                  </div>
                </div>
              </div>
              <div className="col-lg-9 col-md-8 col-sm-8 col-xs-6">
                <div className="row" style={{ "height": "160px", "overflowY": "scroll" }}> 
                  <div className="column" style={{"msFlex": "20%", "flex": "20%"}}>
                    { col1 }
                  </div>
                  <div className="column" style={{"msFlex": "20%", "flex": "20%"}}>
                    { col2 }
                  </div>  
                  <div className="column" style={{"msFlex": "20%", "flex": "20%"}}>
                    { col3 }
                  </div>
                  <div className="column" style={{"msFlex": "20%", "flex": "20%"}}>
                    { col4 }
                  </div>
                  {/* <div className="column" style={{"msFlex": "20%", "flex": "20%"}}>
                    { col5 }
                  </div> */}
                </div>
              </div>
            </div>
          </td>
        </tr>
      )
    })
  }

  return (
    <div>
      <Card>
        <CardHeader color="info" stats icon>
          <CardIcon color="info">
            <List />
          </CardIcon>
          <br />
          <h2 style={{color: 'black'}} className={classes.cardTitle}>
            List of all the tasks.
          </h2>
        </CardHeader>
        <CardBody>
          <table className="table table-hover">
            <thead>
              <tr className="d-flex">
                <th scope="col" className="col-4">Name</th>
                <th scope="col" className="col-8">Assigned Users</th>
              </tr>
            </thead>
            <tbody>
              { rows }
            </tbody>
          </table>
        </CardBody>
        {/* <CardFooter stats>
          <div className={classes.stats}>
            No. of assigned tasks.
          </div>
        </CardFooter> */}
      </Card>
    </div>
  )
}

export default TaskList