import React from 'react';
import {Link} from 'react-router-dom';
import axios from '../../apis/backend';
import { withRouter } from 'react-router';


class ArticleCreate extends React.Component{
  state= {title:"", image:null, body:""};
  

  handleSubmit = async(event) =>{
    event.preventDefault();

    console.log(event.target);
    console.log(event.target.title.value);
    console.log(event.target.caption.files[0]);  
    console.log(event.target.editor.value);


    let formData = new FormData();    //formdata object

    formData.append('title', event.target.title.value);   //append the values with key, value pair
    formData.append('caption', event.target.caption.files[0], event.target.caption.files[0].name);
    formData.append('body', event.target.editor.value);

    const config = {     
        headers: { 'content-type': 'multipart/form-data' }
    }

    axios.defaults.headers.common['Authorization'] = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGNiOGJiN2EzZDI3NzlmNDk0Y2VkYTMiLCJpYXQiOjE2MjQxNDI2Mjh9.QtL1gAYl1KJzxGEEykwSOOdHZ7yJ5AZbUFiQ6RsGWXw";
    const response = await axios.post('/articles',formData, config)
    console.log(response);

    this.props.history.push('/');
  }

render(){
    return  (
        <div className="container">
        <div className="row">
          <div className="col-md-5 mx-auto">
        <div id="first">

              <h1>Publish an Article</h1>
            </div>
          </div>
          <form action="/" method="post" name="publish" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Title</label>
              
              <input 
                type="text" name="title" 
                className="form-control" 
                id="title" aria-describedby="Article Title" 
                placeholder="Article Title" 

                pattern=".{3,90}"
                required
              />
              <p className="text-muted d-inline">
                <br/>
                * Between 3 & 90 chars
              </p>
            </div>

            <br/>
            <div className="form-group">
                <label className="form-label" htmlFor="customFile">Upload a Caption (image)</label>
                <input 
                  type="file" className="form-control" 
                  name="caption" id="caption" 
                  required
                />
            </div>

            <br/>
            <div class="form-group">
              <label>Body</label>
              <div class="md-form amber-textarea active-amber-textarea-2">
                <textarea 
                  id="editor" 
                  class="md-textarea form-control" 
                  rows="10"
                  value={this.state.body}
                  onChange={(e) => {this.setState({body: e.target.value})}}

                  pattern=".{100,1000}"
                  required
                >
                </textarea>
              </div>
              <p className="text-muted d-inline">
              <br/>
                * Between 100 & 1000 chars
              </p>
            </div>

            <div className="col-md-12 ">
                <div className="login-or">
                    <hr className="hr-or" />
                    <span className="span-or"></span>
                </div>
            </div>

            <div className="col-md-12 text-center ">
              <button type="submit" className="btn btn-outline-secondary btn-lg">Publish</button>
            </div>
            
          </form>
         
        </div>
        <br/>
      </div>

            );
}
}

export default ArticleCreate;