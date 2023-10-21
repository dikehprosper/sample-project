"use client"
import "./header.css";
import React, { useEffect, useState } from "react";
import { CgMenu } from "react-icons/cg";
import Image from "next/image";
// @ts-ignore
import profile from "../../images/Profile-Icon-SVG-09856789.webp";
import {BsPersonFill} from "react-icons/bs";
import { AiOutlinePoweroff} from "react-icons/ai";
import {useRouter} from "next/navigation"
export const Header = ({ open2, setopen2, toggleMenu, logout, data }: any) => {
  const [state, setState] = useState(false);

  useEffect(() => {
    let addScript = document.createElement("script");
    addScript.setAttribute(
      "src",
      "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
    );

    document.body.appendChild(addScript);
    // @ts-ignore
    window.googleTranslateElementInit = googleTranslateElementInit;
  }, []);

  const googleTranslateElementInit = () => {
    // @ts-ignore
    new window.google.translate.TranslateElement(
      {
        pageLanguage: "en",
      },
      "google_translate_element"
    );
  };

  return (
    <>
   {state? <DropDown setState={setState} logout={logout} data={data} />: null}
    <div
      style={{
        minHeight: "80px",
        width: "100%",
        backgroundColor: "#1E283A",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        paddingLeft: "22px",
        paddingRight: "22px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "15px",
        }}
      >
        <div onClick={toggleMenu}>
          <CgMenu fontSize="20px" />
        </div>
        <div id="google_translate_element" style={{ marginTop: "15px" }}></div>
      </div>

      <div className="profile-image" style={{zIndex: "100000000"}} onMouseEnter={() => setState(true)} onClick={() => setState(true)} >
        <Image src={profile} alt="" height={40} />
        <div className="icon-overlay">
          <div className="green-icon"></div>
        </div>
        
      </div>
    </div>
    </>
  );
};


function DropDown({ setState, logout, data}: any) {
  const router = useRouter();
  return (
    <div style={{ display: "flex",
        position: "fixed",
        zIndex: "1000000",
        justifyContent: "center",
        alignItems: "center",
        top: "0",
        bottom: "0",
        left: "0",
        right: "0",}}>
    <div style={{    display: "flex",
          position: "fixed",
          zIndex: "10000000",
          top: "0",
          bottom: "0",
          left: "0",
          right: "0",}} onMouseEnter={() => setState(false)}> </div>
       <div style={{position: "fixed", top: "50px", backgroundColor: "#1E293B", width: "250px", height: "160px", zIndex: "20000000000" ,right: "20px", flexDirection: "column", borderRadius: "8px"}}>
  <div style={{display: "flex", width: '100%',height: "35%", padding: "0px 18px", alignItems: "center", gap: '15px', borderBottom: ".5px solid grey"}}>
     <div className="profile-image">
        <Image src={profile} alt="" height={40} />
        <div className="icon-overlay2">
          <div className="green-icon"></div>
        </div>
      </div>
      <div>
        <div style={{fontWeight: "600" ,fontSize: "13.5px"}}> {data?.fullname}   </div>
        <div style={{fontWeight: "300" ,fontSize: "12px"}}>{data?.email}</div>
      </div>
      </div>
       <div className="header-selection" style={{display: "flex", width: '100%', height: "30%", padding: "0px 18px",  alignItems: "center", borderBottom: "0.5px solid grey", fontSize: '14px'}} onClick={() => router.push("/settings")}> <BsPersonFill fontSize="18px" /> &nbsp; Profile</div>
        <div className="header-selection" style={{display: "flex", width: '100%', height: "35%", padding: "0px 18px", alignItems: "center",  fontSize: '14px'}} onClick={logout}> <AiOutlinePoweroff fontSize="18px" /> &nbsp; Sign Out</div>
      </div>
      </div>
  )
}