"use client";

import React, { useState } from "react";

const SignUpScreen = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = () => {
    
    setLoading(true);
    fetch("http://127.0.0.1:5000/signup/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        username: username,
        password: password,
      }),
    })
      .then((resp) => resp.json())
      .then((result) => {
        alert(result.message);
        if (result.message == 'Authentication code sent to user email') {
            localStorage.setItem('chat-app-username', username)
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };
  return (
    <div className="max-w-[500px] border border-[#ddd]  mx-auto my-10 p-4">
      <div className="flex flex-col">
        <p className="mx-auto font-bold text-blue-500">Sign Up</p>
        <label htmlFor="" className="mt-4">
          email
        </label>
        <input
          type="email"
          placeholder="email"
          className="border border-[#ddd] p-2"
          onChange={(e) => setEmail(e.target.value.trim())}
        />
        <label htmlFor="" className="mt-4">
          username
        </label>
        <input
          type="text"
          placeholder="username"
          className="border border-[#ddd] p-2"
          onChange={(e) => setUsername(e.target.value.trim())}
        />
        <label htmlFor="" className="mt-4">
          password
        </label>
        <input
          type="text"
          placeholder="password"
          className="border border-[#ddd] p-2"
          onChange={(e) => setPassword(e.target.value.trim())}
        />
      </div>
      <button
        className="mt-6 p-2 bg-green-500 text-white rounded-md mx-auto flex justify-center"
        onClick={handleSignUp}
      >
        {loading ? "loading..." : "Sign Up"}
      </button>
    </div>
  );
};

export default SignUpScreen;
