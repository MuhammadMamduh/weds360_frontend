import React from 'react';
import {Link} from 'react-router-dom';
import axios from '../apis/backend';
import AlertToast from './AlertToast';

class Login extends React.Component{
  state = {name:"", email:"", password:"", token:"null", errors:""}

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
    ).then((response) => {
      
      // console.log(response.status); // For Testing purposes

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
    }).catch(error=>{
      if (error.response) {
        this.setState({
          errors:error.response.data.msg
        })
        // console.log(error.response.data); // For Testing purposes
      }
    })
  }

  render(){
    return  (
              <div className="container">
                <div className="row">
                  <div className="col-md-6 mx-auto" style={{ backgroundColor:"#f8f9fa"}}>
                    <div id="first">
                      <div className="myform form ">
                        <div className="logo mb-3">
                          <div className="col-md-12 text-center">
                            <h1>Login</h1>
                          </div>
                        </div>
                        <form action onSubmit={this.handleSubmit}>
                          <div className="form-group needs-validation" noValidate>
                            <label htmlFor="email" className="form-label"><strong>Email</strong></label>
                            <input type="email" name="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" required/>
                            <br/>
                          </div>
                          
                          <div className="form-group">
                            <label htmlFor="exampleInputEmail1"><strong>Password</strong></label>
                            <input 
                              type="password" name="password" 
                              id="password" className="form-control" 
                              aria-describedby="emailHelp" placeholder="Enter Password" 
                              
                              pattern=".{7,15}"
                              required
                            />
                            <p className="text-muted d-inline">
                              <small><i>* [7, 15] chars </i></small>
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
                          <br/>
                        </form>
                        <div className="form-group">
                              <p className="text-center" style={{color:'red'}}>
                                {this.state.errors}
                              </p>
                              {/* <AlertToast
                                color="danger"
                                msg={this.state.errors===""?"":this.state.errors}
                                visible={this.state.errors===""?false:true}
                              /> */}
                        </div>

                      </div>
                  </div>
                </div>
              </div>
            </div>
            );
}
}
export default Login;