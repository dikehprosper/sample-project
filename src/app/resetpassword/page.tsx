"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
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
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = React.useState({
    password: "",
    token: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    if (confirmPassword === user.password) {
      setDisplay(false);
    } else {
      setDisplay(true);
    }
  }, [confirmPassword]);

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setUser({
      ...user,
      token: urlToken,
    });
  }, []);

  useEffect(() => {
    if (user.password.length > 0 && confirmPassword === user.password) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user, confirmPassword]);

  async function onSubmit() {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/resetpassword", user);
      console.log("reset password successful", response.data);
      toast.success("Password reset successful");
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (error: any) {
      if (error.response.status === 400) {
        return toast.error("Failed");
      } else if (error.response.status === 500) {
        return toast.error("Signup failed");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="signin">
      <Toaster />
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
              marginBottom: "2.5px",
              color: "#FFDA39",
            }}
          >
            Reset Password
          </h1>
          <p
            style={{
              fontWeight: "light",
              marginBottom: "10px",
              color: "#5B6A81",
              fontSize: "13px",
            }}
          >
            {" "}
            Your password is your privacy. Plese use a complex password
            combinations!{" "}
          </p>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "6px",
            marginBottom: "22px",
          }}
        >
          <label
            htmlFor="password"
            style={{ color: "#94A4B8", fontSize: "14px", fontWeight: "500" }}
          >
            New Password
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
            placeholder="New Password"
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <label
            htmlFor="confirmPassword"
            style={{
              color: "#94A4B8",
              fontSize: "14px",
              fontWeight: "500",
              gap: "10px",
              display: "flex",
              alignItems: "center",
            }}
          >
            {" "}
            Confirm Password
            {display && (
              <div style={{ color: "red", fontSize: "10px" }}>
                Entry must be same as password
              </div>
            )}
          </label>

          <input
            className="signup-input"
            id="confirmPassword"
            type="text"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
          />
        </div>

        <div
          className="sign"
          onClick={onSubmit}
          style={{
            pointerEvents: buttonDisabled ? "none" : "auto",
            opacity: buttonDisabled ? "0.5" : "1",
            marginTop: "30px",
          }}
        >
          {loading ? "Processing" : "Submit"}
        </div>

        <div
          style={{
            display: "flex",
            height: "25px",
            borderBottom: "1px solid #334155",
          }}
        ></div>
      </div>
    </div>
  );
};

export default LoginPage;
