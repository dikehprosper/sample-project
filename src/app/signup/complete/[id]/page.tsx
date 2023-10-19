"use client";
import Link from "next/link";
import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import bgImage1 from "@/images/meta.png";
import toast, { Toaster } from "react-hot-toast";
import Form4 from "@/components/form4";

const UpdateUserDetails = ({params:{id}}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [user, setUser] = React.useState({
    id: id ,
    address: "",
    country: "",
    nextofkinname: "",
    nextofkinphone: "",
    nextofkinaddress: ""
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);


  const Update = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/update", user);
      console.log("Profile updated successfully", response.data);
      router.push("/dashboard");
      toast("Profile updated successfully")
    } catch (error: any) {
  
  if (error.response.status === 500) {
        return toast.error("Signup failed");
      }
    } finally {
      setLoading(false);
    }
  };




  useEffect(() => {
    if (
      user.address.length > 0 &&
      user.country.length > 0 &&
      user.nextofkinname.length > 0 &&
      user.nextofkinphone.length > 0 &&
     user.nextofkinaddress.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);



  return (
    <div className="signup">
      <Toaster />
      {loading && (
        <div
          style={{
            position: "fixed",
            left: "0",
            top: "0",
            right: "0",
            bottom: "0",
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
      )}{" "}
      <div className="component1">
        <div style={{ height: "64px", marginBottom: "24px" }}>
          {" "}
          <div style={{ height: "50px", width: "50px", objectFit: "cover" }}>
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

        <div style={{ marginBottom: "24px" }}>
          <div
            style={{
              fontWeight: "bold",
              marginBottom: "7px",
              color: "#FFDA39",
              fontSize: "30px"
            }}
          >
           Complete your profile
          </div>
          <div
            style={{
              fontWeight: "light",
              marginBottom: "10px",
              color: "#5B6A81",
              fontSize: "15px"
            }}
          >
       We will need more information to complete your profile
          </div>
        </div>

        <Form4
          user={user}
          setUser={setUser}
        />

        <div
          className="sign"
          style={{
            opacity: buttonDisabled ? "0.5" : "1",
            pointerEvents: buttonDisabled ? "none" : "auto",
          }}
          onClick={Update}
        >
          {" "}
          {loading ? "processing" : "Complete Profile"}
        </div>
      </div>
    </div>
  );
};

export default UpdateUserDetails;





























