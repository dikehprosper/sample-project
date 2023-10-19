"use client";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import React, { useState, useEffect } from "react";
import bgImage1 from "@/images/meta.png";
import Form from "@/components/form";

export default function SignUpSuccess() {
  const [user, setUser] = React.useState({
    fullname: "",
    email: "",
    phone: "",
    password: "",
  });

  return (
    <>
      <div style={{ position: "absolute", zIndex: "-100" }}>
        <Form user={user} setUser={setUser} />
      </div>
      <div className="signin">
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
          <div className="component2">
            <div style={{ height: "30px", marginBottom: "24px" }}>
              <div
                style={{ height: "50px", width: "50px", objectFit: "cover" }}
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
            <h4 style={{ fontWeight: "bold" }}>META-CHAIN</h4>
            <div
              style={{
                width: "110%",
                backgroundColor: "green",
                marginBottom: "20px",
                display: "flex",
                justifyContent: "center",
                fontSize: "15px",
                height: "50px",
                borderRadius: "4px",
                alignItems: "center",
                fontWeight: "500",
              }}
            >
              Your account has been registered successfully
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                fontSize: "13px",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <h6>Verify your email</h6>
              <p style={{ textAlign: "center" }}>
                Your registration was succesful. We have sent you a verification
                email.
              </p>
              <p style={{ textAlign: "center" }}>
                if you do not see it in your inbox please check your Spam folder
              </p>
            </div>

            <Link
              style={{
                height: "40px",
                width: "105%",
                display: "flex",
                justifyContent: "center",
                backgroundColor: "#FEC40A",
                alignItems: "center",
                borderRadius: "5px",
                color: "black",
                fontWeight: "500",
              }}
              href="/signup"
            >
              Back
            </Link>
          </div>
        </div>
      </div>{" "}
    </>
  );
}
