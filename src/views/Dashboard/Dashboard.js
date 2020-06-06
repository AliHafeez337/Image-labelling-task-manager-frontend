import React from "react";

import axios from '../../axiosSet';
import TotalTasks from './DashboardComponents/totalTasks';
import PercentageTasks from './DashboardComponents/percentTasks';
import AssignedTasks from './DashboardComponents/assignedTasks';
import ArchivedTasks from './DashboardComponents/archivedTasks';
import TaskList from './DashboardComponents/detailedList';

import { saveAs } from 'file-saver';
// const FileSaver = require('../../assets/file-saver');

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
    // var blob = new Blob(["Hello, world!"], {type: "text/plain;charset=utf-8"});
    // saveAs(blob, "hello world.txt");
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
    console.log(task)
  }

  handleEditTask = (task) => {
    console.log(task)
  }

  handleArchiveTask = (task) => {
    var body = {...task}
    if (task.archived){
      // unarchive task
      body.archived = false
    } else {
      // arachive task
      body.archived = true
    }
    axios.patch('/task/update?id=' + task._id, body)
      .then(res => {
        if (res.data.msg){
          this.state.tasks.forEach((value, index) => {
            if (value._id === res.data.dat._id){
              var a = [...this.state.tasks]
              a[index] = res.data.dat
              this.setState({ tasks: a })
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

export default Dashboard
