import React from 'react'
import './Home.css';
import HeroBanner from './HeroBanner/HeroBanner';
import Trending from './Trending/Trending';
import Popular from './Popular/Popular';
import TopRated from './TopRated/TopRated';

const Home = () => {
  return (
    <div className='home-page'>
    <HeroBanner/>
    <Trending/>
    <Popular/>
    <TopRated/>
    </div>
  )
}

export default Home