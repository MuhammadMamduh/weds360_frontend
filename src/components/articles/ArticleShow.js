import React from 'react';
import axios from '../../apis/backend';
import moment from 'moment';
import {PencilIcon, XCircleIcon, StopwatchIcon} from '@primer/octicons-react';

class ArticleShow extends React.Component {

    state = {title:"", body:""}
    fetchArticle = async ()=>{
        const response = await axios.get('/articles/'+this.props.match.params.id);

        console.log(response.data);

        this.setState({
            title:response.data.title,
            body:response.data.body,
            date: response.data.createdAt
        });
    }

    componentDidMount(){
        this.fetchArticle();
        console.log(this.state.article);
    }
    
    render(){
        // if(!this.props.title){
        //     return <div>LOadInG ...</div>
        // }
        return  (
                    <div className="container">
                        <div className="row">
                        <div className="col-md-12 ">
                            <div className="login-or">
                                <hr className="hr-or" />
                                <span className="span-or"></span>
                            </div>
                        </div>
                            <div className="d-flex align-items-center justify-content-center">
                                <img src={`http://localhost:4000/article/${this.props.match.params.id}/image`} className="img-fluid" alt=""/>
                            </div>

                            <div className="col-md-12 ">
                                <div className="login-or">
                                    <hr className="hr-or" />
                                    <span className="span-or"></span>
                                </div>
                            </div>

                            <div className="d-flex align-items-center justify-content-center">
                            <div className="col-md-10">
                                <h4>{this.state.title}</h4>
                                <div className="d-flex justify-content-between">
                                    <small className="text-muted d-inline">
                                        {moment(this.state.date).calendar()} | By Author
                                    </small>
                                    <small><StopwatchIcon/> {moment(this.props.publicationDate).fromNow()}</small>
                                </div>
                                <br/>
                                {/* <p className="text-muted">{this.state.body}</p> */}
                                <div className="text-break ">
                                    {this.state.body}
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