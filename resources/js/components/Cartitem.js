import React,{useState, useMemo} from 'react';
import { formatPrice } from '../commons/helpers';
import axios from '../commons/axios';

//一般在<input>的值,屬性裡要用defaultValue
//<input>綁定事件時改為屬性用value

const CartItem = (props) => {

    //input的value值要變成可控組件
    //useState(初始值)
    const[mount, setMount] = useState(props.cart.mount);

    //使用解構賦值
    const{id, name, image, price } = props.cart || {}

    //總和
    //parseInt() 函式能將輸入的字串轉成整數。
    // const sumPrice = formatPrice(mount * (price))
    //優化 => 使用hook => useMemo
    const sumPrice = useMemo(()=>{
        return formatPrice(mount * (price))
    },[mount,price]);


    //input綁定狀態
    const handleChange = (e) => {
        //改變時獲取input值
        const _mount = parseInt(e.target.value);
        //改變內部狀態
        setMount(_mount);

        //獲取一個對象 => 解構 => mount發生變化
        const newCart = {
            ...props.cart,
            mount:_mount
        }

        //使用RESTful API 修改對應的值 
        axios.put(`/carts`, newCart).then((res)=>{
            props.updateCart(newCart);
        });
    }

    //刪除資料透過RESTful API 
    //傳遞cart到父組件Cart Component
    //綁定事件
    const deleteCart = () => {
        // console.log('test');
        axios.delete(`/carts/${id}`).then((res)=>{
            props.deleteCart(props.cart);
        })
    }

    return(
        <div className="columns is-vcentered">
            <div className="column is-narrow" onClick={deleteCart}>
                <span className="close">X</span>
            </div>
            <div className="column is-narrow">
                <img src={image} alt={name} width="100" />
            </div>
            <div className="column cart-name is-narrow">
                {name}
            </div>
            <div className="column">
                <span className="price">{formatPrice(price)}</span>
            </div>
            <div className="column">
                {/* <input type="number" className='input num-input' defaultValue={mount} /> */}
                <input type="number" min={1} className='input num-input' value={mount} onChange={handleChange} />
            </div>
            <div className="column">
                <span className="sum-price">{sumPrice}</span>
            </div>
        </div>
    )
}


export default CartItem;