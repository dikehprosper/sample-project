"use client";
import React, { useState, useEffect } from "react";
import { BsCheck2 } from "react-icons/bs";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import {FcCheckmark} from "react-icons/fc";
import Image from "next/image";
import bgImage1 from "@/images/meta.png";

export default function Form2({ name, price }: any) {

const router = useRouter();
  const [data, setData] = React.useState({
    _id: "650497a1463a54b74b3baa07",
    fullname: "World's funniest Videos",
    email: "dikeprosper.c@gmail.com",
    phone: 9052304220,
    isVerified: true,
    isAdmin: false,
    BTCBalance: 0,
    USDTBalance: 20,
    ETHBalance: 0,
    TRONBalance: 12,
    BNBBalance: 0,
    BCHBalance: 0,
    DOGEBalance: 0,
    __v: 0,
    verifyToken: "$2a$10$OJmSnqWyirXu2alczO4w4.13q0wISWQspqyczr8JnjKY17H2.cuJ6",
    verifyTokenExpiry: "2023-09-15T18:22:58.274Z",
  });
    const getUserDetails = async () => {
    const res = await axios.get("/api/users/me");
    console.log(res.data.data);
    setData(res.data.data);
  };

  useEffect(() => {
    getUserDetails();
  }, []);
  const [email, setEmail] = useState("")
 

   const [userEntry, setUserEntry] = useState<any>({
    amount: "",
    addressSentTo: "",
    network: "-- Choose Network --",
    name: name,
    email: email,

  });

   useEffect(() => {
    console.log(email);
  }, [email]);

 
  useEffect(() => {
    setEmail(data.email);
  },[data.email]);
 

  function checkCurrentLogo() {
    if (name === "Bitcoin") {
      return "BTC";
    } else if (name === "USDT") {
      return "USDT";
    } else if (name === "Ethereum") {
      return "ETH";
    } else if (name === "TRON") {
      return "TRC";
    } else if (name === "Bitcoin Cash") {
      return "BCH";
    } else if (name === "Dogecoin") {
      return "DOGE";
    } else if (name === "Binance") {
      return "BNB";
    }
  }

  function checkCoinPrice() {
    if (name === "Bitcoin") {
      return price[0];
    } else if (name === "USDT") {
      return price[2];
    } else if (name === "Ethereum") {
      return price[1];
    } else if (name === "TRON") {
      return price[9];
    } else if (name === "Bitcoin Cash") {
      return price[17];
    } else if (name === "Dogecoin") {
      return price[6];
    } else if (name === "Binance") {
      return price[3];
    }
  }

  function checkCoinBalance() {
    if (name === "Bitcoin") {
      return data.BTCBalance;
    } else if (name === "USDT") {
      return data.USDTBalance;
    } else if (name === "Ethereum") {
      return data.ETHBalance;
    } else if (name === "TRON") {
      return data.TRONBalance;
    } else if (name === "Bitcoin Cash") {
      return data.BCHBalance;
    } else if (name === "Dogecoin") {
      return data.DOGEBalance;
    } else if (name === "Binance") {
      return data.BNBBalance;
    }
  }

    function checkCoinNetwork() {
      if (name === "Bitcoin" || name === "TRON" || name === "Binance" || name === "Bitcoin Cash" || name === "Dogecoin") {
        return <NativeSelectDemo userEntry={userEntry} setUserEntry={setUserEntry} />
      } else if (name === "USDT" || name === "Ethereum") {
        return <NativeSelectDemo1 userEntry={userEntry} setUserEntry={setUserEntry} />
      } 
    }


 


  // Roundup price of coin to two decimal places and format with commas always
  function formatNumberWithCommasAndDecimal(number) {
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

  //determine the total price after the user have enter how much they want to send
  function determinePrice() {
    return checkCoinPrice() * userEntry.amount;
  }

  useEffect(() => {
    determinePrice();
  }, [userEntry.amount]);

    const [open, setOpen] = useState(false);

    function closeMesageSentFeedback() {
      router.push(`/dashboard/${name}`)
      setOpen(false)
    }

      const [loading, setLoading] = useState(false);

async function updateTransactionHistory() {
  if (checkCoinBalance() === 0) {
    return alert("You don't have any available balance");
  } else if (checkCoinBalance() < userEntry.amount) {
    return alert(
      "Your available balance is lower than the amount you are trying to send"
    );
  } else if (userEntry.addressSentTo === "") {
    return alert("Please input your wallet address");
  } else if (userEntry.network === "-- Choose Network --") {
    return alert("Please choose a network");
  } else {
    try {
      // Update the userEntry.email with the latest email from data.email
      userEntry.email = data.email;
      userEntry.name = name;
      setLoading(true)
      await axios.post("/api/users/updateTransactionHistory", userEntry);
      setLoading(false)
      setOpen(true)
      toast.success("Request has been sent successfully");
    } catch (error: any) {
       setLoading(false)
      console.log(error.message);
      toast.error(error.message);
    }
  }
}


  return (
     loading ? (
          <div
            style={{
              width: "100%",
              minHeight: "800px",
              backgroundColor: "black",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "white",
            }}
          >
            <div
              className="logo"
              style={{ height: "40px", width: "40px", objectFit: "cover" }}
            >
              <Image
                src={bgImage1} // Use the imported image URL
                alt="Description of the image"
                layout="responsive"
                objectFit="cover"
                objectPosition="center center"
                priority
              />
            </div>
          </div>) : (
    <div
      style={{
        width: "98%",
        padding: "25px",
        minHeight: "400px",
        borderRadius: "5px",
        backgroundColor: "#1E283A",
        alignSelf: "center",
      }}
    >
      <h6 style={{ marginBottom: "30px" }}>Send {name} to all Wallet</h6>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginBottom: "32px",
        }}
      >
        <label
          htmlFor="fullname"
          style={{ color: "#94A4B8", fontSize: "12px", fontWeight: "500" }}
        >
          How much do you want to sent in ({checkCurrentLogo()})
        </label>

        <input
          className="signup-input"
          id="fullname"
          type="number"
          value={userEntry.amount}
          onChange={(e) =>
            setUserEntry({
              ...userEntry,
              amount: e.target.value,
            })
          }
        />
        {userEntry.amount !== "" && (
          <div style={{ fontSize: "12px", color: "green", marginTop: "10px" }}>
            You will receive $
            {formatNumberWithCommasAndDecimal(determinePrice())} USD (
            {checkCurrentLogo()})
          </div>
        )}
      </div>

      {open ? <MesageSentFeedback closeMesageSentFeedback={closeMesageSentFeedback} /> : null}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginBottom: "32px",
        }}
      >
        <label
          htmlFor="email"
          style={{ color: "#94A4B8", fontSize: "12px", fontWeight: "500" }}
        >
          Wallet Address
        </label>

        <input
          className="signup-input"
          id="email"
          type="any"
          value={userEntry.addressSentTo}
          onChange={(e) =>
            setUserEntry({
              ...userEntry,
              addressSentTo: e.target.value,
            })
          }
        />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginBottom: "32px",
        }}
      >
        <label
          htmlFor="phone"
          style={{ color: "#94A4B8", fontSize: "12px", fontWeight: "500" }}
        >
          Network
        </label>

        {checkCoinNetwork()}
      </div>
      <div
        className="button-continue"
        style={{
          borderRadius: "5px",
          fontWeight: "600",
          cursor: "pointer",
          width: "100px",
          height: "40px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "black",
        }}
        onClick={updateTransactionHistory}
      >
        Continue
      </div>
    </div>
  )
)}


