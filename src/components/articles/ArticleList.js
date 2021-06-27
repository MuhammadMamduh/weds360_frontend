import React from 'react';
import ArticleItem from '../ArticleItem';
import Spinner from '../Spinner';
import axios from '../../apis/backend';

class ArticleList extends React.Component {
    state = {articles: [], selectedArticle: null}; // state & its initialization

    componentDidMount () {
        this.fetchArticles();
    }

    // API call
    fetchArticles = async ()=>{
        const response = await axios.get('/articles');

        // update(set) states with API response
        this.setState(
            {
                articles: response.data,
                selectedArticle: response.data[0]
            }
        );

        // console.log(this.state.articles);
    }

    renderList(){
        return this.state.articles.map((article)=>{
            return  (
                        <ArticleItem
                            title={article.title}
                            body={article.body}
                            author={article.author}
                            publicationDate={article.createdAt}
                            lastUpdated={article.updatedAt}
                            articleId={article._id}
                            key={article._id}
                            modifiable={false}
                        />
                    );
        })
    }

    renderEmptyState(){
        if(this.state.articles.length===0) {
            return  (
                        <div className="container" align="center">
                            <Spinner
                                klass="spinner-border text-muted" 
                                message = "Loading ..."
                            />
                        </div>
                    );
        }
    }
    render(){

                return  (
                            <div className="list-group">
                                {this.renderEmptyState()}
                                {this.renderList()}
                            </div>
                        );
            }
}

export default ArticleList;