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
      selectedFiles: [],
      imageSuccess:false,
      options : [],
      taskId:null,
      buttonEnable:true,
      canDeleteIt:true,

      TaskName:null,
      TaskAssignedTo:null,
      TaskLabels:null,
      TaskDate:null
    }
  }
taskData={tname:null,tlabels:null,tassigned:[],tdate:null}
  handleName = event => {
    this.taskData.tname= event.target.value;
  }
  handleDate = event =>{
    this.taskData.tdate= event.target.value;
  }
  handleLabels = event => {
    let optimizedStringLabel;
    let labelArray=[];
    let labelArray2=[];
    optimizedStringLabel=event.target.value;
    if(optimizedStringLabel.includes(' ')){
      optimizedStringLabel.replace(' ','')
    }
    if(optimizedStringLabel.includes('+')){
      labelArray=optimizedStringLabel.split('+');
    }
    else{
      labelArray.push(optimizedStringLabel);
    }
    for (let index = 0; index < labelArray.length; index++) {
      if(labelArray[index].includes(':')){
        let make2=labelArray[index].split(':');
        if(make2[1].includes(',')){
          let nextMake=make2[1].split(',');
          for (let index2 = 0; index2 < nextMake.length; index2++) {
            labelArray2.push({category:make2[0],name:nextMake[index2]})
          }
        }
        else{
          labelArray2.push({category:make2[0],name:make2[1]})
        }
      }
      else{console.log('nno')}
    }
    this.taskData.tlabels=labelArray2;
  }

  handleAssigned = value => {
    this.taskData.tassigned=[]
    let dat=value
    for (let index = 0; index < dat.length; index++) {
      this.taskData.tassigned.push(dat[index].value);
    }
  }

  imageArray=[];
  
  makeTask=()=> {
    this.setState({
      TaskName:this.taskData.tname,
      TaskAssignedTo:this.taskData.tassigned,
      TaskLabels:this.taskData.tlabels,
      TaskDate:this.taskData.tdate
    },()=>{
      const task = {name:this.state.TaskName,assignedTo:this.state.TaskAssignedTo,labels:this.state.TaskLabels,dueDate:this.state.TaskDate,archived:false};
      console.log(task);
      axios.patch('/task/update?id='+this.state.taskId, task)
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
          
      })
    }
  }
  onClickHandler = () => {
    axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'
    console.log(this.state.selectedFile)
    const data1 = new FormData() 
    data1.append('photo', this.state.selectedFile)
    axios.patch("taskImage/add?id="+this.state.taskId, data1, {
          onUploadProgress: ProgressEvent => {
          this.setState({
            loaded: (ProgressEvent.loaded / ProgressEvent.total*100),
        })}
      })
      .then(res => {
        console.log(res.data);
        this.setState({buttonEnable:false})
        this.setState({selectedFiles: this.imageArray})
      })
  }

  componentWillMount(){
    let userList=[];
    let userRecieved=[];
    let userObj={};
    axios.post('/task/new')
      .then(res => {
        console.log(res.data);
        this.setState({taskId:res.data.task._id})
        axios.get('/admin/user/all')
          .then(res => {
            console.log(res.data);
            userRecieved=res.data;
            for (let index = 0; index < userRecieved.length; index++) {
              userObj={ value: userRecieved[index], label: userRecieved[index].name+' | '+userRecieved[index].email };
              userList.push(userObj)
            }
            this.setState({options:userList});
          });
      });
    
  }
  componentWillUnmount(){
    if(this.state.selectedFiles.length<0 || this.taskData.tname===null || this.taskData.tname==='' || this.taskData.tlabels===null || this.taskData.tlabels===[]){
      axios.delete('/task/delete/'+this.state.taskId)
      .then(res => {
        console.log(res.data);
      });
    }
  }
  render() {
    makeStyles(this.state.styles);
    let notifi;
    let items;
    items = this.state.selectedFiles.map((item) =>
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
                        <ol>
                            {items}
                        </ol>
                    </div>
                  </div>

                  <div className="form-group">
                    <small id="nameHelp" className="form-text text-muted">Enter Task Name</small>
                    <input type="text" className="form-control" id="exampleInputName" aria-describedby="emailHelp" placeholder="Enter Task Name" onChange={this.handleName}/>
                  </div>

                  <div className="form-group">
                    <small id="labelsHelp" className="form-text text-muted">Enter labells in this format <b style={{color:'red'}}>Label Category1: lable1,lable2,lable3 + Label Category2: lable1,lable2,lable3 + Label Category3: lable1,lable2,lable3 <br/> (as many as you want like this format)</b></small>
                    <textarea type="textarea" className="form-control" id="exampleInputName" aria-describedby="emailHelp" placeholder="Enter labels" onChange={this.handleLabels}/>
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
                    onChange={(value) => this.handleAssigned(value)}
                  />
                  </div><br/>

                  <div className="form-group">
                    <small id="nameHelp" className="form-text text-muted">Due Date</small>
                    <input type="date" className="form-control" id="exampleInputName" aria-describedby="emailHelp" placeholder="Select Due Date" onChange={this.handleDate}/>
                  </div>

                  <Button disabled={this.state.buttonEnable} color="success" round onClick={this.makeTask}>
                      Create Task
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