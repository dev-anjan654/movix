import React from 'react'
import './ErrorPage.css';
import ContentWrapper from '../../components/ContentWrapper/ContentWrapper';

const ErrorPage = () => {
  return (
    <div className='errorPage'>
      <ContentWrapper>
        <span className="bigText">404</span>
        <span className="smallText">Page not found!</span>
      </ContentWrapper>
    </div>
  )
}

export default ErrorPage