"use client";
import React, { useRef, useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";
import emptyTransactionImage from "@/images/empty.svg";
import axios from "axios";
import { useRouter } from "next/navigation";
import Navigator from "@/components/admin-nav/admin-nav2";
import { Header } from "@/components/header/header2";
import bgImage1 from "@/images/meta.png";

const TransactionHistories = ({ searchParams }: any) => {
  const router = useRouter();
  const [open2, setOpen2] = useState(window.innerWidth <= 864 ? false : true);
  const [state, setState] = useState(true);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = React.useState([]);
  const [data, setData] = React.useState([]);

  // To get the data of all users
  const getAllUserDetails = async () => {
    setLoading(true);
    const res = await axios.get("/api/users/allUsers");
    setData(res.data.data);
    setLoading(false);
  };

  useEffect(() => {
    getAllUserDetails();
  }, []);

  function changeLoadingStatus() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }

  function changeLoadingStatusForNav() {
    setLoading((prev) => {
      return !prev;
    });
  }

  // To enable and disable 2fa
  const changeState = async () => {
    try {
      const response = await axios.post("/api/users/changefastate", data);
      setState((prev) => {
        return !prev;
      });
      console.log("2fa updated successfully", response.data);
    } catch (error) {
      return toast.error("operation failed");
    }
  };

  // Logout functionality
  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      await localStorage.removeItem("activeTab");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  function toggleMenu() {
    setOpen2((prev) => {
      return !prev;
    });
  }

  function toggleMenuSmallerDevice() {
    if (window.innerWidth <= 768) {
      setOpen2((prev) => {
        return !prev;
      });
    }
  }

  // Function to update open2 based on screen width
  const updateOpenState = () => {
    if (window.innerWidth <= 768) {
      setOpen2(false); // Set open2 to false on smaller screens (e.g., mobile)
    } else {
      setOpen2(true); // Set open2 to true on larger screens
    }
  };

  // Listen for window resize events to update the state
  useEffect(() => {
    // Initial update
    updateOpenState();

    // Add event listener for window resize
    window.addEventListener("resize", updateOpenState);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", updateOpenState);
    };
  }, []);

  const updateUserTicketDetails = async (id: any, email: any, status: any, amount: any, name: any) => {
    const conversationMessage = {
      email: email,
      id: id,
      status: status,
      amount: amount,
      name: name
    };

    console.log(conversationMessage);

    try {
      const response = await axios.post(
        "/api/users/updateTransactionHistory",
        conversationMessage
      );
      console.log("conversation added successfully", response);
    } catch (error: any) {
      if (error.response.status === 405) {
        getAllUserDetails();
        return toast.success("transaction was approved");
      } else if (error.response.status === 406) {
        getAllUserDetails();
        return toast.success("transaction was disapproved");
      } else if (error.response.status === 500) {
        return toast.error("Failed to Send");
      }
    }
  };

  const userData = data.find((item: any) => item._id === searchParams.id);
  const userName = userData ? userData.fullname : "";


    const [data2, setData2] = React.useState({});
   const getUserDetails = async () => {
    const res = await axios.get("/api/users/me");

    setData2(res.data.data);
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  
  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "#0F182A",
        display: "flex",
      }}
    >
      <Navigator
        _id={searchParams.id}
        open2={open2}
        logout={logout}
        toggleMenu={toggleMenuSmallerDevice}
        changeLoadingStatusForNav={changeLoadingStatusForNav}
      />
      <div className={`navigation-sidebar ${open2 ? "open" : ""}`}></div>
      <div
        style={{
          display: "flex",
          width: "100%",
          minHeight: "100vh",
          flexDirection: "column",
        }}
      >
        <Header
          open2={open2}
          setOpen2={setOpen2}
          logout={logout}
          toggleMenu={toggleMenu}
          data={data2}
        />
        {loading ? (
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
          </div>
        ) : (
          <div
            style={{
              width: "95%",
              display: "flex",
              alignSelf: "center",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                fontSize: "22.5px",
                fontWeight: "700",
                width: "98%",
                height: "88px",
                borderBottom: "1px solid #334155",
                display: "flex",
                alignSelf: "center",
                flexDirection: "column",
                justifyContent: "end",
                paddingBottom: "5px",
                gap: "12px",
              }}
            >
              {userName}&apos;s Transactions
            </div>
            {data.map((data: any) => {
              if (data._id === searchParams.id) {
                return (
                  <div
                    key={data._id}
                    style={{
                      display: "flex",
                      width: "100%",
                      alignSelf: "center",
                      marginTop: "20px",
                      flexDirection: "column",
                    }}
                  >
                   
                    <TransactionHistory
                      transactionData={data}
                      key={data._id}
                      updateUserTicketDetails={updateUserTicketDetails}
                    />
                  </div>
                );
              }
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionHistories;

const TransactionHistory = ({
  name,
  price,
  transactionData,
  updateUserTicketDetails,
}: any) => {
  const [transactionHistory, setTransactionHistory] = useState(false);

  //  const filteredTransactions =
  //    data && data.transactionHistory
  //      ? data.transactionHistory.filter(
  //          (transaction) => transaction.name === name
  //        )
  //      : [];
  //   console.log(filteredTransactions)

  return (
    <div className="transactionHistory-body1" >
      <h6>Transaction History</h6>
      {transactionData.transactionHistory.length > 0 ? (
        <div className="transactionHistory-body3">
          <div
            style={{
              display: "flex",
              height: "40px",
              width: '100%',
              alignItems: "center",
              fontSize: "16px",
              fontWeight: "bold",
              objectFit: "contain"
            }}
          >
            <div className="transaction-body-admin-1"> Coin </div>
            <div className="transaction-body-admin-1">
              {" "}
              Network{" "}
            </div>
            <div
                className="transaction-body-admin-2"
            >
              Address Sent To{" "}
            </div>
            <div
               className="transaction-body-admin-3"
            >
              Amount
            </div>
            <div
                 className="transaction-body-admin-2"
            >
              Time{" "}
            </div>
            <div
                className="transaction-body-admin-3"
            >
              Status
            </div>
            <div
               className="transaction-body-admin-3"
            >
              Approve
            </div>
            <div
                   className="transaction-body-admin-3"
            >
              Disapprove
            </div>
          </div>
          {transactionData.transactionHistory
            .reverse()
            .map((data: any, index: any) => {
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
              console.log(data);
              return (
                <div
                  key={data.name}
                  style={{
                    display: "flex",
                    height: "50px",
                    alignItems: "center",
                    fontWeight: "light",
                    color: "rgba(256, 256, 256, 0.6)",
              fontSize: "13px"
                  }}
                >
                  <div className="transaction-body-admin-1">
                    {data.name}
                  </div>
                  <div className="transaction-body-admin-1">
                    {data.network}
                  </div>
                  <div
                  className="transaction-body-admin-2"
                  >
                    {data.addressSentTo}
            
                  </div>
                  <div
                   className="transaction-body-admin-3"
                  >
                    {data.amount}
                  </div>
                  <div
                     className="transaction-body-admin-2"
                  >
                    {convertedTimestamp}
                  </div>
                  <div
                        className="transaction-body-admin-3"
                  >
                    <div
                      style={{
                        padding: "0px 8px",
                        borderRadius: "18px",
                        fontWeight: "300",
                        fontFamily: "italic",
                        color:
                          data.status === "disapproved"
                            ? "rgba(255, 0, 0, 0.8)" // Set background color to yellow for "Pending" status
                            : data.status === "approved"
                            ? "rgba(0, 255, 0, 0.8)" // Set background color to green for "Completed" status
                            : "rgba(253, 196, 10, 0.8)", // Set background color to red for other status values
                     
                         }}
                    >
                      {data.status}
                    </div>
                  </div>
                  <div
                     className="transaction-body-admin-3"
                  >
                    <div
                      style={{
                        alignItem: "center",
                        padding: "3px 5px",
                        borderRadius: "5px",
                        fontWeight: "500",
                        color: "white",
                        pointerEvents:
                          data.status === "approved" ||
                          data.status === "disapproved"
                            ? "none"
                            : "auto",
                        backgroundColor:
                          data.status === "approved" ||
                          data.status === "disapproved"
                            ? "rgba(128, 128, 128, 0.5)" // Grey color in rgba
                            : "rgba(0, 256, 0, 0.6)", // Green color in rgba
                                 opacity:
                          data.status === "approved" ||
                          data.status === "disapproved"
                            ? "0.4" // Grey color in rgba
                            : "1", // Green color in rgba
                            
                      }}
                      onClick={() =>
                        updateUserTicketDetails(
                          data._id,
                          transactionData.email,
                          "approve",
                          data.amount,
                          data.name
                        )
                      }
                    >
                      Approve
                    </div>
                  </div>
                  <div
                      className="transaction-body-admin-3"
                  >
                    <div
                      style={{
                       
                         padding: "3px 5px",
                       borderRadius: "5px",
                        fontWeight: "500",
                        color: "white",
                        pointerEvents:
                          data.status === "approved" ||
                          data.status === "disapproved"
                            ? "none"
                            : "auto",
                        backgroundColor:
                          data.status === "approved" ||
                          data.status === "disapproved"
                            ? "rgba(128, 128, 128, 0.5)" // Grey color in rgba
                            : "rgba(256, 0, 0, 0.6)", // Green color in rgba
                                opacity:
                          data.status === "approved" ||
                          data.status === "disapproved"
                            ? "0.4" // Grey color in rgba
                            : "1", // Green color in rgba
                      }}
                      onClick={() =>
                        updateUserTicketDetails(
                          data._id,
                          transactionData.email,
                          "disapprove"
                        )
                      }
                    >
                      Disapprove
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
