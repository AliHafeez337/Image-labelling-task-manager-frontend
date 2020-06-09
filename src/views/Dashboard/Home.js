import React from "react";
import { connect } from 'react-redux';

import axios from '../../axiosSet';
import MyTasks from './HomeComponents/taskList';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myOriginalTasks: null,
      mytasks: null
    }
  }

  componentDidMount() {
    console.log(this.props.search)
    axios.get('/task/mine/')
      .then(res => {
        this.setState({ myOriginalTasks: res.data, mytasks: res.data })
      })
  }

  componentDidUpdate() {
    console.log('COMPONENT UPDATED')
    // console.log(this.props.search)

    var result = [], match = new RegExp(this.props.search, 'gi')
    
    if (this.state.myOriginalTasks){
      this.state.myOriginalTasks.forEach(task => {
        if (task.name.search(match) > -1){
          result.push(task)
        }
      })
    }
    
    if (this.state.mytasks){
      if (result.length !== this.state.mytasks.length){
        // console.log(result, 'not equal')
        this.setState({ mytasks: result })
      }
    }

    return true
  }

  handleRowSelect = (value, index) => {
    console.log(value, index)
    this.props.onTaskSelect(value)
    this.props.history.push({
      pathname: '/l/task',
      search: '?query=abc',
      state: { task: value }
    })
  }

  render() {
    return (
      <div>
        <MyTasks
          tasks = { this.state.mytasks }
          select = { this.handleRowSelect }
          selected = { this.props.task }
        />
      </div>
    );
  }
}

const mapStoreToProps = state => {
  return {
    task: state.task,
    search: state.search
  }
}

const mapPropsToStore = dispatch => {
  return {
    onTaskSelect: (task) => dispatch({type: 'SETTASK', task})
  }
}

export default connect(mapStoreToProps, mapPropsToStore)(HomePage);