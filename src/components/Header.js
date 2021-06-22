import React from 'react';
import {Link} from 'react-router-dom';
import axios from '../apis/backend';
import { withRouter } from 'react-router';

class Header extends React.Component {

    state = {token: localStorage.getItem('token'), username: localStorage.getItem('username')}


    componentDidMount(){
        console.log("From componentDidMount: ");
        // console.log(this.state.token);
    }
    logoutHelper = async(e)=>{

        console.log(this.state.token)
        // 1
        axios.defaults.headers.common['Authorization'] = "Bearer "+ localStorage.getItem('token');
        const response = await axios.post('/users/logout');

        // 2
        localStorage.removeItem('token');
        localStorage.removeItem('username');

        // 3
        this.setState({
            token: "",
            username: ""
        })

        // 4
        window.location.reload();
    }

    render(){
    return  (
                <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <Link className="navbar-brand" to="/">
                        <img alt="logo" src="https://cdn.logojoy.com/wp-content/uploads/2018/05/30164225/572-768x591.png" width={64} height={50} className="d-inline-block align-top" alt />
                        
                    </Link>

                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="active">
                                <Link className="nav-link" style={{color:"black", fontWeight: "bolder",fontSize: "large"}} to="/">Articulate <span className="sr-only"></span></Link>
                            </li>
                            <li className={`nav-item ${this.state.token===null?'invisible':'visible}'}`}>
                                <Link className="nav-link" to="/">Home <span className="sr-only"></span></Link>
                            </li>

                            <li className={`nav-item ${this.state.token===null?'invisible':'visible}'}`}>
                                <Link className="nav-link" to="/articles/new">Publish Article</Link>
                            </li>

                            <li className={`nav-item ${this.state.token===null?'invisible':'visible}'}`}>
                                <Link className="nav-link" to="/user/articles">My Articles</Link>
                            </li>
                            <li className={`nav-item ${this.state.token===null?'invisible':'visible}'}`}>
                                <Link className="nav-link" to="/user/articles">My Articles</Link>
                            </li>
                            <li className={`nav-item ${this.state.username===null?'invisible':'visible}'}`}>
                                <Link className="nav-link" to="#" style={{textDecoration:'none', color:'black'}}> | {this.state.username}</Link>
                            </li>
                        </ul>
                    </div>
                    <ul className="nav navbar-nav navbar-right">
                        <li>
                            <Link className={`nav-link ${this.state.token===null?'visible':'invisible'}`} to="/login">
                                <button 
                                className="btn btn-outline-secondary" 
                                type="submit">
                                    Login
                                </button>
                            </Link>
                        </li>
                        <li>
                            <Link className={`nav-link ${this.state.token===null?'visible':'invisible'}`} to="/signup">
                                <button 
                                    className="btn btn-outline-primary my-2 my-sm-0" 
                                    type="submit">
                                    Sign Up
                                </button>
                            </Link>
                        </li>
                        <li>
                            <Link className={`nav-link ${this.state.token===null?'invisible':'visible'}`} to="/">
                                <button 
                                    onClick={this.logoutHelper}
                                    className="btn btn-outline-danger my-2 my-sm-0" 
                                    type="submit">
                                    Logout
                                </button>
                            </Link>
                        </li>
                    </ul>
                </nav>

                <div className="col-md-12 ">
                <div className="login-or">
                    <hr className="hr-or" />
                    <span className="span-or"></span>
                </div>
            </div>
                </div>
            );
}}

export default Header;