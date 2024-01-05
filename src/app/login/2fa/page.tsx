"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// @ts-ignore
import axios from "axios";
import Image from "next/image";
// @ts-ignore
import bgImage1 from "@/images/meta.png";
import toast, { Toaster } from "react-hot-toast";

const Fa = () => {
  const [user, setUser] = useState({
    password: ["", "", "", ""],
  });

  const handleInputChange = (e, index) => {
    const newValue = e.target.value;

    // Prevent entering more than one character
    if (newValue.length === 1) {
      const newPassword = [...user.password];
      newPassword[index] = newValue;

      // Move to the next input if available
      if (index < 3) {
        document.getElementById(`input-${index + 1}`).focus();
      }

      setUser({
        ...user,
        password: newPassword,
      });
    }
  };

  const handleBackspace = (e, index) => {
    // Handle backspace to clear the current input and move to the previous one
    if (e.key === "Backspace") {
      const newPassword = [...user.password];
      newPassword[index] = "";

      // If we're on the first input and it's already empty, focus on it to reset
      if (index === 0 && newPassword[index] === "") {
        document.getElementById(`input-${index}`).focus();
      } else if (index > 0) {
        document.getElementById(`input-${index - 1}`).focus();
      }
      setUser({
        ...user,
        password: newPassword,
      });
    }
  };

const fullPassword = user.password.join(''); 

console.log(fullPassword)
  const router = useRouter();
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onSubmit = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/2fa", fullPassword);
      console.log("Login success", response);
      toast.success("Login successful");
      router.push("/dashboard");
    } catch (error: any) {
      if (error.response.status === 400) {
        return toast.error("Invalid code");
      } else if (error.response.status === 404) {
        console.log(error.response.data.id)
        router.push(`/signup/complete/${error.response.data.id}`);
        return toast("Please complete your profile");
      } else {
        return toast.error("An expected error occured");
      }
    } finally {
      setLoading(false);
    }
  };



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
              fontWeight: "500",
              marginBottom: "12.5px",
              color: "#FFDA39",
              fontSize: "30px"
            }}
          >
           Enter 2FA Code
          </h1>
    <div style={{opacity: 0.2}}>Check your registered mail for the code</div>
        </div>
    <div style={{ display: "flex", marginBottom: "40px", justifyContent: "space-evenly", gap:"10px" }}>
  {user.password.map((value, index) => (
        <input
          key={index}
          id={`input-${index}`}
          className="signup-input-code"
          type="text"
          value={value}
          onChange={(e) => handleInputChange(e, index)}
          onKeyDown={(e) => handleBackspace(e, index)}
        />
      ))}
    </div>
        <div
          className="sign"
          onClick={onSubmit}
          style={{
            pointerEvents: buttonDisabled ? "none" : "auto",
            opacity: buttonDisabled ? "0.5" : "1",
          }}
        >
          {loading ? "Processing" : "Submit"}
        </div>
      </div>
    </div>
  );
};

export default Fa;
