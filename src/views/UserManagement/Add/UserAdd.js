import React from 'react'

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
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
      name: null,
      usertype: null,
      email: null,
      archived: null,
      password: null,
      password2: null,
      succes: false,
      succesMsg: '',
      errr: false,
      errrMsg: '',
    }
  }

  handleName = event => {
    // console.log(event.target.value)
    this.setState({ name: event.target.value })
  }
  handleDropdown = event => {
    console.log(event.target.value)
    if (event.target.value === 'admin'){
      this.setState({ usertype: 'admin' })
    } else if (event.target.value === 'labeller') {
      this.setState({ usertype: 'labeller' })
    } else {
      this.setState({ usertype: null })
    }
  }
  handleEmail = event => {
    this.setState({ email: event.target.value })
  }
  handlePassword1 = event => {
    this.setState({ password: event.target.value })
  }
  handlePassword2 = event => {
    this.setState({ password2: event.target.value })
  }
  handleCheckBox = () => {
    // console.log(document.getElementById('archive').checked)
    this.setState({ archived: document.getElementById('archive').checked })
  }
  handleSumbit = () => {
    var body = {
      name: this.state.name,
      usertype: this.state.usertype,
      email: this.state.email,
      archived: this.state.archived,
      password: this.state.password,
      password2: this.state.password2
    }
    if (body.archived === null){
      delete body.archived
    }
    // console.log(body)
    if (
      body.name === null || 
      body.usesrtype === null || 
      body.email === null || 
      body.password === null || 
      body.password2 === null 
      ){
      this.setState({
        errr: true,
        errrMsg: "Please fill all the fields..."
      })
    } else if (body.password !== body.password2){
      this.setState({
        errr: true,
        errrMsg: "Passwords don't match..."
      })
    } else {
      this.setState({
        errr: false,
        errrMsg: ""
      })
      axios.post('/admin/create', body)
        .then(res => {
          console.log(res.data)
          if (res.data.errmsg){
            this.setState({
              succes: false,
              succesMsg: '',
              errr: true,
              errrMsg: res.data.errmsg
            })
          } else if (res.data.msg){
            this.setState({
              errr: false,
              errrMsg: '',
              succes: true,
              succesMsg: res.data.msg
            })
          }
        })
    }
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
        <GridContainer>
          <GridItem xs={12} sm={12} md={12} lg={12}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Edit Profile</h4>
              </CardHeader>
              <CardBody>
                <div className="form-group">
                  <input type="text" className="form-control" id="exampleInputName" aria-describedby="emailHelp" placeholder="Enter the name" onChange={ this.handleName }/>
                </div>
                <div className="form-group">
                  <select style={{ 'cursor': 'pointer'}} onChange={ this.handleDropdown } className="form-control" id="exampleFormControlSelect1">
                    <option value=''>Select usertype</option>
                    <option value='admin'>Admin</option>
                    <option value='labeller'>Labeller</option>
                  </select>
                </div>
                <div className="form-group">
                  <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter the email"  onChange={ this.handleEmail }/>
                  <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                  <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" onChange={ this.handlePassword1 }/>
                </div>
                <div className="form-group">
                  <input type="password" className="form-control" id="exampleInputPassword2" placeholder="Retype Password" onChange={ this.handlePassword2 }/>
                </div>
                <div className="form-check">
                  <input id="archive" type="checkbox" className="form-check-input" onChange={ this.handleCheckBox }/>
                  <span>Archived? (Mark tick for yes)</span>
                </div>
                <Button color="success" onClick={ this.handleSumbit }>
                  Save
                </Button>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    )
  }
}

export default UsersAdd;