import React from 'react';

//使用router
import { Link, withRouter } from 'react-router-dom';

import Panel from './Panel';
import UserProfile from './UserProfile';




// 改成 function component 
// 父層 Layout => 傳遞props.user
const Header = (props) => {

    const toProfile = () =>{
        Panel.open({
            component: UserProfile,
            //UserProfile的props
            props:{
                user:props.user
            },
            callback: data => {
                console.log(data);
                if( data === 'logout'){
                    // props.history.go(0);
                    // props.history.push("/");
                    location.reload();
                }
            }
        })
    }

    return (

                    <div className="header">
                        <div className="grid">
                            <div className="start">
                                <Link to="/">Home</Link>
                            </div>
                            <div className="end">
                                {
                                (props.user.name) 
                                ?
                                (<span className='nickname' onClick={toProfile}>
                                    <i className='far fa-user'></i>
                                    {props.user.name}
                                </span>) 
                                :
                                (<React.Fragment>
                                    <Link to="/login">Login</Link>
                                    <Link to="/register">Register</Link>
                                </React.Fragment>)
                                }
                            </div>
                        </div>
                    </div>
    )
}



export default withRouter(Header);