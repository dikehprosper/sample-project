"use client";
import React, { useState, useEffect } from "react";
import axios from "axios"
import toast, { Toaster } from "react-hot-toast";
import {useRouter} from "next/navigation"
import { BiMessage } from "react-icons/bi"
const Body7 = ({
  user,
  setUser,
  setLoading
}: any) => {
  const router = useRouter();
  const [modalState, setModalState] = useState(false);

  function openModal() {
    setModalState(true);
  }

   function closeModal() {
    setModalState(false);
  }


  const [data, setData] = useState({
    email: user?.email,
    subject: "",
    message: "",
    priority:"High",
  });




    const updateUserTicketDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.post("/api/users/updateUserTicketDetails", data);
        console.log("Profile updated successfully", response);
        setData(response.data.user);
        setUser(response.data.user);
        toast("Ticket Created Successfully");
        // router.push(`/support/${response.data.user.ticket.id}`);
      } catch (error: any) {
        if (error.response.status === 500) {
          return toast.error("Failed to create");
        }
      } finally {
        setLoading(false);
      }
    };
  

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#0F172A",
        width: "100%",
        minWidth:"340px",
        padding: "10px",
        minHeight: "100vh",
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
            &gt; &nbsp; Support Center{" "}
          </p>
        </div>
      </div>
      <div className="ticket-box-1">
        <div
          style={{
            display: "flex",
            justifyContent: "start",
            // backgroundColor: "red",
            width: "100%",
            height: "60px",
            alignItems: "center",
            fontSize: "13px",
            fontWeight: "500",
          }}
        >
          Your support tickets
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "end",
            // backgroundColor: "blue",
            width: "100%",
            height: "60px",
            alignItems: "center",
            fontSize: "13px",
            fontWeight: "400",
          }}
        >
          <div
            style={{
              width: "90px",
              height: "35px",
              borderRadius: "4px",
              whiteSpace: "nowrap",
              backgroundColor: "#FDC40A",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "black",
              fontWeight: "600",
            }}
            className="new-ticket"
            onClick={openModal}
          >
            New ticket
          </div>
        </div>
        {modalState ? <Modal closeModal={closeModal} updateUserTicketDetails={updateUserTicketDetails} data={data} setData={setData} /> : null}
       
      </div>
      <div className="tickets" >
       {user.tickets && user.tickets.map(ticket => {


 const convertedTimestamp = new Date(ticket.registrationDateTime).toLocaleString('en-US', {
    timeZone: 'UTC',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });



        const determineColor = () => {
          if (ticket.priority === "Medium") {
            return "#FDC40A";
          } else if (ticket.priority === "Low") {
            return "red"
          } else {
            return "green"
          }
        }
          return (
            <div
              key={ticket.id}
              className="tickets1"
              onClick={() => router.push(`/support/${ticket._id}`)}
            >
              <p
                style={{
                  fontWeight: "200",
                  fontSize: "15.5px",
                  opacity: "0.7",
                }}
              >
                {convertedTimestamp}
              </p>
              <div
                style={{ display: "flex", flexDirection: "column", gap: "7px" }}
              >
                <span className="message-entered5">{ticket.subject}</span>
                <span className="message-entered4">{ticket.message}</span>
              </div>

              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "end",
                    opacity: "0.6",
                  }}
                >
                  {ticket.priority ? ticket.priority : "High"}
                </div>
                <div
                  style={{
                    height: "5px",
                    width: "100%",
                    backgroundColor: determineColor(),
                    borderRadius: "4px",
                    marginTop: "5px",
                  }}
                ></div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "22px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "35px",
                    width: "120px",
                    backgroundColor:
                      ticket.status === "open" ? "#FDC40A" : "red",
                    fontSize: "13px",
                    borderRadius: "5px",
                    opacity: "0.6",
                    fontWeight: "500",
                    color: ticket.status === "open" ? "black" : "white",
                  }}
                >
                  Status: {ticket.status}
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "end",
                    alignItems: "center",
                    height: "40px",
                    width: "130px",
                    fontSize: "16px",
                    gap: "7px",
                  }}
                >
                  <span
                    style={{
                      color: ticket.status === "open" ? "#FDC40A" : "red",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {" "}
                    <BiMessage />{" "}
                  </span>{" "}
                  {ticket.conversations && ticket.conversations.length}
                </div>
              </div>
            </div>
          );
        })}
        </div>
    </div>
  );
};

export default Body7;


























const Modal = ({ closeModal, updateUserTicketDetails, data, setData }:any) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e:any) => {
    setInputValue(e.target.value);
  };


  function addTicket() {
      closeModal()
      updateUserTicketDetails()
  }

  return (
    <div
      style={{
        display: "flex",
        position: "fixed",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        left: "0px",
        right: "0px",
        top: "0px",
        bottom: "0px",
        zIndex: "10000",
      }}
    >
      <div className="modal-body">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "15px",
            minHeight: "50px",
            maxHeight: "50px",
            borderBottom: "1px solid #344155",
          }}
        >
          <div>Add ticket</div>
          <div
            style={{ opacity: "0.4", fontSize: "20px" }}
            onClick={closeModal}
          >
            x
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "20px",
          }}
        >
          <label
            htmlFor="address"
            style={{
              color: "#94A4B8",
              fontSize: "14px",
              fontWeight: "300",
              whiteSpace: "nowrap",
              opacity: "0.4",
            }}
          >
            Subject
          </label>

          <input
            className="signup-input "
            style={{ marginTop: "-5px" }}
            id="address"
            type="text"
            value={data.subject}
            onChange={(e) => {
              setData({
                ...data,
                subject: e.target.value,
              });
            }}
            placeholder="Subject"
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "20px",
          }}
        >
          <label
            htmlFor="address"
            style={{
              color: "#94A4B8",
              fontSize: "14px",
              fontWeight: "300",
              whiteSpace: "nowrap",
              opacity: "0.4",
            }}
          >
            Message
          </label>

          <textarea
            className="signup-input"
            value={data.message}
            onChange={(e) => {
              handleInputChange(e);
              setData({
                ...data,
                message: e.target.value,
              });
            }}
            style={{
              height: `${inputValue.split("\n").length * 120}px`,
              minHeight: "43px",
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "20px",
          }}
        >
          <label
            htmlFor="address"
            style={{
              color: "#94A4B8",
              fontSize: "14px",
              fontWeight: "300",
              whiteSpace: "nowrap",
              opacity: "0.4",
            }}
          >
            Priority
          </label>
          <div>
            <select
              className="signup-input form4"
              id="country"
              // @ts-ignore
              type="text"
              value={data.priority}
              onChange={(e) => {
                setData({
                  ...data,
                  priority: e.target.value,
                });
              }}
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>
        <div
          style={{
            minHeight: "88px",
            maxHeight: "88px",
            borderTop: "1px solid #344155",
            display: "flex",
            justifyContent: "end",
            marginTop: "60px",
            gap: "15px",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "75px",
              height: "40px",
              borderRadius: "4px",
              border: "1.5px solid #64758B",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontWeight: "500",
              color: "white",
              cursor: "pointer",
            }}
            onClick={closeModal}
          >
            Close
          </div>
          <div
            style={{
              width: "105px",
              height: "40px",
              borderRadius: "4px",
              backgroundColor: "#FEC404",
              whiteSpace: "nowrap",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "black",
              fontWeight: "500",
              cursor: "pointer",
            }}
            onClick={addTicket}
          >
            Add Ticket
          </div>
        </div>
      </div>
    </div>
  );
};






