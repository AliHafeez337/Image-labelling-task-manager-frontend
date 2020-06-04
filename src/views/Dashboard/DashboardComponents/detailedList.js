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

  var rows = []
  if (props.tasks){
    props.tasks.forEach((task, index) => {
      rows.push(
        <tr 
          key = { index } 
          onClick = { () => console.log(task) }
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
                <span style={{'fontWeight':'bold'}}>Images</span>
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