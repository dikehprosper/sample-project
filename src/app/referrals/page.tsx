"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Navigator from "@/components/nav/nav";
import { Header } from "@/components/header/header";
import Body6 from "@/components/body6";
import Image from "next/image";
// @ts-ignore
import bgImage1 from "@/images/meta.png";

const Referrals = () => {
const [state, setState] = useState(true);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = React.useState([]);
  const [data, setData] = React.useState();
  const [user, setUser] = useState();

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


       useEffect(() => {
            setLoading(true)
getCryptoPrice()
 setLoading(false)
    }, []);

  async function getCryptoPrice() {
    const file = "file";
    try {
      const data = await axios.post("/api/users/crypto-price", {file});
      const res = await data.data
       setPrice(res)
    } catch (error: any) {
      console.error("Error fetching data:", error);
    }
  }



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
          <Body6
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

export default Referrals;
