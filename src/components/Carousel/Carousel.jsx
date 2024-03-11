import React from 'react'
import './Carousel.css';
import posterFallback from '../../assets/no-poster.png';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { STATUS } from '../../hooks/useFetch';
import { useNavigate } from 'react-router-dom';
import CircleRating from '../circleRating/CircleRating';
import Image from '../LazyloadImage/Image';

const Carousel = ({ data, status, endPoint, title }) => {
  const {url} = useSelector(state => state.home);
  console.log(data)
  const navigate = useNavigate();
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 3
  };
  console.log()
  const skItem = () => {
    return(
      <div className="skeletonItem">
        <div className="posterBlock skeleton"></div>
        <div className="car-info">
          <div className="title skeleton"></div>
          <div className="rel-date skeleton"></div>
        </div>
      </div>
    )
  }
  //
  return (
    <div className='carousel'> 
    {
      title ? (<div className='carousel-title'>{title}</div>) : null
    }
    {
      status === STATUS.LOADING ? (
      <div className="loadingSkeleton">
        {skItem()}
        {skItem()}
        {skItem()}
        {skItem()}
        {skItem()}
      </div>
        ) : 
    
        <div className="slider-container">
          <Slider {...settings}>
            {
              data?.map((item)=>{
                const posterUrl = item.poster_path ? url + item.poster_path : posterFallback;
                return(
                  <div key={item.id} className='car-item' onClick={()=>navigate(`/${item.media_type || endPoint}/${item.id}`)}>
                    <img src={posterUrl} alt="" />
                    <CircleRating rating={item?.vote_average.toFixed(1)}/>
                    <div className="car-info">
                      <h4 className='title'>{item.title || item.name}</h4>
                      <p className='rel-date'>{dayjs(item.release_date).format("MMM D, YYYY")}</p> 
                    </div>
                  </div>
                )
              })
            }  
          </Slider>
        </div>
    }
    </div>
  )
}

export default Carousel