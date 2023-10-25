"use client";
import React, { useState, useEffect } from "react";
import Referral from "./referrals";
import ReferralHistory from "./referrals-history/referrals-history";

const Body6 = ({
  data,
  changeState,
  state,
  user,
  setUser,
  updateUserDetails,
  changeLoadingStatus,
}: any) => {


  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#0F172A",
        width: "100%",
        padding: "10px",
        minHeight: "100vh",
      }}
    >
      <div className="body5">
        <h3>Referrals</h3>
        <div style={{ fontSize: "12px", display: "flex" }}>
          {" "}
          <a style={{ color: "#FDC40A", opacity: "1.4", cursor: "pointer" }}>
            {" "}
            Referrals &nbsp;{" "}
          </a>{" "}
          <p style={{ fontSize: "12px", opacity: "0.4" }}>
            &gt; &nbsp; All Referrals{" "}
          </p>
        </div>
      </div>
      <Referral />
      <ReferralHistory user={user} />
    </div>
  );
};

export default Body6;
