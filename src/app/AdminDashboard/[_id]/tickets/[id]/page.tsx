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
import Link from "next/link";

const AllTickets = ({ params: { id } }: any) => {
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
    } catch (error) {
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
  });

  const updateUserTicketDetails = async () => {
    try {
      //   console.log(data);
      const response = await axios.post(
        "/api/users/updateUserTicketConversation",
        conversationMessage
      );
      console.log("conversation added successfully", response);

      setData(response.data.user);
      console.log(response.data.user);
      setConversationMessage({ message: "", email: "", id: "" });
    } catch (error) {
      if (error.response.status === 500) {
        return toast.error("Failed to Send");
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
      }}
    >
      <Navigator
      _id={id}
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
            if (data._id === id) {
              return <Tickets data={data} secondId={id} key={data._id} />;
            }
          })
        )}
      </div>
    </div>
  );
};

export default AllTickets;

const Tickets = ({ data, secondId }: any) => {
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
        {data.tickets && data.tickets.length > 0 ? (
          data.tickets.map((ticket) => {
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

            const determineColor = () => {
              if (ticket.priority === "Medium") {
                return "#FDC40A";
              } else if (ticket.priority === "Low") {
                return "red";
              } else {
                return "green";
              }
            };

            //  const id1 = secondId;
            // const id2 = ticket._id;
            return (
              <div key={ticket.id} className="tickets1">
                <Link
                  style={{ color: "white" }}
                  href={{
                    pathname: `/AdminDashboard/${secondId}/tickets/ticket`,
                    query: { id1: secondId, id2: ticket._id },
                  }}
                >
                  <p
                    style={{
                      fontWeight: "200",
                      fontSize: "15.5px",
                      opacity: "0.7",
                    }}
                  >
                    {convertedTimestamp}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "7px",
                    }}
                  >
                    <span className="message-entered5">{ticket.subject}</span>
                    <span className="message-entered4">{ticket.message}</span>
                  </div>

                  <div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "end",
                        opacity: "0.6",
                      }}
                    >
                      {ticket.priority ? ticket.priority : "High"}
                    </div>
                    <div
                      style={{
                        height: "5px",
                        width: "100%",
                        backgroundColor: determineColor(),
                        borderRadius: "4px",
                        marginTop: "5px",
                      }}
                    ></div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: "22px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "35px",
                        width: "120px",
                        backgroundColor:
                          ticket.status === "open" ? "#FDC40A" : "red",
                        fontSize: "13px",
                        borderRadius: "5px",
                        opacity: "0.6",
                        fontWeight: "500",
                        color: ticket.status === "open" ? "black" : "white",
                      }}
                    >
                      Status: {ticket.status}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "end",
                        alignItems: "center",
                        height: "40px",
                        width: "130px",
                        fontSize: "16px",
                        gap: "7px",
                      }}
                    >
                      <span
                        style={{
                          color: ticket.status === "open" ? "#FDC40A" : "red",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        {" "}
                        <BiMessage />{" "}
                      </span>{" "}
                      {ticket.conversations && ticket.conversations.length}
                    </div>
                  </div>
                </Link>
              </div>
            );
          })
        ) : (
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
                      <Image src={emptyTransactionImage} alt="" height={170} />
                      <p style={{ marginTop: "5px" }}> No Ticket from user yet!</p>
                    </div>
        )}
      </div>
    </div>
  );
};
