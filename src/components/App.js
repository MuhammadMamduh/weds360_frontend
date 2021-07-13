import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

import Header from './Header';
import ArticleCreate from './articles/ArticleCreate';
import ArticleEdit from './articles/ArticleEdit';
import ArticleShow from './articles/ArticleShow';
import ArticleList from './articles/ArticleList';
import MyArticles from './articles/MyArticles';
import Login from '../components/authentication/Login';
import SignUp from '../components/authentication/SignUp';

class App extends React.Component{

    state={token:undefined};

    visibility = this.state.token===undefined?"invisible":"visible";
    
    

    render(){
            return (
                    <div className="container"> 
                        <BrowserRouter>
                            <div>
                            <Header/>
                                <Route path="/" exact component={ArticleList}/>
                                <Route path="/user/articles" exact component={MyArticles}/>
                                <Route path="/articles/new" exact component={ArticleCreate}/>
                                <Route path="/articles/edit/:id" exact component={ArticleEdit}/>
                                <Route path="/article/:id" exact component={ArticleShow}/>
                                <Route path="/login" exact component={Login}/>
                                <Route path="/signup" exact component={SignUp}/>
                            </div>
                        </BrowserRouter>
                    </div>
                );
            }
}

export default App;