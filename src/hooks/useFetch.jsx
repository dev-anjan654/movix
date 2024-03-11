import React, { useEffect, useState } from 'react';
import { fetchAPi } from '../utils/Api';

export const STATUS = Object.freeze({
    IDLE: "idle",
    LOADING: "loading",
    ERROR: "error"
});
const useFetch = (url) => {
  const [status, setStatus] = useState(STATUS.IDLE);
  const [fetchData, setFetchData] = useState();
  useEffect(()=>{
    setStatus(STATUS.LOADING);
    fetchAPi(url).then(res => {
        setFetchData(res);
        setStatus(STATUS.IDLE);
    }).catch(err => {
        setStatus(STATUS.ERROR)
    })
  },[url]);
  return { fetchData, status }
}

export default useFetch