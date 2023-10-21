"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Navigator from "@/components/nav/nav";
import { Header } from "@/components/header/header";
import Body5 from "@/components/body5";
import Image from "next/image";
// @ts-ignore
import bgImage1 from "@/images/meta.png";

const Settings = () => {
const [state, setState] = useState(true);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = React.useState([]);
  const [data, setData] = React.useState({
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
    verifyToken: "$2a$10$OJmSnqWyirXu2alczO4w4.13q0wISWQspqyczr8JnjKY17H2.cuJ6",
    verifyTokenExpiry: "2023-09-15T18:22:58.274Z",
  });
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
    address: "jndjnnfjn",
    residentialaddress: "hbbibrg",
    country: "United Kingdom",
    nextofkinname: "helen",
    nextofkinphone: 34567876543,
    nextofkinaddress: "london",
    __v: 0,
    verifyToken: "$2a$10$OJmSnqWyirXu2alczO4w4.13q0wISWQspqyczr8JnjKY17H2.cuJ6",
    verifyTokenExpiry: "2023-09-15T18:22:58.274Z",
  });

  // To get the data of the user
  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me");
    console.log(res.data.data);
    setData(res.data.data);
    setUser(res.data.data);
    setState(res.data.data.fastatus)
  };

  function changeLoadingStatusForNav() {
    setLoading((prev) => {
      return !prev;
    });
  }

  useEffect(() => {
    getUserDetails();
  }, []);

  useEffect(() => {
    console.log(user);
  }, [user]);

  // To set Coin Prices
   useEffect(() => {
    setLoading(true)
      // Make a GET request to your API route
      fetch('/api/users/crypto-price') // Replace 'your-api-route-name' with the actual route
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setPrice(data)
           setLoading(false)// Set the fetched data in your component's state
        })

        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }, []);

  function changeLoadingStatus() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }

  // To enable and disable 2fa
  const changeState = async () => {
    try {
      const response = await axios.post("/api/users/changefastate", data);
      setState((prev) => {
        return !prev;
      });
      getUserDetails();
      console.log("2fa updated successfully", response);
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

  const [open2, setOpen2] = useState(true);
  function toggleMenu() {
    setOpen2((prev) => {
      return !prev;
    });
  }

  useEffect(() => {
    if (window.innerWidth <= 864) {
      setOpen2(true);
    } else {
      setOpen2(true);
    }
  }, []);

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

  const updateUserDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/updateuserdetails", user);
      console.log("Profile updated successfully", response);
      setData(response.data.user);
      setUser(response.data.user);
      toast("Profile updated successfully");
    } catch (error: any) {
      if (error.response.status === 500) {
        return toast.error("Failed to update");
      }
    } finally {
      setLoading(false);
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
          <Body5
            price={price}
            data={data}
            state={state}
            changeState={changeState}
            setUser={setUser}
            user={user}
            updateUserDetails={updateUserDetails}
            changeLoadingStatus={changeLoadingStatus}
          />
        )}
      </div>
    </div>
  );
};

export default Settings;
