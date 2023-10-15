'use client'

import React, { useEffect, useState } from 'react'
import cookies from 'js-cookie';

const ChatScreen = () => {

    const [message, setMessage] = useState('')

    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }


    async function makeRequestWithJWT() {

        // const csrf_token = getCookie('csrf_access_token')
        // alert(csrf_token)
        const options = {
          method: 'GET',
          credentials: 'include',
          headers: {
           "Content-Type": "application/json"
          },
        };
        try {
            const response = await fetch('http://127.0.0.1:5000/chat/', options);
            const result = await response.json();
            console.log("result =>", result);
            // return result;   
        } catch (error) {
            console.log("error =>", error)
        }
    }
    
    useEffect(() => {

        // fetch('http://127.0.0.1:5000/chat/', {
        //   method: "POST",
        //   credentials:'same-origin',

        //   headers: {
        //     // "Content-Type": "application/json", 
        //     'X-CSRF-TOKEN': getCookie('csrf_access_token')
        //   },
        // }).then(res => res.json()).then(result => {
        //   setMessage(result.message)
        // }).catch(error => alert(error.message))
        const fetchData = async () => {
            try {
              const jwt = cookies.get('access_token_cookie'); // Retrieve the JWT from your HTTP-only cookie
              const csrfToken = cookies.get('csrf_access_token'); // Retrieve the CSRF token from your client-readable cookie
              alert(jwt,  csrfToken)
              const response = await fetch('http://127.0.0.1:5000/chat/', {
                method: 'GET',
                credentials: 'include', // Include credentials (cookies)
                headers: {
                  'X-CSRF-TOKEN': csrfToken, // Send the CSRF token in the header
                  'Authorization': `Bearer ${jwt}`, // Send the JWT token in the header
                },
              });
      
              if (response.ok) {
                const result = await response.json();
                setMessage(result.message);
              } else {
                // Handle unauthorized access or other errors
                console.error('Error:', response.status, response.statusText);
              }
            } catch (error) {
              console.error('Error:', error);
            }
          };
      
        //   fetchData();
      
      }, [])

  return (
    <div>
        <p>{message ? message : "no message retrieved"}</p>
        <button className='p-4 bg-green-500 rounded-md flex mx-auto' onClick={makeRequestWithJWT}>chat</button>
    </div>
  )
}

export default ChatScreen