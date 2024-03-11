import React from 'react'
import ContentWrapper from '../../../components/ContentWrapper/ContentWrapper'
import useFetch from '../../../hooks/useFetch'
import Carousel from '../../../components/Carousel/Carousel';

const Similar = ({mediaType, id}) => {
    const {fetchData, status} = useFetch(`/${mediaType}/${id}/similar`);
    const title = mediaType === "tv" ? "Similar TV Shows" : "Similar Movies";
  return (
    <>
    <ContentWrapper>
        <Carousel 
        title={title}
        data={fetchData?.results}
        status={status}
        endPoint={mediaType}/>
    </ContentWrapper>
    </>
  )
}

export default Similar