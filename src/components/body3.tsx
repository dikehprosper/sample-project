import React from "react";
import SubCoin2 from "@/components/subcoin2/subcoin2";
import TransactionHistory from "@/components/transaction-history/transactionHistory";
import Form2 from "@/components/form2";

const Body3 = ({ name, price, data }: any) => {
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
        Send
      </div>

      <SubCoin2 price={price} data={data} name={name} />
      <Form2 price={price} data={data} name={name} />
    </div>
  );
};

export default Body3;
