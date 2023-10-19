import React, { useState, useEffect } from "react";
import "./referrals-history.css";
import Image from "next/image";
import emptyReferralImage from "../../images/empty.svg";
import {GoPerson} from "react-icons/go";
import axios from "axios"

const ReferralHistory = ({ user }: any) => {

// const value = formatNumberWithCommasAndDecimal(user.totalDepositedAmount)


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

  
  // console.log(user?.referrals);
  return user?.referrals.length > 0 ? (
    <div className="referralHistory-body1">
      <div className="table"
      >
        <div
          className="table-1"
        ></div>
        <div
         className="table-3"
        >
          User
        </div>
        <div
         className="table-2"
        >
          Commission
        </div>
        <div
       className="table-2"
        >
          Created
        </div>
      </div>{" "}
      {user?.referrals.map((referral, index) => {

              const [amount, setAmount] = useState(null);

                  function formatNumberWithCommasAndDecimal(number) {
    const formattedNumber = parseFloat(number).toFixed(2).toString();
    const formattedString = parseFloat(formattedNumber).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return formattedString;
  }


                useEffect(() => {
                  
                  async function check() {
                    try {
                  
                      const response = await axios.post("/api/users/getAccountDetails", referral.referredEmail);
                      console.log("Successfully fetched data for referral", response);
                      console.log(response.data.user.totalDepositedAmount);
                      setAmount(response.data.user.totalDepositedAmount);
                    } catch (error) {
                      console.error("Failed to fetch data for referral", index);
                      console.error(error);
                    }
                  }

                  check();
                }, [referral.referredEmail]);
        return (
        <div
          key={index}
        className="table"
        >
          <div
          className="table-1"
          >
            <GoPerson color="#FDC40A" />
          </div>
          <div
         className="table-3"
          >
            {referral.referredName.split(" ")[0]}
          </div>
          <div
        className="table-2"
          >
        {amount !== null ?   `${formatNumberWithCommasAndDecimal(amount/10)}` : "Loading..."}
                  </div>
          <div
       className="table-2"
          >
            {" "}
            {new Date(referral.registrationDateTime).toLocaleString()}
          </div>
        </div>
      )})}
    </div>
  ) : (
    <div className="transactionHistory-body1">
      <div className="transactionHistory-body2">
        <Image src={emptyReferralImage} alt="" height={170} />
        <p style={{ marginTop: "5px" }}> No data to show</p>
      </div>
    </div>
  );
};

export default ReferralHistory;
