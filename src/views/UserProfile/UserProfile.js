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
import {Progress} from 'reactstrap';
import url1 from '../../config.js';
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
      errrMsg:'',
      imageInputAllow:false,
      selectedFile: null,
      imageSuccess:false,

      profilePhotoVar:null
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
        if(res.data.photo){
          this.setState({profilePhotoVar:url1.apiURL+'/'+res.data.photo})
        }
        else{
          this.setState({profilePhotoVar:avatar})
        }
        console.log(url1.apiURL+'/'+res.data.photo);
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
  setImageInp(){
    this.setState({imageInputAllow:true});
  }
  setImageInpN(){
    this.setState({imageInputAllow:false});
  }

  checkMimeType=(event)=>{
    //getting file object
    let files = event.target.files[0] 
    //define message container
    let err = ''
    // list allow mime type
   const types = ['image/png', 'image/jpeg', 'image/gif']
    // loop access array
    if (types.every(type => files.type !== type)) {
         // create error message and assign to container   
         err += files.type+' is not a supported format\n';
         this.setState({errr:true});
         this.setState({errrMsg:err});
       }
  
   if (err !== '') { // if message not same old that mean has error 
        event.target.value = null // discard selected file
        console.log(err)
         return false; 
    }
   return true;
  
  }

  onChangeHandler=event=>{
    if(this.checkMimeType(event)){ 
      this.setState({
        selectedFile: event.target.files[0],
        loaded: 0,
      })
    }
  }
  onClickHandler = () => {
    axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'
    console.log(this.state.selectedFile)
    const data = new FormData() 
    data.append('photo', this.state.selectedFile)
    axios.patch("/userImage/add", data, {
        onUploadProgress: ProgressEvent => {
          this.setState({
            loaded: (ProgressEvent.loaded / ProgressEvent.total*100),
        })}
      })
      .then(res => {
        console.log(res.data);
        if(res.data.photo){
          this.setState({profilePhotoVar:url1.apiURL+'/'+res.data.photo})
        }
        else{
          this.setState({profilePhotoVar:avatar})
        }
        if(res.data.msg){
          this.setState({errr:false});
          this.setState({succes:true});
          this.setState({succesMsg:res.data.msg});
        }
        else if(res.data.errmsg){
          this.setState({errr:true});
          this.setState({succes:false});
          this.setState({errrMsg:res.data.errmsg});
        }
      })
  }
  render() {
    const classes=makeStyles(this.state.styles);
    let notifi;
    let imgInput;
    if(this.state.succes){
      notifi=<SnackbarContent message={'SUCCESS: '+this.state.succesMsg} close color="success"/>;
    }
    else if(this.state.errr){
      notifi=<SnackbarContent message={'Error: '+this.state.errrMsg} close color="danger"/>;
    }
    if(this.state.imageInputAllow){
      imgInput=<div className="form-group">
        <input type="file" className="form-control" id="exampleInputImage" aria-describedby="emailHelp" onChange={this.onChangeHandler}/>
        <Progress max="100" color="success" value={this.state.loaded} >{Math.round(this.state.loaded,2) }%</Progress>
        <Button color="success" round onClick={()=>this.onClickHandler()}>
        Upload
        </Button>
        <Button color="info" round onClick={()=>this.setImageInpN()}>
        cancel
        </Button>
        </div>;
    }else{
      imgInput=<small></small>;
    }

    return (
      <div>
        <br/>{notifi}<br/>
        <br/>{this.notifi2}<br/>
        <GridContainer>
        <GridItem xs={12} sm={12} md={4}>
            <Card profile>
              <CardAvatar profile>
                <a href="#pablo" onClick={e => e.preventDefault()}>
                  <img src={this.state.profilePhotoVar} alt="..." />
                </a>
              </CardAvatar>
              <div>
              {imgInput}<br/>
              <Button color="primary" round onClick={()=>this.setImageInp()}>
              Update Profile Picture
              </Button>
              <Button color="danger" round data-toggle="modal" data-target="#myModal">
              Delete Profile Picture
              </Button>
              </div>
              
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