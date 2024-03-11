import React from 'react';
import ContentWrapper from '../../../components/ContentWrapper/ContentWrapper'
import useFetch from '../../../hooks/useFetch'
import Carousel from '../../../components/Carousel/Carousel';

const Recomendation = ({mediaType, id}) => {
    const {fetchData, status} = useFetch(`/${mediaType}/${id}/recommendations`);
  return (
    <>
    <ContentWrapper>
        <Carousel 
        title="Recomendation"
        data={fetchData?.results}
        status={status}
        endPoint={mediaType}/>
    </ContentWrapper>
    </>
  )
}

export default Recomendation