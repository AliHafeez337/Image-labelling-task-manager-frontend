import React from "react";

import axios from '../../axiosSet';
import TotalTasks from './DashboardComponents/totalTasks';
import PercentageTasks from './DashboardComponents/percentTasks';
import AssignedTasks from './DashboardComponents/assignedTasks';
import ArchivedTasks from './DashboardComponents/archivedTasks';

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
    }
  }

  componentDidMount() {
    axios.get('/dashboard/admin')
      .then(res => {
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
            
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard
