import React, { useState } from "react";
import "./transactionHistory.css";
import Image from "next/image";
import emptyTransactionImage from "../../images/empty.svg";

const TransactionHistory = ({ name, price, data }: any) => {
  const [transactionHistory, setTransactionHistory] = useState(false);


 const filteredTransactions =
   data && data.transactionHistory
     ? data.transactionHistory.filter(
         (transaction) => transaction.name === name
       )
     : [];
  console.log(filteredTransactions)

  return (
    <div className="transactionHistory-body1">
      <h6>Transaction History</h6>
      {filteredTransactions.length > 0 ? (
        <div className="transactionHistory-body3">
          <div
            style={{
              display: "flex",
              gap: "15px",
              height: "40px",
              alignItems: "center",
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
        
            <div style={{ minWidth: "130px", maxWidth: "130px", textAlign: "center" }}>
              {" "}
              Network{" "}
            </div>
            <div
              style={{
                minWidth: "200px",
                maxWidth: "130px",
                overflowX: "hidden",
                scrollBehavior: "smooth",
                textAlign: "center"
              }}
            >
              Address {" "}
            </div>
            <div
              style={{
                minWidth: "130px",
                maxWidth: "130px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              Amount
            </div>
             <div
              style={{
                minWidth: "130px",
                maxWidth: "130px",
                display: "flex",
                justifyContent: "center",
              }}
            >
            Type
            </div>
            <div
              style={{
                minWidth: "250px",
                maxWidth: "250px",
                whiteSpace: "nowrap",
                textAlign: "center"
              }}
            >
              Time{" "}
            </div>
            <div
              style={{
                minWidth: "130px",
                maxWidth: "130px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              Status
            </div>
          </div>
          {filteredTransactions.reverse().map((data: any) => {
            const convertedTimestamp = new Date(
              data.registrationDateTime
            ).toLocaleString("en-US", {
              timeZone: "UTC",
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            });

            return (
              <div
                key={data.name}
                style={{
                  display: "flex",
                  gap: "15px",
                  height: "50px",
                  alignItems: "center",
                  fontWeight: "light",
                  color: "rgba(256, 256, 256, 0.6)",
                }}
              >
               
                <div style={{ minWidth: "130px", maxWidth: "130px", textAlign: "center" }}>
                  {data.network}
                </div>
                <div
                  style={{
                    minWidth: "200px",
                    maxWidth: "130px",
                    overflowX: "hidden",
                    scrollBehavior: "smooth",
                  }}
                >
                  {data.addressSentTo}
                </div>
                   <div
                  style={{
                    minWidth: "130px",
                    maxWidth: "130px",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  {data.amount}
                </div>
                    <div
                  style={{
                    minWidth: "130px",
                    maxWidth: "130px",
                    display: "flex",
                    fontWeight: 'bold',
                    justifyContent: "center",
                    backgroundColor: data.typeOfTransaction === "send" ? 'rgba(0, 0, 0, 0.3)': "rgba(256, 256, 256, 0.3)",
                    borderRadius: "5px",
                    color: data.typeOfTransaction === "send" ? "rgba(256, 256, 256, 1)" :  'rgba(0, 0, 0, 1)',
                  }}
                >
                  {data.typeOfTransaction === "send" ? "Sent" : "Received"}
                </div>
                <div
                  style={{
                    minWidth: "250px",
                    maxWidth: "250px",
                    whiteSpace: "nowrap",
                    textAlign: "center"
                  }}
                >
                  {convertedTimestamp}
                </div>
                <div
                  style={{
                    minWidth: "130px",
                    maxWidth: "130px",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      padding: "5px 15px",
                      borderRadius: "18px",
                      color: "black",
                      fontWeight: "700",
                      backgroundColor:
                        data.status === "disapproved"
                          ? "rgba(255, 0, 0, 0.3)" // Set background color to yellow for "Pending" status
                          : data.status === "approved"
                          ? "rgba(0, 255, 0, 0.3)" // Set background color to green for "Completed" status
                          : "rgba(253, 196, 10, 0.8)", // Set background color to red for other status values
                    }}
                  >
                    {data.status}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="transactionHistory-body2">
          <Image src={emptyTransactionImage} alt="" height={170} />
          <p style={{ marginTop: "5px" }}>No data to show</p>
        </div>
      )}
    </div>
  );
};

export default TransactionHistory;
