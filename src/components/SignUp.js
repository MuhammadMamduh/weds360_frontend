import React from 'react';
import {Link} from 'react-router-dom';
import axios from '../apis/backend';

class SignUp extends React.Component {
    state = {name:"", email:"", password:"", token:""}


    
       handleSubmit = async(event) =>{
        event.preventDefault();
        
        
        const response = await axios.post('/users',
          {      
            name:event.target.name.value,
            email:event.target.email.value,
            password:event.target.password.value
          }
        );
        
        console.log(response);
    
        this.setState({
          name:event.target.name.value,
          email:event.target.email.value,
          password:event.target.password.value,
          token:response.data.token
        })
    
        localStorage.setItem('token', response.data.token);
        console.log(localStorage.getItem('token'));
        this.props.history.push('/');
        window.location.reload();
      }

render(){
    return  (
                <div className="container">
                <div className="row">
                <div className="col-md-5 mx-auto">

                    <div id="second">
                    <div className="myform form">
                        <div className="logo mb-3">
                        <div className="col-md-12 text-center">
                        <h1>Signup</h1>
                        </div>
                        </div>
                        <form action="#" name="registration" onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Name</label>
                                <input type="text" name="name" className="form-control" id="name" aria-describedby="emailHelp" placeholder="Enter your Name" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Email address</label>
                                <input type="email" name="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" />
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
                            <div className="col-md-12 ">
                                <div className="form-group">
                                    <p className="text-center">
                                        Already have an account?
                                        <Link to="/login" id="login"> Login here</Link>
                                    </p>
                                </div>
                            </div>
                            
                            <div className="col-md-12 ">
                                <div className="login-or">
                                    <hr className="hr-or" />
                                    <span className="span-or"></span>
                                </div>
                            </div>

                            <div className="col-md-12 text-center mb-3">
                                <button type="submit" className=" btn btn-block mybtn btn-primary tx-tfm">Sign Up</button>
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

export default SignUp;