import React, { useEffect, useState } from 'react';
import './HeroBanner.css';
import { useNavigate } from 'react-router-dom';
import useFetch from '../../../hooks/useFetch';
import { useSelector } from 'react-redux';
import Image from '../../../components/LazyloadImage/Image';
import { STATUS } from '../../../hooks/useFetch';
import ContentWrapper from '../../../components/ContentWrapper/ContentWrapper';

const HeroBanner = () => {
    const [background, setBackground] = useState("");
    const [query, setQuery] = useState("");
    const navigate = useNavigate();
    const {url} = useSelector(state => state.home);
    const { fetchData, status } = useFetch("/movie/upcoming")
    useEffect(()=>{
        const bgUrl = url + fetchData?.results?.[Math.floor(Math.random()*10)]?.backdrop_path;
        setBackground(bgUrl);
        
    },[fetchData])
    const searchQueryHandler = (e) => {
        if(e.key === "Enter" && query.length > 0){
            navigate(`/search/${query}`);
        }
    }
  return (
    <div className='hero-banner'>
        {
            status === STATUS.IDLE ? 
            <div className="backdrop-img">
              <Image src={background}/>
            </div> : null
        }
        <div className="opacity-layer"></div>
        <ContentWrapper>
            <div className="hero-content">
                <span className='hero-title'>Welcome</span>
                <span className='hero-sub-title'>Million of movies, TV shows and people to discover. Explore Now</span>
                <div className="search-input">
                    <input type="text" 
                    placeholder='Search for a movie or TV show...'
                    onKeyUp={searchQueryHandler}
                    onChange={(e)=>setQuery(e.target.value)}/>
                    <button>Search</button>
                </div>
            </div>
        </ContentWrapper>
    </div>
  )
}

export default HeroBanner