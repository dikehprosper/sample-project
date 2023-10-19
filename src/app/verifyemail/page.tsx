"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import bgImage1 from "@/images/meta.png";
import verifiedImage from "@/images/verified.png";
import failedVerification from "../images/failedVerification.png";
import { GiCancel } from "react-icons/gi";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.log(true);
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <>
      {verified && (
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
                Your account has been verified successfully
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
                <div
                  style={{ height: "100px", width: "90px", objectFit: "cover" }}
                >
                  <Image
                    src={verifiedImage} // Use the imported image URL
                    alt="Description of the image"
                    layout="responsive"
                    objectFit="cover"
                    objectPosition="center center"
                    priority
                  />
                </div>
                <h6>Congratulations</h6>

                <p style={{ textAlign: "center" }}>
                  Click the link below to login now
                </p>
              </div>

              <Link
                href="/login"
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
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      )}

      {error && (
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
                  display: "flex",
                  flexDirection: "column",
                  fontSize: "13px",
                  alignItems: "center",
                  marginBottom: "20px",
                }}
              >
                <GiCancel fontSize="100px" />

                <h6 style={{ marginTop: "20px" }}>failed to verify</h6>
                {token}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
