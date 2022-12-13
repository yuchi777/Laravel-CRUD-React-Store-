import React, { Fragment } from "react";

class Login extends React.Component {

  //********************************* */
  /** 
  1. 命名和綁定
  2. event
  3. this
  4. 傳遞參數
  */
  //********************************* */


  //********************************* */
  // 綁定this
  // constructor(){
  //   super();
  //   console.log(this);
  //   this.handleClick = this.handleClick.bind(this);
  // }
  //********************************* */

  

  //********************************* */
  //直接使用箭頭函式(含綁定this)
  // msg = 'Clicked';
  // handleClick = (msg,event)=>{
  //   // console.log(event.target);
  //   event.preventDefault();
  //   console.log(this);
  //   console.log(event);
  //   console.log(msg);
  //   alert(msg);
  // }
  //********************************* */


  //受控組件
  //非受控組件 ex. input中的ref={this.emailRef}


  state = {
    email:'',
    password:'',
  }



  // State 設定狀態
  //(一)
  // constructor(){
  //   super();
  //   this.state = {
  //     isLike: false

  //   };
  // }

  // (二)
  // state = {
  //   isLike:false,
  //   count:0,
  // };


  //使用Ref
  // emailRef = React.createRef();
  // passwordRef = React.createRef();

  handleSubmit = (event) =>{

    // 1.阻止默認提交送出行為
    event.preventDefault();

    // 2.獲取表單數據
    // const formData = {
    //   eamil: this.emailRef.current.value,
    //   password: this.passwordRef.current.value,
    // };
    console.log(this.state);

    // 3.處理登入邏輯

    // 4.跳轉到首頁
    // this.props.history.push("/");
  }

  // handleClick = ()=>{
  //   使用setState
  //   this.setState({
  //     isLike:!this.state.isLike,
  //     count: this.state.count + 1 ,
  //   });

  //   this.setState({
  //     count: this.state.count + 1 ,
  //   })

  //   this.setState(prevState=>{
  //     return { count: prevState.count + 2}
  //   })

  //   console.log(this.state.count);
  // }


  handleChange = (e) =>{
    // console.log(e);
    console.log(e.target.value);
    console.log(e.target.name);
    //改變狀態
    this.setState({
      [e.target.name]:e.target.value.toUpperCase()
    })

  }
  


  render() {
    return (
      <Fragment>
        <div className="login-wrapper">

          {/* //******************************************************************************************** */ }
          {/* 不同事件綁定方式 */}
          {/* <a href="/" onClick={this.handleClick.bind(this)}>Click</a> */}
          {/* <a href="/" onClick={(event)=>{this.handleClick(event)}}>Click</a> */}
          {/* <a href="/" className="button" onClick={(event)=>{this.handleClick('Clicked',event)}}>Click</a> */}
          {/* <a href="/" className="button" onClick={this.handleClick.bind(this,'Clicked')}>Click</a> */}
          {/* //******************************************************************************************** */ }

          <form className="box login-box"  onSubmit={this.handleSubmit}>
            <div className="field">
              <label className="label">Email</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Email"
                  name="email"
                  // ref={this.emailRef}
                  //讀取值與狀態改變
                  value={this.state.email}
                  onChange={this.handleChange}
                ></input>
              </div>
            </div>
            <div className="field">
              <label className="label">Password</label>
              <div className="control">
                <input
                  className="input"
                  type="password"
                  placeholder="Password"
                  name="password"
                  // ref={this.passwordRef}
                  value={this.state.password}
                  onChange={this.handleChange}
                ></input>
              </div>
              <div className="control">
                <button className="button is-fullwidth is-primary">
                  Login
                </button>
              </div>
            </div>
          </form>

          {/* <div className="control">
            <button className="button is-fullwidth is-link" onClick={this.handleClick}>
              <span className="icon-text">
                <span className="icon">
                  <i class="far fa-thumbs-up"></i>
                </span>
                <span>{this.state.isLike ? 'NO':'YES'}</span>
              </span>
            </button>
          </div> */}


        </div>
      </Fragment>
    );
  }
}

export default Login;
