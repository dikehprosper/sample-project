"use client";
import "./admin-nav.css";
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

const Navigator = ({
    _id,
  open2,
  logout,
  toggleMenu,
  changeLoadingStatusForNav,
}: any) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [isActive, setIsActive] = useState("AllUsers");

  useEffect(() => {
    setIsActive("AllUsers");
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

 

  function goToAllUsers() {
    setTimeout(() => {
      changeLoadingStatusForNav();
    }, 1000);
    toggleMenu();
    setIsActive("AllUsers");
    router.push("/AdminDashboard");
    changeLoadingStatusForNav();
  }

 

  function goToSupport() {
    setTimeout(() => {
      changeLoadingStatusForNav();
    }, 1000);
    toggleMenu();
    setIsActive("support");
        router.push(`/AdminDashboard/${_id}/tickets/${_id}`)
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
              isActive === "All Users" ? "active-div" : ""
            }`}
            onClick={goToAllUsers}
          >
            <AiOutlineHome fontSize="18.5px" />
            All Users
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
             Tickets
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
