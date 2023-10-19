"use client";
import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";
import emptyTransactionImage from "../images/empty.svg";
const Body8 = ({
  id,
  user,
  setUser,
  setConversationMessage,
  updateUserTicketDetails,
  conversationMessage,
}: any) => {
  const chatContainerRef = useRef<HTMLDivElement>(null); // Specify the type

  useEffect(() => {
    // Scroll to the last message after rendering or when a new message is sent
    scrollToLastMessage();
  }, [user]);

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
        <h3>Support Center</h3>
        <div style={{ fontSize: "12px", display: "flex" }}>
          {" "}
          <a style={{ color: "#FDC40A", opacity: "1.4", cursor: "pointer" }}>
            {" "}
            Home &nbsp;{" "}
          </a>{" "}
          <p style={{ fontSize: "12px", opacity: "0.4" }}>
            &gt; &nbsp; View Ticket{" "}
          </p>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          width: "100%",
          alignSelf: "center",
          minHeight: "300px",
          justifyContent: "center",
        }}
      >
        {user.tickets.map((ticket) => {
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

          if (ticket._id === id) {
            return (
              <div
                key={id}
                style={{
                  width: "97%",
                  alignSelf: "center",
                  minHeight: "200px",
                  backgroundColor: "#1E293A",
                  marginTop: "28px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  borderRadius: "5px",
                }}
              >
                <div className="message-entered-heading1">{ticket.subject}</div>
                <div
                  style={{
                    display: "flex",
                    backgroundColor: "#344155",
                    height: "1px",
                  }}
                >
                  {" "}
                </div>
                <div
                  style={{
                    paddingRight: "29px",
                    minHeight: "70px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    gap: "10px",
                    opacity: "0.6",
                    borderBottom: "1px solid #344155",
                    padding: "29px",
                  }}
                >
                  <div className="time-stamp">{convertedTimestamp}</div>
                  <div
                    style={{
                      fontSize: "14px",
                      fontWeight: "400",
                      wordWrap: "break-word",
                      maxWidth: "250px",
                      borderRadius: "13px 13px 13px 0px",
                      display: "flex",
                      gap: "10px",
                    }}
                  >
                    {" "}
                    <span className="message-entered-heading">MESSAGE:</span>
                    <span className="message-entered2">{ticket.message}</span>
                  </div>{" "}
                </div>
                <div
                  style={{
                    display: "flex",
                    minHeight: "250px",
                    maxHeight: "400px",
                    borderBottom: "1px solid #344155",
                    flexDirection: "column",
                    gap: "35px",
                    overflow: "auto",
                    padding: "29px",
                    overflowY: "scroll",
                    scrollBehavior: "smooth",
                  }}
                  ref={chatContainerRef}
                >
                  {ticket.conversations.length > 0 ? (
                    ticket.conversations.map((data) => {
                      const convertedTimestamp2 = new Date(
                        data.registrationDateTime
                      ).toLocaleString("en-US", {
                        timeZone: "UTC",
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      });

                      return data.messagefromAdmin ? (
                        <div
                          key={data.id}
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                            alignItems: "end",
                          }}
                        >
                          <div className="time-stamp">
                            {" "}
                            {convertedTimestamp2}
                          </div>
                          <div className="message-entered6">
                            {data.messagefromAdmin}
                          </div>
                        </div>
                      ) : (
                        <div
                          key={data.id}
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                          }}
                        >
                          <div className="time-stamp">
                            {" "}
                            {convertedTimestamp2}
                          </div>
                          <div className="message-entered3">
                            {data.messagefromUser}
                          </div>
                        </div>
                      );
                    })
                  ) : (
                 ticket.status === "open" && <div
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
                      <p style={{ marginTop: "5px" }}> No data to show</p>
                    </div>
                  )}
                  {ticket.status === "closed" && (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        height: "30px",
                        fontSize: "15px",
                        opacity: "0.7",
                      }}
                    >
                      Thanks for contacting Support
                    </div>
                  )}
                </div>
                <textarea
                  className="signup-input"
                  value={conversationMessage.message}
                  onChange={(e) => {
                    handleInputChange(e);
                    setConversationMessage({
                      id: id,
                      email: user.email,
                      message: e.target.value,
                    });
                  }}
                  placeholder="Add a reply..."
                  style={{
                    height: `${inputValue.split("\n").length * 80}px`,
                    minHeight: "43px",
                    width: "95%",
                    alignSelf: "center",
                    marginTop: "20px",
                  }}
                />
                <div
                  style={{
                    width: "120px",
                    margin: " 18px 29px",
                    display: "flex",
                    color: "black",
                    minHeight: "40px",
                    borderRadius: "5px",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                    backgroundColor: "#FDC40A",
                    pointerEvents: ticket.status === "closed" ? "none" : ""
                  }}
                  onClick={updateUserTicketDetails}
                >
                  Add Reply
                </div>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default Body8;
