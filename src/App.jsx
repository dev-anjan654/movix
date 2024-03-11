import React, { useEffect } from 'react'
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Details from './pages/Details/Details';
import Explore from './pages/Explore/Explore';
import SearchResult from './pages/SearchResult/SearchResult';
import ErrorPage from './pages/404/ErrorPage';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import { fetchAPi } from './utils/Api';
import { useDispatch } from 'react-redux';
import { getApiConfiguration } from './store/homeSlice';


const App = () => {
  const dispatch = useDispatch();
  useEffect(()=>{
    fetchAPi("/configuration").then((res)=>{
      const imgUrl = `${res?.images?.secure_base_url}original`
      dispatch(getApiConfiguration(imgUrl));
    })
  },[])

  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/:mediaType/:id' element={<Details/>}/>
        <Route path='/search/:query' element={<SearchResult/>}/>
        <Route path='/explore/:mediaType' element={<Explore/>}/>
        <Route path='*' element={<ErrorPage/>}/>
      </Routes>
    <Footer/>
    </BrowserRouter>
  )
}

export default App