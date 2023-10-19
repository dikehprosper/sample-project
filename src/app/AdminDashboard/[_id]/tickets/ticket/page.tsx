"use client";
import React, { useRef, useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";
import emptyTransactionImage from "@/images/empty.svg";
import axios from "axios";
import { useRouter } from "next/navigation";
import Navigator from "@/components/admin-nav/admin-nav2";
import { Header } from "@/components/header/header2";
import Body8 from "@/components/body8";
import bgImage1 from "@/images/meta.png";
import { BiMessage } from "react-icons/bi";

const AllTickets = ({searchParams}: any) => {

  const router = useRouter();
  const [open2, setOpen2] = useState(window.innerWidth <= 864 ? false : true);
  const [state, setState] = useState(true);

  const [loading, setLoading] = useState(false);
  const [price, setPrice] = React.useState([]);
  const [data, setData] = React.useState([]);

  // To get the data of the user
  const getAllUserDetails = async () => {
        setLoading(true)
    const res = await axios.get("/api/users/allUsers");
    setData(res.data.data);
        setLoading(false)
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

  const [conversationMessage, setConversationMessage] = useState({
    message: "",
    email: "",
    id: "",
    status: ''
  });
 

  const updateUserTicketDetails = async () => {
    try {
      //   console.log(data);
      const response = await axios.post(
        "/api/users/updateUserTicketConversationFromAdmin",
        conversationMessage
      );
  console.log("conversation added successfully", response);

       getAllUserDetails();

      setConversationMessage({ message: "", email: "", id: "" });
    } catch (error: any) {
      if (error.response.status === 500) {
        return toast.error("Failed to Send");
      }
    }
  };

const closeUserTicketDetails = async (email, id2) => {
  try {
 
    const status = "close"; // Set the status to "close"
     const message = "";
    // Create a new object with email, id, and status
    const requestData = {
      email,
      id: id2,
      status,
      message
    };

    const response = await axios.post(
      "/api/users/updateUserTicketConversationFromAdmin",
      requestData
    );
 toast.success("Ticket has been closed by Admin", response);
    console.log("Ticket has been closed by Admin", response);

  


  } catch (error:any) {
    if (error.response && error.response.status === 500) {
      return toast.error("Failed to Send");
    }
    if (error.response && error.response.status === 406) {
  getAllUserDetails();
      return toast.success("Ticket has been closed by Admin");
    }
  }
};



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
        backgroundColor: "#1E283A",
        display: "flex",
        minHeight: "100vh"
      }}
    >
      <Navigator
      _id={searchParams.id1}
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
          height: "auto",
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
       
          data.map((data) => {
            if (data._id === searchParams.id1) {
              return (
                <Tickets
                  data={data}
                  id2={searchParams.id2}
                  key={data._id}
                  setConversationMessage={setConversationMessage}
                  updateUserTicketDetails={updateUserTicketDetails}
                  conversationMessage={conversationMessage}
                  closeUserTicketDetails={closeUserTicketDetails}
                />
              );
            }
          })
        )}
      </div>
    </div>
  );
};

export default AllTickets;

