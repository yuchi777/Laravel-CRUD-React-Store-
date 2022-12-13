//使用 React Hook Form 函式庫***************************************************
import React from "react";
import { useForm } from "react-hook-form";
//使用axios
import axios from "../commons/axios";
//使用toast
import { toast } from 'react-toastify';





//function component
export default function Login(props) {

  

  //useFrom為函式返回需要用的值並解構附值
  // const { register, handleSubmit, watch, formState: { errors } }
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: "",
      password: ""
    }
  });

  // console.log(errors);
  // console.log(watch("email"));

  const onSubmit = async data => {

   
    try {
      //解構附值
      const { email, password } = data;

      axios.get('/auth/login').then((re)=>{
        // console.log('response:',re.data);
        // console.log('data:',data);
        
        re.data.forEach((reData)=>{

          if((reData.email == data.email) && (reData.password == data.password)){
            console.log('Login Name:',reData.nickname);
            localStorage.setItem('user', reData.nickname)
            localStorage.setItem('email', reData.email)
            localStorage.setItem('type', reData.type)
          }
        })

        let check = re.data.findIndex(
          user => user.email === email && user.password === password
        );

        if(check == -1){
          alert('登入錯誤')
        }else{

          toast.success('Login Success');


            setTimeout(() => {
              props.history.push("/");
            }, 3000);
        }

      });
      
      

      

      // 4.跳轉到首頁
      // props.history.push("/");
    } catch (error) {
      console.log(error.response.data);
      const message = error.response.data.message;
      toast.error(message);
    }




    
  }


  return (
    <div className="login-wrapper">

      {/* //******************************************************************************************** */}
      {/* 不同事件綁定方式 */}
      {/* <a href="/" onClick={this.handleClick.bind(this)}>Click</a> */}
      {/* <a href="/" onClick={(event)=>{this.handleClick(event)}}>Click</a> */}
      {/* <a href="/" className="button" onClick={(event)=>{this.handleClick('Clicked',event)}}>Click</a> */}
      {/* <a href="/" className="button" onClick={this.handleClick.bind(this,'Clicked')}>Click</a> */}
      {/* //******************************************************************************************** */}

      <form className="box login-box" onSubmit={handleSubmit(onSubmit)}>
        <div className="field">
          <label className="label">Email</label>
          <div className="control">

            <input
              className={`input ${errors.email && 'is-danger'}`}
              type="text"
              placeholder="Email"
              name="email"
              {...register("email", { 
                required: 'email is required', 
                pattern: {
                value: /^[a-za-z0-9_-]+@[a-za-z0-9_-]+(\.[a-za-z0-9_-]+)+$/, //email驗證正則表達式
                message: 'invalid email' // JS only: <p>error message</p> TS only support string
              } })}
            ></input>

            {errors.email && (
              <p className="helper has-text-danger">{errors.email.message}</p>)}
          </div>
        </div>
        <div className="field">
          <label className="label">Password</label>
          <div className="control">

            <input
              className={`input ${errors.password && 'is-danger'}`}
              type="password"
              placeholder="Password"
              name="password"
              {...register("password", { 
                required: 'password is required', 
                minLength: { value: 6, message: "Min length is 6" } })}
            ></input>

            {errors.password && (
              <p className="helper has-text-danger">{errors.password.message}</p>)}
          </div>
          <br />
          <div className="control">
            <button className="button is-fullwidth is-primary">
              Login
            </button>
          </div>
        </div>
        <div className="field">
          <label className="label">測試Email: admin@123.com</label>
          <label className="label">Password: admin123</label>
        </div>
      </form>
    </div>
  )
}
