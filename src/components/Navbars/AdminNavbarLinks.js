import React from "react";
import classNames from "classnames";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Hidden from "@material-ui/core/Hidden";
import Poppers from "@material-ui/core/Popper";
import Divider from "@material-ui/core/Divider";
// @material-ui/icons
import Person from "@material-ui/icons/Person";
import Search from "@material-ui/icons/Search";
// core components
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-dashboard-react/components/headerLinksStyle.js";

import axios from '../../axiosSet';

const useStyles = makeStyles(styles);

const AdminNavbarLinks = (props) => {
  const classes = useStyles();
  const [openProfile, setOpenProfile] = React.useState(null);

  const handleClickProfile = event => {
    if (openProfile && openProfile.contains(event.target)) {
      setOpenProfile(null);
    } else {
      setOpenProfile(event.currentTarget);
    }
  };
  const handleCloseProfile = () => {
    setOpenProfile(null);
  };
  const handleGoToProfile = () => {
    setTimeout(() => {
      setOpenProfile(null);
      props.history.push('/admin/user')
    }, 100)
  };
  const handleLogoutFunction = () => {
    axios.get('/user/logout')
      .then(res => {
        if(res.data.message){
          localStorage.removeItem("token");
          localStorage.removeItem("useId");
          localStorage.removeItem("name");
          localStorage.removeItem("email");
          localStorage.removeItem("archived");
          localStorage.removeItem("usertype");
          setTimeout(() => {
            props.history.push('../../login')
          }, 500)
        }
      });
  };
  return (
    <div>
      {/* search */}
      {/* {console.log(props.token)} */}
      <div className={classes.searchWrapper} style={{paddingRight:'80px' }}>
        <CustomInput
          formControlProps={{
            className: classes.margin + " " + classes.search
          }}
          inputProps={{
            placeholder: "Search",
            inputProps: {
              "aria-label": "Search"
            }
          }}
        />
        <Button color="white" aria-label="edit" justIcon round>
          <Search />
        </Button>
      </div>

      <Hidden mdUp implementation="css">
        <p className={classes.linkText}>Dashboard</p>
      </Hidden>

      {/* profile dropdown */}
      <div className={classes.manager}>
        <Button
          color={window.innerWidth > 959 ? "white" : "white"}
          justIcon={window.innerWidth > 959}
          simple={!(window.innerWidth > 959)}
          aria-owns={openProfile ? "profile-menu-list-grow" : null}
          aria-haspopup="true"
          onClick={handleClickProfile}
          className={classes.buttonLink}
        >
          <Person className={classes.icons} />
          <Hidden mdUp implementation="css">
            <p className={classes.linkText}>Profile</p>
          </Hidden>
        </Button>
        <Poppers
          open={Boolean(openProfile)}
          anchorEl={openProfile}
          transition
          disablePortal
          className={
            classNames({ [classes.popperClose]: !openProfile }) +
            " " +
            classes.popperNav
          }
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id="profile-menu-list-grow"
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom"
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleCloseProfile}>
                  <MenuList role="menu">
                    <MenuItem
                      onClick={handleGoToProfile}
                      className={classes.dropdownItem}
                    >
                      Profile
                    </MenuItem>
                    <Divider light />
                    <MenuItem
                      onClick={handleLogoutFunction}
                      className={classes.dropdownItem}
                    >
                      Logout
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Poppers>
      </div>
      {/* end profile drop down */}
    </div>
  );
}

const mapStoreToProps = state => {
  return {
    token: state.token
  }
}

export default connect(mapStoreToProps, null)(withRouter(AdminNavbarLinks))
