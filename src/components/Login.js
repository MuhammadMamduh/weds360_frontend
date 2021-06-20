import React from 'react';
import {Link} from 'react-router-dom';
import axios from '../apis/backend';

class Login extends React.Component{
  state = {email:"", password:"", token:""}

  loginRequest= async()=>{
    const response = await axios.post('/users/login',{
      email:this.state.email,
      password:this.state.password
    });

    console.log(response);
  }

   handleSubmit = async(event) =>{
    event.preventDefault();

    const response = await axios.post('/users/login',
      {      
        email:event.target.email.value,
        password:event.target.password.value
      }
    );
    
    console.log(response);

    this.setState({
      email:event.target.email.value,
      password:event.target.password.value,
      token:response.data.token
    })

    console.log(this.state);
  }

  render(){
    return  (
        <div className="container">
        <div className="row">
          <div className="col-md-5 mx-auto">
        <div id="first">
        <div className="myform form ">
          <div className="logo mb-3">
            <div className="col-md-12 text-center">
              <h1>Login</h1>
            </div>
          </div>
          <form action onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input type="email" name="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Password</label>
              <input type="password" name="password" id="password" className="form-control" aria-describedby="emailHelp" placeholder="Enter Password" />
            </div>
            <div className="form-group">
                <p className="text-center">
                  Don't have account? 
                  <Link to="/signup" id="signup"> Sign up here</Link>
                </p>
            </div>

            <div className="col-md-12 ">
                <div className="login-or">
                    <hr className="hr-or" />
                    <span className="span-or"></span>
                </div>
            </div>

            <div className="col-md-12 text-center ">
              <button type="submit" className=" btn btn-block mybtn btn-primary tx-tfm">Login</button>
            </div>
          </form>
        </div>
      </div>
      </div>
      </div>
      </div>
            );
}
}
export default Login;