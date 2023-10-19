import "./all-users.css";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

const AllUsers = ({ price, data }:any) => {
  const router = useRouter();
  console.log(data)
  return (
    <div className="outerbody-admin">
      {data.map((data):any => {
        return (
          <div
            key={data._id}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "25px",
              width: "100%", // Set the width to cover the whole available space
            }}
          >
            <User _id={data._id} email={data.email} tickets={data.tickets} transactionHistory={data.transactionHistory} />
          </div>
        );
      })}
    </div>
  );
};

export default AllUsers;

const User = ({
_id,
email,
transactionHistory,
tickets
}: any) => {
  const router = useRouter();

  function selectCoin() {
    router.push(`/AdminDashboard/${_id}`);
  }



  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        height: "40px",
        justifyContent: "space-between",
        color: "256, 256, 256, 0.5",
        padding: "0px 15px",
        backgroundColor: "#0F172B",
      }}
    >
      <div className="outerbody-admin1">{email}</div>
      <div
        style={{ position: "relative" }}
        className="outerbody-admin2"
        onClick={selectCoin}
      >
        <div
          style={{
            position: "absolute",
            display: "flex",
            gap: "4px",
            borderRadius: "5px",
            padding: "5px",
            top: "-12px",
            left: "-10px",
            fontSize: "10px",
          }}
        >
          {tickets.some((ticket) => ticket.status !== "closed") && (
            <div
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "5px",
                backgroundColor: "rgba(256, 0, 0, 0.9)",
              }}
            ></div>
          )}

        {transactionHistory && transactionHistory.length > 0 && transactionHistory.some(item => {
  return item.typeOfTransaction === "send" 
}) ? (
  <div
    style={{
      width: "12px",
      height: "12px",
      borderRadius: "8px",
      backgroundColor: "rgba(0, 0, 255, 0.9)",
    }}
  ></div>
) : null}

        </div>
        View
      </div>
    </div>
  );
};
