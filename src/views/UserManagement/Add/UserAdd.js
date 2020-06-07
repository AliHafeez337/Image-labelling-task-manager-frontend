import React from 'react'

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import SnackbarContent from "components/Snackbar/SnackbarContent.js";

import axios from './../../../axiosSet';

class UsersAdd extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      styles :{
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
      name:'',
      email:'',
      password:'',
      password2:'',
      succes:false,
      succesMsg:'',
      errr:false,
      errrMsg:'',
    }
  }

  componentDidMount() {
  }

  handleName = event => {
    this.data.name= event.target.value;
  }
  handleEmail = event => {
    this.data.email= event.target.value;
  }
  handlePassword1 = event => {
    this.data.password= event.target.value;
  }
  handlePassword2 = event => {
    this.data.password2= event.target.value;
  }

  render() {
    const classes=makeStyles(this.state.styles);
    let notifi;
    if(this.state.succes){
      notifi=<SnackbarContent message={'SUCCESS: '+this.state.succesMsg} close color="success"/>;
    }
    else if(this.state.errr){
      notifi=<SnackbarContent message={'Error: '+this.state.errrMsg} close color="danger"/>;
    }
    return (
      <div>
        <br/>{notifi}<br/>
        {/* <GridContainer>
          <GridItem xs={12} sm={12} md={8}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Edit Profile</h4>
              </CardHeader>
              <CardBody>
                <div className="form-group">
                <input type="text" className="form-control" id="exampleInputName" aria-describedby="emailHelp" placeholder={} onChange={}/>
                </div>
                <div className="form-group">
                  <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder={}  onChange={}/>
                  <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                  <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" onChange={}/>
                </div>
                <div className="form-group">
                  <input type="password" className="form-control" id="exampleInputPassword2" placeholder="Retype Password" onChange={}/>
                </div>
                <Button color="success" onClick={}>
                    Update
                </Button>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer> */}
      </div>
    )
  }
}

export default UsersAdd;