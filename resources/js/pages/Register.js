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
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: {
      email: "",
      password: ""
    }
  });

  console.log(errors);
  // console.log(watch("email"));

  const onSubmit = async data => {

    // 2.獲取表單數據
    // const formData = {
    //   eamil: this.emailRef.current.value,
    //   password: this.passwordRef.current.value,
    // };
    
    console.log(data);

    // 3.處理註冊邏輯
    //axios串驗證
    try {
      //解構附值
      const { nickname, email, password } = data;
      //type: 1 =>admin; 0 => user
      //串API
      const response = await axios.post('/auth/register', { nickname, email, password, type: 2  });
      console.log('response:',response);


      toast.success('Register Success');

      // 4.跳轉到首頁
      props.history.push("/login");
    } catch (error) {
      console.log(error.response.data);
      const message = error.response.data.message;
      toast.error(message);

    }

  }


  return (
    <div className="login-wrapper">

      <form className="box login-box" onSubmit={handleSubmit(onSubmit)}>
        <div className="field">
          <label className="label">Nickname</label>
          <div className="control">

            <input
              className={`input ${errors.nickname && 'is-danger'}`}
              type="text"
              placeholder="Nickname"
              name="nickname"
              {...register("nickname", { 
                required: 'nickname is required', 
              
              })}
            ></input>

            {errors.nickname && (
              <p className="helper has-text-danger">{errors.nickname.message}</p>)}
          </div>
        </div>
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
              Submit
            </button>
          </div>
        </div>
      </form>



    </div>
  )
}
