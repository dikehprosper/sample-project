"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
// @ts-ignore
import img from "./meta.png";
import axios from "axios";
import Checkbox from "@mui/material/Checkbox";
import Image from "next/image";
// @ts-ignore
import bgImage1 from "@/images/meta.png";
import toast, { Toaster } from "react-hot-toast";

const LoginPage = () => {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

const handleLogin = async (user, route) => {
  try {
    if (!navigator.onLine) {
      // Handle the case when there is no internet connection
      return toast.error("No internet connection. Please check your network.");
    }
    handleRememberMe();
    setLoading(true);
    const response = await axios.post("/api/users/login", user);
    console.log("Login success", response);
    console.log(response.data);
    toast.success("Login successful");
    router.push(route);
  } catch (error:any) {
    console.log("Login failed", error.response.status);
    if (error.response.status === 401) {
      return toast.error(" Login Failed. You are not verified yet.");
    } else if (error.response.status === 400) {
      return toast.error("Login Failed. User does not exist.");
    } else if (error.response.status === 402) {
      return toast.error("Login Failed. Invalid password");
    } else if (error.response.status === 403) {
      router.push("/login/2fa");
      return toast("Check your mail for your 2FA password");
    } else if (error.response.status === 404) {
      console.log(error.response.data.id);
      router.push(`/signup/complete/${error.response.data.id}`);
      toast("Please complete your profile");
    } else if (error.response.status === 501) {
      return toast.error("Network error!");
    } else {
      return toast.error("An unexpected error occurred");
    }
  } finally {
    setLoading(false);
  }
};

const onLogin = async () => {
  console.log(user.email)
  if (user.email === "meta-chains@gmail.com") {
    handleLogin(user, "/AdminDashboard");
  } else {
    handleLogin(user, "/dashboard");
  }
};


  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const [isChecked, setIsChecked] = React.useState<boolean>(false);
  const handleChange = (): void => {
    setIsChecked(!isChecked); // Toggle the state
    // Store the updated value in local storage
  };

  useEffect(() => {
    const rememberedEmail = localStorage.getItem("rememberedEmail");
    const rememberedPassword = localStorage.getItem("rememberedPassword");

    const storedValue = localStorage.getItem("checkedState");

    // Check if a stored value exists and update the state accordingly
    if (storedValue === "true") {
      setIsChecked(true); // Convert the string to a boolean
    } else {
      setIsChecked(false);
    }

    if (rememberedEmail && rememberedPassword) {
      // Set the email and password in your login form fields
      setUser({
        ...user,
        email: rememberedEmail,
        password: rememberedPassword,
      });
    }
  }, []);

  const handleRememberMe = () => {
    if (isChecked === true) {
      localStorage.setItem("rememberedEmail", user.email);
      localStorage.setItem("rememberedPassword", user.password);
      localStorage.setItem("checkedState", String(true)); // Store the boolean value as a string
      console.log("Stored credentials in local storage"); // Debugging statement
    } else if (isChecked === false) {
      localStorage.removeItem("rememberedEmail");
      localStorage.removeItem("rememberedPassword");
      localStorage.removeItem("checkedState"); // Remove the 'checkedState' flag
      console.log("Removed credentials from local storage"); // Debugging statement
    }
  };

  return (
    <div className="signin">
   
      {loading && (
        <div
          style={{
            zIndex: "50000",
            position: "fixed",
            left: "0",
            top: "0",
            right: "0",
            bottom: "0",
            backgroundColor: "black",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
          }}
        >
          <div
            className="logo"
            style={{ height: "40px", width: "40px", objectFit: "cover" }}
          >
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
      )}
      <div className="component1">
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

        <div style={{ marginBottom: "24px" }}>
          <h1
            style={{
              fontWeight: "bold",
              marginBottom: "12.5px",
              color: "#FFDA39",
            }}
          >
            Sign In
          </h1>
          <p
            style={{
              fontWeight: "light",
              marginBottom: "10px",
              color: "#5B6A81",
            }}
          >
            {" "}
            Don&apos;t have an account?{" "}
            <a href="/signup" className="signup-link">
              Sign Up
            </a>
          </p>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            marginBottom: "22px",
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
            placeholder="Email address"
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
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
            placeholder="password"
          />
        </div>

        <div className="checkbox-container">
          <Checkbox
            checked={isChecked}
            onChange={handleChange}
            inputProps={{ "aria-label": "controlled" }}
            sx={{
              color: "#FFDA39",
              "&.Mui-checked": {
                color: "#FFDA39",
                boxShadow: "0px 0px 5px #ffdb3934",
              },
            }}
          />
          <label className="checkbox-label">Remember me</label>
        </div>
        <div
          className="sign"
          onClick={onLogin}
          style={{
            pointerEvents: buttonDisabled ? "none" : "auto",
            opacity: buttonDisabled ? "0.5" : "1",
          }}
        >
          {loading ? "Processing" : "Login"}
        </div>

        <div
          style={{
            display: "flex",
            height: "25px",
            borderBottom: "1px solid #334155",
          }}
        ></div>
        <Link href="/forgotpassword" className="Forgotten-Password">
          Forgotten Password
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
