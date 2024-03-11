import React, { useState } from 'react';
import ContentWrapper from '../../../components/ContentWrapper/ContentWrapper';
import SwitchTabs from '../../../components/switchTabs/SwitchTabs';
import useFetch from '../../../hooks/useFetch';
import Carousel from '../../../components/Carousel/Carousel';

const TopRated = () => {
    const [endPoint, setEndPoint] = useState("movie");
    const {fetchData, status} = useFetch(`/${endPoint}/top_rated`);
    const onTabChange = (tab) => {
      if(tab === "Movies"){
        setEndPoint("movie")
      }
      else{
        setEndPoint("tv")
      }
    }
  return (
    <div className='carousel-section'>
        <ContentWrapper>
            <h4 className='carousel-title'>Top Rated</h4>
            <SwitchTabs data={["Movies","TV Shows"]} onTabChange={onTabChange}/>
        </ContentWrapper>
        <ContentWrapper>
          <Carousel data={fetchData?.results} status={status} endPoint={endPoint}/>
        </ContentWrapper>
    </div>
  )
}

export default TopRated