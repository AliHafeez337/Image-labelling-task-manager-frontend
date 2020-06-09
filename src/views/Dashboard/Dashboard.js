import React from "react";

import { connect } from 'react-redux';

import { saveAs } from 'file-saver';

import axios from '../../axiosSet';
import TotalTasks from './DashboardComponents/totalTasks';
import PercentageTasks from './DashboardComponents/percentTasks';
import AssignedTasks from './DashboardComponents/assignedTasks';
import ArchivedTasks from './DashboardComponents/archivedTasks';
import TaskList from './DashboardComponents/detailedList';

class Dashboard extends React.Component {
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
      tasks: null,
      overAllPercentCompletion: null,
      totalLabels: null,
      doneLabels: null,
      assignedTasks: null,
      archivedTasks: null,
      labellersData: [],
      allLabellers: [],
    }
  }

  componentDidMount() {
    axios.get('/dashboard/admin')
      .then(res => {
        if (res.data.length > 0){
          var totalLabels = 0
          var doneLabels = 0
          var assignedTasks = 0
          var archivedTasks = 0
          res.data.forEach(task => {
            if (task.assignedTo.length > 0){
              assignedTasks ++
              task.labels.forEach(label => {
                totalLabels ++
                if (label.done){
                  doneLabels ++
                }
              })
            }
            if (task.archived){
              archivedTasks ++
            }
          })
          this.setState({ 
            tasks: res.data,
            overAllPercentCompletion: Math.round((doneLabels / totalLabels) * 100).toFixed(0),
            totalLabels,
            doneLabels,
            assignedTasks,
            archivedTasks
          })

          // Getting each labellers data
          
          res.data.forEach((task, index) => {
            // let a = []
            task.assignedTo.forEach(labeller =>{
              let b = {}
              axios.get('/admin/' + labeller)
                .then(res => {
                  if (res.data){
                    b = {...res.data}
                  
                    // how many labels this labeller has done for this task
                    axios.get('/label/labeller/' + labeller + '/task/' + task._id)
                      .then(res => {
                        var d = [...this.state.allLabellers]
                        // if (res.data.length > 0){
                          // var f = []
                          // res.data.forEach(label => f.push(label))
                          // console.log(f)
                          b.labels = res.data
                          b.task = task._id
                          // console.log(b)
                          // a.push(b)
                          d.push(b)
                        // }
                        this.setState({ allLabellers: d })
                        // console.log(this.state.allLabellers, this.state.allLabellersId)
                      })
                  }
                })
            })
            // console.log(this.state.tasks)
            // var c = [...this.state.labellersData]
            // c.push(a)
            // this.setState({ labellersData: c })
            // console.log(c)

            // var c = [...this.state.tasks]
            // c[index].labellers = a
            // c.forEach(task => {
            //   if (task.labellers){
            //     console.log(task.labellers.length)
            //   }
            // })
          })
        }
      })
  }

  handleDownloadTask = (task) => {
    // console.log(task, this.state.allLabellers)
    var mainObj = {...task}
    mainObj.assignedTo = []
    task.assignedTo.forEach(labellerId => {
      this.state.allLabellers.forEach(labeller => {
        if (labellerId === labeller._id){
          delete labeller.archived
          delete labeller.createdAt
          delete labeller.usertype
          delete labeller.task
          labeller.labels.forEach((label, index) => {
            var thisLabel = {...label}
            delete thisLabel['@context']
            delete thisLabel.id
            delete thisLabel.label
            delete thisLabel.labeller
            delete thisLabel.picture
            delete thisLabel.target
            delete thisLabel.task
            delete thisLabel.type
            task.labels.forEach(l => {
              if (l._id === label.label){
                thisLabel.category = l.category
                thisLabel.labelled = l.done
                thisLabel.name = l.name
                thisLabel._id = l._id
              }
            })
            labeller.labels[index] = thisLabel
            task.photos.forEach(photo => {
              if (photo._id === label.picture){
                thisLabel.photo = photo.url
              }
            })
          })
          mainObj.assignedTo.push(labeller)
        }
      })
    })
    delete mainObj.labels
    delete mainObj.photos
    // console.log(mainObj)
    var blob = new Blob([JSON.stringify(mainObj, undefined, 4)], {type: "text/plain;charset=utf-8"});
    // var blob = new Blob([JSON.stringify(mainObj, undefined, 4)], {type: "application/json"});
    saveAs(blob, task.name);
  }

  handleEditTask = (task) => {
    console.log(task)
    this.props.history.push('/editTask/'+task._id);
  }

  handleArchiveTask = (task) => {
    var body = {...task}, b = this.state.archivedTasks
    if (task.archived){
      // unarchive task
      body.archived = false
      b--
    } else {
      // arachive task
      body.archived = true
      b++
    }
    axios.patch('/task/update?id=' + task._id, body)
      .then(res => {
        if (res.data.msg){
          this.state.tasks.forEach((value, index) => {
            if (value._id === res.data.dat._id){
              var a = [...this.state.tasks]
              a[index] = res.data.dat
              this.setState({ tasks: a, archivedTasks: b })
            }
          })
        }
      })
  }

  handleDeleteTask = (task) => {
    axios.delete('/task/delete/' + task._id)
      .then(res => {
        if (res.data){
          this.state.tasks.forEach((value, index) => {
            if (value._id === res.data._id){
              var a = [...this.state.tasks]
              a.splice(index,1);
              this.setState({ tasks: a })
            }
          })
        }
      })
  }

  render() {
    return (
      <div>
        <p>{ this.props.search }</p>
        <div className="row">
          <div className="col-lg-3 col-md-4 col-sm-6">
            <TotalTasks
              tasks = { this.state.tasks ? this.state.tasks.length : 0 }
            />
          </div>
          <div className="col-lg-3 col-md-4 col-sm-6">
            <PercentageTasks 
              overAllPercentCompletion = { this.state.overAllPercentCompletion }
            />
          </div>
          <div className="col-lg-3 col-md-4 col-sm-6">
            <AssignedTasks 
              assigned = { this.state.assignedTasks }
            />
          </div>
          <div className="col-lg-3 col-md-4 col-sm-6">
            <ArchivedTasks 
              archived = { this.state.archivedTasks }
            />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 col-md-12">
            <TaskList 
              tasks = { this.state.tasks }
              // labellers = { this.state.labellersData }
              labellers = { this.state.allLabellers }
              downloadTask = { this.handleDownloadTask }
              editTask = { this.handleEditTask }
              archiveTask = { this.handleArchiveTask }
              deleteTask = { this.handleDeleteTask }
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStoreToProps = state => {
  return {
    search: state.search
  }
}

export default connect(mapStoreToProps, null)(Dashboard)
