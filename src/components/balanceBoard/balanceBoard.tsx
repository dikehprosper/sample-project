"use client";
import React, { useState, useEffect } from "react";
import CountUp from "react-countup";
import numeral from "numeral";
import { useRouter } from "next/navigation";

const BalanceBoard = ({ price, data, totalBalance }) => {
  const router = useRouter();
  const [hovered, setHovered] = useState(false);
  const [hovered1, setHovered1] = useState(false);
  const [hovered2, setHovered2] = useState(false);
  const [startValue, setStartValue] = useState(0);

  function formatNumberWithCommasAndDecimal(number) {
    // Use toFixed(2) to ensure two decimal places and convert to a string
    const formattedNumber = parseFloat(number).toFixed(2).toString();

    // Use toLocaleString() to add commas for proper indentation
    const formattedString = parseFloat(formattedNumber).toLocaleString(
      undefined,
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      },
    );

    return formattedString;
  }

  const endValue = totalBalance

  return (
    <div
      style={{
        width: "95%",
        marginTop: "18px",
        display: "flex",
        borderRadius: "6px",
        height: "150px",
        flexDirection: "column",
        // backgroundColor: "white",
        alignItems: "center",
        paddingLeft: "22px",
        paddingRight: "22px",
        alignSelf: "center",
      }}
    >
      <div
        style={{
          maxWidth: "30%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <div style={{ color: "#FDC40A", fontSize: "35px", fontWeight: "bold" }}>
          $
          <CountUp
            start={startValue}
            end={endValue}
            duration={2}
            separator=","
            decimals={2}
            useEasing={false}
          />
        </div>
        <div
          style={{
            color: "white",
            fontSize: "17px",
            opacity: "0.5",
            whiteSpace: "nowrap",
          }}
        >
          Total Balance
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          minWidth: "70%",
          maxWidth: "90%",
          justifyContent: "space-evenly",
          marginTop: "27px",
          gap: "15px",
        }}
      >
        <div
          style={{
            height: "45px",
            width: "150px",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            borderRadius: "5px",
            display: "flex",
            background: hovered ? "rgba(255, 255, 255, 0.3)" : "",
            transition: "background 0.3s ease-in-out",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          }}
          onMouseEnter={() => {
            setHovered(true);
          }}
          onMouseLeave={() => {
            setHovered(false);
          }}
          onClick={() => router.push("/dashboard/all")}
        >
          Send
        </div>
        <div
          style={{
            height: "45px",
            width: "150px",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            borderRadius: "5px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            background: hovered1 ? "rgba(255, 255, 255, 0.3)" : "",
            transition: "background 0.3s ease-in-out",
          }}
          onMouseEnter={() => {
            setHovered1(true);
          }}
          onMouseLeave={() => {
            setHovered1(false);
          }}
          onClick={() => router.push("/dashboard/all")}
        >
          Receive
        </div>
        <a
          style={{
            height: "45px",
            width: "150px",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            borderRadius: "5px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            background: hovered2 ? "rgba(255, 255, 255, 0.3)" : "",
            transition: "background 0.3s ease-in-out",
            color: "white",
          }}
          onMouseEnter={() => {
            setHovered2(true);
          }}
          onMouseLeave={() => {
            setHovered2(false);
          }}
          href="https://www.moonpay.com/buy"
        >
          Buy
        </a>
      </div>
    </div>
  );
};
export default BalanceBoard;
