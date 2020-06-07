import React from "react";
import { connect } from 'react-redux';

import axios from '../../axiosSet';
import MyTasks from './HomeComponents/taskList';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mytasks: null
    }
  }

  componentDidMount() {
    axios.get('/task/mine/')
      .then(res => {
        this.setState({ mytasks: res.data })
      })
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
    task: state.task
  }
}

const mapPropsToStore = dispatch => {
  return {
    onTaskSelect: (task) => dispatch({type: 'SETTASK', task})
  }
}

export default connect(mapStoreToProps, mapPropsToStore)(HomePage);