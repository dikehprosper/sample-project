"use client";
import Image from "next/image";
import React, { useState } from "react";
import profile from "../images/Profile-Icon-SVG-09856789.webp";
import Form3 from "@/components/form3";
import Form5 from "@/components/form5";

const Body5 = ({
  data,
  changeState,
  state,
  user,
  setUser,
  updateUserDetails,
  changeLoadingStatus,
}: any) => {
  console.log(data);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#0F172A",
        width: "100%",
        padding: "10px",
      }}
    >
      <div className="body5">
        <h3>Settings</h3>
        <div style={{ fontSize: "12px", display: "flex" }}>
          {" "}
          <a style={{ color: "#FDC40A", opacity: "1.4", cursor: "pointer" }}>
            {" "}
            Settings &nbsp;{" "}
          </a>{" "}
          <p style={{ fontSize: "12px", opacity: "0.4" }}>
            &gt; &nbsp; My Profile{" "}
          </p>
        </div>
      </div>

      <div className="body5-1">
        <div className="body5-2-1">
          <div className="body5-2">
            {" "}
            <Image src={profile} alt="" height={55} />
          </div>
          <div className="body5-3">
            <div style={{ fontWeight: "500", fontSize: "24px" }}>
              {data.fullname.split(" ")[0]}
            </div>
            <p style={{ opacity: "0.5", fontSize: "14px", fontWeight: "300" }}>
              Investor
            </p>
          </div>
          <div className="body5-5">
            {data.fastatus !== undefined &&
              (data.fastatus ? (
                <div
                  style={{
                    backgroundColor: "#DC2625",
                    cursor: "pointer",
                    width: "115px",
                    height: "41px",
                    borderRadius: "5px",
                    fontWeight: "500",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onClick={changeState}
                >
                  Disable 2FA
                </div>
              ) : (
                <div
                  style={{
                    cursor: "pointer",
                    backgroundColor: "#37A169",
                    width: "115px",
                    height: "41px",
                    borderRadius: "5px",
                    fontWeight: "500",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onClick={changeState}
                >
                  Enable 2FA
                </div>
              ))}
          </div>
        </div>
        <div className="body5-4-1">
          <div className="body5-4-2"> </div>
          <div className="body5-4">
            <div className="body5-4-3">
              <div
                style={{ display: "flex", gap: "7px", alignItems: "center" }}
              >
                <span
                  style={{
                    minHeight: "5px",
                    minWidth: "5px",
                    maxHeight: "5px",
                    maxWidth: "5px",
                    borderRadius: "5px",
                    backgroundColor: "#37A169",
                  }}
                ></span>{" "}
                <span
                  style={{
                    opacity: "0.6",
                    fontSize: "14px",
                    fontWeight: "200",
                    whiteSpace: "nowrap",
                  }}
                >
                  {data.phone}
                </span>{" "}
              </div>
              <div
                style={{ display: "flex", gap: "7px", alignItems: "center" }}
              >
                <span
                  style={{
                    minHeight: "5px",
                    minWidth: "5px",
                    maxHeight: "5px",
                    maxWidth: "5px",
                    borderRadius: "5px",
                    backgroundColor: "#37A169",
                  }}
                >
                  {" "}
                </span>{" "}
                <span
                  style={{
                    opacity: "0.6",
                    fontSize: "14px",
                    fontWeight: "200",
                  }}
                >
                  {data.email}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="body6-1">
        <Form3
          data={data}
          setUser={setUser}
          user={user}
          updateUserDetails={updateUserDetails}
        />
        <Form5 changeLoadingStatus={changeLoadingStatus} data={data} />
      </div>
    </div>
  );
};

export default Body5;
