import React from 'react';
import './MovieCard.css';
import Image from '../LazyloadImage/Image';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import posterFallBack from '../../assets/no-poster.png';
import dayjs from 'dayjs';

const MovieCard = ({data, mediaType}) => {
    const { url } = useSelector(state => state.home);
    const navigate = useNavigate();
    const posterUrl = data?.poster_path ? url + data?.poster_path : posterFallBack;
  return (
    <div className='movieCard' onClick={()=>navigate(`/${data?.media_type || mediaType}/${data?.id}`)}>
        <div className="posterBlock">
            <Image src={posterUrl} className='posterImg'/>
        </div>
        <div className="textBlock">
            <span className="title">{data?.title || data?.name}</span>
            <span className="date">
                {dayjs(data?.release_date).format("MMM D, YYYY")}
            </span>
        </div>
    </div>
  )
}

export default MovieCard