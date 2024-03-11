import React, { useEffect, useState } from 'react';
import './Header.css';
import { FaSearch } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import logo from '../../assets/movix-logo.svg';
import { useLocation, useNavigate } from 'react-router-dom';
import ContentWrapper from '../ContentWrapper/ContentWrapper';

const Header = () => {
  const [hamburger, setHamburger] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");
  const [show, setShow] = useState("top");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location])

  //controlling header transition effect
  const controlHeader = () => {
    if(window.scrollY > 200){
      setShow("show")
    }
    else{
      setShow("top");
    }
  }
  useEffect(()=>{
    window.addEventListener("scroll", controlHeader)
    return () => {
      window.removeEventListener("scroll", controlHeader)
    }
  },[])

  //mobile menu 
  const hamburgerHandler = () => {
    if(!hamburger){
      setHamburger(true);
      setShowSearch(false);
    }
    else{
      setHamburger(false)
    }
  }
  const openSearch = () => {
    setShowSearch(true);
    setHamburger(false)
  }
  const searchQueryHandler = (e) => {
    if(e.key === "Enter" && query.length > 0){
        navigate(`/search/${query}`);
        setTimeout(()=>{
          setShowSearch(false);
        },1000)
    }
  }

  //link of movie and tv show page
  const navigationHandler = (type) => {
    if(type === "movie"){
      navigate("/explore/movie");
    }
    else{
      navigate("/explore/tv");
    }
    setHamburger(false)
  }
  return (
    <header className={show}>
      <ContentWrapper>
      <div className="header-content">
      <div className="web-logo" onClick={()=>navigate("/")}>
        <img src={logo} alt="" />
      </div>
      <nav>
        <ul className={hamburger ? "active" : null}>
          <li onClick={()=>navigationHandler("movie")}>Movies</li>
          <li onClick={()=>navigationHandler("tv")}>TV Shows</li>
        </ul>
        <span className='mobile-menu' onClick={hamburgerHandler}>
          {
            !hamburger ? <IoMenu/> : <IoClose/>
          }
        </span>
        <FaSearch onClick={openSearch}/>
      </nav>
        <div className={!showSearch ? "search-bar" : "search-bar active"}>
          <input type="text" 
          placeholder='Search for a movie or TV show...'
          onKeyUp={searchQueryHandler}
          onChange={(e)=>setQuery(e.target.value)}/>
          <IoClose onClick={() => setShowSearch(false)}/>
      </div>
      </div>
      </ContentWrapper>
    </header>
  )
}

export default Header