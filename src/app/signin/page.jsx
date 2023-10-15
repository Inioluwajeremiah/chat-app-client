"use client";

import React, { useState } from "react";

const SignInScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = () => {
    setLoading(true);
    fetch("http://127.0.0.1:5000/signin/", {
      method: "POST",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password
      }),
    })
      .then((resp) => resp.json())
      .then((result) => {
        alert(result.message);
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
        <p className="mx-auto font-bold text-blue-500">Sign In</p>
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
        onClick={handleSignIn}
      >
        {loading ? "Loading...": "Sign In"}
      </button>
    </div>
  );
};

export default SignInScreen;
