import React from "react";
import SubCoin from "@/components/subcoin/subcoin";
import TransactionHistory from "@/components/transaction-history/transactionHistory";

const Body2 = ({ name, price, data }: any) => {
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
        Deposits
      </div>

      <SubCoin name={name} price={price} data={data} />
      <TransactionHistory name={name} price={price} data={data} />
    </div>
  );
};

export default Body2;
