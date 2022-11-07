/* File Name: Login.js
   Description: This file contains the code for the login page.
   Copyright (c) 2022, Elym Holdings LLC, All rights reserved.
   This source code is confidential and proprietary to Elym Holdings LLC.
    No part of this source code may be reproduced, stored, transmitted,
    disclosed or used in any form or by any means other than as
    expressly provided by the written Software License Agreement (SLA) between Elym Holdings LLC and you (the licensee).
*/

import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { home } from './Main';
import '../styles/App.css';
import { appUrl, cdnUrl } from '../Config';

// create a function named Login that is a login system
function Login() {
    // create a variable named history that is a useHistory hook
    const history = useHistory();
    // create a variable named email that is a useState hook
    const [email, setEmail] = useState('');
    // create a variable named password that is a useState hook
    const [password, setPassword] = useState('');
    // create a variable named error that is a useState hook
    const [error, setError] = useState('');
    // create a variable named loading that is a useState hook
    const [loading, setLoading] = useState(false);
    
    // create a function named handleSubmit that is an async function
    async function handleSubmit(e) {
        // prevent the default action of the event
        e.preventDefault();
        // set the loading variable to true
        setLoading(true);
        // set the error variable to an empty string
        setError('');
        // create a variable named response that is a fetch request to the /login endpoint
        const response = await fetch('/login', {
        // set the method to POST
        method: 'POST',
        // set the headers to a JSON object
        headers: {
            'Content-Type': 'application/json'
        },
        // set the body to a JSON object
        body: JSON.stringify({
            // set the email property to the email variable
            email,
            // set the password property to the password variable
            password
        })
        });
        // create a variable named data that is the response converted to JSON
        const data = await response.json();
        // if the response status is not 200
        if (response.status !== 200) {
        // set the error variable to the data message
        setError(data.message);
        // set the loading variable to false
        setLoading(false);
        } else {
        // set the loading variable to false
        setLoading(false);
        // set the history location to the home variable
        history.push(home);
        }
    }
    
    // return the following JSX
    return (
        <center>
        <br/> <img src={"//"+cdnUrl+'/cdn-1/favicon.ico'} height='75' width='75' alt="alyocord logo"/> <br/>
        <h1>Alyocord</h1>
        <form onSubmit={handleSubmit}>
            <input
            type='email'
            placeholder='email@example.com'
            value={email}
            onChange={e => setEmail(e.target.value)}
            /> <br/>
            <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={e => setPassword(e.target.value)}
            /> <br/>
            <button className='button' type='submit' disabled={loading}>
            {loading ? 'Loading...' : 'Login'}
            </button>
        </form>
        <br/>
        <Link to='/register'>Register</Link>
        <br/> 
       
        <br/>
        <br/>
        {error && <p>{error}</p>}
        </center>
    );
}
export default Login;
//  <Link to='/forgot'>Forgot Password</Link> - Put on L94 when forgetting password works