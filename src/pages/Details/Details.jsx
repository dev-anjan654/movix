import React from 'react'
import './Details.jsx';
import useFetch from '../../hooks/useFetch.jsx';
import { useParams } from 'react-router-dom';
import DetailsBanner from './DetailsBanner/DetailsBanner.jsx';
import Cast from './cast/Cast.jsx';
import VideoSection from './videoSection/VideoSection.jsx';
import Similar from './carousels/Similar.jsx';
import Recomendation from './carousels/Recomendation.jsx';

const Details = () => {
  const {mediaType, id} = useParams();
  const {fetchData, status} = useFetch(`/${mediaType}/${id}/videos`);
  const {fetchData:credits, status:creditsStatus} = useFetch(`/${mediaType}/${id}/credits`);
  return (
    <div>
      <DetailsBanner video={fetchData?.results[0]} crew={credits?.crew}/>
      <Cast data={credits?.cast} status={creditsStatus}/>
      <VideoSection data={fetchData} status={status}/>
      <Similar mediaType={mediaType} id={id}/>
      <Recomendation mediaType={mediaType} id={id}/>
    </div>
  )
}

export default Details