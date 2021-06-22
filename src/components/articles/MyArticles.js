import React from 'react';
import ArticleItem from '../ArticleItem';
import axios from '../../apis/backend';

class MyArticles extends React.Component {
    state = {articles: [], selectedArticle: null, author:""}; // state & its initialization

    componentDidMount () {
        this.fetchArticles();
    }

    fetchArticles = async ()=>{

        axios.defaults.headers.common['Authorization'] = "Bearer "+ localStorage.getItem('token');
        const response = await axios.get('/user/articles');
        this.setState(
            {
                articles: response.data.articles,
                author: response.data.user,
                selectedArticle: response.data.articles[0]
            }
        );

        console.log(this.state.articles);
    }

    renderList(){
        console.log(this.state.articles);
        return this.state.articles.map((article)=>{
            return  (
                        <ArticleItem
                            title={article.title}
                            body={article.body}
                            author={this.state.author}
                            publicationDate={article.createdAt}
                            articleId={article._id}
                            key={article._id}
                            modifiable={true}
                        />
                    );
        })
    }
    render(){
                return  (
                            <div className="list-group">
                                <h1 style={{justifyContent: "center", display: "flex"}}>Your Articles</h1>
                                    <hr className="hr-or"/>
                                {this.renderList()}
                            </div>
                        );
            }
}

export default MyArticles;