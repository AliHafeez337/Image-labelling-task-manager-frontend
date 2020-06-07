import React from 'react'

// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import PeopleIcon from '@material-ui/icons/People';
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Edit from "@material-ui/icons/Edit";
import DeleteIcon from '@material-ui/icons/Delete';
import ArchiveIcon from '@material-ui/icons/Archive';
import UnarchiveIcon from '@material-ui/icons/Unarchive';

import { apiURL } from './../../../../config';

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

const ListOfUsers = props => {
  const classes = useStyles();

  var rows = []
  if (props.users){ 
    props.users.forEach((user, index) => {
      rows.push(
        <tr 
          key = { index } 
          className = "d-flex"
          >
          {/* <th className="col-1">{index + 1}</th> */}
          <td className="col-1"><img style = {{ 'maxHeight': '40px'}} alt = { user.photo } src = { apiURL + '/' + user.photo } /></td>
          <td className="col-1">{ user.usertype }</td>
          <td className="col-2">{ user.name }</td>
          <td className="col-3">{ user.email }</td>
          <td className="col-2">{ user.createdAt.substr(0, 10) }</td>
          <td className="col-3">
            <Tooltip
              id="tooltip-top"
              title="Edit User"
              placement="bottom"
              classes={{ tooltip: classes.tooltip }}
              onClick = { () => props.editUser(user) }
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
              user.archived ?
              <Tooltip
                id="tooltip-top"
                title="Unarchive User"
                placement="bottom"
                classes={{ tooltip: classes.tooltip }}
                onClick = { () => props.archiveUser(user) }
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
                title="Archive User"
                placement="bottom"
                classes={{ tooltip: classes.tooltip }}
                onClick = { () => props.archiveUser(user) }
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
              title="Delete User"
              placement="bottom"
              classes={{ tooltip: classes.tooltip }}
              onClick = { () => {
                const confirmed = window.confirm(`Do you really want to delete this user: ${ user.name }?`); 
                if (confirmed)
                  props.deleteUser(user) 
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
            <PeopleIcon />
          </CardIcon>
          <br />
          <h2 style={{color: 'black'}} className={classes.cardTitle}>
            List of all the users.
          </h2>
        </CardHeader>
        <CardBody>
          <table className="table table-hover">
            <thead>
              <tr className="d-flex">
                <th scope="col" className="col-1">#</th>
                <th scope="col" className="col-1">UserType</th>
                <th scope="col" className="col-2">Name</th>
                <th scope="col" className="col-3">Email</th>
                <th scope="col" className="col-2">Joined</th>
                <th scope="col" className="col-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              { rows }
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  )
}

export default ListOfUsers;