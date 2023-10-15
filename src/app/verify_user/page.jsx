"use client";

import { useEffect, useState } from "react";

const AuthenticationScreen = () => {

    const [verificationCode, setVerificationCode] = useState('')
    const [loading, setLoading] = useState(false)
    const [username, setUsername] = useState('')

    useEffect(()=> {
      if (typeof window !== 'undefined' && window.localStorage) {
        let username = localStorage.getItem('chat-app-username')
        setUsername(username)
      }
    },[])

    

    const handleVerify = () => {

      // alert(username)
        setLoading(true)
        fetch('http://127.0.0.1:5000/verify_user/', {
          method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                code: verificationCode,
                username: username
            })
        }).then(res => res.json()).then(result => {
            alert(result.message)
            setLoading(false)
        }).catch(err => {
            alert(err.message)
            setLoading(false)
        })
    }
  return (
    <div className="max-w-[500px] border border-[#ddd]  mx-auto my-10 p-4">
      <div className="flex flex-col">
        <p className="mx-auto font-bold text-blue-500">Authentication</p>
        <label htmlFor="" className="mt-4">
          Authentication code
        </label>
        <input
          type="number"
          placeholder="Authentication code"
          className="border border-[#ddd] p-2"
          onChange={(e) => setVerificationCode(e.target.value.trim())}
        />
      </div>
      <button
        className="mt-6 p-2 bg-green-500 text-white rounded-md mx-auto flex justify-center"
        onClick={handleVerify}
      >
        {loading ? "Loading..." : "Verify"}
      </button>
    </div>
  );
};

export default AuthenticationScreen;
