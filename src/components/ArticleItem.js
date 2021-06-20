import React from 'react';
import moment from 'moment';
import {Link} from 'react-router-dom';
import {PencilIcon, XCircleIcon, StopwatchIcon} from '@primer/octicons-react';
import axios from '../apis/backend';

class ArticleItem extends React.Component {

    linkHelper = ()=>{
        if(this.props.modifiable) {
            return (
                <div className="d-inline">
                    <p className="text-muted d-inline">
                        <Link to={`/articles/edit/${this.props.articleId}`} style={{ textDecoration: 'none' }}>
                            <PencilIcon/>
                            <span className="glyphicon glyphicon-pencil"> Edit </span>
                        </Link>
                    </p>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <p className="text-muted d-inline">
                        <Link to="#" style={{ textDecoration: 'none' }}>
                            <span className="glyphicon glyphicon-pencil"> 
                                <button type="submit" className="btn btn-link" onClick={this.deleteArticle}>Delete</button> 
                            </span>
                            <XCircleIcon/>
                        </Link>
                    </p>
                </div>
            )
        }
    }

    deleteArticle = async ()=>{
        axios.defaults.headers.common['Authorization'] = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGNiOGJiN2EzZDI3NzlmNDk0Y2VkYTMiLCJpYXQiOjE2MjQxNDI2Mjh9.QtL1gAYl1KJzxGEEykwSOOdHZ7yJ5AZbUFiQ6RsGWXw";
        const response = await axios.delete('/article/delete/'+this.props.articleId);
      
        window.location.reload();
      }

    render() {
        return  (
            <div className="row">
                <div className="col-sm-4">
                    <Link to="#" className="">
                        <img src={`http://localhost:4000/article/${this.props.articleId}/image`} alt="rand" className="img-thumbnail"/>
                    </Link>
                </div>
                <div className="col-sm-8  d-flex flex-column">
                    <h4 className="text-break" style={{maxWidth:"75%", maxHeight: '85px', overflow: 'hidden'}}>
                        <Link to={`/article/${this.props.articleId}`}>
                            {this.props.title}
                        </Link>
                    </h4>
                    
                    <div className="d-flex justify-content-between">
                        <p className="text-muted d-inline">
                            {moment(this.props.publicationDate).calendar()}
                        </p>

                        {this.linkHelper()}
                        <small><StopwatchIcon/> {moment(this.props.publicationDate).fromNow()}</small>
                    </div>

                    <div className="text-break" style={{ overflow: 'hidden', maxHeight: '125px'}}>
                        {this.props.body}
                    </div>
                    <div className="mt-auto">
                        <p className="text-muted">
                            Presented by 
                            <Link to="#"> {this.props.publicationDate}</Link>
                        </p>
                        <hr />
                    </div>
                    
                </div>
                
            </div>
                );
    }
}

export default ArticleItem;