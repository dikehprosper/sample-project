"use client";
import { Suspense } from "react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Navigator from "@/components/admin-nav/admin-nav";
import { Header } from "@/components/header/header2";
import AdminBody from "@/components/admin-body/admin-body";
import Image from "next/image";
import bgImage1 from "@/images/meta.png";

const ProfilePage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
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

  const [data, setData] = React.useState([]);
  const [price, setPrice] = React.useState([]);
  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      localStorage.removeItem("activeTab");
      toast.success("Logout successful");
      localStorage.removeItem("activeTab");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const getAllUserDetails = async () => {
        setLoading(true)
    const res = await axios.get("/api/users/allUsers");
    setData(res.data.data);
        setLoading(false)
  };

  useEffect(() => {
    getAllUserDetails();
  }, []);
  

  const [open2, setOpen2] = useState(window.innerWidth <= 864 ? false : true);

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
          <AdminBody price={price} data={data} />
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
