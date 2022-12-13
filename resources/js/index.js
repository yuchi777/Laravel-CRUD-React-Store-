import React from 'react';
import ReactDOM from 'react-dom';
import {ToastContainer} from 'react-toastify';

import Router from './Router';
import './commons/auth';
import "../../public/css/app.css";

function Index() {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">Index Component</div>

                        <div className="card-body">I'm an Index component!</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Index;

if (document.getElementById('root')) {
    ReactDOM.render(
        <div>
        <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        />
        <Router/>
    </div>, document.getElementById('root')
    );
}
