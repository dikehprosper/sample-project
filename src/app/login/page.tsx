"use client";
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useRouter,  } from "next/navigation";
import img from "./meta.png"
import  axios from "axios";
import Checkbox from '@mui/material/Checkbox';
import Image from 'next/image';
import bgImage1 from "../meta.png";

const LoginPage = () => {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
   
    })

    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false)


    const onLogin = async () => {
  try {
  setLoading(true);
  const response = await axios.post("/api/users/login", user);
  console.log("Login success", response.data);
//   toast.success("Login success")
  router.push("/profile")
  }
        
  catch (error: any) {
  console.log("Login failed", error.message)
//   toast.error(error.message);
}
finally {
  setLoading(false);
}
};


    const [isChecked, setIsChecked] = React.useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsChecked(event.target.checked);
    };

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0 ) {
            setButtonDisabled(false)
        } else {
            setButtonDisabled(true)
        }
    }, [user])


    return (
        <div className='signin'>
            <div className='component1'>
                <div style={{ height: "64px", marginBottom: "24px" }}>
                    <div style={{ height: "50px", width: "50px", objectFit: "cover" }}>
                        <Image
                            src={bgImage1} // Use the imported image URL
                            alt="Description of the image"
                            layout="responsive"
                            objectFit="cover"
                            objectPosition="center center"
                            priority
                        />
                    </div>
                </div>

                <div style={{ marginBottom: "24px", }}>
                    <h1 style={{ fontWeight: "bold", marginBottom: "12.5px", color: "#FFDA39" }}>Sign In</h1>
                    <p style={{ fontWeight: "light", marginBottom: "10px", color: "#5B6A81" }}> Don't have an account?    <a href="/signup" className='signup-link'>Sign Up</a></p>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "22px" }}>
                    <label htmlFor="email" style={{ color: "#94A4B8", fontSize: "14px", fontWeight: "500" }}>Email</label>

                    <input
                        className="signup-input"
                        id="email"
                        type="text"
                        value={user.email}
                        onChange={(e) => setUser({
                            ...user,
                            email: e.target.value
                        })}
                        placeholder="Email address" />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    <label htmlFor="password" style={{ color: "#94A4B8", fontSize: "14px", fontWeight: "500" }}>Password</label>

                    <input
                        className="signup-input"
                        id="password"
                        type="text"
                        value={user.password}
                        onChange={(e) => setUser({
                            ...user,
                            password: e.target.value
                        })}
                        placeholder="password" />
                </div>



                <div className="checkbox-container">

                    <Checkbox
                        checked={isChecked}
                        onChange={handleChange}
                        inputProps={{ 'aria-label': 'controlled' }}
                        sx={{
                            color: "#FFDA39",
                            '&.Mui-checked': {
                                color: "#FFDA39",
                                boxShadow: "0px 0px 5px #ffdb3934"
                            },
                        }}
                    />
                    <label className="checkbox-label">
                        Remember me
                    </label>

                </div>
                <div
                    className="sign"
                    onClick={onLogin}
                >
                   {loading? "Processing" : "Login"}
                </div>

                <div style={{
                    display: "flex",
                    height: "25px",
                    borderBottom: '1px solid #334155'
                }}></div>
                <div className="Forgotten-Password" >Forgotten Password</div>
            </div>
        </div>
    )
}

export default LoginPage



