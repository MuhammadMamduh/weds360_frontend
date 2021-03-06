import React from 'react';
import {Link} from 'react-router-dom';
import axios from '../../apis/backend';

class SignUp extends React.Component {
    state = {name:"", email:"", password:"", token:"", errors:""}


    
       handleSubmit = async(event) =>{
        event.preventDefault();
        
        
        const response = await axios.post('/users',
          {      
            name:event.target.name.value,
            email:event.target.email.value,
            password:event.target.password.value
          }
        ).then((response)=>{
            // console.log(response); // testing purposes
    
            this.setState({
              name:response.data.newUser.name,
              email:response.data.newUser.email,
              password:response.data.newUser.password,
              token:response.data.token
            })
        
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('username', response.data.newUser.name);
            console.log(localStorage.getItem('token'));
            this.props.history.push('/');
            window.location.reload();
        }).catch((error)=>{
            if (error.response) {
                this.setState({
                  errors:error.response.data.msg
                })
                // console.log(error.response.data); // testing purposes
              }
        })
        

      }

render(){
    return  (
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 mx-auto" style={{ backgroundColor:"#f8f9fa"}}>

                            <div id="second">
                                <div className="myform form">
                                    <div className="logo mb-3">
                                        <div className="col-md-12 text-center">
                                            <h1>Signup</h1>
                                        </div>
                                    </div>
                                    <form action="#" name="registration" onSubmit={this.handleSubmit}>
                                        <div className="form-group">
                                            <label htmlFor="name"><strong>Name</strong></label>
                                            <input pattern=".{2,30}" type="text" name="name" className="form-control" id="name" aria-describedby="emailHelp" placeholder="Enter your Name" required/>
                                                <p className="text-muted d-inline">
                                                    <small><i>* [2, 30] chars </i></small>
                                                </p>
                                            <br/>
                                            <br/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="email"><strong>Email</strong></label>
                                            <input type="email" name="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" required/>
                                            <br/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="password"><strong>Password</strong></label>
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

export default SignUp;