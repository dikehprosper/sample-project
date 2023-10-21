"use client"
import axios from "axios"
import { toast } from "react-hot-toast";
import {useState, useEffect} from "react"
import {useRouter} from "next/navigation"
import Link from "next/link";
import "../referrals-history/referrals-history.css";
import {GoPerson} from "react-icons/go";
import Image from "next/image";
// @ts-ignore
import emptyReferralImage from "../../images/empty.svg";

const AdminBody2 = ({ price, data, _id, updateBalance, updateAddress , updateWithdrawalMessage}: any) => {
  //   const fullName = data.fullname; // Replace with your actual full name

  //   // Split the full name into an array of words
  //   const fullNameArray = fullName.split(" ");

  //   // Check if the array has elements before accessing the first name
  //   const firstName = fullNameArray.length > 0 ? fullNameArray[0] : "";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        padding: "10px",
            minHeight: "100vh",
                backgroundColor: "#0F172B",
      }}
    >
      <div
        style={{
          fontSize: "22.5px",
          fontWeight: "700",
          width: "95%",
          height: "88px",
          borderBottom: "1px solid #334155",
          display: "flex",
          alignItems: "center",
          alignSelf: "center",
        }}
      >
        {data.map((data) => {
          if (data._id === _id) {
            return `${data.fullname} Information`;
          }
        })}
      </div>

      {data.map((data) => {
        if (data._id === _id) {
          return (
            <div
              key={data._id}
              style={{
                width: "95%",
                gap: "25px",
                alignSelf: "center",
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
                margin: "40px",
                backgroundColor: "#0F172B",
              }}
            >
              {" "}
              <User
                data={data}
                updateBalance={updateBalance}
                price={price}
                updateAddress={updateAddress}
                updateWithdrawalMessage={updateWithdrawalMessage}
                _id={_id}
              />
            </div>
          );
        }
      })}
    </div>
  );
};

export default AdminBody2;


