import React, { useState, useEffect } from "react";
import "./referrals-history.css";
import Image from "next/image";
// @ts-ignore
import emptyReferralImage from "../../images/empty.svg";
import {GoPerson} from "react-icons/go";
import axios from "axios"

const ReferralHistory = ({ user }: any) => {

const [amount, setAmount] = useState(null);
const [loading, setLoading] = useState(true);

useEffect(() => {
  async function fetchData(referralEmail) {
    try {
      const response = await axios.post(
        "/api/users/getAccountDetails",
        referralEmail
      );
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

  user?.referrals.forEach((referral) => {
    fetchData(referral.referredEmail);
  });
}, [user]);

function formatNumberWithCommasAndDecimal(number) {
  const formattedNumber = parseFloat(number).toFixed(2).toString();
  const formattedString = parseFloat(formattedNumber).toLocaleString(
    undefined,
    {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }
  );
  return formattedString;
}
  
  // console.log(user?.referrals);
  return user?.referrals.length > 0 ? (
    <div className="referralHistory-body1">
      <div className="table">
        <div className="table-1"></div>
        <div className="table-3">User</div>
        <div className="table-2">Commission</div>
        <div className="table-2">Created</div>
      </div>{" "}
      {user?.referrals.map((referral, index) => (
        <div key={referral.id} className="table">
          <div className="table-1">
            <GoPerson color="#FDC40A" />
          </div>
          <div className="table-3">{referral.referredName.split(" ")[0]}</div>
          <div className="table-2">
            {loading
              ? "Loading..."
              : formatNumberWithCommasAndDecimal(amount / 10)}
          </div>
          <div className="table-2">
            {new Date(referral.registrationDateTime).toLocaleString()}
          </div>
        </div>
      ))}
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
