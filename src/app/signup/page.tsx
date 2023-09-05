"use client";
import Link from "next/link";
import React, {useEffect} from "react";
import {useRouter} from "next/navigation";
import img from "./meta.png";
 import  axios  from "axios";
import Checkbox from "@mui/material/Checkbox";
import Image from "next/image";
import bgImage1 from "../meta.png";

const SignupPage = () => {
  const router = useRouter();
  const [user, setUser] = React.useState({
    username: "",
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = React.useState(false);

const [loading, setLoading] = React.useState(false)

    
const onSignUp = async () => {
    try {
           setLoading(true)
           const response = await axios.post("/api/users/signup", user)
           console.log("Signup success", response.data);
           router.push("/login")
    }
      catch (error: any) {
        // toast.error(error.message)
        console.log("Signup failed", error.message)
      }
       finally {
        setLoading(false)
      }
}
    

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
        setButtonDisabled(false)
    } else {
         setButtonDisabled(true)
    }
  }, [user])

  return (
    <div className="signup">
      <div className="component1">
        <div style={{ height: "64px", marginBottom: "24px" }}>
          {" "}
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

        <div style={{ marginBottom: "24px" }}>
          <h1
            style={{
              fontWeight: "bold",
              marginBottom: "12.5px",
              color: "#FFDA39",
            }}
          >
                      {loading ? "processing" : "Sign Up"}
          </h1>
          <p
            style={{
              fontWeight: "light",
              marginBottom: "10px",
              color: "#5B6A81",
              fontSize: "12px",
            }}
          >
            {" "}
            Already have an account?{" "}
            <Link href="/login" className="signup-link">
              Sign In
            </Link>
          </p>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            marginBottom: "32px",
          }}
        >
          <label
            htmlFor="username"
            style={{ color: "#94A4B8", fontSize: "14px", fontWeight: "500" }}
          >
            username
          </label>

          <input
            className="signup-input"
            id="username"
            type="text"
            value={user.username}
            onChange={(e) =>
              setUser({
                ...user,
                username: e.target.value,
              })
            }
            placeholder="Enter username"
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            marginBottom: "32px",
          }}
        >
          <label
            htmlFor="email"
            style={{ color: "#94A4B8", fontSize: "14px", fontWeight: "500" }}
          >
            Email
          </label>

          <input
            className="signup-input"
            id="email"
            type="text"
            value={user.email}
            onChange={(e) =>
              setUser({
                ...user,
                email: e.target.value,
              })
            }
            placeholder="Enter Email"
          />
        </div>
        {/* <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            marginBottom: "32px",
          }}
        >
          <label
            htmlFor="phone"
            style={{ color: "#94A4B8", fontSize: "14px", fontWeight: "500" }}
          >
            Phone
          </label>

          <input
            className="signup-input"
            id="phone"
              type="text"
            value={user.phone}
            onChange={(e) =>
              setUser({
                ...user,
                phone: e.target.value,
              })
            }
            placeholder="Enter Phone"
          />
        </div> */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            marginBottom: "32px",
          }}
        >
          <label
            htmlFor="password"
            style={{ color: "#94A4B8", fontSize: "14px", fontWeight: "500" }}
          >
            Password
          </label>

          <input
            className="signup-input"
            id="password"
              type="text"
            value={user.password}
            onChange={(e) =>
              setUser({
                ...user,
                password: e.target.value,
              })
            }
            placeholder="Enter Password"
          />
        </div>
{/* 
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            marginBottom: "32px",
          }}
        >
          <label
            htmlFor="confirmPassword"
            style={{ color: "#94A4B8", fontSize: "14px", fontWeight: "500" }}
          >
            Confirm Password
          </label>

          <input
            className="signup-input"
            id="confirmPassword"
           type="text"
            value={user.confirmPassword}
            onChange={(e) =>
              setUser({
                ...user,
                confirmPassword: e.target.value,
              })
            }
            placeholder="Confirm Password"
          />
        </div> */}

              <div className="sign" style={{ opacity: buttonDisabled ? "0.5" : "1" }} onClick={onSignUp}> Sign Up</div>
      </div>
    </div>
  );
};

export default SignupPage;