function MesageSentFeedback({closeMesageSentFeedback}:any) {
  return (
    <div
      style={{
        display: "flex",
        position: "fixed",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        left: "0px",
        right: "0px",
        top: "0px",
        bottom: "0px",
        zIndex: "10000",
      }}
    >
      <div className="modal-body" style={{ minHeight: "450px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
            fontSize: "15px",
            minHeight: "50px",
            maxHeight: "50px",
            borderBottom: "1px solid #344155",
            padding: "25px",
          }}
        >
          <div
            style={{ opacity: "0.4", fontSize: "27px", cursor: "pointer" }}
            onClick={closeMesageSentFeedback}
          >
            x
          </div>
        </div>
        <div style={{ display: "flex", height: "100%", flexDirection: "column", alignItems: 'center', justifyContent: 'center' }}>
  {/* <div style={{ overflowWrap: "break-word", width: "100%", opacity: '0.5' , fontWeight: '200'}}>
  hvfdjhbvibifbvbakvbabkvbjvbjbvijdfbvfijbvifjbvfjvbjbvkjfbvjkbfbjfbjkjdbvkjbkbfkbkfbvkbksjbkfbfkvbfkbfkbfdkjvbdfkbkbvkbkjvakvbkvbkbkbkabkbkjbakjbfkbkabfv
</div> */}
      <div
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "130px",
              border: "5px solid #43A047",
              display: 'flex',
              justifyContent: 'center',
             marginTop: '35px'
            }}
          >
            <FcCheckmark fontSize="90px" />
          </div>
          <h3 style={{whiteSpace: "nowrap"}}>Processesing</h3>
        
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "end",
            height: "50px",
            width: "100%",
            marginBottom: "20px",
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
            onClick={closeMesageSentFeedback}
          >
            Close
          </span>
        </div>
      </div>
    </div>
  );
}

