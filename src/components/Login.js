import React from 'react';
import {Link} from 'react-router-dom';
import axios from '../apis/backend';

class Login extends React.Component{
  state = {name:"", email:"", password:"", token:"null"}

  loginRequest= async()=>{
    const response = await axios.post('/users/login',{
      email:this.state.email,
      password:this.state.password
    });

    // console.log(response);
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
      name: response.data.user.name,
      email:response.data.user.email,
      password:response.data.user.password,
      token:response.data.token
    })

    localStorage.setItem('token', response.data.token);
    localStorage.setItem('username', response.data.user.name);
    // console.log(localStorage.getItem('token'));
    this.props.history.push('/user/articles');
    window.location.reload();
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
              <br/>
            </div>
            
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Password</label>
              <input 
                type="password" name="password" 
                id="password" className="form-control" 
                aria-describedby="emailHelp" placeholder="Enter Password" 
                
                pattern=".{7,15}"
                required
              />
              <p className="text-muted d-inline">
                <small>* [7, 15] chars </small>
              </p>
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