function User({ data, updateBalance, price, updateAddress, updateWithdrawalMessage, _id }: any) {
  const [current, setCurrent] = useState("");
  const [current2, setCurrent2] = useState("");
    const [current3, setCurrent3] = useState("");
const router = useRouter()
console.log(data)

  function EditExistingBalance() {
    if (current === "BNB") {
      return (
        <EditBalance
          name="Binance Balance"
          logo="BNB"
          setCurrent={setCurrent}
          balance={data.BNBBalance}
          email={data.email}
          updateBalance={updateBalance}
          price={price[3]}
        />
      );
    } else if (current === "TRC") {
      return (
        <EditBalance
          name="Tron Balance"
          logo="TRC"
          setCurrent={setCurrent}
          balance={data.TRONBalance}
          email={data.email}
          updateBalance={updateBalance}
           price={price[9]}
        />
      );
    } else if (current === "BTC") {
      return (
        <EditBalance
          name="Bitcoin Balance"
          logo="BTC"
          setCurrent={setCurrent}
          balance={data.BTCBalance}
          email={data.email}
          updateBalance={updateBalance}
           price={price[0]}
        />
      );
    } else if (current === "BCH") {
      return (
        <EditBalance
          name="Bitcoin Cash Balance"
          logo="BCH"
          setCurrent={setCurrent}
          balance={data.BCHBalance}
          email={data.email}
          updateBalance={updateBalance}
           price={price[17]}
        />
      );
    } else if (current === "ETH") {
      return (
        <EditBalance
          name="Ethereum Balance"
          logo="ETH"
          setCurrent={setCurrent}
          balance={data.ETHBalance}
          email={data.email}
          updateBalance={updateBalance}
           price={price[1]}
        />
      );
    } else if (current === "USDT") {
      return (
        <EditBalance
          name="Usdt Balance"
          logo="USDT"
          setCurrent={setCurrent}
          balance={data.USDTBalance}
          email={data.email}
          updateBalance={updateBalance}
           price={price[2]}
        />
      );
    } else if (current === "DOGE") {
      return (
        <EditBalance
          name="Doge Balance"
          logo="DOGE"
          setCurrent={setCurrent}
          balance={data.DOGEBalance}
          email={data.email}
          updateBalance={updateBalance}
           price={price[6]}
        />
      );
    } else if (current === "") {
      return;
    }
  }

   function EditExistingAddress() {
    if (current2 === "BNB") {
      return (
        <EditAddress
          name="Binance Address"
          logo="BNB"
         setCurrent2={setCurrent2}
          address={data.BNBAddress}
          email={data.email}
          updateAddress={updateAddress}
        />
      );
    } else if (current2 === "TRC") {
      return (
        <EditAddress
          name="Tron Address"
          logo="TRC"
          setCurrent2={setCurrent2}
          address={data.TRONAddress}
          email={data.email}
          updateAddress={updateAddress}
        />
      );
    } else if (current2 === "BTC") {
      return (
        <EditAddress
          name="Bitcoin Address"
          logo="BTC"
          setCurrent2={setCurrent2}
          address ={data.BTCAddress}
          email={data.email}
            updateAddress={updateAddress}
        />
      );
    } else if (current2 === "BCH") {
      return (
        <EditAddress
          name="Bitcoin Cash Address"
          logo="BCH"
          setCurrent2={setCurrent2}
          address ={data.BCHAddress}
          email={data.email}
         updateAddress={updateAddress}
        />
      );
    } else if (current2 === "ETH") {
      return (
        <EditAddress
          name="Ethereum Address"
          logo="ETH"
          setCurrent2={setCurrent2}
          address={data.ETHAddress}
          email={data.email}
        updateAddress={updateAddress}
        />
      );
    } else if (current2 === "USDT") {
      return (
        <EditAddress
          name="Usdt Address"
          logo="USDT"
          setCurrent2={setCurrent2}
          address={data.USDTAddress}
          email={data.email}
         updateAddress={updateAddress}
        />
      );
    } else if (current2 === "DOGE") {
      return (
        <EditAddress
          name="Doge Address"
          logo="DOGE"
          setCurrent2={setCurrent2}
          address={data.DOGEAddress}
          email={data.email}
     updateAddress={updateAddress}
        />
      );
    } else if (current === "") {
      return;
    }
  }




   function EditExistingWithdrawalMessage() {
    if (current3 === "BNB") {
      return (
        <EditWithdrawalMessage
          name="Binance Withdrawal Message"
          logo="BNB"
         setCurrent3={setCurrent3}
          message={data.BNBWithdrawalMessage}
          email={data.email}
          updateWithdrawalMessage={updateWithdrawalMessage}
        />
      );
    } else if (current3 === "TRC") {
      return (
        <EditWithdrawalMessage
          name="Tron Withdrawal Message"
          logo="TRC"
          setCurrent3={setCurrent3}
          message={data.TRONWithdrawalMessage}
          email={data.email}
          updateWithdrawalMessage={updateWithdrawalMessage}
        />
      );
    } else if (current3 === "BTC") {
      return (
        <EditWithdrawalMessage
          name="Bitcoin Withdrawal Message"
          logo="BTC"
          setCurrent3={setCurrent3}
          message ={data.BTCWithdrawalMessage}
          email={data.email}
            updateWithdrawalMessage={updateWithdrawalMessage}
        />
      );
    } else if (current3 === "BCH") {
      return (
        <EditWithdrawalMessage
          name="Bitcoin Cash Withdrawal Message"
          logo="BCH"
          setCurrent3={setCurrent3}
          message ={data.BCHWithdrawalMessage}
          email={data.email}
         updateWithdrawalMessage={updateWithdrawalMessage}
        />
      );
    } else if (current3 === "ETH") {
      return (
        <EditWithdrawalMessage
          name="Ethereum Withdrawal Message"
          logo="ETH"
          setCurrent3={setCurrent3}
          message={data.ETHWithdrawalMessage}
          email={data.email}
        updateWithdrawalMessage={updateWithdrawalMessage}
        />
      );
    } else if (current3 === "USDT") {
      return (
        <EditWithdrawalMessage
          name="Usdt Withdrawal Message"
          logo="USDT"
          setCurrent3={setCurrent3}
          message={data.USDTWithdrawalMessage}
          email={data.email}
         updateWithdrawalMessage={updateWithdrawalMessage}
        />
      );
    } else if (current3 === "DOGE") {
      return (
        <EditWithdrawalMessage
          name="Doge Withdrawal Message"
          logo="DOGE"
          setCurrent3={setCurrent3}
          message={data.DOGEWithdrawalMessage}
          email={data.email}
     updateWithdrawalMessage={updateWithdrawalMessage}
        />
      );
    } else if (current === "") {
      return;
    }
  }

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

  const [amount, setAmount] = useState(null);
  const [totalBalance, setTotalBalance] = useState(0);

  async function check() {
    const amounts = [];
    for (const referral of data?.referrals) {
      try {
        const response = await axios.post("/api/users/getAccountDetails", referral.referredEmail);
        amounts.push(response.data.user.totalDepositedAmount);
      } catch (error) {
        toast.error("Failed to fetch data for referral", referral);
        console.error(error);
      }
    }
    const totalAmount = amounts.reduce((total, amount) => total + amount, 0);
    return totalAmount;
  }

  useEffect(() => {
    async function fetchData() {
      const totalDepositedAmount = await check();
      setAmount(totalDepositedAmount/10);
    }

    fetchData();
  }, [data]);

  useEffect(() => {
    const total =
      (data.BTCBalance * price[0]) +
      (data.USDTBalance * price[2]) +
      (data.ETHBalance * price[1]) +
      (data.TRONBalance * price[9]) +
      (data.BNBBalance * price[3]) +
      (data.BCHBalance * price[17]) +
      (data.DOGEBalance * price[6]) +
      amount; // Use the value from the state

    setTotalBalance(total);
  }, [data, price, amount]);



const [viewReferralState, setViewReferralState] = useState("hide")

  function viewReferrals() {
  if (viewReferralState === "view") {
    return ( <ViewReferrals setViewReferralState={setViewReferralState} data={data} />)
  } else if (viewReferralState === "hide") {
    return;
  }
}

  return (
    <div
      style={{
        gap: "25px",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      {EditExistingBalance()}
      {EditExistingAddress()}
      {EditExistingWithdrawalMessage()}
{viewReferrals()}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {" "}
        <div style={{ fontWeight: "700" }}> email:</div>
        <div
          style={{
            padding: "3px 7px",
            backgroundColor: "#0E2E2A",
            borderRadius: "4px",
          }}
        >
      
          {data.email}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {" "}
        <div style={{ fontWeight: "700" }}> Phone:</div>
        <div
          style={{
            padding: "3px 7px",
            backgroundColor: "#0E2E2A",
            borderRadius: "4px",
          }}
        >
          {data.phone}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {" "}
        <div style={{ fontWeight: "700" }}> Password:</div>
        <div
          style={{
            padding: "3px 7px",
            backgroundColor: "#0E2E2A",
            borderRadius: "4px",
          }}
        >
          {data.password2}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {" "}
        <div style={{ fontWeight: "700" }}> Verification Status:</div>
        <div
          style={{
            padding: "3px 7px",
            backgroundColor: "#0E2E2A",
            borderRadius: "4px",
          }}
        >
          {data.isVerified ? "Verified" : "Not Verified"}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {" "}
        <div style={{ fontWeight: "700" }}> Referrals:</div>
        <div
          style={{
            padding: "3px 7px",
            backgroundColor: "#FDC40A",
            borderRadius: "4px",
            color: "black",
            fontWeight: "bold",
          }}
          className="button"
          onClick = {() => setViewReferralState("view")}
        >
          View
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {" "}
        <div style={{ fontWeight: "700" }}> Tickets:</div>
        <div
          style={{
            padding: "3px 7px",
            backgroundColor: "#FDC40A",
            borderRadius: "4px",
            color: "black",
            fontWeight: "bold",
          }}
          className="button"
          onClick={() => {
            router.push(`/AdminDashboard/${_id}/tickets/${_id}`);
          }}
        >
          View
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {" "}
        <div style={{ fontWeight: "700" }}> Transaction History:</div>
        <Link
          style={{
            padding: "3px 7px",
            backgroundColor: "#FDC40A",
            borderRadius: "4px",
            color: "black",
            fontWeight: "bold",

          }}
          className="button"
          href={{
            pathname: `/AdminDashboard/${_id}/transactionHistory`,
            query: { id: _id },
          }}
        >
          View
        </Link>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {" "}
        <div style={{ fontWeight: "700" }}> User Total Balance:</div>
        <div
          style={{
            padding: "3px 7px",
            backgroundColor: "#0E2E2A",
            borderRadius: "4px",
             maxWidth: "180px",
              overflowX: "auto",
          }}
        >
          ${formatNumberWithCommasAndDecimal(totalBalance)}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "5px",
        }}
      >
        {" "}
        <div style={{ fontWeight: "700", whiteSpace: "nowrap" }}>
          BTC Balance:
        </div>
        <div
          style={{
            padding: "0px 10px",
            backgroundColor: "#0E2E2A",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          
          }}
        >
          {data.BTCBalance}
        </div>
        <div
          style={{
            padding: "0px 10px",
            backgroundColor: "white",
            color: "#0E2E2A",
            display: "flex",
            alignItems: "center",
              maxWidth: "120px",
              overflowX: "auto",
          }}
        >
          ${formatNumberWithCommasAndDecimal(data.BTCBalance * price[0])}
        </div>
        <div
          style={{
            padding: "3px 7px",
            backgroundColor: "#FDC40A",
            borderRadius: "4px",
            color: "black",
            fontWeight: "bold",
          }}
          className="button"
          onClick={() => setCurrent("BTC")}
        >
          Edit
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "5px",
        }}
      >
        {" "}
        <div style={{ fontWeight: "700", whiteSpace: "nowrap" }}>
          USDT Balance:
        </div>
        <div
          style={{
            padding: "0px 10px",
            backgroundColor: "#0E2E2A",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {data.USDTBalance}
        </div>
        <div
          style={{
            padding: "0px 10px",
            backgroundColor: "white",
            color: "#0E2E2A",
            display: "flex",
             maxWidth: "120px",
              overflowX: "auto",
            alignItems: "center",
          }}
        >
          ${formatNumberWithCommasAndDecimal(data.USDTBalance * price[2])}
        </div>
        <div
          style={{
            padding: "3px 7px",
            backgroundColor: "#FDC40A",
            borderRadius: "4px",
            color: "black",
            fontWeight: "bold",
          }}
          className="button"
          onClick={() => setCurrent("USDT")}
        >
          Edit
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "5px",
        }}
      >
        {" "}
        <div style={{ fontWeight: "700", whiteSpace: "nowrap" }}>
          ETH Balance:
        </div>
        <div
          style={{
            padding: "0px 10px",
            backgroundColor: "#0E2E2A",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {data.ETHBalance}
        </div>
        <div
          style={{
            padding: "0px 10px",
            backgroundColor: "white",
            color: "#0E2E2A",
            display: "flex",
           maxWidth: "120px",
              overflowX: "auto",
            alignItems: "center",
          }}
        >
          ${formatNumberWithCommasAndDecimal(data.ETHBalance * price[1])}
        </div>
        <div
          style={{
            padding: "3px 7px",
            backgroundColor: "#FDC40A",
            borderRadius: "4px",
            color: "black",
            fontWeight: "bold",
          }}
          className="button"
          onClick={() => setCurrent("ETH")}
        >
          Edit
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "5px",
        }}
      >
        {" "}
        <div style={{ fontWeight: "700", whiteSpace: "nowrap" }}>
          TRON Balance:
        </div>
        <div
          style={{
            padding: "0px 10px",
            backgroundColor: "#0E2E2A",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {data.TRONBalance}
        </div>
        <div
          style={{
            padding: "0px 10px",
            backgroundColor: "white",
            color: "#0E2E2A",
            display: "flex",
            maxWidth: "120px",
              overflowX: "auto",
            alignItems: "center",
          }}
        >
          ${formatNumberWithCommasAndDecimal(data.TRONBalance * price[9])}
        </div>
        <div
          style={{
            padding: "3px 7px",
            backgroundColor: "#FDC40A",
            borderRadius: "4px",
            color: "black",
            fontWeight: "bold",
          }}
          className="button"
          onClick={() => setCurrent("TRC")}
        >
          {/* {data.transactionHistory} */}
          Edit
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "5px",
        }}
      >
        {" "}
        <div style={{ fontWeight: "700", whiteSpace: "nowrap" }}>
          BNB Balance:
        </div>
        <div
          style={{
            padding: "0px 10px",
            backgroundColor: "#0E2E2A",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {data.BNBBalance}
        </div>
        <div
          style={{
            padding: "0px 10px",
            backgroundColor: "white",
            color: "#0E2E2A",
            display: "flex",
           maxWidth: "120px",
              overflowX: "auto",
            alignItems: "center",
          }}
        >
          ${formatNumberWithCommasAndDecimal(data.BNBBalance * price[3])}
        </div>
        <div
          style={{
            padding: "3px 7px",
            backgroundColor: "#FDC40A",
            borderRadius: "4px",
            color: "black",
            fontWeight: "bold",
            position: "relative",
          }}
          className="button"
          onClick={() => setCurrent("BNB")}
        >
          Edit
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "5px",
        }}
      >
        {" "}
        <div style={{ fontWeight: "700", whiteSpace: "nowrap" }}>
          BCH Balance:
        </div>
        <div
          style={{
            padding: "0px 10px",
            backgroundColor: "#0E2E2A",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {data.BCHBalance}
        </div>
        <div
          style={{
            padding: "0px 10px",
            backgroundColor: "white",
            color: "#0E2E2A",
            display: "flex",
            maxWidth: "120px",
              overflowX: "auto",
            alignItems: "center",
          }}
        >
          ${formatNumberWithCommasAndDecimal(data.BCHBalance * price[16])}
        </div>
        <div
          style={{
            padding: "3px 7px",
            backgroundColor: "#FDC40A",
            borderRadius: "4px",
            color: "black",
            fontWeight: "bold",
          }}
          className="button"
          onClick={() => setCurrent("BCH")}
        >
          Edit
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "5px",
        }}
      >
        {" "}
        <div style={{ fontWeight: "700", whiteSpace: "nowrap" }}>
          DOGE Balance:
        </div>
        <div
          style={{
            padding: "0px 10px",
            backgroundColor: "#0E2E2A",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {data.DOGEBalance}
        </div>
        <div
          style={{
            padding: "0px 10px",
            backgroundColor: "white",
            color: "#0E2E2A",
            display: "flex",
            maxWidth: "120px",
              overflowX: "auto",
            alignItems: "center",
            
          }}
        >
          ${formatNumberWithCommasAndDecimal(data.DOGEBalance * price[6])}
        </div>
        <div
          style={{
            padding: "3px 7px",
            backgroundColor: "#FDC40A",
            borderRadius: "4px",
            color: "black",
            fontWeight: "bold",
          }}
          className="button"
          onClick={() => setCurrent("DOGE")}
        >
          Edit
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "10px",
        }}
      >
        {" "}
        <div style={{ fontWeight: "700", whiteSpace: "nowrap" }}>
          BTC Address:
        </div>
        <div
          style={{
            wordWrap: "break-word",
            padding: "5px 10px", // Use "scrollBehavior" instead of "scrollBehaviour"
            backgroundColor: "#0E2E2A",
            textAlign: "center",
            width: "120px",
            borderRadius: "4px",
            fontSize: "12px",
            // Use "textAlign" instead of "alignText"
          }}
        >
          {data.BTCAddress}
        </div>
        <div
          style={{
            padding: "3px 7px",
            backgroundColor: "#FDC40A",
            borderRadius: "4px",
            color: "black",
            fontWeight: "bold",
          }}
          className="button"
          onClick={() => setCurrent2("BTC")}
        >
          Edit
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "10px",
        }}
      >
        {" "}
        <div style={{ fontWeight: "700", whiteSpace: "nowrap" }}>
          USDT Address:
        </div>
        <div
          style={{
            wordWrap: "break-word",
            padding: "5px 10px", // Use "scrollBehavior" instead of "scrollBehaviour"
            backgroundColor: "#0E2E2A",
            textAlign: "center",
            width: "120px",
            borderRadius: "4px",
            fontSize: "12px",
            // Use "textAlign" instead of "alignText"
          }}
        >
          {data.USDTAddress}
        </div>
        <div
          style={{
            padding: "3px 7px",
            backgroundColor: "#FDC40A",
            borderRadius: "4px",
            color: "black",
            fontWeight: "bold",
          }}
          className="button"
          onClick={() => setCurrent2("USDT")}
        >
          Edit
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "10px",
        }}
      >
        {" "}
        <div style={{ fontWeight: "700", whiteSpace: "nowrap" }}>
          ETH Address:
        </div>
        <div
          style={{
            wordWrap: "break-word",
            padding: "5px 10px", // Use "scrollBehavior" instead of "scrollBehaviour"
            backgroundColor: "#0E2E2A",
            textAlign: "center",
            width: "120px",
            borderRadius: "4px",
            fontSize: "12px",
            // Use "textAlign" instead of "alignText"
          }}
        >
          {data.ETHAddress}
        </div>
        <div
          style={{
            padding: "3px 7px",
            backgroundColor: "#FDC40A",
            borderRadius: "4px",
            color: "black",
            fontWeight: "bold",
          }}
          className="button"
          onClick={() => setCurrent2("ETH")}
        >
          Edit
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "10px",
        }}
      >
        {" "}
        <div style={{ fontWeight: "700", whiteSpace: "nowrap" }}>
          TRON Address:
        </div>
        <div
          style={{
            wordWrap: "break-word",
            padding: "5px 10px", // Use "scrollBehavior" instead of "scrollBehaviour"
            backgroundColor: "#0E2E2A",
            textAlign: "center",
            width: "120px",
            borderRadius: "4px",
            fontSize: "12px",
            // Use "textAlign" instead of "alignText"
          }}
        >
          {data.TRONAddress}
        </div>
        <div
          style={{
            padding: "3px 7px",
            backgroundColor: "#FDC40A",
            borderRadius: "4px",
            color: "black",
            fontWeight: "bold",
          }}
          className="button"
          onClick={() => setCurrent2("TRC")}
        >
          Edit
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "10px",
        }}
      >
        {" "}
        <div style={{ fontWeight: "700", whiteSpace: "nowrap" }}>
          BNB Address:
        </div>
        <div
          style={{
            wordWrap: "break-word",
            padding: "5px 10px", // Use "scrollBehavior" instead of "scrollBehaviour"
            backgroundColor: "#0E2E2A",
            textAlign: "center",
            width: "120px",
            borderRadius: "4px",
            fontSize: "12px",
            // Use "textAlign" instead of "alignText"
          }}
        >
          {data.BNBAddress}
        </div>
        <div
          style={{
            padding: "3px 7px",
            backgroundColor: "#FDC40A",
            borderRadius: "4px",
            color: "black",
            fontWeight: "bold",
          }}
          className="button"
          onClick={() => setCurrent2("BNB")}
        >
          Edit
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "10px",
        }}
      >
        {" "}
        <div style={{ fontWeight: "700", whiteSpace: "nowrap" }}>
          BCH Address:
        </div>
        <div
          style={{
            wordWrap: "break-word",
            padding: "5px 10px", // Use "scrollBehavior" instead of "scrollBehaviour"
            backgroundColor: "#0E2E2A",
            textAlign: "center",
            width: "120px",
            borderRadius: "4px",
            fontSize: "12px",
            // Use "textAlign" instead of "alignText"
          }}
        >
          {data.BCHAddress}
        </div>
        <div
          style={{
            padding: "3px 7px",
            backgroundColor: "#FDC40A",
            borderRadius: "4px",
            color: "black",
            fontWeight: "bold",
          }}
          className="button"
          onClick={() => setCurrent2("BCH")}
        >
          Edit
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {" "}
        <div style={{ fontWeight: "700", whiteSpace: "nowrap" }}>
          DOGE Address:
        </div>
        <div
          style={{
            wordWrap: "break-word",
            padding: "5px 10px", // Use "scrollBehavior" instead of "scrollBehaviour"
            backgroundColor: "#0E2E2A",
            textAlign: "center",
            width: "120px",
            borderRadius: "4px",
            fontSize: "12px",
            // Use "textAlign" instead of "alignText"
          }}
        >
          {data.DOGEAddress}
        </div>
        <div
          style={{
            padding: "3px 7px",
            backgroundColor: "#FDC40A",
            borderRadius: "4px",
            color: "black",
            fontWeight: "bold",
          }}
          className="button"
          onClick={() => setCurrent2("DOGE")}
        >
          {/* {data.transactionHistory} */}
          Edit
        </div>
      </div>



        <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {" "}
        <div style={{ fontWeight: "700" }}>
          BTC Withdrawal Message:
        </div>
        <div
       className="input-styling-withdrawal-message-value"
        >
          {data.BTCWithdrawalMessage}
        </div>
        <div
          style={{
            padding: "3px 7px",
            backgroundColor: "#FDC40A",
            borderRadius: "4px",
            color: "black",
            fontWeight: "bold",
          }}
          className="button"
          onClick={() => setCurrent3("BTC")}
        >
          {/* {data.transactionHistory} */}
          Edit
        </div>
      </div>




        <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {" "}
        <div style={{ fontWeight: "700" }}>
          USDT Withdrawal Message:
        </div>
        <div
        className="input-styling-withdrawal-message-value"
        >
          {data.USDTWithdrawalMessage}
        </div>
        <div
          style={{
            padding: "3px 7px",
            backgroundColor: "#FDC40A",
            borderRadius: "4px",
            color: "black",
            fontWeight: "bold",
          }}
          className="button"
          onClick={() => setCurrent3("USDT")}
        >
          {/* {data.transactionHistory} */}
          Edit
        </div>
      </div>




        <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {" "}
        <div style={{ fontWeight: "700" }}>
          ETH Withdrawal Message:
        </div>
        <div
       className="input-styling-withdrawal-message-value"
        >
          {data.ETHWithdrawalMessage}
        </div>
        <div
          style={{
            padding: "3px 7px",
            backgroundColor: "#FDC40A",
            borderRadius: "4px",
            color: "black",
            fontWeight: "bold",
          }}
          className="button"
          onClick={() => setCurrent3("ETH")}
        >
       
          Edit
        </div>
      </div>




        <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {" "}
        <div style={{ fontWeight: "700" }}>
          TRON Withdrawal Message:
        </div>
        <div
          className="input-styling-withdrawal-message-value"
        >
          {data.TRONWithdrawalMessage}
        </div>
        <div
          style={{
            padding: "3px 7px",
            backgroundColor: "#FDC40A",
            borderRadius: "4px",
            color: "black",
            fontWeight: "bold",
          }}
          className="button"
          onClick={() => setCurrent3("TRC")}
        >
      
          Edit
        </div>
      </div>






        <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%"
        }}
      >
        {" "}
        <div style={{ fontWeight: "700" }}>
          BNB Withdrawal Message:
        </div>
        <div
         className="input-styling-withdrawal-message-value"
        >
          {data.BNBWithdrawalMessage}
        </div>
        <div
          style={{
            padding: "3px 7px",
            backgroundColor: "#FDC40A",
            borderRadius: "4px",
            color: "black",
            fontWeight: "bold",
          }}
          className="button"
          onClick={() => setCurrent3("BNB")}
        >
          Edit
        </div>
      </div>

        <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {" "}
        <div style={{ fontWeight: "700" }}>
          BCH Withdrawal Message:
        </div>
        <div
         className="input-styling-withdrawal-message-value"
        >
          {data.BCHWithdrawalMessage}
        </div>
        <div
          style={{
            padding: "3px 7px",
            backgroundColor: "#FDC40A",
            borderRadius: "4px",
            color: "black",
            fontWeight: "bold",
          }}
          className="button"
          onClick={() => setCurrent3("BCH")}
        >
          Edit
        </div>
      </div>




        <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {" "}
        <div style={{ fontWeight: "700" }}>
          DOGE Withdrawal Message:
        </div>
        <div
         className="input-styling-withdrawal-message-value"
        >
          {data.DOGEWithdrawalMessage}
        </div>
        <div
          style={{
            padding: "3px 7px",
            backgroundColor: "#FDC40A",
            borderRadius: "4px",
            color: "black",
            fontWeight: "bold",
          }}
          className="button"
          onClick={() => setCurrent3("DOGE")}
        >
          Edit
        </div>
      </div>



      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "10px",
        }}
      >
        {" "}
        <div style={{ fontWeight: "700" }}> Address:</div>
        <div
          style={{
            padding: "3px 7px",
            backgroundColor: "#0E2E2A",
            borderRadius: "4px",
            overflow: "scroll",
          }}
        >
          {data.address}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {" "}
        <div style={{ fontWeight: "700" }}> Next Of Kin Name:</div>
        <div
          style={{
            padding: "3px 7px",
            backgroundColor: "#0E2E2A",
            borderRadius: "4px",
            overflow: "scroll",
          }}
        >
          {data.nextofkinname}
        </div>
      </div>





      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {" "}
        <div style={{ fontWeight: "700" }}> Next Of Kin Phone:</div>
        <div
          style={{
            padding: "3px 7px",
            backgroundColor: "#0E2E2A",
            borderRadius: "4px",
            overflow: "scroll",
          }}
        >
          {data.nextofkinphone}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {" "}
        <div style={{ fontWeight: "700" }}> Next Of Kin Address:</div>
        <div
          style={{
            padding: "3px 7px",
            backgroundColor: "#0E2E2A",
            borderRadius: "4px",
            overflow: "scroll",
          }}
        >
          {data.nextofkinaddress}
        </div>
      </div>
    </div>
  );
}








