"use client";
import "./subcoin.css";
// @ts-ignore
import Bitcoin from "../../images/bitcoin.jpeg";
// @ts-ignore
import Binance from "../../images/binance.jpeg";
// @ts-ignore
import Tron from "../../images/tron.jpeg";
// @ts-ignore
import Ethereum from "../../images/ethereum.jpeg";
// @ts-ignore
import Dogecoin from "../../images/dogecoin.jpeg";
// @ts-ignore
import BitcoinCash from "../../images/bitcoincash.jpeg";
// @ts-ignore
import Usdt from "../../images/usdt.jpeg";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { BsArrowUpShort } from "react-icons/bs";
import { BsArrowDownShort } from "react-icons/bs";
import { useRouter } from "next/navigation";
import QRCode from "qrcode.react";

const SubCoin = ({ price, data, name }: any) => {
  const [modalState, setModalState] = useState(false);
  function formatNumberWithCommasAndDecimal(number: any) {
    // Use toFixed(2) to ensure two decimal places and convert to a string
    const formattedNumber = parseFloat(number).toFixed(2).toString();

    // Use toLocaleString() to add commas for proper indentation
    const formattedString = parseFloat(formattedNumber).toLocaleString(
      undefined,
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }
    );

    return formattedString;
  }

  const coins = [
    {
      id: "1",
      name: "Bitcoin",
      img: Bitcoin,
      logo: "BTC",
      currentPrice: price[0],
      userBalance: data.BTCBalance,
      userBalanceWorth: 0,
      address: data.BTCAddress,
    },
    {
      id: "2",
      name: "USDT",
      img: Usdt,
      logo: "USDT",
      currentPrice: price[2],
      userBalance: data.USDTBalance,
      userBalanceWorth: 0,
      address: data.USDTAddress,
    },
    {
      id: "3",
      name: "Ethereum",
      img: Ethereum,
      logo: "ETH",
      currentPrice: price[1],
      userBalance: data.ETHBalance,
      userBalanceWorth: 0,
      address: data.ETHAddress,
    },
    {
      id: "4",
      name: "TRON",
      img: Tron,
      logo: "TRX",
      currentPrice: price[9],
      userBalance: data.TRONBalance,
      userBalanceWorth: 0,
      address: data.TRONAddress,
    },
    {
      id: "5",
      name: "Binance",
      img: Binance,
      logo: "BNB",
      currentPrice: price[3],
      userBalance: data.BNBBalance,
      userBalanceWorth: 0,
      address: data.BNBAddress,
    },
    {
      id: "6",
      name: "Bitcoin Cash",
      img: BitcoinCash,
      logo: "BCH",
      currentPrice: price[16],
      userBalance: data.BCHBalance,
      userBalanceWorth: 0,
      address: data.BCHAddress,
    },
    {
      id: "7",
      name: "Dogecoin",
      img: Dogecoin,
      logo: "DOGE",
      currentPrice: price[6],
      userBalance: data.DOGEBalance,
      userBalanceWorth: 0,
      address: data.DOGEAddress,
    },
  ];

  coins.forEach((crypto: any) => {
    crypto.userBalanceWorth = crypto.currentPrice * crypto.userBalance;
    return (crypto.userBalanceWorth = formatNumberWithCommasAndDecimal(
      crypto.userBalanceWorth
    ));
  });

  coins.forEach((crypto) => {
    return (crypto.currentPrice = formatNumberWithCommasAndDecimal(
      crypto.currentPrice
    ));
  });

  const router = useRouter();

  function sendSelectedCoin() {
    router.push(`/dashboard/${name}/send`);
  }

  function openModal() {
    setModalState(true);
  }

  function closeModal() {
    setModalState(false);
  }

  return (
    <div className="outerbody-subcoin">
      {coins.map((coin) => {
        if (coin.name === name) {
          return (
            <div key={coin.id}>
              <Coin
                name={coin.name}
                img={coin.img}
                logo={coin.logo}
                currentPrice={coin.currentPrice}
                userBalance={coin.userBalance}
                userBalanceWorth={coin.userBalanceWorth}
              />
              {modalState && (
                <Modal
                  closeModal={closeModal}
                  logo={coin.logo}
                  name={coin.name}
                  address={coin.address}
                />
              )}
            </div>
          );
        }
      })}

      <div className="outerbody-subcoin6">
        <div className="outerbody-subcoin7" onClick={sendSelectedCoin}>
          {" "}
          <BsArrowUpShort /> Send
        </div>
        <div className="outerbody-subcoin7" onClick={openModal}>
          <BsArrowDownShort /> Receive
        </div>
      </div>
    </div>
  );
};

export default SubCoin;

