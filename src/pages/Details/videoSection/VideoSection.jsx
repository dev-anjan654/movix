import React, { useState } from 'react';
import './VideoSection.css';
import ContentWrapper from '../../../components/ContentWrapper/ContentWrapper';
import { STATUS } from '../../../hooks/useFetch';
import VideoPopup from '../../../components/videoPopUp/VideoPopup';
import Image from '../../../components/LazyloadImage/Image';
import PlayButton from '../PlayButton';

const VideoSection = ({data, status}) => {
    const [show, setShow] = useState(false);
    const [videoId, setVideoId] = useState(null);

    const loadingSkeleton = () => {
        return(
            <div className="skItem">
                <div className="thumb skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row2 skeleton"></div>
            </div>
        )
    };
  return (
    <div className='videoSection'>
        <ContentWrapper>
            <div className="sectionHeading">Official Videos</div>
            {
                status === STATUS.LOADING ? (
                    <div className="videoSkeleton">
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                    </div>
                ) : (
                    <div className="videos">
                       {
                        data?.results?.map((item) => {
                            return(
                                <div className="videoItem" key={item.id} onClick={() => {setVideoId(item.key); setShow(true)}}>
                                    <div className="videoThumbnail">
                                        <Image src={`https://img.youtube.com/vi/${item.key}/mqdefault.jpg`}/>
                                        <PlayButton/>
                                    </div>
                                    <div className="videoTitle">{item?.name}</div>
                                </div>
                            )
                        })
                       } 
                    </div>
                )
            }
        </ContentWrapper>
        <VideoPopup 
        show={show}
        setShow={setShow}
        videoId={videoId}
        setVideoId={setVideoId}
        />
    </div>
  )
}

export default VideoSection