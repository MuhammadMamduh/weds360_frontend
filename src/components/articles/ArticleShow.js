import React from 'react';
import axios from '../../apis/backend';
import moment from 'moment';
import {PencilIcon, StopwatchIcon} from '@primer/octicons-react';
import Skeleton from 'react-loading-skeleton';


class ArticleShow extends React.Component {

    state = {id: "", title:"", body:"", createdAt: new Date(), lastUpdated: new Date(), author:{}}
    fetchArticle = async ()=>{
        const response = await axios.get('/articles/'+this.props.match.params.id);

        console.log(response.data);

        this.setState({
            id: response.data._id,
            title:response.data.title,
            body:response.data.body,
            createdAt: response.data.createdAt,
            lastUpdated: response.data.updatedAt,
            author: response.data.author
        });
    }

    componentDidMount(){
        this.fetchArticle();
        console.log(this.state.article);
    }
    
    renderImage(){
        if(this.state.id) {
            return(<img src={`${process.env.REACT_APP_BACKEND_API}/article/${this.state.id}/image`} className="img-fluid" alt=""/>);
        }
        return(<Skeleton height={400} width={500}/>);
    }

    render(){
        return  (
                    <div className="container">
                        <div className="row">
                        <h4>{this.state.title||<Skeleton width="81%"/>}</h4>
                                <div className="d-flex justify-content-between">
                                    <small className="text-muted d-inline">
                                        {moment(this.state.createdAt).calendar()} | By {this.state.author.name || <Skeleton/>}
                                    </small>
                                    <small><p className="text-muted d-inline"><StopwatchIcon/> Last Updated | {moment(this.state.lastUpdated).fromNow()}</p></small>
                                </div>
                                <br/>
                        <div className="col-md-12 ">
                            <div className="login-or">
                                <hr className="hr-or" />
                                <span className="span-or"></span>
                            </div>
                        </div>
                            <div className="d-flex align-items-center justify-content-center">
                                {this.renderImage()}
                            </div>

                            <div className="col-md-12 ">
                                <div className="login-or">
                                    <hr className="hr-or" />
                                    <span className="span-or"></span>
                                </div>
                            </div>

                            <div className="d-flex align-items-center justify-content-center">
                            <div className="col-md-10">

                                {/* <p className="text-muted">{this.state.body}</p> */}
                                <div className="text-break ">
                                    {this.state.body||<Skeleton count={10}/>}
                                </div>
                            </div>
                            </div>

                            <div className="col-md-12 ">
                                <div className="login-or">
                                    <hr className="hr-or" />
                                    <span className="span-or"></span>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                );
}
}
export default ArticleShow;