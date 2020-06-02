import React, {Component} from "react";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import SnackbarContent from "components/Snackbar/SnackbarContent.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import avatar from "assets/img/faces/marc1.jpg";
import axios from '../../axiosSet';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      styles : {
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
      email:'',
      password:'',
      succes:false,
      succesMsg:'',
      errr:false,
      errrMsg:''
    };
  }

  componentDidMount() {
    if(localStorage.getItem('token')){
      console.log('Token found.')
      this.props.history.push('/admin/dashboard')
    }
  }
  
  data={email:'',password:''}
  handleEmail = event => {
    this.data.email= event.target.value;
  }
  handlePassword1 = event => {
    this.data.password= event.target.value;
  }
  loginMethod=()=> {
    console.log(window.location.href)
    this.setState({
      email:this.data.email,
      password:this.data.password,
    },()=>{
      const user = {email:this.state.email,password:this.state.password};
      console.log(user);
      axios.post('/user/login', user)
      .then(res => {
        // console.log(res.data);
        if(res.data.msg){
          this.setState({errr:false});
          this.setState({succes:true});
          this.setState({succesMsg:res.data.msg});
          localStorage.setItem("token",res.data.token);
          localStorage.setItem("useId",res.data.user._id);
          localStorage.setItem("name",res.data.user.name);
          localStorage.setItem("email",res.data.user.email);
          localStorage.setItem("archived",res.data.user.archived);
          localStorage.setItem("usertype",res.data.user.usertype);
          this.props.onTokenGet(res.data.token)
          setTimeout(() => {
            this.props.history.push(`/admin/dashboard`)
          }, 500)
        }
        else if(res.data.errmsg){
          this.setState({errr:true});
          this.setState({succes:false});
          this.setState({errrMsg:res.data.errmsg});
        }
      });
    });
  }
  render() {
    makeStyles(this.state.styles);
    let notifi;
    if(this.state.succes){
      notifi=<SnackbarContent message={'SUCCESS: '+this.state.succesMsg} close color="success"/>;
    }else if(this.state.errr){
      notifi=<SnackbarContent message={'Error: '+this.state.errrMsg} close color="danger"/>;
    }
    return (
      <div className="container-fluid" style={{paddingTop: '70px'}}>
        {notifi}<br/>
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-12 offset-lg-3 offset-md-3">
            <Card profile>
              <CardAvatar profile>
                <img src={avatar} alt="..." />
              </CardAvatar>
              <CardBody profile>
                  <div className="form-group">
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" onChange={this.handleEmail}/>
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                  </div>
                  <div className="form-group">
                    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" onChange={this.handlePassword1}/>
                  </div>
                  <Button color="success" round onClick={this.loginMethod}>
                      Login
                  </Button>
                  <small id="emailHelp" className="form-text text-muted">Dont have an account? SingUp here.</small>
                  <Button color="primary" round component={Link} to="/signup">
                      SignUp
                  </Button>             
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

// const mapStoreToProps = state => {
//   return {
//     token
//   }
// }

const mapPropsToDispatch = dispatch => {
  return {
    onTokenGet: (token) => dispatch({type: 'SETTOKEN', token})
  }
}

export default connect(null, mapPropsToDispatch)(Login)
