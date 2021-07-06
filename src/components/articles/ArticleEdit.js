import React from 'react';
import {Link} from 'react-router-dom';
import axios from '../../apis/backend';
import { withRouter } from 'react-router';
import {PencilIcon, StopwatchIcon} from '@primer/octicons-react';
import moment from 'moment';
import Skeleton from 'react-loading-skeleton';
class ArticleEdit extends React.Component{
  state= {title:"",body:"", valid:true, errors:"", createdAt: new Date(), lastUpdated: new Date()};
  
  fetchArticle = async ()=>{
    const response = await axios.get('/articles/'+this.props.match.params.id);

    // console.log(response.data.body.length); // testing purposes
    if(response.data.body.length<100)
    {
      this.setState({
        valid: false
      })
    }
    this.setState({
        title:response.data.title,
        body:response.data.body,
        createdAt:response.data.createdAt,
        lastUpdated:response.data.updatedAt,
    });
}



componentDidMount(){
    this.fetchArticle();

    // window.location.reload();
}

  handleSubmit = async(event) =>{
    event.preventDefault();

    // let formData = new FormData();
    // formData.append('title', event.target.title.value);
    // formData.append('body', event.target.editor.value);
    // console.log(formData.title);
    // console.log(formData.body);

    const config = {     
        headers: { 'content-type': 'multipart/form-data' }
    }

    axios.defaults.headers.common['Authorization'] = "Bearer "+ localStorage.getItem('token');
    const response = await axios.put(`/article/update/`+this.props.match.params.id,{
      title: event.target.title.value,
      body: event.target.editor.value
    }).then((response)=>{
      this.props.history.push('/user/articles');
    }).catch((error)=>{
      if (error.response) {
        this.setState({
          errors:error.response.data.msg
        })
        // console.log(error.response.data); //testing purposes
      }
    })

    
  }

render(){
    return  (
        <div className="container">
          <div className="row">
          <div className="d-flex justify-content-between">
                                    <small className="text-muted d-inline">
                                        {moment(this.state.createdAt).calendar()}
                                    </small>
                                    <small><p className="text-muted d-inline"><StopwatchIcon/> Last Updated | {moment(this.state.lastUpdated).fromNow()}</p></small>
                                </div>
          <div className="col-md-12 ">
            <div className="col-md-5 mx-auto">
              <div className="text-center">
                <h1>Modify an Article</h1>
              </div>
            </div>
            <div className="login-or">
              <hr className="hr-or" />
              <span className="span-or"></span>
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-center">
              <img src={`${process.env.REACT_APP_BACKEND_API}/article/${this.props.match.params.id}/image`} className="img-fluid" alt=""/>
          </div>

          <div className="col-md-12 ">
              <div className="login-or">
                  <hr className="hr-or" />
                  <span className="span-or"></span>
              </div>
          </div>
          <form action method="post" name="publish" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="title"><strong>Title</strong></label>
              <input 
                type="text" value={this.state.title} name="title" 
                className="form-control" id="title" aria-describedby="Article Title" 
                placeholder="Article Title" 
                onChange={(e) => {this.setState({title: e.target.value})}}

                pattern=".{3,150}"
                required
              />
            </div>
            <p className="text-muted d-inline">
                <i>* Between 3 & 150 chars</i>
                <br/>
              </p>
            <br/>

            <div class="form-group">
              <label><strong>Body</strong></label>
              <div class="md-form amber-textarea active-amber-textarea-2">
                <textarea 
                  id="editor" 
                  class="md-textarea form-control" 
                  rows="10"
                  value={this.state.body}
                  onChange={(e) => {
                    this.setState({body: e.target.value})
                    if(e.target.value.length >99)
                    {
                      this.setState({valid:true});
                    }else{
                      this.setState({valid:false});
                    }
                  }}

                  pattern=".{100,5000}"
                  required
                >
                </textarea>
              </div>
              <p className="text-muted d-inline">
              <i>* Between 100 & 5000 chars</i>
              </p>
              <p className="text-muted d-inline">
              <br/>
                {/* * Between 100 & 1000 chars */}
              </p>
            </div>

            <div className="col-md-12 ">
                <div className="login-or">
                    <hr className="hr-or" />
                    <span className="span-or"></span>
                </div>
            </div>

            <div className="col-md-12 text-center">
              <button type="submit" className={`btn btn-outline-primary btn-lg ${this.state.valid?'':'disabled'}`}>Update</button>
            </div>
          </form>
          <br/>
          <div className="form-group">
              <p className="text-center" style={{color:'red'}}>
                {this.state.errors}
              </p>
          </div>
        </div>
        <br/>
      </div>

            );
}
}

export default ArticleEdit;