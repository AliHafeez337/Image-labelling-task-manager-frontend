import React, {Component} from "react";
import { Link } from 'react-router-dom'
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import avatar from "assets/img/faces/marc1.jpg";

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
      }
    };
  }

  render() {
    makeStyles(this.state.styles);
    return (
      <div className="container-fluid" style={{paddingTop: '70px'}}>
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-12 offset-lg-3 offset-md-3">
            <Card profile>
              <CardAvatar profile>
                <img src={avatar} alt="..." />
              </CardAvatar>
              <CardBody profile>
                  <div class="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                  </div>
                  <div class="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password"/>
                  </div>
                  <Button color="primary" round>
                      Login
                  </Button>
                  <small id="emailHelp" class="form-text text-muted">Dont have an account ! SingUp here.</small>
                  <Button color="success" round component={Link} to="/signup">
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
export default Login