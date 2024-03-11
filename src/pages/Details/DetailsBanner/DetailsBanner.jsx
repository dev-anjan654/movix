import React, { useState } from 'react';
import './DetailsBanner.css';
import ContentWrapper from '../../../components/ContentWrapper/ContentWrapper';
import { useParams } from 'react-router-dom';
import useFetch, { STATUS } from '../../../hooks/useFetch';
import { useSelector } from 'react-redux';
import Image from '../../../components/LazyloadImage/Image';
import posterFallback from '../../../assets/no-poster.png';
import dayjs from 'dayjs';
import CircleRating from '../../../components/circleRating/CircleRating';
import PlayButton from '../PlayButton';
import VideoPopup from '../../../components/videoPopUp/VideoPopup';

const DetailsBanner = ({video, crew}) => {
    const [show, setShow] = useState(false);
    const [videoId, setVideoId] = useState(null);
    const {mediaType, id} = useParams();
    const {fetchData, status} = useFetch(`/${mediaType}/${id}`);
    const {url} = useSelector(state => state.home);
    const formatRunTime = (time) => {
        let hr = Math.floor(time/60);
        let min = Math.floor(time%60);
        let runHr = (hr < 10) ? `0${hr}` : hr;
        let runMin = (min < 10) ? `0${min}` : min;
        return `${runHr}h ${runMin}m`;
    }
    const director = crew?.filter(item => item.job === "Director");
    const writer = crew?.filter(item => item.job === "Screenplay" || item.job === "Story" || item.job === "Writer");
  return (
    <div className='detailsBanner'>
        {
            status === STATUS.LOADING ?  
       (<div className="detailsBannerSkeleton">
        <ContentWrapper>
            <div className="left skeleton"></div>
            <div className="right">
                <div className="row skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row skeleton"></div>
            </div>
        </ContentWrapper>
       </div>) : 
       (
       <>
        <div className="backdrop-img">
            <Image src={url + fetchData?.backdrop_path}/>
        </div>
        <div className="opacity_layer"></div>
        <ContentWrapper>
            <div className="content">
                <div className="left">
                    {
                        fetchData?.poster_path ? (<Image src={url + fetchData?.poster_path} className='posterImg'/>) : (<Image src={posterFallback} className='posterImg'/>)
                    }
                </div>
                <div className="right">
                    <div className="title">
                        {`${fetchData?.name || fetchData?.title} (${dayjs(fetchData?.release_date).format("YYYY")})`}
                    </div>
                    <div className="subtitle">
                        {fetchData?.tagline}
                    </div>
                    <div className="row">
                        <CircleRating rating={fetchData?.vote_average.toFixed(1)}/>
                        <div className="playbtn" onClick={()=>{setShow(true);setVideoId(video.key)}}>
                            <PlayButton/>
                            <span className='text'>Watch Trailer</span>
                        </div>
                    </div>
                    <div className="overview">
                        <div className="heading">Overview</div>
                        <div className="description">{fetchData?.overview}</div>
                    </div>
                    <div className="info">
                        {
                            fetchData?.status ? (
                            <div className='infoItem'>
                                <span className='text bold'>
                                    Status: 
                                </span>
                                <span className='text'>
                                    {fetchData?.status}
                                </span>
                            </div>) : null
                        }
                        {
                            fetchData?.release_date ? (
                            <div className='infoItem'>
                                <span className='text bold'>
                                    Release Date: 
                                </span>
                                <span className='text'>
                                    {dayjs(fetchData?.release_date).format("MMM D, YYYY")}
                                </span>
                            </div>) : null
                        }
                        {
                            fetchData?.runtime ? (
                            <div className='infoItem'>
                                <span className='text bold'>
                                    Run Time: 
                                </span>
                                <span className='text'>
                                    {formatRunTime(fetchData?.runtime)}
                                </span>
                            </div>) : null
                        }
                    </div>
                    {
                        director?.length > 0 ? (
                            <div className="infoItem info">
                                <span className='text bold'>
                                    Director: 
                                </span>
                                    {
                                        director.map((item, index) => {
                                            return(
                                            <span key={index} className='text'> { item.name} {director.length - 1 !== index ? ", " : null}</span>)
                                        })
                                    }
                            </div>
                        ) : null
                    }
                    {
                        writer?.length > 0 ? (
                            <div className="infoItem info">
                                <span className='text bold'>
                                    Writer: 
                                </span>
                                    {
                                        writer.map((item, index) => {
                                            return(
                                            <span key={index} className='text'> { item.name} {writer.length - 1 !== index ? ", " : null}</span>)
                                        })
                                    }
                            </div>
                        ) : null
                    }
                    {
                        fetchData?.created_by?.length > 0 ? (
                            <div className="infoItem info">
                                <span className='text bold'>
                                    Creator: 
                                </span>
                                    {
                                        fetchData?.created_by.map((item, index) => {
                                            return(
                                            <span key={index} className='text'> { item.name} {fetchData?.created_by.length - 1 !== index ? ", " : null}</span>)
                                        })
                                    }
                            </div>
                        ) : null
                    }
                </div>
            </div>
            <VideoPopup show={show} 
            setShow={setShow} 
            videoId={videoId} 
            setVideoId={setVideoId}/>
        </ContentWrapper>
       </>
       )}
    </div>
  )
}

export default DetailsBanner