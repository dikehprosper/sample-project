"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Navigator from "@/components/nav/nav";
import { Header } from "@/components/header/header";
import Body8 from "@/components/body8";
import Image from "next/image";
import bgImage1 from "@/images/meta.png";

const Support = ({ params: { id } }: any) => {
  const [open2, setOpen2] = useState(window.innerWidth <= 864 ? false : true);
  const [state, setState] = useState(true);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = React.useState([]);
  const [data, setData] = React.useState();
  const [user, setUser] = useState({
    _id: "650497a1463a54b74b3baa07",
    fullname: "World's funniest Videos",
    email: "dikehprosper@gmail.com",
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
    firstname: "james",
    address: "jndjnnfjn",
    country: "United Kingdom",
    nextofkinname: "helen",
    nextofkinphone: 34567876543,
    nextofkinaddress: "london",
    __v: 0,
    tickets: [
      {
        subject: "String",
        message: "String",
        priority: "String",
        status: "open",
        registrationDateTime: "Date",
        _id: "1",
      },
      {
        subject: "String2",
        message: "String",
        priority: "String",
        status: "closed",
        registrationDateTime: "Date",
        _id: "2",
      },
      {
        subject: "String3",
        message: "String",
        priority: "String",
        status: "open",
        registrationDateTime: "Date",
        _id: "3",
      },
    ],
    verifyToken: "$2a$10$OJmSnqWyirXu2alczO4w4.13q0wISWQspqyczr8JnjKY17H2.cuJ6",
    verifyTokenExpiry: "2023-09-15T18:22:58.274Z",
  });

  // To get the data of the user
  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me");
    console.log(res.data.data);
    setData(res.data.data);
    setUser(res.data.data);
  };

  useEffect(() => {
    getUserDetails();
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
  });

  const updateUserTicketDetails = async () => {
    try {
      console.log(data);
      const response = await axios.post(
        "/api/users/updateUserTicketConversation",
        conversationMessage
      );
      console.log("conversation added successfully", response);
      setUser(response.data.user);
      setData(response.data.user);
      console.log(response.data.user);
      setConversationMessage({ message: "", email: "", id: "" });
    } catch (error: any) {
      if (error.response.status === 500) {
        return toast.error("Failed to Send");
      }
    }
  };

  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "#1E283A",
        display: "flex",
      }}
    >
      <Navigator
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
          data={data}
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
          <Body8
            id={id}
            setUser={setUser}
            user={user}
            updateUserTicketDetails={updateUserTicketDetails}
            setConversationMessage={setConversationMessage}
            conversationMessage={conversationMessage}
          />
        )}
      </div>
    </div>
  );
};

export default Support;
