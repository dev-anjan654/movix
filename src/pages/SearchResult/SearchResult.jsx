import React, { useEffect, useState } from 'react'
import './SearchResult.css';
import noResultImg from '../../assets/no-results.png';
import { useParams } from 'react-router-dom';
import { fetchAPi } from '../../utils/Api';
import { STATUS } from '../../hooks/useFetch';
import { RotatingLines } from 'react-loader-spinner';
import ContentWrapper from '../../components/ContentWrapper/ContentWrapper';
import InfiniteScroll from 'react-infinite-scroll-component';
import MovieCard from '../../components/movieCard/MovieCard';

const SearchResult = () => {
  const [data, setData] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [status, setStatus] = useState(false);
  const { query } = useParams();

  const fetchInitialData = () => {
    setStatus(STATUS.LOADING);
    fetchAPi(`/search/multi?query=${query}&page=${pageNum}`).then((res)=>{setData(res); setPageNum((prev) => prev + 1); setStatus(STATUS.IDLE)})
  }
  useEffect(()=>{
    setPageNum(1);
    fetchInitialData();
  },[query])
  const fetchNextPageData = () => {
    fetchAPi(`/search/multi?query=${query}&page=${pageNum}`).then((res)=>{
      if(data?.results){
        setData({...data, results: [...data?.results, ...res.results]});
      }
      else{
        setData(res);
      }
      setPageNum((prev) => prev + 1);
    })
  }
  const loadingSpinner = () => {
    return(
      <RotatingLines
          visible={true}
          height="96"
          width="96"
          color="white"
          strokeWidth="5"
          animationDuration="0.75"
          ariaLabel="rotating-lines-loading"
          wrapperStyle={{}}
          wrapperClass=""
          />
    )
  }
  return (
    <div className='searchResultsPage'>
      {
        status === STATUS.LOADING ? (
          <div className="loading-screen">
           {
            loadingSpinner()
           }
          </div>
        ) : (
          <ContentWrapper>
            {
              data?.results?.length > 0 ? (
                <>
                <div className="pageTitle">{`Search ${data?.total_results > 1 ? "results" : "result"} of '${query}'`}</div>
                <InfiniteScroll className='content' dataLength={data?.results.length || []} next={fetchNextPageData} hasMore={pageNum <= data?.total_pages} loader={loadingSpinner()}>
                  {
                    data?.results.map((item, index) => {
                      if(item.media_type === "person") return;
                      return(
                        <MovieCard key={index} data={item}/>
                      )
                    })
                  }
                </InfiniteScroll>
                </>
              ) : (
                <span className="resultNotFound">Sorry, Result not found!</span>
              )
            }
          </ContentWrapper>
        )
      }
    </div>
  )
}

export default SearchResult