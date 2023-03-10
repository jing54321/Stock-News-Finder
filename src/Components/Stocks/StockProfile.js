import React, {useContext, useEffect, Fragment} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import StockContext from '../../Context/Stock/StockContext';
import Spinner from '../Layout/Spinner';

const StockProfile = () => {

  const {ticker} = useParams();
  const navigate = useNavigate();
  const stockContext = useContext(StockContext);
  const {getProfile, profile, loading} = stockContext;
  const onClick = () => navigate(-1)
  useEffect(() => {
    getProfile(ticker);
    // eslint-disable-next-line
  },[])
  const {logo, name, weburl, ipo, exchange, finnhubIndustry, country, marketCapitalization} = profile;
  if(loading) return <Spinner/>;
  return (
    <Fragment>
    <button className="btn bg-dark" onClick={onClick}>Previous Page</button>
    <div className="card grid-2">
      <div className="text-center">
        {logo? <img src = {logo} alt="" className="round-img" style={{width:'40%'}}/> : <i className="fa-brands fa-react" style={{fontSize:'100px'}}></i>}
        <div><a target="_blank" rel="noopener noreferrer" href={weburl}>{weburl}</a></div>
      </div>
      <ul>
        <li><h3>Ticker : {ticker}</h3></li>
        <li>Company Name : {name}</li>
        <li>IPO Date : {ipo}</li>
        <li>Exchange : {exchange}</li>
        <li>Sector : {finnhubIndustry}</li>
        <li>Country : {country}</li>
        <li>MarketCap : ${Math.round((marketCapitalization)/1000)}B</li>
      </ul>
    </div>
    <h2>Latest News</h2>
    </Fragment>
  )
}

export default StockProfile
