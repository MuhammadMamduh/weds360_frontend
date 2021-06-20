import React from 'react';
import ArticleItem from '../ArticleItem';
import axios from '../../apis/backend';

class MyArticles extends React.Component {
    state = {articles: [], selectedArticle: null}; // state & its initialization

    componentDidMount () {
        this.fetchArticles();
    }

    fetchArticles = async ()=>{

        axios.defaults.headers.common['Authorization'] = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGNiOGJiN2EzZDI3NzlmNDk0Y2VkYTMiLCJpYXQiOjE2MjQxNDI2Mjh9.QtL1gAYl1KJzxGEEykwSOOdHZ7yJ5AZbUFiQ6RsGWXw";
        const response = await axios.get('/user/articles');
        this.setState(
            {
                articles: response.data.articles,
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
                            author={article.body}
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
                                {this.renderList()}
                            </div>
                        );
            }
}

export default MyArticles;