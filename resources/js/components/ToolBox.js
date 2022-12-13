import React from 'react';

//使用<Link to="/cart">
// import {Link} from 'react-router-dom';

import {withRouter} from 'react-router-dom';

//使用toast
import { toast } from 'react-toastify';
class ToolBox extends React.Component{


    
    state = {
        searchText:''
        
    };

    //綁定資料 //input onChange
    handleChange = (e)=>{
        //input獲取輸入的值value
        const value = e.target.value;
        this.setState({
            searchText:value
        });

        //從父組件獲取函數並帶入input獲取輸入的值value
        this.props.search(value)

    }

    //清除資料 //button onClick
    clearSearchText = ()=>{
        this.setState({
            searchText:''
        });

        //從父組件獲取函數帶入空值
        this.props.search('')
    }

    //搜尋方法邏輯(函數) 
    //要控制篩選state的products資料,篩選完則改變setState 
    //在ToolBox Component無法改變state的products資料=>必須在Products Component內部=>search function 從內部設置
    //在Products Component調用search function => 透過參數傳遞(子組件獲取父組件參數)
    // search = (text) =>{
    //     console.log(text);
    // }




    //更新購物車數量
    // updateCartNum() 函數由Products父組件定義
    // ToolBox 子組件 <= Products 父組件 => Product 子組件 => 使用updateCartNum 函數
    // Add Cart Success 觸發
    // 一開始畫面渲染時 componentDidMount()


    //購物車的路徑設定不使用<Link to="/cart">
    //使用import {withRouter} from 'react-router-dom' => 獲得history
    //使用history.push()
    goCart = () => {

        //判斷登入才可以使用購物車
        if(!localStorage.getItem('user')){
            this.props.history.push('/login');
            toast.info('Please Login')
            return;
        }
        this.props.history.push('/cart');
    }

    

    render(){
        return(
            <div className="tool-box">
                <div className="logo-text">Store</div>
                <div className="search-box">
                    <div className="field has-addons">
                        <div className="control">
                            <input  
                            type="text" 
                            placeholder='Search Product' 
                            className="input search-input" 
                            value={this.state.searchText}
                            onChange={this.handleChange}
                            />
                        </div>
                        <div className="control">
                            <button className="button" onClick={this.clearSearchText}>X</button>
                        </div>
                    </div>
                </div>
                {/* <Link to="/cart" className="cart-box">
                    <i className="fas fa-shopping-cart"></i>
                    <span className="cart-num">({this.props.cartNum})</span>
                </Link> */}
                {
                    (localStorage.getItem('user'))
                    ? 
                    (
                        <div to="/cart" className="cart-box" onClick={this.goCart}>
                            <i className="fas fa-shopping-cart"></i>
                            <span className="cart-num">({this.props.cartNum})</span>
                        </div>
                    )
                    : ""
                            
                }
                
            </div>
        )
    }
}

export default withRouter(ToolBox);