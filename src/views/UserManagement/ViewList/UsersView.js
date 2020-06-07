import React from 'react'

import axios from './../../../axiosSet';

import ListOfUsers from './Components/list';

class UsersView extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      users: null
    }
  }

  componentDidMount() {
    axios.get('/admin/user/all')
      .then(res => {
        if (res.data && ! res.errmsg){
          this.setState({ users: res.data})
        }
      })
  }

  handleEditUser = user => {
    console.log(user)
  }

  handleArchiveUser = user => {
    var body = {}
    if (user.archived){
      // unarchive user
      body.archived = false
    } else {
      // arachive user
      body.archived = true
    }
    axios.patch('/admin/update/' + user._id, body)
      .then(res => {
        if (res.data.msg){
          this.state.users.forEach((value, index) => {
            if (value._id === res.data.doc._id){
              var a = [...this.state.users]
              a[index] = res.data.doc
              this.setState({ users: a })
            }
          })
        }
      })
  }

  handleDeleteUser = user  => {
    var a = [...this.state.users]
    axios.delete('/admin/delete/' + user._id)
      .then(res => {
        if (res.data.msg){
          this.state.users.forEach((value, index) => {
            if (value._id === user._id){
              a.splice(index,1);
              this.setState({ users: a })
            }
          })
        }
      })
  }

  render() {
    return (
      <div>
        <ListOfUsers 
          users = { this.state.users }
          editUser = { this.handleEditUser }
          archiveUser = { this.handleArchiveUser}
          deleteUser = { this.handleDeleteUser }
        />
      </div>
    )
  }
}

export default UsersView;