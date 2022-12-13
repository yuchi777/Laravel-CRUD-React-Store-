import React, { useState, useEffect,useMemo } from 'react';
import CartItem from '../components/Cartitem';
import Layout from '../Layout';
import axios from '../commons/axios';
import { formatPrice } from '../commons/helpers';

//加入過場效果
//<TransitionGroup component={null}> 取消外層div
import { TransitionGroup, CSSTransition} from 'react-transition-group';

//動態渲染畫面 : 獲取資料 => 放置內部狀態改變
//function Component函數組件 : 沒有狀態的渲染,可使用props, 不可使用state, 要使用hook => useState
//Class Component類別組件 : 可以定義內部狀態 , 可使用state, 可使用componentDidMount
//生命週期函數(),第一次渲染之後時執行此函數
//因為componentDidMount 只存在class component,若要在function component使用 => Hook => useEffect
//使用Hook: 是React v16.8 新增特性,可以在不編寫class情況下使用state以及其他React特性
//使用Hook => import {useState}


//class Component範例
// class Cart extends React.Component{

//     state = {
//         cart:[]
//     }

//     componentDidMount(){
//         axios.get('/carts').then(res => this.setState({
//             carts: res.data
//         }))
//     }

//     render(){

//     }
// }



const Cart = () => {

    //使用 Hook => useState(初始值) 
    const [carts, setCarts] = useState([]) // 返回[],使用解構? [carts, setCarts] = [ ]

    //使用Hook => useEffect
    //第一次渲染或每次更新時執行useEffect
    // useEffect(()=>{
    //     axios.get('/carts').then( (res)=>{
    //         return(this.setState({
    //             cart: res.data
    //         }))
    //     })
    // })
    // 第二個參數[carts]變化時執行(重複),[]空值=>執行一次
    useEffect(() => {
        // console.log('test');
        // 依據userID判斷資料所屬
        // const user = global.auth.getUser() || {}
        // axios.get(`/carts?userId=${user.email}`).then(res => setCarts(res.data))
        axios.get(`/carts`).then(res => setCarts(res.data))
    }, [])

    //總價格
    // reduce() 方法將一個累加器及陣列中每項元素（由左至右）傳入回呼函式，將陣列化為單一值。
    // const totalPrice = () => {
    //     const totalPrice = carts.map(cart => cart.mount * cart.price).reduce((a, value) => a + value, 0);
    //     return formatPrice(totalPrice);
    // }
    //優化 => 使用hook => useMemo => 返回值不是函數(使用時不能為函數{totalPrice()})
    const totalPrice = useMemo(()=>{
        const totalPrice = carts.map(cart => cart.mount * cart.price).reduce((a, value) => a + value, 0);
        return formatPrice(totalPrice);
    },[carts]);


    //更新資料
    const updateCart = (cart) => {
        //cart為傳遞過來的值

        //獲取新的數組
        const newCarts = [...carts];
        //使用id相等替換相對資料
        const _index = newCarts.findIndex(re => re.id === cart.id );
        //splice() 方法可以藉由刪除既有元素並／或加入新元素來改變一個陣列的內容。
        //array.splice(index[, deleteCount[, item1[, item2[,...]]]])
        newCarts.splice(_index,1,cart);
        setCarts(newCarts);

    }


    //接收子組件傳遞的cart
    //從資料中刪除
    //使用filter() 過濾傳遞過來的cart
    //保留不相同的id資料,把相同的id過濾
    const deleteCart = (cart) => {
        const _carts = carts.filter( c => c.id !== cart.id);
        setCarts(_carts);
    }

    return (

        <Layout>
            <div className="cart-page">
                <span className="cart-title">Shopping Cart</span>
                <div className="cart-list">
                    
                    <TransitionGroup component={null}>
                    {
                        carts.map((cart) => {
                            return<CSSTransition classNames="cart-item" timeout={300} key={cart.id}>
                                    <CartItem 
                                    key={cart.id} 
                                    cart={cart} 
                                    updateCart={updateCart} 
                                    deleteCart={deleteCart}/>
                                    </CSSTransition>
                        })
                    }
                    </TransitionGroup>

                </div>
                
                {
                    carts.length === 0 ? <p className="no-cart">NO GOODS</p> : ''
                }
                

                <div className="cart-total">
                    Total:
                    <span className="total-price">{totalPrice}</span>
                </div>
            </div>
        </Layout>

    )
};

export default Cart;