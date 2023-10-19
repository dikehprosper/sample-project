"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import bgImage1 from "@/images/meta.png";
import toast, { Toaster } from "react-hot-toast";
import Form from "@/components/form";

const SignupPage = ({params: {id}}:any) => {
    console.log(id)
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [user, setUser] = React.useState({
    referralId: id,
    fullname: "",
    email: "",
    phone: "",
    password: "",
  });
  const [display, setDisplay] = useState(false);
  const [buttonDisabled, setButtonDisabled] = React.useState(false);




  const onSignUp = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`/api/users/signup`, user);
      console.log("Signup success", response.data);
      router.push("/signup/success");
    } catch (error: any) {
      if (error.response.status === 400) {
        return toast.error("User already exist");
      } else if (error.response.status === 500) {
        return toast.error("Signup failed");
      }
    } finally {
      setLoading(false);
    }
  };





  useEffect(() => {
    if (confirmPassword === user.password) {
      setDisplay(false);
    } else {
      setDisplay(true);
    }
  }, [confirmPassword, user.password]);

  function isValidEmail(email: string): boolean {
    // Regular expression pattern for a simple email validation
    const emailPattern: RegExp =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    return emailPattern.test(email);
  }

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.fullname.length > 0 &&
      user.phone.length > 0 &&
      isValidEmail(user.email) &&
      confirmPassword === user.password
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user, confirmPassword]);

  return (
    <div className="signup">
      <Toaster />
      {loading && (
        <div
          style={{
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
      )}{" "}
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
            Sign Up
          </h1>
          <p
            style={{
              fontWeight: "light",
              marginBottom: "10px",
              color: "#5B6A81",
            }}
          >
            {" "}
            Already have an account?{" "}
            <Link href="/login" className="signup-link">
              Sign In
            </Link>
          </p>
        </div>

        <Form
          user={user}
          setUser={setUser}
          setConfirmPassword={setConfirmPassword}
          confirmPassword={confirmPassword}
          display={display}
        />

        <div
          className="sign"
          style={{
            opacity: buttonDisabled ? "0.5" : "1",
            pointerEvents: buttonDisabled ? "none" : "auto",
          }}
          onClick={onSignUp}
        >
          {" "}
          {loading ? "processing" : "Sign Up"}
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
