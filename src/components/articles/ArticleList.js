import React from 'react';
import ArticleItem from '../ArticleItem';
import axios from '../../apis/backend';

class ArticleList extends React.Component {
    state = {articles: [], selectedArticle: null}; // state & its initialization

    componentDidMount () {
        this.fetchArticles();
    }

    fetchArticles = async ()=>{
        const response = await axios.get('/articles');
        this.setState(
            {
                articles: response.data,
                selectedArticle: response.data[0]
            }
        );

        console.log(this.state.articles);
    }

    renderList(){
        return this.state.articles.map((article)=>{
            return  (
                        <ArticleItem
                            title={article.title}
                            body={article.body}
                            author={article.author}
                            publicationDate={article.createdAt}
                            articleId={article._id}
                            key={article._id}
                            modifiable={false}
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

export default ArticleList;