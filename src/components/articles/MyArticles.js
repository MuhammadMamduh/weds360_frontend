import React from 'react';
import ArticleItem from '../ArticleItem';
import axios from '../../apis/backend';
import moment from 'moment';
import {Link} from 'react-router-dom';
import Spinner from '../Spinner';
import Skeleton from 'react-loading-skeleton';
import { ImQuill, ImEnvelop } from "react-icons/im";
class MyArticles extends React.Component {
    state = {articles: [], selectedArticle: null, author:""}; // state & its initialization

    componentDidMount () {
        this.fetchArticles();
    }

    // API call
    fetchArticles = async ()=>{

        axios.defaults.headers.common['Authorization'] = "Bearer "+ localStorage.getItem('token');
        const response = await axios.get('/user/articles');

        // set (update) state with API response
        this.setState(
            {
                articles: response.data.articles,
                author: response.data.user,
                selectedArticle: response.data.articles[0]
            }
        );

        // console.log(this.state.articles);
    }

    renderLoadingState(){
        if(this.state.author && this.state.articles.length===0) {
            return  (
                        <div className="container" align="center">
                            <h1>You haven't published any articles yet</h1>
                        </div>
                    );
        }
        else if(this.state.articles.length===0) {
            return  (
                        <div className="container" align="center">
                            <Spinner
                                klass="spinner-border text-muted" 
                            />
                            <h1>Loading ...</h1>
                        </div>
                    );
        }}

    renderList(){
        return this.state.articles.map((article)=>{
            return  (
                        <ArticleItem
                            title={article.title}
                            body={article.body}
                            author={this.state.author}
                            publicationDate={article.createdAt}
                            lastUpdated={article.updatedAt}
                            articleId={article._id}
                            key={article._id}
                            modifiable={true}
                        />
                    );
        })
    }
    render(){
            return  (
                        <div className="container">
                            <div className="card mt-5 border-5 pt-2 active pb-0 px-3">
                                <div className="card-body ">
                                    <div className="row">
                                        <div className="col-12 ">
                                        <h4 className="card-title ">
                                            <img src="https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png" alt="DP" className=" rounded-circle img-fluid " width={35} height={35} /> 
                                            <b> Your Articles</b> 
                                        </h4>
                                        <hr/>
                                        </div>
                                        <div className="col">
                                        <h6 className="card-subtitle mb-2 text-muted">
                                            <p className="card-text text-muted small "> 
                                                <ImQuill/>&nbsp;&nbsp;
                                                <span className="vl mr-2 ml-0" />Created By &nbsp;&nbsp;&nbsp;|  
                                                <span className="font-weight-bold"> {this.state.author.name||<Spinner klass="spinner-grow spinner-grow-sm"/>}</span>
                                                <br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Joined Since | {moment(this.state.author.createdAt).fromNow()}
                                            </p>
                                        </h6>
                                        </div>
                                    </div>
                                    <div className="card-footer bg-white px-0 ">
                                    <div className="row">
                                        <div className=" col-md-auto "> 
                                            <i className="mdi mdi-settings-outline" /> 
                                            <Link href="#" className="btn-outlined btn-black text-muted" style={{textDecoration: 'none'}}>
                                                <ImEnvelop/>
                                                &nbsp;<small> {this.state.author.email||<Spinner klass="spinner-grow spinner-grow-sm"/>}</small> 
                                            </Link> 
                                            <span className="vl ml-3" /> 
                                        </div>
                                    </div>
                                </div>
                                </div>

                            </div>
                            <br/>
                            {this.renderLoadingState()}
                            {/* {this.renderEmptyState()} */}
                            {this.renderList()}
                        </div>
                    );
            }
}

export default MyArticles;