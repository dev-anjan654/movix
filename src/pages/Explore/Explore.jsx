import React, { useEffect, useState } from 'react'
import './Explore.css';
import { useParams } from 'react-router-dom';
import useFetch, { STATUS } from '../../hooks/useFetch';
import { fetchAPi } from '../../utils/Api';
import ContentWrapper from '../../components/ContentWrapper/ContentWrapper';
import Select from 'react-select';
import InfiniteScroll from 'react-infinite-scroll-component';
import MovieCard from '../../components/movieCard/MovieCard';
import { RotatingLines } from 'react-loader-spinner';

let filters = {};
const sortbyData = [
  {value: "popularity.desc", label: "Popularity Descending"},
  {value: "popularity.asc", label: "Popularity Ascending"},
  {value: "vote_average.desc", label: "Rating Descending"},
  {value: "vote_average.asc", label: "Rating Ascending"},
  {value: "primary_release_date.desc", label: "Release Date Descending"},
  {value: "primary_release_date.asc", label: "Release Date Ascending"},
  {value: "original_title.asc", label: "Title (A - Z)"}
]

const Explore = () => {
  const [data, setData] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [status, setStatus] = useState();
  const [genre, setGenre] = useState(null);
  const [sortby, setSortby] = useState(null);
  const {mediaType} = useParams();

  const {fetchData: genreData} = useFetch(`/genre/${mediaType}/list`);
  const fetchInitialData = () => {
    setStatus(STATUS.LOADING);
    fetchAPi(`/discover/${mediaType}`, filters).then((res) => {
      setData(res);
      setPageNum((prev) => prev + 1);
      setStatus(STATUS.IDLE);
    })
  };
  const fetchNextPageData = () => {
    fetchAPi(`/discover/${mediaType}?page=${pageNum}`, filters).then((res) => {
      if(data?.results){
        setData({...data, results: [...data?.results, ...res.results]});
      }
      else{
        setData(res);
      }
      setPageNum((prev) => prev + 1)
    })
  }
  useEffect(() => {
    filters = {};
    setData(null);
    setPageNum(1);
    setSortby(null);
    setGenre(null);
    fetchInitialData();
  }, [mediaType]);
  const onChange = (selectedItems, action) => {
    if(action.name === "sortby"){
      setSortby(selectedItems);
      if(action.action !== "sortby"){
        filters.sort_by = selectedItems.value;
      }
      else{
        delete filters.sort_by;
      }
    }
    if(action.name === "genres"){
      setGenre(selectedItems);
      if(action.action !== "clear"){
        let genreId = selectedItems.map((item)=>item.id);
        genreId = JSON.stringify(genreId).slice(1,-1);
        filters.with_genres = genreId;
      }
      else{
        delete filters.with_genres;
      }
    }
    setPageNum(1);
    fetchInitialData();
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
    <div className='explorePage'>
      <ContentWrapper>
        <div className="pageHeader">
          <div className="pageTitle">
            {
              mediaType === 'TV' ? "Explore TV Shows" : "Explore Movies"
            }
          </div>
          <div className="filters">
            <Select
              isMulti
              name='genres'
              value={genre}
              closeMenuOnSelect={false}
              options={genreData?.genres}
              getOptionLabel={(option)=>option.name}
              getOptionValue={(option)=>option.id}
              onChange={onChange}
              placeholder="Select genres"
              className='react-select-container genresDD'
              classNamePrefix='recat-select'
            />
            <Select 
              name='sortby'
              value={sortby}
              options={sortbyData}
              onChange={onChange}
              isClearable={true}
              placeholder="Sort by"
              className='react-select-container sortbyDD'
              classNamePrefix='react-select'
            />
          </div>
        </div>
        {
          status === STATUS.LOADING ? (
            <div className="loadingScreen">
              {loadingSpinner()}
            </div>
          ) : (
            <>
            {
              data?.results?.length > 0 ? (
                <InfiniteScroll
                  className='content'
                  dataLength={data?.results?.length || []}
                  next={fetchNextPageData}
                  hasMore={pageNum <= data?.total_pages}
                  loader={loadingSpinner()}
                >
                  {
                    data?.results?.map((item, index) => {
                      if(item.media_type === 'person'){
                        return
                      }
                      return(
                        <MovieCard key={index} data={item} mediaType={mediaType}/>
                      )
                    })
                  }
                </InfiniteScroll>
              ) : (
                <span className="resultNotfound">
                  Sorry, Results not found!
                </span>
              )
            }
            </>
          )
        }
      </ContentWrapper>
    </div>
  )
}

export default Explore