function EditBalance({
  name,
  setCurrent,
  balance,
  logo,
  email,
  updateBalance,
  price
}: any) {
  const [userEntry, setUserEntry] = useState({
    logo: logo,
    action: "",
    email: email,
    amount: "",
    
  });

  async function initiateupdateBalance(action) {
    const updatedUserEntry = {
      ...userEntry,
      action: action,
      // @ts-ignore
      amountBalance: price * userEntry.amount,
    };

    updateBalance(updatedUserEntry);
  }

  return (
    <div
      style={{
        display: "flex",
        bottom: "0",
        top: "0",
        left: "0",
        right: "0",
        position: "fixed",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          bottom: "0",
          top: "0",
          left: "0",
          right: "0",
          display: "flex",
          position: "fixed",
          zIndex: "10000000",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
        onClick={() => setCurrent("")}
      ></div>
      <div
        style={{
          backgroundColor: "#0E172A",
          width: "300px",
          position: "fixed",
          zIndex: 2000000000000,
          display: "flex",
          flexDirection: "column",
          alignItems: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            height: "45px",
            justifyContent: "space-between",
            alignItems: "center",
            paddingLeft: "15px",
            color: "white",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              fontWeight: "bold",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {name}
          </div>{" "}
          <div
            style={{
              cursor: "pointer",
              color: "black",
              backgroundColor: "grey",
              display: "flex",
              width: "60px",
              height: "28px",
              justifyContent: "center",
              alignItems: "center",
            }}
            className="button"
            onClick={() => setCurrent("")}
          >
            X
          </div>
        </div>
        <div
          style={{ display: "flex", height: "100%", justifyContent: "center" }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <label
              htmlFor="fullname"
              style={{ color: "#94A4B8", fontSize: "13px", fontWeight: "600" }}
            >
              Current {name} of User
            </label>

            <div
              style={{
                width: "80px",
                backgroundColor: "#0E2E2A",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                alignSelf: "center",
                margin: "10px 0px",
              }}
            >
              {balance}
            </div>

            <label
              htmlFor="fullname"
              style={{ color: "#94A4B8", fontSize: "13px", fontWeight: "600" }}
            >
              Enter amount to Add/Remove
            </label>

            <input
              className="signup-input"
              style={{
                height: "35px",
                marginBottom: "20px",
                border: "1px solid rgba(256, 256, 256, 0.6",
              }}
              value={userEntry.amount}
              onChange={(e) =>
                setUserEntry({
                  ...userEntry,
                  amount: e.target.value,
                })
              }
              id="fullname"
              type="number"
              autoComplete="off" 
            />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            gap: "20px",
            justifyContent: "space-between",
            height: "30px",
          }}
        >
          <div
            style={{
              cursor: "pointer",
              color: "black",
              backgroundColor: "grey",
              display: "flex",
              width: "150px",
              height: "30px",
              justifyContent: "center",
              alignItems: "center",
            }}
            className="button"
              onClick={() => {
             
              initiateupdateBalance("Remove")
               setCurrent("");
            }
            }
          
          >
            Remove
          </div>
          <div
            style={{
              cursor: "pointer",
              color: "black",
              width: "150px",
              height: "30px",
              backgroundColor: "#FDC503",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            className="button"
            onClick={() => {
             
              initiateupdateBalance("Add");
               setCurrent("");
            }
            }
          >
            Add
          </div>
        </div>
      </div>
    </div>
  );
}





function EditAddress({
  name,
  setCurrent2,
  address,
  logo,
  email,
  updateAddress,
}: any) {
  const [userEntry, setUserEntry] = useState({
    logo: logo,
    email: email,
    newAddress: "",
  });

  async function initiateupdateAddress() {
    const updatedUserEntry = {
      ...userEntry,
    };

    updateAddress(updatedUserEntry);
  }

  return (
    <div
      style={{
        display: "flex",
        bottom: "0",
        top: "0",
        left: "0",
        right: "0",
        position: "fixed",
               zIndex: "1000000",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          bottom: "0",
          top: "0",
          left: "0",
          right: "0",
          display: "flex",
          position: "fixed",
          zIndex: "10000000",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
        onClick={() => setCurrent2("")}
      ></div>
      <div
        style={{
          backgroundColor: "#0E172A",
          width: "300px",
          position: "fixed",
          zIndex: "2000000000000",
          display: "flex",
          flexDirection: "column",
          alignItems: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            height: "45px",
            justifyContent: "space-between",
            alignItems: "center",
            paddingLeft: "15px",
            color: "white",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              fontWeight: "bold",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {name}
          </div>{" "}
          <div
            style={{
              cursor: "pointer",
              color: "black",
              backgroundColor: "grey",
              display: "flex",
              width: "60px",
              height: "28px",
              justifyContent: "center",
              alignItems: "center",
            }}
            className="button"
            onClick={() => setCurrent2("")}
          >
            X
          </div>
        </div>
        <div
          style={{ display: "flex", height: "100%", justifyContent: "center" }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <label
              htmlFor="fullname"
              style={{ color: "#94A4B8", fontSize: "13px", fontWeight: "600" }}
            >
              Current {name} of User
            </label>
 <div
          style={{
            wordWrap: "break-word",
            padding: "5px 10px", // Use "scrollBehavior" instead of "scrollBehaviour"
            backgroundColor: "#0E2E2A",
            textAlign: "center",
            width: "120px",
            borderRadius: "4px",
            fontSize: "12px",
            marginBottom: "20px"
            // Use "textAlign" instead of "alignText"
          }}
        >
          {address}
        </div>
            <label
              htmlFor="fullname"
              style={{ color: "#94A4B8", fontSize: "13px", fontWeight: "600" }}
            >
              Enter New Address To Update
            </label>

            <input
              className="signup-input"
              style={{
                height: "35px",
                marginBottom: "20px",
                border: "1px solid rgba(256, 256, 256, 0.6",
              }}
              value={userEntry.newAddress}
              onChange={(e) =>
                setUserEntry({
                  ...userEntry,
                  newAddress: e.target.value,
                })
              }
              id="fullname"
              type="string"
              autoComplete="off" // Add this line to deactivate input suggestion
            />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            gap: "20px",
            justifyContent: "center",
            height: "30px",
             marginBottom: "10px"
          }}
        >
          <div
            style={{
              cursor: "pointer",
              color: "black",
              width: "150px",
              height: "30px",
              fontWeight: "600",
              backgroundColor: "#FDC503",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
             
            }}
            className="button"
            onClick={() => {
              initiateupdateAddress();
              setCurrent2("");
            }}
          >
            Update
          </div>
        </div>
      </div>
    </div>
  );
}






function ViewReferrals({ setViewReferralState, data }) {
  const [amount, setAmount] = useState(null);
 const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData(referralEmail) {
      try {
        const response = await axios.post("/api/users/getAccountDetails", referralEmail);
        console.log("Successfully fetched data for referral");
        console.log(response.data.user.totalDepositedAmount);
        setAmount(response.data.user.totalDepositedAmount);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch data for referral");
        console.error(error);
        setLoading(false);
      }
    }

    data?.referrals.forEach((referral) => {
      fetchData(referral.referredEmail);
    });
  }, [data]);

       function formatNumberWithCommasAndDecimal(number) {
    const formattedNumber = parseFloat(number).toFixed(2).toString();
    const formattedString = parseFloat(formattedNumber).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return formattedString;
  }


  return (
    <div
      style={{
        display: "flex",
        position: "fixed",
        zIndex: "1000000",
        justifyContent: "center",
        alignItems: "center",
        top: "0",
        bottom: "0",
        left: "0",
        right: "0",
      }}
    >
      <div
        style={{
          display: "flex",
          position: "fixed",
          zIndex: "10000000",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          top: "0",
          bottom: "0",
          left: "0",
          right: "0",
        }}
        onClick={() => setViewReferralState("hide")}
      ></div>
      <div className="input-styling-withdrawal-message">
        <div
          style={{
            display: "flex",
            height: "45px",
            justifyContent: "space-between",
            alignItems: "center",
            paddingLeft: "15px",
            color: "white",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              fontWeight: "bold",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "12px",
            }}
          >
            {data.fullname} referrals
          </div>{" "}
          <div
            style={{
              cursor: "pointer",
              color: "black",
              backgroundColor: "grey",
              display: "flex",
              width: "60px",
              height: "28px",
              justifyContent: "center",
              alignItems: "center",
            }}
            className="button"
            onClick={() => setViewReferralState("hide")}
          >
            X
          </div>
        </div>
        <div
          style={{ display: "flex", height: "100%", justifyContent: "center", width: "100%" }}
        >
          {data?.referrals.length > 0 ? (
            <div className="referralHistory-body1">
              <div className="table">
                <div className="table-1">
          
                </div>
                <div className="table-3">
                  User
                </div>
                <div className="table-2">
                  Commission
                </div>
                <div className="table-2">
                  Created
                </div>
              </div>{" "}
        {data?.referrals.map((referral, index) => (
        <div key={referral.id} className="table">
          <div className="table-1">
            <GoPerson color="#FDC40A" />
          </div>
          <div className="table-3">
            {referral.referredName.split(" ")[0]}
          </div>
          <div className="table-2">
            {loading ? "Loading..." : formatNumberWithCommasAndDecimal(amount / 10)}
          </div>
          <div className="table-2">
            {new Date(referral.registrationDateTime).toLocaleString()}
          </div>
        </div>
      ))}
            </div>
          ) : (
            <div className="transactionHistory-body1" style={{ margin: "20px 10px" }}>
              <div className="transactionHistory-body2">
                     <Image src={emptyReferralImage} alt="" height={170} />
        <p style={{ marginTop: "5px" }}> No data to show</p>
     
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}




function EditWithdrawalMessage({
  name,
  setCurrent3,
  message,
  logo,
  email,
  updateWithdrawalMessage,
}: any) {
  const [userEntry, setUserEntry] = useState({
    logo: logo,
    email: email,
    newMessage: message,
  });

  async function initiateUpdateWithdrawalMessage() {
    const updatedUserEntry = {
      ...userEntry,
    };

    updateWithdrawalMessage(updatedUserEntry);
  }

  return (
    <div
      style={{
        display: "flex",
        bottom: "0",
        top: "0",
        left: "0",
        right: "0",
        position: "fixed",
        zIndex: "1000000",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          bottom: "0",
          top: "0",
          left: "0",
          right: "0",
          display: "flex",
          position: "fixed",
          zIndex: "10000000",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
        onClick={() => setCurrent3("")}
      ></div>
      <div
      className="input-styling-withdrawal-message"
      >
        <div
          style={{
            display: "flex",
            height: "45px",
            justifyContent: "space-between",
            alignItems: "center",
            paddingLeft: "15px",
            color: "white",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              fontWeight: "bold",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize:"12px"
            }}
          >
            {name}
          </div>{" "}
          <div
            style={{
              cursor: "pointer",
              color: "black",
              backgroundColor: "grey",
              display: "flex",
              width: "60px",
              height: "28px",
              justifyContent: "center",
              alignItems: "center",
            }}
            className="button"
            onClick={() => setCurrent3("")}
          >
            X
          </div>
        </div>
        <div
          style={{ display: "flex", height: "100%", justifyContent: "center", width: '100%' }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: '94%'
            }}
          >
         
             <label
              htmlFor="fullname"
              style={{ color: "#94A4B8", fontSize: "13px", fontWeight: "600", display: 'flex', width: "100%",}}
            >
            Current Withdrawal Message 
            </label>

         <div style={{  width: "100%", display: 'flex',  wordBreak: "break-all", fontWeight: "600",  borderRadius: "5px", marginBottom: "25px", padding: "10px", maxHeight:"300px", overflowY: "scroll", backgroundColor: "white", color: 'black', minHeight: "150px"}}>
              {userEntry.newMessage}
            </div>


            <label
              htmlFor="fullname"
                      style={{ color: "#94A4B8", fontSize: "13px", fontWeight: "600", display: 'flex', width: "100%",  }} >
              Enter New Withdrawal Message 
            </label>
            
             <input
                className="signup-input"
                 style={{
                 height: "35px",
                width: "100%",
                 marginBottom: "20px",
                 border: "1px solid rgba(256, 256, 256, 0.6)",
                 wordBreak: "break-all", // Add this CSS property
                 resize: "none", // Disable resizing
                  }}
                   value={userEntry.newMessage}
                    onChange={(e) =>
                   setUserEntry({
                    ...userEntry,
                   newMessage: e.target.value,
                   })
                   }
                  id="fullname"
                   type="string"
                   autoComplete="off"
                    />

          </div>
        </div>
        <div
          style={{
            display: "flex",
            gap: "20px",
            justifyContent: "center",
            height: "30px",
             marginBottom: "10px"
          }}
        >
          <div
            style={{
              cursor: "pointer",
              color: "black",
              width: "150px",
              height: "30px",
              fontWeight: "600",
              backgroundColor: "#FDC503",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
             
            }}
            className="button"
            onClick={() => {
              initiateUpdateWithdrawalMessage();
              setCurrent3("");
            }}
          >
            Update
          </div>
        </div>
      </div>
    </div>
  );
}




