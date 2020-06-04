import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Select from 'react-select';
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import axios from '../../../axiosSet.js';
import SnackbarContent from "components/Snackbar/SnackbarContent.js";
import {Progress} from 'reactstrap';
class AddTask extends React.Component {
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
      succes:false,
      succesMsg:'',
      errr:false,
      errrMsg:'',
      imageInputAllow:false,
      selectedFile: null,
      selectedFileArray: [],
      imageSuccess:false,
      options : [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
      ]
    }
  }
//   handleName = event => {
//     this.data.name= event.target.value;
//   }
//   handleEmail = event => {
//     this.data.email= event.target.value;
//   }
//   handlePassword1 = event => {
//     this.data.password= event.target.value;
//   }
//   handlePassword2 = event => {
//     this.data.password2= event.target.value;
//   }
  imageArray=[];
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
      },()=>{
          this.imageArray.push(this.state.selectedFile)
          console.log(this.imageArray)
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
    makeStyles(this.state.styles);
    let notifi;
    let items;
    items = this.imageArray.map((item) =>
    <li>{item.name}</li>
    );
    if(this.state.succes){
      notifi=<SnackbarContent message={'SUCCESS: '+this.state.succesMsg} close color="success"/>;
    }
    else if(this.state.errr){
      notifi=<SnackbarContent message={'Error: '+this.state.errrMsg} close color="danger"/>;
    }
    
    return (
      <div>
        {notifi}<br/>
        <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardBody>
                  <div className="form-group">
                    <small id="nameHelp" className="form-text text-muted">Enter Task Name</small>
                    <input type="text" className="form-control" id="exampleInputName" aria-describedby="emailHelp" placeholder="Enter email" onChange={this.handleEmail}/>
                  </div>
                  <small id="imageHelp" className="form-text text-muted">Select Task Images</small>
                  <div style={{border:'2px solid black'}}>
                    <div className="form-group" style={{padding: '30px'}}>
                        <input type="file" className="form-control" id="exampleInputImage" aria-describedby="imageHelp" onChange={this.onChangeHandler}/>
                        <Progress max="100" color="success" value={this.state.loaded} >{Math.round(this.state.loaded,2) }%</Progress>
                        <Button color="success" round onClick={()=>this.onClickHandler()}>
                            Upload
                        </Button>
                    </div><hr/>
                    <div style={{padding: '30px'}}>
                        <ul>
                            {items}
                        </ul>
                    </div>
                  </div>
                  <div className="form-group">
                    <small id="labelsHelp" className="form-text text-muted">Enter labells in this format <b>Label Category: lable1,lable2,lable3</b></small>
                    <textarea type="textarea" className="form-control" id="exampleInputName" aria-describedby="emailHelp" placeholder="Enter email" onChange={this.handleEmail}/>
                  </div>
                    <br/><br/>
                  <div className="form-group">
                  <small id="userTagHelp" className="form-text text-muted">Select Assigned Users</small>
                  <Select
                    isMulti
                    name="colors"
                    options={this.state.options}
                    className="basic-multi-select"
                    classNamePrefix="select"
                  />
                  </div><br/>
                  <Button color="success" round onClick={this.loginMethod}>
                      Login
                  </Button>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
                  
      </div>
    );
  }
}


export default AddTask 