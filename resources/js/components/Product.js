import React from 'react';
//使用Panel彈出層
import Panel from './Panel';

import { formatPrice } from '../commons/helpers';
import EditInventory from './EditInventory';
import axios from '../commons/axios';
import { toast } from 'react-toastify';

import {withRouter} from 'react-router-dom';

class Product extends React.Component {


    //設置打開Panel組件//使用open方法
    toEdit = () => {
        Panel.open({
            // EditInventory => Product => Panel.open()
            //import EditInventory並傳遞子組件參數到open()
            component: EditInventory,
            props: {
                product: this.props.product,
                deleteProduct: this.props.delete
            },
            callback: data => {
                console.log(data);
                //如果data不為空
                if (data) {
                    this.props.update(data);
                }
            }
        })
    }

    formatPrice = cents => {
        return (cents / 100).toLocaleString('zh', {
            style: 'currency',
            currency: 'CNY',
        })
    }


    //設置加入購物車事件並綁定按鈕
    //async function 非同步函式
    //await
    addCart = async () => {


        //判斷登入才可以使用增加商品至購物車功能
        if(!localStorage.getItem('user')){
            //先import {withRouter} from 'react-router-dom';獲得history方法
            this.props.history.push('/login');
            toast.info('Please Login')
            return;
        }


        try {
            // 依據userID判斷資料所屬
            const email = localStorage.getItem('email') || {}

            //解構
            const { id, name, image, price } = this.props.product;

            //查詢加入的資料是否重複=>重複則增加mount
            //使用異步await => 需使用async
            //https://www.casper.tw/development/2020/10/16/async-await/#Promise-%E8%88%87-async-await
            const res = await axios.get(`/carts/${id}`);
            // console.log('res:',res);

            const carts = res.data;
            // console.log('carts:',carts);

            //如果carts不為空且字串長度大於0
            if (carts && carts.length > 0) {
                
                const cart = carts[0];
                cart.mount = cart.mount + 1;
                // console.log('cartsin...');
                // console.log('carts[0]',cart);
                // console.log('cart.mount',cart.mount);

                //更新id為cart.id // 參數cart
                // console.log('card id:',cart.id);
                // console.log('cart',cart);
                await axios.put(`/carts`, cart).then((re)=>{
                    // console.log('put method res',re.data);
                });
            } else {
                console.log('adding...');
                const cart = {
                    productId: id,
                    name: name,
                    image: image,
                    price: price,
                    mount: 1,
                    // userId: email
                }

                //使用RESTful API
                // axios.post(url[, data[, config]])
                // baseURL: baseURL || 'http://localhost:3003/'
                // data: cart
                await axios.post('/carts', cart).then((res) => {
                    console.log(res.data);
                })
            }
            
            toast.success('Add Cart Success')
            //透過Products父組件使用updateCartNum()
            this.props.updateCartNum();
        } catch (error) {
            toast.error('Add Cart Failed')
        }
    }

    //定義函數判斷用戶類型並返回render模板
    renderMangerBtn = () => {

        //獲取用戶資料,若沒有登入為空給空對象
        const user = localStorage.getItem('type') || {}

        if(user == 1){
            return(
                <div className="p-head has-text-right" onClick={this.toEdit}>
                    <span className="icon edit-btn">
                        <i className="fas fa-sliders-h"></i>
                    </span>
                </div>
            );
        }

    };


    render() {
        // ES6
        //this.state.products.map((p)=>{ <Product product={p} /> } => this.props.product
        const { name, image, tags, price, status } = this.props.product;
        const _pClass = {
            available: 'product',
            unavailable: 'product out-stock'
        };


        return (
            // <div className="product out-stock">
            <div className={_pClass[status]}>
                <div className="p-content">

                    {/* 因class component要加this */}
                    {this.renderMangerBtn()}

                    <div className="img-wrapper">
                        <div className="out-stock-text">Out of Stock</div>
                        <figure className="image is-4by5">
                            {/* <img src="/images/2.jpg" alt="" /> */}
                            {/* <img src="http://fakeimg.pl/640x480/" alt="Nike Paul George PG 3" /> */}
                            <img src={image} alt={name} />
                        </figure>
                    </div>
                    <p className="p-tags">{tags}</p>
                    <p className="name">{name}</p>

                </div>

                <div className="p-footer">
                    <p className="price">{formatPrice(price)}</p>
                    <button className="add-cart"
                        disabled={status === 'unavailable'}
                        onClick={this.addCart}>
                        <i className="fas fa-shopping-cart"></i>
                        <i className="fas fa-exclamation"></i>
                    </button>
                </div>
            </div>
        )
    }
}

export default withRouter(Product);