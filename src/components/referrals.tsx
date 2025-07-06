"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

const domain = process.env.NEXT_PUBLIC_DOMAIN!;



const Referral = () => {
  const [user, setUser] = useState("");
  const [referralLink, setReferralLink] = useState("");

  // Function to update the referral link based on the user's _id
  const updateReferralLink = () => {
    // @ts-ignore
    if (user && user._id) {
      // @ts-ignore
      const newReferralLink = `${domain}/signup/${user._id}`;
      setReferralLink(newReferralLink);
    }
  };

  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me");
    console.log(res.data.data);
    setUser(res.data.data);
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  // Use an effect to update the referral link whenever the user state changes
  useEffect(() => {
    updateReferralLink();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // Function to copy the referral link to the clipboard
  const copyContent = () => {
    // Get the content of the input element
    const inputElement = document.getElementById("address");
    // @ts-ignore
    const referralLink = inputElement.value;

    if (referralLink) {
      // Copy the referral link to the clipboard
      navigator.clipboard
        .writeText(referralLink)
        .then(() => {
          alert("Referral Link copied to clipboard: " + referralLink);
        })
        .catch((error) => {
          console.error("Copy to clipboard failed:", error);
        });
    }
  };

  return (
    <div className="referral-body">
      <div
        style={{
          display: "flex",
          height: "50%",
          width: "100%",
          alignItems: "start",
          opacity: "0.3",
          fontWeight: "300",
          fontSize: "15px",
        }}
      >
        My Referral Link
      </div>
      <div
        style={{
          display: "flex",
          height: "50%",
          width: "100%",
          alignItems: "center",
          fontWeight: "300",
          fontSize: "14px",
        }}
      >
        <input
          style={{
            backgroundColor: "#0B1325",
            height: "39px",
            borderRadius: "4.5px 0px 0px 4.5px",
          }}
          className="signup-input form3 source"
          id="address" // Added id to identify the input element
          type="text"
          value={referralLink || ""}
          readOnly // Add this attribute to make it non-editable
          placeholder={referralLink || ""}
        />
        <div
          className="referral-link-input"
          style={{
            backgroundColor: "#FDC40A",
            display: "flex",
            height: "40px",
            color: "black",
            borderRadius: "4px",
            minWidth: "140px",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
            whiteSpace: "nowrap",
          }}
          onClick={copyContent} // Call the copyContent function on click
        >
          Copy Referral Link
        </div>
      </div>
    </div>
  );
};

export default Referral;
