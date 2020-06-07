import React from 'react'

import axios from './../../../axiosSet';

class UsersAdd extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      user: null
    }
  }

  componentDidMount() {
  }

  handleEditUser = user => {
    console.log(user)
  }

  render() {
    return (
      <div>
      </div>
    )
  }
}

export default UsersAdd;