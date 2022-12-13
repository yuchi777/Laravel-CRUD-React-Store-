//### 彈出控制面板

//1. 一次渲染, 隨需求調用
//2. 裝載組件
    /**
    (2-1)子組件(AddInventory)作為參數傳遞並被渲染
    (2-2)子組件可以關閉彈出視窗
    (2-3)子組件與調用者可以通訊
    */

import React from 'react';
import {render} from 'react-dom';


class Panel extends React.Component{


    //彈出狀態判斷使用state
    state = {
        active:false,
        component:null,
        callback: ()=>{} //(3-4)
    };

    //彈出視窗關閉
    close = (data) =>{
        
        this.setState({
            active:false
        })
        // (3-2)子組件與調用者可以通訊, AddInventory => Panel 接收data
        // alert(data);
        this.state.callback(data); //(3-5)
    }

    //彈出視窗開啟
    open = (re={
        //設置初始值
        props:{},
        component:null,
        callback:()=>{}
    }) =>{

        //(1)子組件(AddInventory)作為參數傳遞並被渲染
        //解構賦值 => 獲得構造函數 AddInventory(){} => 轉換
        //(3-4)子組件與調用者可以通訊 Products => Panel 接收callback
        const { props, component, callback } = re;
        //時間搓記//藉由key值變更重新渲染畫面
        const _key = new Date().getTime();

        //轉換使用React.createElement()=>獲得實例
        const _component = React.createElement(component, {
            //解構//需要對象=>設置空的初始值=>可以傳遞到Product組件使用
            ...props,
            // (2)子組件可以關閉彈出視窗 => 將close()傳給AddInventory使用
            close: this.close,
            //將key傳給AddInventory使用
            key:_key
        })
        this.setState({
            active:true,
            component:_component,
            callback: callback //(3-4)
        })
    }

    render(){
        //定義狀態
        const _class = {
            true : "panel-wrapper active",
            false: "panel-wrapper"
        }

        return(
            //JS
            //放入組合：obj.name = 'mia' or obj[name] = 'mia'
            //取出值：obj.name or obj[name]
            <div className={_class[this.state.active]}>
                {/* 避免新增空資料 onClick={this.close} => ()=>{this.close()} */}
                <div className="over-layer" onClick={()=>{this.close()}}></div>
                <div className="panel">
                    <div className="head">
                        <span className="close" onClick={()=>{this.close()}}>X</span>
                        {/* <p className="has-text-centered">Children Component</p> */}

                        {this.state.component}

                    </div>
                </div>
            </div>
        )
    }

}

//創建div容器放置<Panel/>
const _div = document.createElement('div');
document.body.appendChild(_div);

//使用render()把<Panel/>放到新建div裡 => render()後則變為一個實例返回全部
const _panel = render(<Panel/>, _div)
console.log(_panel);

export default _panel;