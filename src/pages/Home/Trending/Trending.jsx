import React, { useState } from 'react';
import ContentWrapper from '../../../components/ContentWrapper/ContentWrapper';
import SwitchTabs from '../../../components/switchTabs/SwitchTabs';
import useFetch from '../../../hooks/useFetch';
import Carousel from '../../../components/Carousel/Carousel';

const Trending = () => {
  const [endPoint, setEndPoint] = useState("day");
  const {fetchData, status} = useFetch(`/trending/all/${endPoint}`);
  const onTabChange = (tab) => {
    if(tab === "Day"){
      setEndPoint("day")
    }
    else{
      setEndPoint("week")
    }
  }
  return (
    <div className='carousel-section'>
        <ContentWrapper>
            <h4 className='carousel-title'>Trending</h4>
            <SwitchTabs data={["Day","Week"]} onTabChange={onTabChange}/>
        </ContentWrapper>
        <ContentWrapper>
          <Carousel data={fetchData?.results} status={status}/>
        </ContentWrapper>
    </div>
  )
}

export default Trending