function NativeSelectDemo({ userEntry, setUserEntry }: any) {
  const [currentValue, setCurrentValue] = useState("");
  const [open, setOpen] = useState(false);

  function selectInput(e: any) {
    setOpen(false);
    if (e === "Bitcoin") {
      setUserEntry({
        ...userEntry,
        network: "Bitcoin",
      });
    } else if (e === "Ethereum") {
      setUserEntry({
        ...userEntry,
        network: "Ethereum (ERC20)",
      });
    } else if (e === "Bnb") {
      setUserEntry({
        ...userEntry,
        network: "BNB Smart Chain (BNB20)",
      });
    } else if (e === "Tron") {
      setUserEntry({
        ...userEntry,
        network: "TRON (TRC20)",
      });
    }
  }

  return (
    <div style={{ position: "relative" }}>
      <input
        className="signup-input"
        style={{ display: "flex", width: "100%", paddingLeft: "10px" }}
        id="email"
        type="any"
        onClick={() => setOpen(true)}
        value={userEntry.network}
        placeholder={userEntry.network || ""}
      />
      {open && (
        <div
          style={{
            position: "absolute",
            display: "flex",
            flexDirection: "column",
            gap: "5px",
            backgroundColor: "#0f172a",
            top: "0",
            minWidth: "50%",
            borderRadius: "7px",
            padding: "10px",
            cursor: "pointer",
          }}
        >
          <div
            className="input-select"
            onClick={() => selectInput("-- Choose Network --")}
          >
            {" "}
            {userEntry.network === "-- Choose Network --" ? (
              <BsCheck2 className="BsCheck2-color" />
            ) : null}{" "}
            &nbsp; &nbsp; -- Choose Network --
          </div>
          <div className="input-select" onClick={() => selectInput("Bitcoin")}>
            {" "}
            {userEntry.network === "Bitcoin" ? (
              <BsCheck2 className="BsCheck2-color" />
            ) : null}{" "}
            &nbsp; &nbsp; Bitcoin
          </div>

          <div className="input-select" onClick={() => selectInput("Ethereum")}>
            {" "}
            {userEntry.network === "Ethereum (ERC20)" ? (
              <BsCheck2 className="BsCheck2-color" />
            ) : null}{" "}
            &nbsp; &nbsp; Ethereum (ERC20)
          </div>
          <div className="input-select" onClick={() => selectInput("Bnb")}>
            {" "}
            {userEntry.network === "BNB Smart Chain (BNB20)" ? (
              <BsCheck2 className="BsCheck2-color" />
            ) : null}{" "}
            &nbsp; &nbsp; BNB Smart Chain (BNB20)
          </div>
          <div className="input-select" onClick={() => selectInput("Tron")}>
            {" "}
            {userEntry.network === "TRON (TRC20)" ? (
              <BsCheck2 className="BsCheck2-color" />
            ) : null}{" "}
            &nbsp; &nbsp; TRON (TRC20)
          </div>
        </div>
      )}
    </div>
  );
}



