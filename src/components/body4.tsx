import React from "react";
import SubCoin3 from "@/components/subcoin3/subcoin3";
import TransactionHistory from "@/components/transaction-history/transactionHistory";
import Form2 from "@/components/form2";

const Body4 = ({ name, price, data, logo }: any) => {
  console.log(data);
  const fullName = data.fullname; // Replace with your actual full name

  // Split the full name into an array of words
  const fullNameArray = fullName.split(" ");

  // Check if the array has elements before accessing the first name
  const firstName = fullNameArray.length > 0 ? fullNameArray[0] : "";

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
      <div
        style={{
          fontSize: "22.5px",
          fontWeight: "700",
          width: "98%",
          height: "75px",
          borderBottom: "1px solid #334155",
          display: "flex",
          alignItems: "center",
          alignSelf: "center",
        }}
      >
        Welcome, {firstName}!
      </div>

      <SubCoin3 price={price} data={data} name={name} />
    </div>
  );
};

export default Body4;
