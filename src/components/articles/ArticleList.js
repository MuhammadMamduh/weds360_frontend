import React from 'react';
import ArticleItem from './ArticleItem';
import Spinner from '../Spinner';
import axios from '../../apis/backend';
import InfiniteScroll from 'react-infinite-scroller';

class ArticleList extends React.Component {
    state = {articles: [], selectedArticle: null, loading: true, hasMore: true, page: 0,prevY: 0}; // state & its initialization

    componentDidMount () {
        this.fetchArticles();
        var options = {
            root: null,
            rootMargin: "0px",
            threshold: 1.0
          };
          
          this.observer = new IntersectionObserver(
            this.handleObserver.bind(this),
            options
          );
          this.observer.observe(this.loadingRef);
    }

    // API call
    fetchArticles = async ()=>{
        this.setState({ loading: true });
        const response = await axios.get('/articles', { params: { skip: this.state.articles.length, limit: 5 }});

        if(response.data.length===0)
        {
            this.setState({
                hasMore: false,
                loading: false
            })
        }

        // update(set) states with API response
        if(response.data.length>0)
        {
            this.setState(
                {
                    articles: this.state.articles.concat(response.data),
                    page: this.state.page++,
                    hasMore: true
                }
            );
        }
    }

    handleObserver(entities, observer) {
        const y = entities[0].boundingClientRect.y;
        if (this.state.prevY > y) {
          const lastArticle = this.state.articles[this.state.articles.length - 1];
        //   const curPage = lastArticle.id;
          this.fetchArticles();
        //   this.setState({ page: curPage });
        }
        this.setState({ prevY: y });
      }

    renderList(){
        return (
                <div className="container">
                    <div>
                        {
                            this.state.articles.map((article)=>{
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
                                    )

                            })
                        }
                    </div>
                    {
                        this.state.loading?
                        <div ref={loadingRef => (this.loadingRef = loadingRef)}>
                            <div className="container" align="center">
                                <Spinner
                                    klass="spinner-border text-primary" 
                                />
                                <h1> Loading ...</h1>
                            </div>
                        </div>
                        :""
                    }
                    {
                        this.state.hasMore?"":
                        // <div>
                        //     <div className="col-sm-4"></div>
                        //     <div className="col-sm-8 d-flex flex-column">
                                <div className="d-flex align-items-center justify-content-center" >
                                    <h5>End of results</h5>
                                </div>
                        //     </div>
                        // </div>
                    }
                </div>
                )
    }

    renderEmptyState(){
        if(this.state.articles.length===0) {
            return  (
                        <div className="container" align="center">
                            <Spinner
                                klass="spinner-border text-muted" 
                            />
                            <h1> Loading ...</h1>
                        </div>
                    );
        }
    }
    render(){

                return  (
                            <div className="list-group">
                                {/* {this.renderEmptyState()} */}
                                {this.renderList()}
                            </div>
                        );
            }
}

export default ArticleList;