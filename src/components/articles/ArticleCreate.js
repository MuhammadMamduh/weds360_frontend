import React from 'react';
import {Link} from 'react-router-dom';
import axios from '../../apis/backend';
import { withRouter } from 'react-router';


class ArticleCreate extends React.Component{
  state= {title:"", image:null, body:"", valid:false, errors:""};
  

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

    axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem('token');
    const response = await axios.post('/articles',formData, config).then((response)=>{
      this.props.history.push('/');
    }).catch((error)=>{
      if (error.response) {
        this.setState({
          errors:error.response.data.msg
        })
        // console.log(error.response.data); //testing purposes
      }
    })
    // console.log(response); // testing purposes

    
  }

render(){
    return  (
        <div className="container">
        <div className="row">
          <div className="col-md-10 mx-auto" style={{ backgroundColor:"#f8f9fa"}}>
            <div className="text-center">
              <h1>Publish an Article</h1>
            </div>
          
          <form action="/" method="post" name="publish" onSubmit={this.handleSubmit} >
            <div className="form-group">
              <label htmlFor="exampleInputEmail1"><strong>Title</strong></label>
              
              <input 
                type="text" name="title" 
                className="form-control" 
                id="title" aria-describedby="Article Title" 
                placeholder="Article Title" 

                pattern=".{3,150}"
                required
              />
              <p className="text-muted d-inline">
                <i>* Between 3 & 150 chars</i>
              </p>
            </div>

            <br/>
            <div className="form-group">
                <label className="form-label" htmlFor="customFile"><strong>Upload a Caption (image)</strong></label>
                <input 
                  type="file" className="form-control" 
                  name="caption" id="caption" 
                  required
                />
            </div>

            <br/>
            <div class="form-group">
              <label><strong>Body</strong></label>
              <div class="md-form amber-textarea active-amber-textarea-2">
                <textarea 
                  maxLength={1000}
                  id="editor" 
                  className="md-textarea form-control" 
                  rows="10"
                  value={this.state.body}
                  onChange={(e) => {
                    this.setState({body: e.target.value});

                    if(e.target.value.length >99)
                    {this.setState({valid:true});}

                  }}
                  

                
                  required
                >
                </textarea>
              </div>
              <p className="text-muted d-inline">
              <i>* Between 100 & 1000 chars</i>
              </p>
            </div>
            <div className="col-md-12 ">
                <div className="login-or">
                    <hr className="hr-or" />
                    <span className="span-or"></span>
                </div>
            </div>

            <div className="col-md-12 text-center ">
              <button type="submit" className={`btn btn-outline-primary btn-lg ${this.state.valid?'':'disabled'}`}>Publish</button>
            </div>
            
          </form>
          <br/>
          <div className="form-group">
              <p className="text-center" style={{color:'red'}}>
                {this.state.errors}
              </p>
          </div>
        </div>
        </div>
        <br/>
      </div>

            );
}
}

export default ArticleCreate;