function NativeSelectDemo1({ userEntry, setUserEntry }: any) {
  const [currentValue, setCurrentValue] = useState("");
  const [open, setOpen] = useState(false);

  function selectInput(e: any) {
    setOpen(false);
    if (e === "Bitcoin") {
      setUserEntry({
        ...userEntry,
        network: "Bitcoin",
      });
    } else if (e === "Ethereum") {
      setUserEntry({
        ...userEntry,
        network: "Ethereum (ERC20)",
      });
    } else if (e === "Bnb") {
      setUserEntry({
        ...userEntry,
        network: "BNB Smart Chain (BNB20)",
      });
    } else if (e === "Tron") {
      setUserEntry({
        ...userEntry,
        network: "TRON (TRC20)",
      });
    }
  }

  return (
    <div style={{ position: "relative" }}>
      <input
        className="signup-input"
        style={{ display: "flex", width: "100%", paddingLeft: "10px" }}
        id="email"
        type="any"
        onClick={() => setOpen(true)}
        value={userEntry.network}
        placeholder={userEntry.network || ""}
      />
      {open && (
        <div
          style={{
            position: "absolute",
            display: "flex",
            flexDirection: "column",
            gap: "5px",
            backgroundColor: "#0f172a",
            top: "0",
            minWidth: "50%",
            borderRadius: "7px",
            padding: "10px",
            cursor: "pointer",
          }}
        >
          <div
            className="input-select"
            onClick={() => selectInput("-- Choose Network --")}
          >
            {" "}
            {userEntry.network === "-- Choose Network --" ? (
              <BsCheck2 className="BsCheck2-color" />
            ) : null}{" "}
            &nbsp; &nbsp; -- Choose Network --
          </div>
      
          <div className="input-select" onClick={() => selectInput("Ethereum")}>
            {" "}
            {userEntry.network === "Ethereum (ERC20)" ? (
              <BsCheck2 className="BsCheck2-color" />
            ) : null}{" "}
            &nbsp; &nbsp; Ethereum (ERC20)
          </div>
         
        </div>
      )}
    </div>
  );
}



function NativeSelectDemo2({ userEntry, setUserEntry }: any) {
  const [currentValue, setCurrentValue] = useState("");
  const [open, setOpen] = useState(false);

  function selectInput(e: any) {
    setOpen(false);
    if (e === "Bitcoin") {
      setUserEntry({
        ...userEntry,
        network: "Bitcoin",
      });
    } else if (e === "Ethereum") {
      setUserEntry({
        ...userEntry,
        network: "Ethereum (ERC20)",
      });
    } else if (e === "Bnb") {
      setUserEntry({
        ...userEntry,
        network: "BNB Smart Chain (BNB20)",
      });
    } else if (e === "Tron") {
      setUserEntry({
        ...userEntry,
        network: "TRON (TRC20)",
      });
    }
  }

  return (
    <div style={{ position: "relative" }}>
      <input
        className="signup-input"
        style={{ display: "flex", width: "100%", paddingLeft: "10px" }}
        id="email"
        type="any"
        onClick={() => setOpen(true)}
        value={userEntry.network}
        placeholder={userEntry.network || ""}
      />
      {open && (
        <div
          style={{
            position: "absolute",
            display: "flex",
            flexDirection: "column",
            gap: "5px",
            backgroundColor: "#0f172a",
            top: "0",
            minWidth: "50%",
            borderRadius: "7px",
            padding: "10px",
            cursor: "pointer",
          }}
        >
          <div
            className="input-select"
            onClick={() => selectInput("-- Choose Network --")}
          >
            {" "}
            {userEntry.network === "-- Choose Network --" ? (
              <BsCheck2 className="BsCheck2-color" />
            ) : null}{" "}
            &nbsp; &nbsp; -- Choose Network --
          </div>

          <div className="input-select" onClick={() => selectInput("Ethereum")}>
            {" "}
            {userEntry.network === "Ethereum (ERC20)" ? (
              <BsCheck2 className="BsCheck2-color" />
            ) : null}{" "}
            &nbsp; &nbsp; Ethereum (ERC20)
          </div>
        </div>
      )}
    </div>
  );
}
