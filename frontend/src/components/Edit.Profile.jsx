import React, { useState } from 'react';
import axios from 'axios';

export const EditProfile = ({ modelOff, setGetNickname, setGetProfilePic }) => {
    const [nickname, setNickname] = useState('');
    const [profileImageName, setProfileImageName] = useState('');
    const [profilePic, setProfilePic] = useState(null);
    const [toggleAlert, setToggleAlert] = useState(false);

    const accessToken = localStorage.getItem('access');
    const username = localStorage.getItem('username');

    const handleInput = (e) => {
        const val = e.target.name;
        if(val === 'nickname'){
            setNickname(e.target.value);
        }else{
            const fileVal = e.target.files[0];
            setProfileImageName(fileVal.name);
            setProfilePic(fileVal);
        }
    }

    const updateProfile = (e) => {
        e.preventDefault();
        const uploadData = new FormData();
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        uploadData.append('username', username);
        uploadData.append('nickname', nickname);
        if (profilePic){
            uploadData.append('file', profilePic, profilePic.name);
        }
        axios.post('http://localhost:8000/api/account/profile/', uploadData, config)
        .then(res => {
            setGetNickname(nickname);
            setGetProfilePic(profilePic);
            setNickname('');
            setProfilePic(null);
            setToggleAlert(true);

            setTimeout(() => {
                setToggleAlert(false);
                modelOff(e);
            }, 2000);
            
        })
        .catch(err => {console.log(err)})
    }

    return (
        <div className="w-1/2 absolute bg-gray-900 p-8 rounded-lg z-10" style={{top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
            <form action="" className="" id="editProfile" onSubmit={updateProfile} content-type="multipart/form-data">
                <h1 className="text-4xl font-medium">Edit Profile</h1>
                <div className="mt-6">
                        <div className="border border-gray-200 rounded-lg flex flex-col py-2 px-4">
                            <label htmlFor="" className="text-sm">Nickname</label>
                            <input type="text" name="nickname" value={nickname} onInput={handleInput} className="h-8 py-2 inputField" autoComplete="off" />
                        </div>
                    </div>
                    <div className="mt-4">
                        <div className="w-full border border-gray-200 rounded-lg inline-flex flex-col py-2 px-4 relative">
                            <label htmlFor="" className="text-sm">Profile</label>
                            <div className="relative">
                                <input type="file" name="profilePic" onChange={handleInput} className="opacity-0 absolute top-0 right-0 left-0 bottom-0"/>
                                <div className="flex">
                                    <input type="text" value={profileImageName} placeholder="Choose a profile picture" className="flex-1 h-8 py-2 inputField " disabled/>
                                    {/* <div className="profile-img">
                                        <img src={profilePic} alt="profile-pic" className={`${!profilePic && 'hidden'}`}/>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 flex gap-10">
                        <button className="btn--primary rounded-lg w-1/2">Update</button>
                        <button className="btn--secondary rounded-lg w-1/2" onClick={modelOff}>Cancel</button>
                    </div>
            </form>
            
            {
                toggleAlert && (
                    <div className="bg-green-700 p-4 inline-block rounded-lg absolute" style={{top: '-120px', right: '-40%'}}>
                        <p className="">Profile updated successfully</p>
                    </div>
                )
            }
            
        </div>
    
    )
}
