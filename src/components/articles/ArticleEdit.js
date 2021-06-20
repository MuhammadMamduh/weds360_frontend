import React from 'react';
import {Link} from 'react-router-dom';
import axios from '../../apis/backend';

class ArticleEdit extends React.Component{
  state= {title:"",body:""};
  
  fetchArticle = async ()=>{
    const response = await axios.get('/articles/'+this.props.match.params.id);

    console.log(response.data);

    this.setState({
        title:response.data.title,
        body:response.data.body,
    });
}



componentDidMount(){
    this.fetchArticle();
    console.log(this.state.article);

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

    axios.defaults.headers.common['Authorization'] = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGNiOGJiN2EzZDI3NzlmNDk0Y2VkYTMiLCJpYXQiOjE2MjQxNDI2Mjh9.QtL1gAYl1KJzxGEEykwSOOdHZ7yJ5AZbUFiQ6RsGWXw";
    const response = await axios.put(`/article/update/`+this.props.match.params.id,{
      title: event.target.title.value,
      body: event.target.editor.value
    })
  }

render(){
    return  (
        <div className="container">
          <div className="row">
          <div className="col-md-12 ">
            <div className="col-md-5 mx-auto">
              <div id="first">
                <h1>Modify an Article</h1>
              </div>
            </div>
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
          <form action method="post" name="publish" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Title</label>
              <input 
                type="text" value={this.state.title} name="title" 
                className="form-control" id="title" aria-describedby="Article Title" 
                placeholder="Article Title" 
                onChange={(e) => {this.setState({title: e.target.value})}}

                pattern=".{3,90}"
                required
              />
            </div>
            <p className="text-muted d-inline">
                <br/>
                * Between 3 & 90 chars
                <br/>
              </p>
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
              <button type="submit" className="btn btn-outline-secondary btn-lg">Update</button>
            </div>
          </form>
        </div>
        <br/>
      </div>

            );
}
}

export default ArticleEdit;<br/>