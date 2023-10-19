import BalanceBoard from "../balanceBoard/balanceBoard";
 import Referral from "../referrals";
import AllCoins from "../coin/coin";
import TradingViewWidget from "../tradingView/tradingView";
const Body = ({ price, data, totalBalance }: any) => {
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
        Welcome, {firstName}!
      </div>
      <Referral user={data} />
      <BalanceBoard price={price} data={data} totalBalance={totalBalance} />
      <AllCoins price={price} data={data} />
      <TradingViewWidget height={100} />
    </div>
  );
};

export default Body;
