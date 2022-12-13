//使用jwt-decode
// import jwt_decode from 'jwt-decode';

// 兩種不同的 web storage 物件
// 1. localStorage：可以跨瀏覽器分頁做使用、使用者關掉分頁或瀏覽器再打開資料仍不會消失，且資料無期效限制，資料將永久被保留。
// 2. sessionStorage：生命週期較短，當使用者關掉瀏覽器或分頁時，sessionStorage 中的資料將被清空。

//存入jwToken使用localStorage.setItem(key,value)
//Key
// const JWT = 'store_token_id';
// const setToken = token => {
//     localStorage.setItem(JWT, token)
// }

//取出jwToken使用localStorage.getItem(key,value)
// const getToken = token => {
//     return localStorage.getItem(JWT)
// }

//定義函數判斷登入
// const isLogin = () =>{
//     //是否token已經存入
//     //判斷是否有jwToken
//     const jwToken = getToken();

//     //如果token有值和時間搓沒有過期
//     return !!jwToken && !isTokenExpired(jwToken);
// }

//token是否有效和時間搓超時
// const isTokenExpired = token =>{
//     try{
//         const _info = jwt_decode(token);
//         let exp = _info.exp;
//         let dateTime = Date.now();
//             //console.log('_info.exp',exp);
//             //console.log('Date.now()',dateTime/1000);

//         if(exp < (dateTime/1000)){
//             return true;
//         }else{
//             return false;
//         }
//     }catch(error){
//         return false;
//     }
// };

//定義函數解碼token獲得訊息
// const getUser = () =>{
//     //取出jwToken
//     const jwToken = getToken();

//     //判斷是否登入
//     if(isLogin()){
//         //使用jwt-decode獲得user資料
//         const user = jwt_decode(jwToken);
//         return user;
//     }else{
//         return null;
//     }
// }


//登出
//拿掉token
//localStorage.removeItem(key)
//key => JWT = 'store_token_id';
const logout = () =>{
    localStorage.removeItem('user');
    localStorage.removeItem('email');
    localStorage.removeItem('type');
}


//原export導出改使用全域global以便每次使用
global.auth = {
    // setToken,
    // getToken,
    // getUser,
    // isLogin,
    logout
}