"use client";
import "./nav.css";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import logo from "../../images/meta.png";
import { AiOutlineHome, AiOutlineInfoCircle } from "react-icons/ai";
import { FiDollarSign } from "react-icons/fi";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import { FiPackage, FiUsers, FiSettings } from "react-icons/fi";
import { BiLogOut } from "react-icons/bi";
import { useRouter } from "next/navigation";

const Navigator = ({ open2, logout, toggleMenu, changeLoadingStatusForNav }: any) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [isActive, setIsActive] = useState("dashboard");

   useEffect(() => {
  
      setIsActive("dashboard");

  }, []);

  useEffect(() => {
    // Check local storage for the active tab and set it if available
    const savedActiveTab = localStorage.getItem("activeTab");
    if (savedActiveTab) {
      setIsActive(savedActiveTab);
    }
  }, []);

  useEffect(() => {
    // Store the active tab in local storage whenever it changes
    localStorage.setItem("activeTab", isActive);
  }, [isActive]);

  
  function dropDown() {
    setOpen1(false);
    setOpen((prev) => {
      return !prev;
    });
  }
  function dropDown2() {
    setOpen(false);
    setOpen1((prev) => {
      return !prev;
    });
  }

  function sendFunctionality() {
     
    changeLoadingStatusForNav();
    setIsActive("dashboard");
    dropDown();
    router.push("/dashboard/all");
    toggleMenu();
   
  changeLoadingStatusForNav();
  }
  function receiveFunctionality() {

     changeLoadingStatusForNav();

    setIsActive("dashboard");
    toggleMenu();
    dropDown2();
    router.push("/dashboard/all");
     changeLoadingStatusForNav();
    
  }

  function goToDashboard() {

     changeLoadingStatusForNav();

    toggleMenu();
    setIsActive("dashboard");
    router.push("/dashboard");
     changeLoadingStatusForNav();
     
  }

  function goToReferrals() {

     changeLoadingStatusForNav();

    toggleMenu();
    setIsActive("referrals");
    router.push("/referrals");
     changeLoadingStatusForNav();
   
  }
  function goToSettings() {

     changeLoadingStatusForNav();
 
    toggleMenu();
    setIsActive("settings");
    router.push("/settings");
     changeLoadingStatusForNav();
      
  }

  function goToSupport() {
  
     changeLoadingStatusForNav();
 
    toggleMenu();
    setIsActive("support");
    router.push("/support");
     changeLoadingStatusForNav();
   
  }

  return (
    <div className={`nav-1 ${open2 ? "open" : ""}`}>
      <div
        className="nav-21"
        style={{ height: "40px", width: "50px", marginBottom: "45px" }}
      >
        <Image src={logo} alt="" height={40} width={40} />
        <h2 style={{ fontSize: "10px", whiteSpace: "nowrap" }}>META-TRADER</h2>
      </div>
      <div className="nav-2">
        <div className="nav-31">
          <div
            className={`nav1-link  ${
              isActive === "dashboard" ? "active-div" : ""
            }`}
            onClick={goToDashboard}
          >
            <AiOutlineHome fontSize="18.5px" />
            Dashboard
          </div>
        </div>
        <div className="nav-3">
          <div className="nav2-link" onClick={dropDown}>
            <div className="nav3-link">
              <FiDollarSign fontSize="18.5px" />
              Account
            </div>

            <div>
              {" "}
              {open ? (
                <MdOutlineKeyboardArrowDown fontSize="20px" />
              ) : (
                <MdOutlineKeyboardArrowUp fontSize="20px" />
              )}{" "}
            </div>
          </div>
          <div className={`nav-sublink1 ${open ? "open" : ""}`}>
            <div className="nav1-link" onClick={sendFunctionality}>
              Send
            </div>

            <div className="nav1-link" onClick={sendFunctionality}>
              Receive
            </div>
          </div>
        </div>
        <div className="nav-3">
          <div className="nav2-link" onClick={dropDown2}>
            <div className="nav3-link">
              <FiPackage fontSize="18.5px" />
              Currency
            </div>

            <div>
              {" "}
              {open1 ? (
                <MdOutlineKeyboardArrowDown fontSize="20px" />
              ) : (
                <MdOutlineKeyboardArrowUp fontSize="20px" />
              )}{" "}
            </div>
          </div>
          <div className={`nav-sublink1 ${open1 ? "open" : ""}`}>
            <div className="nav1-link" onClick={receiveFunctionality}>
              Supported Currency (USD)
            </div>

            <div className="nav1-link" onClick={receiveFunctionality}>
              Supported Cryptocurrency
            </div>
          </div>
        </div>
        <div className="nav-31">
          <div
            className={`nav1-link  ${
              isActive === "referrals" ? "active-div" : ""
            }`}
            onClick={goToReferrals}
          >
            <FiUsers fontSize="18.5px" />
            Referrals
          </div>
        </div>
        <div className="nav-31">
          <div
            className={`nav1-link  ${
              isActive === "settings" ? "active-div" : ""
            }`}
            onClick={goToSettings}
          >
            <FiSettings fontSize="18.5px" />
            Settings
          </div>
        </div>
        <div className="nav-31">
          <div
            className={`nav1-link  ${
              isActive === "support" ? "active-div" : ""
            }`}
            onClick={goToSupport}
          >
            <AiOutlineInfoCircle fontSize="18.5px" />
            Support Center
          </div>
        </div>
        <div className="nav-31">
          <div className="nav1-link" onClick={logout}>
            <BiLogOut fontSize="18.5px" />
            Logout
          </div>
        </div>
      </div>
    </div>
  );
};
export default Navigator;
