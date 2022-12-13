// ## 增加商品清單 (Panel的子組件)

import React, { Component } from 'react';

//使用toast //index.js載入toastContainer&ReactToastify.css
import {toast} from 'react-toastify';

import axios from '../commons/axios';

class AddInventory extends Component {


    //設置可控組件,初始值
    state = {
        name:'',
        price: '',
        tags:'',
        image:'',
        status:'available'
    }

    //設置方法 => 綁定每個輸入框input,textarea
    handleChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;

        this.setState({
            //對應每一個name
            [name] : value
        })
    }

    //設置提交submit方法
    submit = (e) => {
        //停止事件預設行為
        e.preventDefault();
        //解構賦值
        const product = {...this.state};
        // console.log(product);

        //透過RESTful API(axios)新增資料
        // axios.post(url[, data[, config]])
        // baseURL: baseURL || 'http://localhost:3003/'
        // url: http://localhost:3003/products
        // data: product
        axios.post('products',product).then((res)=>{
            // console.log(res.data);
            this.props.close(res.data);
            // alert('Add Success');
            toast.success('Add Success');
        })

    }

    //測試設置toastify通知方法
    // showToast = () =>{
    //     toast('default');
    //     toast.info('info');
    //     toast.success('success');
    //     toast.warning('warning');
    //     toast.error('error');
    // }

    render() {
        return (
            <div className="inventory">
                <p className="title has-text-centered">Inventory</p>

                {/* 
                <div className="control">
                    <input type="text" className='input' />
                    <button 
                    className="button" 
                    onClick={()=>{
                        // (3-1)子組件與調用者可以通訊, AddInventory=>Panel 透過close()
                        this.props.close('AddInventory Data');
                    }}>
                    Cancel
                    </button>
                </div> */}


                {/* 使用Bulma的form表單; <textarea>使用value屬性來定義其內容  */}
                <form onSubmit={this.submit}>
                <div className="field">
                    <label className='label label-flex'>Name</label>
                    <div className="control">
                        <textarea className="textarea" name='name' value={this.state.name} onChange={this.handleChange}/>
                    </div>
                </div>
                <div className="field">
                    <label className='label label-flex'>Price</label>
                    <div className="control">
                        <input type="number" name="price" className="input" value={this.state.price} onChange={this.handleChange}/>
                    </div>
                </div>
                <div className="field">
                    <label className='label label-flex'>Tags</label>
                    <div className="control">
                        <input type="text" name="tags" className="input" value={this.state.tags} onChange={this.handleChange}/>
                    </div>
                </div>
                <div className="field">
                    <label className='label label-flex'>Image</label>
                    <div className="control">
                        <input type="text" name="image" className="input" value={this.state.image} onChange={this.handleChange}/>
                    </div>
                </div>
                <div className="field">
                    <label className='label label-flex'>Status</label>
                    <div className="control">
                        <div className="select is-fullwidth">
                            <select name="status" value={this.state.status} onChange={this.handleChange}>
                                <option>available</option>
                                <option>unavailable</option>
                            </select>
                        </div>
                    </div>
                </div>
                <br />
                <div className="field is-grouped is-grouped-centered">
                    <div className="control">
                        <button className="button is-link ">Submit</button>
                    </div>
                    <div className="control">
                        <button className="button" type='button' onClick={()=>{this.props.close()}}>Cancel</button>
                    </div>
                    {/* <div className="control">
                        <button className="button is-primary" type='button' onClick={this.showToast}>showToastTest</button>
                    </div> */}
                </div>
                </form>
            </div>
        );
    }
}

export default AddInventory;