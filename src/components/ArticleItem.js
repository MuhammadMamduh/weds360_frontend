import React from 'react';
import moment from 'moment';
import {Link} from 'react-router-dom';
import {PencilIcon, XCircleIcon, StopwatchIcon} from '@primer/octicons-react';
import axios from '../apis/backend';
import Spinner from './Spinner';
import Skeleton from 'react-loading-skeleton';
import { MdDeleteForever } from "react-icons/md";
import { ImPencil } from "react-icons/im";

class ArticleItem extends React.Component {
    state = {articleId: "", title:"", body:"", auhor:""}

    componentWillMount() {
        this.setState({
            articleId:this.props.articleId, 
            title:this.props.title, 
            body:this.props.body, 
            author:this.props.author.name});
    }
    linkHelper = ()=>{
        if(this.props.modifiable) {
            return (
                <div className="d-inline">
                    <p className="text-muted d-inline">
                        <Link to={`/articles/edit/${this.props.articleId}`} style={{ textDecoration: 'none' }}>
                            <ImPencil/>
                            <span className="glyphicon glyphicon-pencil"> Edit </span>
                        </Link>
                    </p>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <p className="text-muted d-inline">
                        <Link to="#" style={{ textDecoration: 'none', color:'red'}}>
                            <span className="glyphicon glyphicon-pencil"> 
                                <button type="submit" className="btn btn-link" style={{ textDecoration: 'none', color:'red'}} onClick={this.deleteArticle}>Delete</button> 
                                <MdDeleteForever/>
                            </span>
                            
                        </Link>
                    </p>
                </div>
            )
        }
    }

    deleteArticle = async ()=>{
        axios.defaults.headers.common['Authorization'] = "Bearer "+ localStorage.getItem('token');
        const response = await axios.delete('/article/delete/'+this.props.articleId);
    
        window.location.reload();
    }

    // renderHelper = ()=>{
    //     if
    // }
    render() {
        // return();
        return  (
            <div className="row">
                <div className="col-sm-4">
                    <Link to={`/article/${this.props.articleId}`} className="">
                        {/* {this.state.articleId===""?<Spinner/>:""} */}
                        <img length="370" width="300" src={`${process.env.REACT_APP_BACKEND_API}/article/${this.props.articleId}/image`} alt={this.props.title} className="img-thumbnail"/>
                    </Link>
                </div>
                <div className="col-sm-8 d-flex flex-column">
                    <h4 className="text-break" style={{maxWidth:"75%", maxHeight: '85px', overflow: 'hidden',  textDecoration: 'none'}}>
                        <Link to={`/article/${this.props.articleId}`} style={{ textDecoration: 'none', color:'black' }}>
                            {this.props.title || <Skeleton/>}
                        </Link>
                    </h4>
                    
                    <div className="d-flex justify-content-between">
                        <p className="text-muted d-inline">
                            <u>{moment(this.props.publicationDate).calendar()}</u>
                        </p>

                        {this.linkHelper()} 
                        <small><p className="text-muted d-inline"><StopwatchIcon/> Last Updated | {moment(this.props.lastUpdated).fromNow()}</p></small>
                    </div>

                    <div className="text-break" style={{ overflow: 'hidden', maxHeight: '95px'}}>
                        {this.props.body || <Skeleton/>}
                    </div>
                    <div className="mt-auto">
                        <p className="text-muted">
                            <u>Written by</u> 
                            <i><Link to="#" style={{ textDecoration: 'none'}}> {this.props.author.name}</Link></i>
                        </p>
                        <hr />
                    </div>
                    
                </div>
                
            </div>
                );
    }
}

export default ArticleItem;