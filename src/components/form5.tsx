"use client";
import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
export default function Form5({ changeLoadingStatus, data }: any) {
  const [buttonDisabled, setButtonDisabled] = React.useState(true);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [user, setUser] = React.useState({
    password: "",
    newPassword: "",
    email: data.email,
  });
  const [display, setDisplay] = useState(false);
  useEffect(() => {
    if (confirmPassword === user.newPassword) {
      setDisplay(false);
    } else {
      setDisplay(true);
    }
  }, [confirmPassword]);

  useEffect(() => {
    if (
      confirmPassword === user.newPassword &&
      user.password.length >= 1 &&
      user.newPassword.length >= 1 &&
      confirmPassword.length >= 1
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  });

  const updatePassword = async () => {
    try {
      changeLoadingStatus();
      const response = await axios.post("/api/users/updatePassword", user);
      console.log("Password Successfully Updated", response.data);
      toast.success("Password Successfully Updated");
    } catch (error:any) {
      if (error.response.status === 402) {
        console.log("Old Password is InCorrect");
        return toast.error("Old Password is InCorrect");
      } else {
        console.log("Failed to update password");
        return toast.error("Failed to update password");
      }
    } finally {
      changeLoadingStatus();
    }
  };

  return (
    <div className="form5-1">
      <div className="form5-1-2">
        <div className="form5-1-1">
          <div className="form3-3">
            <div
              style={{
                width: "100%",
                display: "flex",
                height: "40px",
                fontWeight: "600",
              }}
            >
              Next of Kin Information
            </div>
            <div className="form3-2-2">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <label
                  htmlFor="password"
                  style={{
                    color: "#94A4B8",
                    fontSize: "14px",
                    fontWeight: "300",
                  }}
                >
                  Old Password
                </label>

                <input
                  className="signup-input"
                  id="password"
                  type="text"
                  value={user.password}
                  onChange={(e) =>
                    setUser({
                      ...user,
                      password: e.target.value,
                    })
                  }
                  placeholder="Old Password"
                />
              </div>{" "}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <label
                  htmlFor="password"
                  style={{
                    color: "#94A4B8",
                    fontSize: "14px",
                    fontWeight: "300",
                  }}
                >
                  New Password
                </label>

                <input
                  className="signup-input"
                  id="password"
                  type="text"
                  value={user.newPassword}
                  onChange={(e) =>
                    setUser({
                      ...user,
                      newPassword: e.target.value,
                    })
                  }
                  placeholder="New Password"
                />
              </div>{" "}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <label
                  htmlFor="password"
                  style={{
                    color: "#94A4B8",
                    fontSize: "14px",
                    fontWeight: "300",
                    display: "flex",
                    gap: "10px",
                    alignItems: "center",
                  }}
                >
                  Confirm Password
                  {display && (
                    <div style={{ color: "red", fontSize: "10px" }}>
                      Entry must be same as password
                    </div>
                  )}
                </label>

                <input
                  className="signup-input"
                  id="password"
                  type="text"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm Password"
                />
              </div>
            </div>

            <div
              className="update1"
              style={{
                opacity: buttonDisabled ? "0.5" : "1",
                pointerEvents: buttonDisabled ? "none" : "auto",
              }}
              onClick={updatePassword}
            >
              Update
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
