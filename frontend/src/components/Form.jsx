import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Redirect, useHistory } from 'react-router-dom';

export const Form = () => {
    const history = useHistory();
    const [passEye, setPassEye] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [tokenError, setTokenError] = useState(false);


    const passEyeFunction = (e) => {
        const passInput = e.target.previousElementSibling;
        setPassEye(!passEye);
        if(!passEye){
            passInput.type = 'text';
        }else{
            passInput.type = 'password';
        }
    }

    const handleInput = (e) => {
        const val = e.target.name;
        if(val === 'username'){
            setUsername(e.target.value);
        }else{
            setPassword(e.target.value);
        }
    }

    const onLogin = (e) => {
        e.preventDefault();
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        axios
        .post('http://localhost:8000/api/token/', {username, password}, config)
        .then(res => {
            setIsAuthenticated(true);
            localStorage.setItem('access', res.data.access);
            localStorage.setItem('username', username);
            setTokenError(false);
        })
        .catch(err => {
            setTokenError(true);
            setIsAuthenticated(false);
        })
    }
    
    useEffect(() => {
        if (isAuthenticated){
            return setTimeout(() => {
                history.push('/');
            }, 500)
        }
    }, [isAuthenticated])


    return (
        <div className="py-8 flex h-full items-center">
            <form onSubmit={e => onLogin(e)} className="w-full">
                <div className="box block">
                    <p className="tracking-widest">Welcome User!</p>
                    <h1 className="text-4xl font-medium">Login</h1>
                </div>
                <div className="mt-6">
                    <div className="border border-gray-200 rounded-lg flex flex-col py-2 px-4 md:w-1/2">
                        <label htmlFor="" className="text-sm">Username</label>
                        <input type="text" name="username" value={username} onChange={handleInput} className="h-8 py-2 inputField" autoComplete="off" required />
                    </div>
                </div>
                <div className="mt-4">
                    <div className="border border-gray-200 rounded-lg inline-flex flex-col py-2 px-4 md:w-1/2 relative">
                        <label htmlFor="" className="text-sm">Password</label>
                        <input type="password" name="password" value={password} onChange={handleInput} className="h-8 py-2 inputField" required />
                        <i className={`far ${!passEye ? "fa-eye" : "fa-eye-slash"} pass-eye`} onClick={passEyeFunction}></i>
                    </div>
                </div>
                <div className="mt-4">
                    {(tokenError) ? (<div className="pb-2 text-red-500">Incorrect username and password</div>): null}
                    <button className="btn--primary md:w-1/2 rounded-lg">Login</button>
                </div>
            </form>
        </div>
    )
}
