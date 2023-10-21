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

const RestPasswordResetPage = () => {
  const [user, setUser] = React.useState({
    email: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onSubmit = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/forgotpassword", user);
      console.log("Password Reset Link sent successfully", response.data);

      toast.success("Password Reset Link sent successfully");
    } catch (error: any) {
      console.error("failed to send", error.message);
      if (error.status === 400) {
        toast.error("No user with such email");
      } else if (error.status === 500) {
        toast.error("An error occured");
      }
    } finally {
      setLoading(false);
    }
  };

  function isValidEmail(email: string): boolean {
    // Regular expression pattern for a simple email validation
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    return emailPattern.test(email);
  }
  useEffect(() => {
    if (user.email.length > 0 && isValidEmail(user.email)) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

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
          <h2
            style={{
              fontWeight: "bold",
              marginBottom: "1.5px",
              color: "#FFDA39",
              fontSize: "30px",
            }}
          >
            Forgot Password?
          </h2>
          <p
            style={{
              fontWeight: "light",
              marginBottom: "8px",
              color: "#5B6A81",
              fontSize: "14px",
            }}
          >
            {" "}
            Follow the simple steps to recover it!
          </p>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "5px",
            marginBottom: "25px",
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

        <div
          className="sign"
          onClick={onSubmit}
          style={{
            pointerEvents: buttonDisabled ? "none" : "auto",
            opacity: buttonDisabled ? "0.5" : "1",
          }}
        >
          {loading ? "Processing" : "Send Reset Link"}
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

export default RestPasswordResetPage;
