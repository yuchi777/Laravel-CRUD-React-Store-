import React from 'react';
import ToolBox from './ToolBox';
import Product from './Product';
//使用axios (npm install)
import axios from '../commons/axios';

//使用React Transition Group (npm install), 提供Components使用(Transition, CssTransition, SwitchTransition, TransitionGroup)
import {CSSTransition, TransitionGroup} from 'react-transition-group';

//使用Panel Component
import Panel from './Panel';

import AddInventory from './AddInventory';



class Products extends React.Component{

    state = {
        products : [],
        sourceProducts:[],
        cartNum: 0
    }

    componentDidMount(){
        // console.log('---componentDidMount範圍---');
        

        //(一)fetch 方法------------------------------
        // fetch('http://localhost:3003/products')
        // .then( re => re.json())
        // .then((data) =>{
        //     console.log(data);
        //     this.setState({
        //         products : data
        //     });
        // })  

        //(二)axios方法-------------------------------
        axios.get('/products/')
        .then((re)=>{
            console.log(re.data);
            this.setState({
                products: re.data,
                sourceProducts:re.data
            })
        })

        //計算購物車商品累加數量
        this.updateCartNum();
        
    }

    //搜尋方法邏輯(函數)
    //要控制篩選state的products資料,篩選完則改變setState 
    search = (text) =>{
        console.log(text);

        //1. Get New Array //複製新建Data
        let _products = [...this.state.sourceProducts]

        //2. Filter New Array 
        //使用filter方法
        //使用match() 方法用來搭配正規表示式 (Regex)來找出字串中匹配的內容 => 語法:str.match(regexp正規表達式)
        //flag, g:比對字串所有位置, i:不分大小寫
        _products = _products.filter((p) => {
            //ex. name:Abcd
            //text: ab , ===> 結果: ['Ab']
            //text: '' , ===> 結果: ["","","",""]               
            const matchArray = p.name.match(new RegExp(text,'gi'));
            return matchArray !== null;
        })

        //3. setState
        this.setState({
            products: _products
        })
    }

    toAdd = () => {
        Panel.open({
            // AddInventory => Products => Panel.open()
            //import AddInventory並傳遞子組件參數到open()
            component: AddInventory,

            //(3-3)子組件與調用者可以通訊, Products => Panel
            callback: (data) =>{
                if(data){
                    this.add(data);
                }
                // console.log('Products Data:',data);
            }
        });
    };

    //重新渲染
    //新增資料後更新頁面
    add = (e) =>{
        //Get New Array //複製新建Data
        const _products = [...this.state.products];
        _products.push(e);
        const _sproducts = [...this.state.sourceProducts];
        _sproducts.push(e);

        this.setState({
            products:_products,
            sourceProducts:_sproducts
        })
    }

    //重新渲染
    //修改資料(商品列表)後頁面更新
    //解構複製data=>findIndex找到index=>splice修改data
    update = (product) =>{
        //Get New Array //複製新建Data
        //arr.findIndex(callback[, thisArg])
        //array.splice(startIndex[, deleteCount[, item1[, item2[,...]]]])
        const _products = [...this.state.products];
        const _index = _products.findIndex( (p) => p.id === product.id);
        _products.splice(_index,1,product);


        const _sproducts = [...this.state.sourceProducts];
        const _sIndex = _products.findIndex(p=>p.id === product.id);
        _sproducts.splice(_sIndex,1,product); 

        this.setState({
            products:_products,
            sourceProducts:_sproducts
        })
    }


    //重新渲染
    //刪除id項目
    //使用filter過濾不要的id項目 => 返回不相同的id項目, 相同id則過濾
    delete = (id) =>{
        const _products = this.state.products.filter( (p) => p.id !== id );
        const _sproducts = this.state.sourceProducts.filter( (p) => p.id !== id);

        this.setState({
            products:_products,
            sourceProducts: _sproducts,
        })
    }



    //更新購物車數量
    // updateCartNum函數 由父組件定義
    // ToolBox 子組件 <= Products 父組件 => Product 子組件 => 使用updateCartNum 函數
    updateCartNum = async () =>{
        const cartNum = await this.initCartNum()
        this.setState({
            cartNum: cartNum
        });
    }


    //使用RESTful API 獲得資料庫資料 => 更新購物車數量 => 使用setState
    //非同步處理 async => await
    initCartNum = async () => {
        // 依據userID判斷資料所屬
        const user = localStorage.getItem('email') || {}
        const res = await  axios.get(`/carts/`,{
            //get request透過params傳送參數
            params:{
                userId:user
            }
        });
        //定義res.data為carts參數,若無資料則為空陣列[]
        const carts = res.data || [] ;

        //使用map函數撈取mount數量=>陣列[] //ex. [2,2,1,2]
        //使用reduce函數計算累加數值,初始值0
        // const cartNum = carts.map( cart => cart.mount ).reduce((accumulator,currentValue)=>
        //     accumulator + currentValue,0)
        // return cartNum

        const cartNum = carts
        .map( cart => cart.mount )
        .reduce((accumulator,currentValue)=> accumulator + currentValue,0)
        return cartNum;

    }

    render(){
        return(
            <div>
                <ToolBox search={this.search} cartNum={this.state.cartNum}/>
                <div className="products">
                    <div className="columns is-multiline is-desktop">

                    <TransitionGroup component={null}>
                        {
                            this.state.products.map((p)=>{
                                return(
                                    <CSSTransition classNames="product-fade" timeout={300} key={p.id}>
                                        <div className="column is-3">
                                            <Product 
                                            product={p} 
                                            update={this.update} 
                                            delete={this.delete}
                                            updateCartNum={this.updateCartNum}/>
                                        </div>
                                    </CSSTransition>
                                );
                            })
                        }
                    </TransitionGroup>

                        
                        {
                            (localStorage.getItem('type')) == 1 && (
                                <button className="button is-primary add-btn" onClick={this.toAdd}>Add(+)</button>
                            )
                        }
                        
                    </div>
                </div>
            </div>
        )
    }
}

export default Products;