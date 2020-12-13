import React, { useState, useEffect } from 'react';
import Logo from '../assets/images/logo.png';
import { EditProfile } from '../components/Edit.Profile';
import { Redirect, useHistory } from 'react-router-dom';
import BG from '../assets/images/neon-circle.png';
import axios from 'axios';

export const HomePage = () => {
    const history = useHistory();
    const [toggleProfile, setToggleProfile] = useState(false);
    const [toggleModel, setToggleModel] = useState(false);

    const accessToken = localStorage.getItem('access');
    const username = localStorage.getItem('username');

    const [getNickname, setGetNickname] = useState('');
    const [getProfilePic, setGetProfilePic] = useState('');
    useEffect(() => {
        const config = {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        }
        axios.get('http://localhost:8000/api/account/profile/', {params: {username: username}}, config)
        .then(res => {
            setGetNickname(res.data.nickname);
            setGetProfilePic(res.data.profile_pic);
        })
        .catch(err => {console.log(err)})
    }, [getProfilePic])
    
    const dropdown = (e) => {
        const id = e.target.dataset.id;
        if(id){
            const dropdownDiv = document.querySelector(`#${id}`);
            setToggleProfile(!toggleProfile);
            !toggleProfile 
            ? dropdownDiv.classList.remove('hidden') 
            : dropdownDiv.classList.add('hidden');
        }
    }

    const modelOn = (e) => {
        setToggleModel(true);
        setToggleProfile(false);
        document.querySelector(`#profile`).classList.add('hidden');
    }

    
    const modelOff = (e) => {
        e.preventDefault();
        setToggleModel(false);
    }

    const logoutUser = (e) => {
        localStorage.removeItem('access');
        localStorage.removeItem('username');
        history.push('/login');
    }

    return (
        <div>
            <header className="flex p-8 items-center">
                <div className="flex-1 flex items-center">
                    <img src={Logo} alt="logo" className="w-16 h-16" />
                    <p className="text-2xl pl-4">Assignment</p>
                </div>
                <div className="relative">
                    <ul className="flex gap-10 items-center">
                        <li className="capitalize">{username}</li>
                        <li className="flex items-center cursor-pointer" onClick={dropdown} data-id="profile">
                            <div className="profile-img overflow-hidden mr-2">
                                <img src={getProfilePic} alt="profile" className={`w-full h-full`}/>
                            </div>
                            <i className="fas fa-chevron-down"></i>
                        </li>
                    </ul>
                    <ul className="absolute bg-gray-800 rounded-lg hidden" style={{right: '0px', top: '4rem'}} id="profile">
                        <li onClick={modelOn} className="py-2 px-8 cursor-pointer">Edit Profile</li>
                        <li onClick={logoutUser} className="py-2 px-8 cursor-pointer relative z-10">Logout</li>
                    </ul>
                </div>
            </header>

            <div>
                {
                    toggleModel && <EditProfile modelOff={modelOff} setGetNickname={setGetNickname} setGetProfilePic={setGetProfilePic}/> 
                }

                <section className="px-8 flex justify-center h-full relative" 
                    style={{
                        height: 'calc(100vh - 8rem)', 
                        backgroundImage: `url(${BG})`
                    }}>
                    <div className="mt-16 text-center">
                        <p className="text-2xl font-medium">Welcome to the Assignment</p>
                        <p className="text-2xl font-semibold">{getNickname}!</p>
                    </div>
                </section>
            </div>
        </div>
    )
}
