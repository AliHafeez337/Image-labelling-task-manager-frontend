import React from "react";
// @material-ui/core components
import url1 from '../../../config.js';
import { makeStyles } from "@material-ui/core/styles";
// core components
import Select from 'react-select';
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import axios from '../../../axiosSet.js';
import SnackbarContent from "components/Snackbar/SnackbarContent.js";
import {Progress} from 'reactstrap';
class EditTask extends React.Component {
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
      imageSuccess:false,
      options : [],
      taskId:null,
      buttonEnable:false,
      canDeleteIt:true,

      getTask:null,

      TaskName:null,
      TaskAssignedTo:null,
      TaskLabels:null,
      TaskDate:null,

      TaskNamev:'',
      TaskAssignedTov:[],
      TaskLabelsv:'',
      TaskDatev:'',
      TaskPhotov:[],
    }
  }
taskData={tname:null,tlabels:null,tassigned:[],tdate:null}
taskPhotos=[];
  handleName = event => {
    this.setState({TaskNamev:event.target.value})
    this.taskData.tname= event.target.value;
  }
  handleDate = event =>{
    this.setState({TaskDatev:event.target.value})
    this.taskData.tdate= event.target.value;
  }
  handleLabels = event => {
    this.setState({TaskLabelsv:event.target.value})
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
    this.setState({TaskAssignedTov:value})
    if(value){
      this.taskData.tassigned=[]
      let dat=value
      for (let index = 0; index < dat.length; index++) {
        this.taskData.tassigned.push(dat[index].value);
      }
    }
  }

  imageArray=[];
  
  makeTask=()=> {

    console.log(this.taskData.tassigned)
    if(!this.taskData.tname){
      this.taskData.tname=this.state.TaskNamev
    }
    if(!this.taskData.tdate){
      this.taskData.tdate=this.state.TaskDatev
    }
    if(this.taskData.tassigned.length===0){
      let dato=this.state.TaskAssignedTov
      if(dato){
        this.taskData.tassigned=[]
        for (let indexe = 0; indexe < dato.length; indexe++) {
          this.taskData.tassigned.push(dato[indexe].value);
        }
      }
      console.log(this.taskData.tassigned)
    }
    if(!this.taskData.tlabels){
      let optimizedStringLabel;
      let labelArray=[];
      let labelArray2=[];
      optimizedStringLabel=this.state.TaskLabelsv;
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
          window.scrollTo(0, 0);
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
    if(event.target.files[0]){
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
  
  }
  canAdd=false;
  onChangeHandler=event=>{
    if(this.checkMimeType(event) && event.target.files[0]){ 
      this.setState({
        selectedFile: event.target.files[0],
        loaded: 0,
      })
      this.canAdd=true
    }
  }
  onClickHandler = () => {
    if(this.canAdd){
      this.setState({TaskPhotov: []});
      this.taskPhotos=[];
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
          this.taskPhotos=res.data.photos;
          this.imageArray.push(this.state.selectedFile)
          this.setState({TaskPhotov:res.data.photos})
          this.canAdd=false
        })

    }
  }

  componentWillMount(){
    let userList=[];
    let userRecieved=[];
    let userObj={};

    let labbel;
    let labbelStr='';
    let catArray=[];
    let catArrayDup=[];
    this.setState({TaskPhotov: []});
    console.log(this.props.match.params.id)
    this.setState({taskId:this.props.match.params.id})
    axios.get('/task/'+this.props.match.params.id)
      .then(res => {
        this.setState({getTask:res.data})
        this.setState({TaskDatev:res.data.dueDate.substring(0,10)})
        this.setState({TaskNamev:res.data.name})
        this.setState({TaskPhotov:res.data.photos})
        this.taskPhotos=res.data.photos;
        labbel=res.data.labels
        for (let index = 0; index < labbel.length; index++) {
            if(!catArray.includes(labbel[index].category+':')){
                catArray.push(labbel[index].category+':')
                catArrayDup.push(labbel[index].category+':')
            }
        }
        for (let index1 = 0; index1 < labbel.length; index1++) {
            for (let index2 = 0; index2 < catArray.length; index2++) {
                if(labbel[index1].category+':'===catArray[index2]){
                    catArrayDup[index2] = catArrayDup[index2]+labbel[index1].name+','
                }               
            }
        }
        for (let index4 = 0; index4 < catArrayDup.length; index4++) {
            labbelStr += "+"+catArrayDup[index4].slice(0, catArrayDup[index4].length-1)           
        }        

        this.setState({TaskLabelsv:labbelStr.substring(1)})

        let assignGet=res.data.assignedTo;
        console.log(assignGet)
        let assignMake=[];
        let assignMakeObj;
        for (let index6 = 0; index6 < assignGet.length; index6++) {
            assignMakeObj={label:assignGet[index6].name+' | '+assignGet[index6].email, value:assignGet[index6]}
            assignMake.push(assignMakeObj)
        }
        console.log(assignMake)
        this.setState({TaskAssignedTov:assignMake})

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
  deletePhotoO(index){
    axios.patch('/taskImage/delete?photoUrl='+this.taskPhotos[index].url+'&id='+this.state.taskId)
      .then(res => {
        if(res.data.msg){
          this.setState({errr:false});
          this.setState({succes:true});
          this.setState({succesMsg:res.data.msg});
          this.imageArray.splice(index,1);
          if(res.data.doc.photos.length<1){
            this.setState({buttonEnable:true})
          }
          else{
            this.setState({buttonEnable:false})
          }
          this.taskPhotos=res.data.doc.photos;
          this.setState({TaskPhotov:res.data.doc.photos})
        }
        else if(res.data.errmsg){
          this.setState({errr:true});
          this.setState({succes:false});
          this.setState({errrMsg:res.data.errmsg[0].msg});
          
        }
      });

  }

  render() {
    makeStyles(this.state.styles);
    let notifi;
    let photos;
    photos = this.state.TaskPhotov.map((photo,index) =>
      <div className="col-lg-4 col-md-6 col-sm-6" key={ index }>
        <img src={url1.apiURL+'/'+photo.url} alt="..." style={{ 'maxHeight': '200px', 'maxWidth': '200px'}} /><Button color="danger" round onClick={()=>this.deletePhotoO(index)}>Delete</Button>
      </div>
    )
    if(this.state.succes){
      notifi=<SnackbarContent message={'SUCCESS: '+this.state.succesMsg} close color="success"/>;
    }
    else if(this.state.errr){
      notifi=<SnackbarContent message={'Error: '+this.state.errrMsg} close color="danger"/>;
    }
    
    return (
        <div className="container-fluid" style={{paddingTop: '70px'}}>
        {notifi}<br/>
        <div className="row">
          <div className="col-lg-8 col-md-8 col-sm-12 offset-lg-2 offset-md-2">
            <Card>
                <h3 style={{color:'green',textAlign:'center',fontWeight:'bolder'}}>EDIT TASK</h3>
              <CardBody>
                  <small id="imageHelp" className="form-text text-muted">Add More Task Images</small>
                  <div style={{border:'2px solid black'}}>
                    <div className="form-group" style={{padding: '30px'}}>
                        <input type="file" className="form-control" id="exampleInputImage" aria-describedby="imageHelp" onChange={this.onChangeHandler}/>
                        <Progress max="100" color="success" value={this.state.loaded} >{Math.round(this.state.loaded,2) }%</Progress>
                        <Button color="success" round onClick={()=>this.onClickHandler()}>
                            Upload
                        </Button>
                        <hr/>
                        <div className="row" style={{padding: '30px'}}>
                       {photos}
                      </div>
                    </div>

                      
                  </div>

                  <div className="form-group">
                    <small id="nameHelp" className="form-text text-muted">Enter Task Name</small>
                    <input type="text" className="form-control" id="exampleInputName" aria-describedby="emailHelp" value={this.state.TaskNamev} placeholder={this.state.TaskNamev} onChange={this.handleName}/>
                  </div>

                  <div className="form-group">
                    <small id="labelsHelp" className="form-text text-muted">Enter labells in this format <b style={{color:'red'}}>Label Category1: lable1,lable2,lable3 + Label Category2: lable1,lable2,lable3 + Label Category3: lable1,lable2,lable3 <br/> (as many as you want like this format)</b></small>
                    <textarea type="textarea" className="form-control" id="exampleInputName" aria-describedby="emailHelp" value={this.state.TaskLabelsv} placeholder={this.state.TaskLabelsv} onChange={this.handleLabels}/>
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
                    value={this.state.TaskAssignedTov}
                    onChange={(value) => this.handleAssigned(value)}
                  />
                  </div><br/>

                  <div className="form-group">
                    <small id="nameHelp" className="form-text text-muted">Due Date</small>
                    <input type="date" className="form-control" id="exampleInputName" aria-describedby="emailHelp" value={this.state.TaskDatev} placeholder="Select Due Date" onChange={this.handleDate}/>
                  </div>

                  <Button disabled={this.state.buttonEnable} color="success" round onClick={this.makeTask}>
                      Create Task
                  </Button>
              </CardBody>
            </Card>
          </div>
        </div>       
      </div>
    );
  }
}


export default EditTask 