const Coin = ({
  name,
  img,
  currentPrice,
  userBalance,
  userBalanceWorth,
  logo,
}: any) => {
  const router = useRouter();

  function selectCoin() {
    router.push(`/dashboard/${name}`);
  }

  return (
    <div className="outerbody-subcoin1" onClick={selectCoin}>
      <div className="outerbody-subcoin2">
        {" "}
        
        <Image src={img} alt="" height={40} />
      </div>
      <div className="outerbody-subcoin3">
        <div className="outerbody-subcoin4">
          <div>${currentPrice}</div>
          <div>
            {userBalance}&nbsp;{logo}
          </div>
        </div>
        <div className="outerbody-subcoin5">
          <div>{name}</div> &nbsp;
          <div>= &nbsp;${userBalanceWorth}</div>
        </div>
      </div>
    </div>
  );
};

const Modal = ({ closeModal, logo, name, address, QRcode }: any) => {
  const [inputValue, setInputValue] = useState("uyfuhjvuuyijhviufiuhv");


   // Function to copy the referral link to the clipboard
  const copyContent = () => {
    // Get the content of the input element
    const inputElement = document.getElementById("address");
    // @ts-ignore
    const referralLink = inputElement.value;

    if (referralLink) {
      // Copy the referral link to the clipboard
      navigator.clipboard
        .writeText(referralLink)
        .then(() => {
          alert("Referral Link copied to clipboard: " + referralLink);
        })
        .catch((error) => {
          console.error("Copy to clipboard failed:", error);
        });
    }
  };

  return (
    <div
      style={{
        display: "flex",
        position: "fixed",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        left: "0px",
        right: "0px",
        top: "0px",
        bottom: "0px",
        zIndex: "10000",
      }}
    >
      <div className="modal-body modal-body1-1-1">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "15px",
            minHeight: "50px",
            maxHeight: "50px",
            borderBottom: "1px solid #344155",
            padding: "25px",
          }}
        >
          <div>Receive {logo}</div>
          <div
            style={{ opacity: "0.4", fontSize: "20px", cursor: "pointer" }}
            onClick={closeModal}
          >
            x
          </div>
        </div>

        <div style={{ height: "900px", marginTop: "15px", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
<div>
 
   <QRCode value={address} height={230} />
</div>
<div style={{opacity: "0.5"}}>Wallet Address</div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            borderBottom: "1px solid #344155",
            padding: "25px",
          }}
        >
          <div
            style={{
              display: "flex",
              height: "50%",
              width: "80%",
              alignSelf: "center",
              fontWeight: "300",
              fontSize: "14px",
            }}
          >
            <input
              style={{
                backgroundColor: "#0B1325",
                height: "39px",
                borderRadius: "4.5px 0px 0px 4.5px",
              }}
              className="signup-input form3 source"
              id="address" // Added id to identify the input element
              type="text"
              value={address || ""}
              readOnly // Add this attribute to make it non-editable
              placeholder={address || ""}
            />
            <div
              className="referral-link-input"
              style={{
                backgroundColor: "#FDC40A",
                display: "flex",
                height: "40px",
                color: "black",
                borderRadius: "4px",
                minWidth: "80px",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
                whiteSpace: "nowrap",
              }}
              onClick={copyContent} // Call the copyContent function on click
            >
              Copy
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: "20px",
              border: "1px solid #344155",
              borderRadius: "9px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                height: "70px",
                justifyContent: "center",
                color: "rgba(256, 256, 256, 0.4)",
                gap: "3px",
                borderBottom: "1px solid #344155",
                paddingLeft: "25px",
              }}
            >
              <div style={{ fontSize: "17px", fontWeight: "600" }}>Network</div>
              <div style={{ fontSize: "14px", fontWeight: "400" }}>
                {name} - {logo}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                height: "70px",
                justifyContent: "center",
                color: "rgba(256, 256, 256, 0.4)",
                gap: "3px",
                borderBottom: "1px solid #344155",
                paddingLeft: "25px",
              }}
            >
              <div style={{ fontSize: "17px" }}>Expected arrival</div>
              <div style={{ fontSize: "14px" }}>1 network confirmation</div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                height: "70px",
                justifyContent: "center",
                color: "rgba(256, 256, 256, 0.4)",
                gap: "3px",
                paddingLeft: "25px",
              }}
            >
              <div style={{ fontSize: "17px" }}>Expected unlock</div>
              <div style={{ fontSize: "12px", whiteSpace: "nowrap" }}>Automatically unlocked after confirmation</div>
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "end",
            height: "190px",
            width: "100%",
          }}
        >
          <span
            className="referral-link-input"
            style={{
              borderRadius: "5px",
              width: "69px",
              height: "35px",
              display: "flex",
              color: "black",
              backgroundColor: "#FDC40A",
              marginRight: "20px",
              fontWeight: "bold",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
            }}
            onClick={closeModal}
          >
            Close
          </span>
        </div>
      </div>
    </div>
  );
};
