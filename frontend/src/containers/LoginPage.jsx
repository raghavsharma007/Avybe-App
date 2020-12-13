import React, { useEffect, useState } from 'react';
import Logo from '../assets/images/logo.png';
import { Form } from '../components/Form';


export const LoginPage = (props) => {
    return (
        <div className="md:flex h-screen">            
            <section className="md:flex-1 px-8 left-container">
                <div className="flex items-center py-8 absolute">
                    <img src={Logo} alt="logo" className="w-16 h-16" />
                    <p className="text-2xl pl-4">Assignment</p>
                </div>

                <div className="flex flex-col justify-center h-full">
                    <h1 classettingdsName="text-4xl leading-snug" style={{marginBottom: '-1rem'}}>Explore the unseen exclusively on</h1>
                    <p className="font-bold yeseva-one avybe-title" style={{fontSize: "8rem"}}>Avybe</p>
                </div>
            </section>
            <section className="md:flex-1 px-8">
                <Form />
            </section>
        </div>
    )
}
