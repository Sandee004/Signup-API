import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

const SignUp = () => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    const submitForm = async(e:React.FormEvent) => {
        e.preventDefault()

        const data = {
            username,
            email,
            password,
        }

        const url = 'http://localhost:5000/signup'
        //const url = 'https://signup-api-f02o.onrender.com/signup'

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }

        try {
        const response = await fetch(url, options)
        if (!response.ok) {
            const error = await response.json();
            const errorMessage = error.message || "Signup failed";
            alert(errorMessage);
            return;
          }
    
        navigate("/")
          //alert("Signup successful!");
        } catch (error) {
          console.error("Error submitting signup:", error);
          alert("An unexpected error occurred. Please try again later.");
        }
      };


    return (
        <>
        <p className="font-bold text-2xl text-center my-10">SignUp</p>

        <form className="flex flex-col justify-center items-center" onSubmit={submitForm}>
            <input
            placeholder="Username"
            className="border-black italic  border-2 rounded-sm px-5 py-2 w-[80%] my-2 sm:w-[60%]"
            type="text"
            id= "username"
            value={username}
            onChange={(e) => {setUsername(e.target.value)}}
            />

            <input
            placeholder="Email"
            className="border-black italic  border-2 rounded-sm px-5 py-2 w-[80%] my-2 sm:w-[60%]"
                type='email'
                id='email'
                value={email}
                onChange={(e) => {setEmail(e.target.value)}}
                />

            <input
            placeholder="Password"
            className="border-black italic  border-2 rounded-sm px-5 py-2 w-[80%] my-2 sm:w-[60%]"
            type="password"
            id="password"
            value={password}
            onChange={(e) => {setPassword(e.target.value)}}
            />

            <button className="bg-green-400 w-[80%] py-2 rounded-sm hover:bg-green-600 font-bold mt-2" type="submit">SignUp</button>
        </form>
        </>
    )
}

export default SignUp