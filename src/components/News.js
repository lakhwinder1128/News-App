import { useEffect,useState } from 'react';
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';


const News=(props)=>{
 
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)
    
  

  const  updateNews=async()=> {
   
    const url = `https://newsapi.org/v2/top-headlines?apiKey=${props.apiKey}&country=${props.country}&category=${props.category}&apiKey=f428eb9fbfc54208b66510d9d64ce23f&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    let parsedData = await data.json();
    //  console.log(parsedData);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
   
  }

  useEffect(() => {
    document.title = `${props.category} - NewsMonkey`;
    updateNews();
  }, [])
  
 
//   const handleNextClick = async () => {


//     updateNews();
//     setPage(page+1);
//   }
//  const  handlePrevClick = async () => {

//     updateNews();
//     setPage(page-1);
//   }
  const fetchMoreData = async() => {
  
   
   const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
   setPage(page+1);
   setLoading(true);
   let data = await fetch(url);
   let parsedData = await data.json();
   //  console.log(parsedData);
   setArticles(articles.concat(parsedData.articles));
   setTotalResults(parsedData.totalResults);
   setLoading(false);
  
///////////////
  };
  

    return (
      <div>
        <div className="container my-3" >
          <h1 className="text-center" style={{ margin: '40px 0px',marginTop:'90px' }}>NewsMonkey Top- {props.category} headlines</h1>

          {loading && <Spinner />}


          <InfiniteScroll
            dataLength={articles.length}
            next={fetchMoreData}
            hasMore={articles.length!==totalResults}
            loader={<Spinner/>}
          >
            <div className="container">

           
            <div className="row" >

              {articles.map((element) => {
                return <div className="col-md-4" key={element.url+element.publishedAt}>
                  <NewsItem title={element.title ? element.title.slice(0, 50) : ""} description={element.description ? element.description.slice(0, 90) : ""} imageUrl={element.urlToImage ? element.urlToImage : "https://images.barrons.com/im-733203/social"} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source} />
                </div>
              })}
            </div>
            </div>
          </InfiniteScroll>
        </div>
        
      </div>
    )
  }



News.defaultProps = {
  country: 'in',
  pageSize: 6,
  category: 'general',
}
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
}

export default News