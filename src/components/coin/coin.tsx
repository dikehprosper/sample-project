import "./coin.css";
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
import React, { useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

const AllCoins = ({ price, data }) => {
  const router = useRouter();
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

  const coins = [
    {
      id: "1",
      name: "Bitcoin",
      img: Bitcoin,
      logo: "BTC",
      currentPrice: price[0],
      userBalance: data.BTCBalance,
      userBalanceWorth: 0,
    },
    {
      id: "2",
      name: "USDT",
      img: Usdt,
      logo: "USDT",
      currentPrice: price[2],
      userBalance: data.USDTBalance,
      userBalanceWorth: 0,
    },
    {
      id: "3",
      name: "Ethereum",
      img: Ethereum,
      logo: "ETH",
      currentPrice: price[1],
      userBalance: data.ETHBalance,
      userBalanceWorth: 0,
    },
    {
      id: "4",
      name: "TRON",
      img: Tron,
      logo: "TRC",
      currentPrice: price[9],
      userBalance: data.TRONBalance,
      userBalanceWorth: 0,
    },
    {
      id: "5",
      name: "Binance",
      img: Binance,
      logo: "BNB",
      currentPrice: price[3],
      userBalance: data.BNBBalance,
      userBalanceWorth: 0,
    },
    {
      id: "6",
      name: "Bitcoin Cash",
      img: BitcoinCash,
      logo: "BCH",
      currentPrice: price[16],
      userBalance: data.BCHBalance,
      userBalanceWorth: 0,
    },
    {
      id: "7",
      name: "Dogecoin",
      img: Dogecoin,
      logo: "DOGE",
      currentPrice: price[6],
      userBalance: data.DOGEBalance,
      userBalanceWorth: 0,
    },
  ];

  coins.forEach((crypto) => {
    crypto.userBalanceWorth = crypto.currentPrice * crypto.userBalance;
    // @ts-ignore
    return (crypto.userBalanceWorth = formatNumberWithCommasAndDecimal(
      crypto.userBalanceWorth
    ));
  });

  coins.forEach((crypto) => {
    return (crypto.currentPrice = formatNumberWithCommasAndDecimal(
      crypto.currentPrice,
    ));
  });

  return (
    <div className="outerbody-coin">
      {coins.map((coin) => {
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
          </div>
        );
      })}
    </div>
  );
};

export default AllCoins;

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
    <div onClick={selectCoin} className="outerbody-coin1">
      <div className="outerbody-coin2">
        {" "}
        <Image src={img} alt="" height={40} />
      </div>
      <div className="outerbody-coin3">
        <div className="outerbody-coin4">
          <div>${currentPrice}</div>
          <div>
            {userBalance}&nbsp;{logo}
          </div>
        </div>
        <div className="outerbody-coin5">
          <div>{name}</div> &nbsp;
          <div>= &nbsp;${userBalanceWorth}</div>
        </div>
      </div>
    </div>
  );
};
