import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import axios from '../../axiosSet';
import SnackbarContent from "components/Snackbar/SnackbarContent.js";

import avatar from "assets/img/faces/marc1.jpg";
class UserP extends React.Component {
  constructor(props) {
    super(props);
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
      userProfile:{},
      name:'',
      email:'',
      password:'',
      password2:'',
      succes:false,
      succesMsg:'',
      errr:false,
      errrMsg:''
    }
  }
  data={name:'',
  email:'',
  password:'',
  password2:''}
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
  componentWillMount(){
    axios.get('/user/profile')
      .then(res => {
        this.setState({userProfile:res.data});
        this.data.name=res.data.name;
        this.data.email=res.data.email;
        console.log(this.state.userProfile);
      });
    
  }
  register=()=> {
    this.setState({
      name:this.data.name,
      email:this.data.email,
      password:this.data.password,
      password2:this.data.password2
    },()=>{
      const user = {name:this.state.name,email:this.state.email,password:this.state.password,password2:this.state.password2};
      console.log(user);
      axios.patch('/user/update', user)
      .then(res => {
        console.log(res.data);
        if(res.data.msg){
          this.setState({errr:false});
          this.setState({succes:true});
          this.setState({succesMsg:res.data.msg});
        }
        else if(res.data.errmsg){
          this.setState({errr:true});
          this.setState({succes:false});
          this.setState({errrMsg:res.data.errmsg[0].msg});
        }
      });
    });    
  }
  render() {
    const classes=makeStyles(this.state.styles);
    let notifi;
    if(this.state.succes){
      notifi=<SnackbarContent message={'SUCCESS: '+this.state.succesMsg} close color="success"/>;
    }else if(this.state.errr){
      notifi=<SnackbarContent message={'Error: '+this.state.errrMsg} close color="danger"/>;
    }
    return (
      <div>
        {notifi}<br/>
        <GridContainer>
        <GridItem xs={12} sm={12} md={4}>
            <Card profile>
              <CardAvatar profile>
                <a href="#pablo" onClick={e => e.preventDefault()}>
                  <img src={avatar} alt="..." />
                </a>
              </CardAvatar>
              <CardBody profile>
                <h6 className={classes.cardCategory}>{this.state.userProfile.name}</h6>
                <h4 className={classes.cardTitle}>{this.state.userProfile.email}</h4>
                <p className={classes.description}> <small style={{color: 'indigo', size:'20px', fontWeight:'bolder'}}>Created At:</small>&nbsp; {this.state.userProfile.createdAt}</p>
                <Button color="secondary" round>
                {this.state.userProfile.usertype}
                </Button>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={8}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Edit Profile</h4>
              </CardHeader>
              <CardBody>
                <div className="form-group">
                <input type="text" className="form-control" id="exampleInputName" aria-describedby="emailHelp" placeholder={this.state.userProfile.name} onChange={this.handleName}/>
                </div>
                <div className="form-group">
                  <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder={this.state.userProfile.email}  onChange={this.handleEmail}/>
                  <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                  <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" onChange={this.handlePassword1}/>
                </div>
                <div className="form-group">
                  <input type="password" className="form-control" id="exampleInputPassword2" placeholder="Retype Password" onChange={this.handlePassword2}/>
                </div>
                <Button color="success" onClick={this.register}>
                    Update
                </Button>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
                  
      </div>
    );
  }
}


export default UserP 