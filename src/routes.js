/*!

=========================================================
* Material Dashboard React - v1.8.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Home from "@material-ui/icons/Home";
import Person from "@material-ui/icons/Person";
import Assignment from "@material-ui/icons/Assignment";
import PeopleIcon from '@material-ui/icons/People';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import EditIcon from '@material-ui/icons/Edit';

// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard";
import HomePage from "views/Dashboard/Home"
import UserProfile from "views/UserProfile/UserProfile";
import Task from 'views/Task/task';
import AddTask from 'views/Task/AddTask/addTask';
import UsersView from 'views/UserManagement/ViewList/UsersView';
import UsersAdd from 'views/UserManagement/Add/UserAdd';
import EditUser from 'views/UserManagement/Edit/EditUser';
import EditTask from 'views/Task/EditTask/editTask';
var adminDashboardRoutes=[];
if(localStorage.getItem('usertype')){
  var userTypeGet=localStorage.getItem('usertype');
  if(userTypeGet==='labeller'){
    adminDashboardRoutes = [
      {
        path: "/home",
        name: "Home",
        icon: Home,
        component: HomePage,
        layout: "/l"
      },
      {
        path: "/task",
        name: "Recent Task",
        icon: Assignment,
        component: Task,
        layout: "/l"
      },
      {
        path: "/user",
        name: "User Profile",
        icon: Person,
        component: UserProfile,
        layout: "/l"
      },
    ];
    
  }
  else if(userTypeGet==='admin'){
    adminDashboardRoutes = [
      {
        path: "/dashboard",
        name: "Dashboard",
        icon: Dashboard,
        component: DashboardPage,
        layout: "/l"
      },
      {
        path: "/addTask",
        name: "Add Task",
        icon: Assignment,
        component: AddTask,
        layout: "/l"
      },
      {
        path: "/user",
        name: "User Profile",
        icon: Person,
        component: UserProfile,
        layout: "/l"
      },
      {
        path: "/view/users",
        name: "Users List",
        icon: PeopleIcon,
        component: UsersView,
        layout: "/l"
      },
      {
        path: "/add/users",
        name: "Users Add",
        icon: PersonAddIcon,
        component: UsersAdd,
        layout: "/l"
      },
      {
        path: "/edit/user",
        name: "Edit User",
        icon: EditIcon,
        component: EditUser,
        layout: "/l"
      },
      {
        path: "/editTask/:id",
        name: "Edit Task",
        icon: EditIcon,
        component: EditTask,
        layout: "/l"
      }
    ];
    
  }
}


export default adminDashboardRoutes;