const Tickets = ({
  data,
  id2,
  setConversationMessage,
  updateUserTicketDetails,
  conversationMessage,
  closeUserTicketDetails
}: any) => {
  // console.log(data)
  const router = useRouter();
  const chatContainerRef = useRef<HTMLDivElement>(null); // Specify the type

  useEffect(() => {
    // Scroll to the last message after rendering or when a new message is sent
    scrollToLastMessage();
  }, [data]);

  const scrollToLastMessage = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };
  const [modalState, setModalState] = useState(false);

  function openModal() {
    setModalState(true);
  }

  function closeModal() {
    setModalState(false);
  }

  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: any) => {
    setInputValue(e.target.value);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#0F172A",
        width: "100%",
        minWidth: "340px",
        padding: "10px",
        minHeight: "100vh",
        alignItems: "center",
      }}
    >
      <div className="body5">
        <h3>{data.fullname} Tickets</h3>
        <div style={{ fontSize: "12px", display: "flex" }}>
          {" "}
          <a style={{ color: "#FDC40A", opacity: "1.4", cursor: "pointer" }}>
            {" "}
            {data.fullname} &nbsp;{" "}
          </a>{" "}
          <p style={{ fontSize: "12px", opacity: "0.4" }}>
            &gt; &nbsp; View Ticket{" "}
          </p>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          width: "95%",
          alignSelf: "center",
          minHeight: "300px",
          justifyContent: "center",
          flexDirection: "column",
          gap: "10px",
          marginTop: "20px",
        }}
      >
        {data.tickets.map((ticket) => {
          console.log(ticket.status)
          const convertedTimestamp = new Date(
            ticket.registrationDateTime
          ).toLocaleString("en-US", {
            timeZone: "UTC",
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          });

          if (ticket._id === id2) {
            return (
              <div
                key={ticket._id}
                style={{
                  width: "97%",
                  alignSelf: "center",
                  minHeight: "200px",
                  backgroundColor: "#1E293A",
                  marginTop: "28px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  borderRadius: "5px",
                }}
              >
                <div className="message-entered-heading1">{ticket.subject}</div>
                <div
                  style={{
                    display: "flex",
                    backgroundColor: "#344155",
                    height: "1px",
                  }}
                >
                  {" "}
                </div>
                <div
                  style={{
                    paddingRight: "29px",
                    minHeight: "70px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    gap: "10px",
                    opacity: "0.6",
                    borderBottom: "1px solid #344155",
                    padding: "29px",
                  }}
                >
                  <div className="time-stamp">{convertedTimestamp}</div>
                  <div
                    style={{
                      fontSize: "14px",
                      fontWeight: "400",
                      wordWrap: "break-word",
                      maxWidth: "250px",
                      borderRadius: "13px 13px 13px 0px",
                      display: "flex",
                      gap: "10px",
                    }}
                  >
                    {" "}
                    <span className="message-entered-heading">MESSAGE:</span>
                    <span className="message-entered2">{ticket.message}</span>
                  </div>{" "}
                </div>
                <div
                  style={{
                    display: "flex",
                    minHeight: "250px",
                    maxHeight: "400px",
                    borderBottom: "1px solid #344155",
                    flexDirection: "column",
                    gap: "35px",
                    overflow: "auto",
                    padding: "29px",
                    overflowY: "scroll",
                    scrollBehavior: "smooth",
                  }}
                  ref={chatContainerRef}
                >
                  {ticket.conversations.length > 0
                    ? ticket.conversations.map((data) => {
                        const convertedTimestamp2 = new Date(
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

                        return data.messagefromAdmin ? (
                          <div
                            key={data.id}
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "10px",
                              alignItems: "end",
                            }}
                          >
                            <div className="time-stamp">
                              {" "}
                              {convertedTimestamp2}
                            </div>
                            <div className="message-entered6">
                              {data.messagefromAdmin}
                            </div>
                          </div>
                        ) : (
                          <div
                            key={data.id}
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "10px",
                            }}
                          >
                            <div className="time-stamp">
                              {" "}
                              {convertedTimestamp2}
                            </div>
                            <div className="message-entered3">
                              {data.messagefromUser}
                            </div>
                          </div>
                        );
                      })
                    : ticket.status === "open" && (
                        <div
                          style={{
                            width: "100%",
                            height: "300px",
                            display: "flex",
                            justifyContent: "center",
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                        >
                          <Image
                            src={emptyTransactionImage}
                            alt=""
                            height={170}
                          />
                          <p style={{ marginTop: "5px" }}> No data to show</p>
                        </div>
                      )}
                  {ticket.status === "closed" && (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        height: "30px",
                        fontSize: "15px",
                        opacity: "0.7",
                      }}
                    >
                      Thanks for contacting Support
                    </div>
                  )}
                </div>
                <textarea
                  className="signup-input"
                  value={conversationMessage.message}
                  onChange={(e) => {
                    if (ticket.status !== "closed") {
                      handleInputChange(e);
                      setConversationMessage({
                        id: id2,
                        email: data.email,
                        message: e.target.value,
                      });
                    }
                  }}
                  placeholder="Add a reply..."
                  style={{
                    height: `${inputValue.split("\n").length * 80}px`,
                    minHeight: "43px",
                    width: "95%",
                    alignSelf: "center",
                    marginTop: "20px",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                  disabled={ticket.status === "closed"} // Disable textarea when ticket status is closed
                />

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    margin: "25px 20px",
                  }}
                >
                  <div
                    style={{
                      width: "120px",
                      display: "flex",
                      color: "black",
                      minHeight: "40px",
                      borderRadius: "5px",
                      justifyContent: "center",
                      alignItems: "center",
                      cursor: "pointer",
                      backgroundColor: "#FDC40A",
                      pointerEvents: ticket.status === "closed" ? "none" : "",
                    }}
                    onClick={updateUserTicketDetails}
                  >
                    Add Reply
                  </div>
                  <div
                    style={{
                      width: "120px",
                      display: "flex",
                      color: "black",
                      minHeight: "40px",
                      borderRadius: "5px",
                      justifyContent: "center",
                      alignItems: "center",
                      cursor: "pointer",
                      backgroundColor: "rgba(256, 0, 0, 0.6)",
                      pointerEvents: ticket.status === "closed" ? "none" : "",
                    }}
                    onClick={() => closeUserTicketDetails(data.email, id2)}
                  >
                    Close chat
                  </div>
                </div>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};
