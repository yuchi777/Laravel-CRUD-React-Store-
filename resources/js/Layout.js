//父層為App.js, <Layout><Products /></Layout>, <Products/>變動時{props.children}跟著改變

import React,{ useMemo } from 'react';
import Header from './components/Header';

const Layout = (props) => {

    //useMemo 第一個參數是放函式，第二個參數是該 Memo 所依賴的值 array，意思跟 useEffect 第二個依賴 Array 參數一樣，有變動的話才會重新 render 此函式
    const user = useMemo(()=>{
        //解碼token獲得user資料
        //或回傳空{}
        let user = {
            'name':localStorage.getItem('user'),
            'email':localStorage.getItem('email'),
            'type':localStorage.getItem('type'),
        };
        // console.log('user object',user);
        // console.log('user email object',user.email);
        return user || {}
    },[])

    return (

        <div className="main">
            <Header user={user} />
            {props.children}
        </div>

    )
}


export default Layout;