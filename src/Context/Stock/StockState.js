import StockContext from "./StockContext";
import StockReducer from "./StockReducer";
import { useReducer } from "react";
import { SEARCH_STOCKS, CLEAR_STOCKS, GET_PROFILE, SET_LOADING , GET_COMPANY_NEWS, CLEAR_PROFILE} from "../types";

const StockState = props => {
    const initialState = {
        stocks : [],
        profile : {},
        loading : false,
        companyNews : []
    }

    const [state, dispatch] = useReducer(StockReducer,initialState);

    // Get Stock List
    const searchStocks = text => {
        setLoading();
        const url = `https://finnhub.io/api/v1/search?q=${text}&token=c2a3bjiad3i83r33r7fg`;

        fetch(url,{
            method:'GET',
            headers: {"Content-Type":"application/x-www-form-urlencoded"}
        })
        .then(res => res.text())
        .then(res => {
            let arr = JSON.parse(res).result;
            arr = arr.map((a,index) => {return { 'id':index,...a}});
            dispatch({type:SEARCH_STOCKS, payload:arr})
        })
    }
    //Get one stock's profile
    const getProfile = ticker => {
        setLoading();
        const url = `https://finnhub.io/api/v1/stock/profile2?symbol=${ticker}&token=c2a3bjiad3i83r33r7fg`;

        fetch(url,{
            method:'GET',
            headers: {"Content-Type":"application/x-www-form-urlencoded"}
        })
        .then(res => res.text())
        .then(res => {
            let obj = JSON.parse(res)
            dispatch({type:GET_PROFILE, payload:obj})
        })
    }

    const getCompanyNews = ticker => {

        setLoading()
        const today = new Date();
        const end = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`;
        const sevenDaysAgo = new Date(today.setDate(today.getDate()-2));
        const start = `${sevenDaysAgo.getFullYear()}-${sevenDaysAgo.getMonth()+1}-${sevenDaysAgo.getDate()}`;

        const url = `https://finnhub.io/api/v1/company-news?symbol=${ticker}&from=${start}&to=${end}&token=c2a3bjiad3i83r33r7fg`;

        fetch(url,{
            method:'GET',
            headers: {"Content-Type":"application/x-www-form-urlencoded"}
        })
        .then(res => res.text())
        .then(res => {
            let arr = JSON.parse(res);
            dispatch({type:GET_COMPANY_NEWS, payload:arr})
        })
    }

    const clearStocks = () => dispatch({type:CLEAR_STOCKS});

    const clearProfile = () => dispatch({type:CLEAR_PROFILE});

    const setLoading = () => dispatch({type:SET_LOADING});

    return <StockContext.Provider value={{
        stocks:state.stocks,
        profile:state.profile,
        loading:state.loading,
        companyNews:state.companyNews,
        searchStocks,
        clearStocks,
        getProfile,
        getCompanyNews,
        clearProfile,
    }}>
    {props.children}
    </StockContext.Provider>
}

export default StockState
