import React from 'react';
import './style.scss'

const Login = (props) => {
    const { isLoggedIn , setLog } = props;
    return (
        <div className="loginContainer">
            <h2 className="loginTitle">Connexion</h2>
            <form className='loginForm' action="">
                <div className='inputContainer'>
                    <label htmlFor="login">Login :</label>
                    <input type="text" name="login" id="login" />
                </div>
                <div className='inputContainer'>
                    <label htmlFor="password">MDP :</label>
                    <input type="password" name="password" id="password" />
                </div>
                <button onClick={() => setLog(true)}>Submit</button>
            </form>
        </div>
    )
}

export default Login;