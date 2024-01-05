"use client";
import React, { useState } from "react";
import Image from "next/image";
// @ts-ignore
import bgImage from "@/images/bg4.png";
// @ts-ignore
import bgImage1 from "@/images/meta.png";
// @ts-ignore
import bgImage2 from "@/images/file1.png";
// @ts-ignore
import bgImage3 from "@/images/file2.png";
// @ts-ignore
import bgImage4 from "@/images/file3.png";
// @ts-ignore
import { MdStorage } from "react-icons/md";
import { FaKey } from "react-icons/fa";
import { BiSolidLockAlt } from "react-icons/bi";
import { BsShieldShaded } from "react-icons/bs";
import { AiTwotoneThunderbolt } from "react-icons/ai";
import { BiTime } from "react-icons/bi";
import { BsFillCheckSquareFill } from "react-icons/bs";
import { CgMenuGridR } from "react-icons/cg";
import { useRouter } from "next/navigation";
import { AiOutlineClose } from "react-icons/ai";

// import { AiFillThunderbolt } from "react-icons/ai"
const MenuDropDownSection = ({ CloseMenuBar }: any) => {
  const router = useRouter();
  return (
    <div
      style={{
        transition: "opacity 0.5s ease",
        position: "fixed",
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "black",
        opacity: "0.9",
      }}
      onClick={CloseMenuBar}
    >
      <div
        style={{
          opacity: 1, // Set opacity to 1 to trigger the fade-in effect
          transition: "opacity 2s ease",
        }}
      >
        <div
          style={{
            opacity: 1, // Set opacity to 1 to trigger the fade-in effect
            transition: "opacity 2s ease",
            height: "90px",
            width: "100%",
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
            paddingRight: "34px",
          }}
        >
          <AiOutlineClose fontSize="27px" />
        </div>
        <div
          style={{
            backgroundColor: "black",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            alignItems: "center",
          }}
        >
          <a className="nav-link page-scroll" href="">
            Home
          </a>

          <a className="nav-link page-scroll" href="#About-Us">
            About Us
          </a>

          <a className="nav-link page-scroll" href="#Learn">
            Learn
          </a>

          <div
            style={{
              background: "#FFDA39",
              height: "38px",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "black",
            }}
            onClick={() => router.push("/signup")}
          >
            <a className="nav-link page-scroll">
              <div style={{ color: "black" }}>Sign Up</div>
            </a>
          </div>
          <div
            style={{
              border: "2px solid #FFDA39",
              height: "38px",
              width: "100%",
              borderRadius: "2px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={() => router.push("/login")}
          >
            <a className="nav-link page-scroll ">
              <div>Sign In </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const Navbar = () => {
  const router = useRouter();
  const [menuBarVisibility, setMenuBarVisibility] = useState(false);

  function ToggleMenuBar() {
    setMenuBarVisibility((previous) => {
      return !previous;
    });
  }
  function CloseMenuBar() {
    setMenuBarVisibility(false);
  }
  return (
    <section
      className="smart-scroll"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.7" }}
    >
      <div className="container-fluid">
        <nav className="navbar navbar-expand-md navbar-dark">
          <a className="navbar-brand heading-black" href="index.html">
            <div style={{ height: "40px", width: "40px", objectFit: "cover" }}>
              <Image
                src={bgImage1} // Use the imported image URL
                alt="Description of the image"
                layout="responsive"
                objectFit="cover"
                objectPosition="center center"
                priority
              />
            </div>
          </a>
          <button
            className="navbar-toggler navbar-toggler-right border-0"
            type="button"
            data-toggle="collapse"
            data-target="#navbarCollapse"
            aria-controls="navbarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span data-feather="grid"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a className="nav-link page-scroll" href="">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link page-scroll" href="#About-Us">
                  About Us
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link page-scroll" href="#Learn">
                  Learn
                </a>
              </li>

              <li
                className="nav-item"
                style={{
                  background: "#FFDA39",
                  height: "38px",
                  width: "120px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "black",
                }}
                onClick={() => router.push("/signup")}
              >
                <a className="nav-link page-scroll">
                  <div style={{ color: "black" }}>Sign Up</div>
                </a>
              </li>
              <li
                className="nav-item"
                style={{
                  border: "2px solid #FFDA39",
                  height: "38px",
                  width: "120px",
                  borderRadius: "2px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onClick={() => router.push("/login")}
              >
                <a className="nav-link page-scroll ">
                  <div>Sign In </div>
                </a>
              </li>
            </ul>
          </div>
          <div className="menu-grid" onClick={ToggleMenuBar}>
            {!menuBarVisibility && <CgMenuGridR fontSize="26px" />}
          </div>
          {menuBarVisibility && (
            <MenuDropDownSection CloseMenuBar={CloseMenuBar} />
          )}
        </nav>
      </div>
    </section>
  );
};

const HeroSection = () => {
  return (
    <>
      {" "}
      <div className="body1"></div>
      <section className="py-7 py-md-0 " id="home">
        <div className="container">
          <div className="row vh-md-100">
            <div className="col-md-8 col-sm-10 col-12 mx-auto my-auto text-center">
              <h1 className="heading-black text-capitalize">
                Welcome To Cloud Wallet
              </h1>
              <p className="lead py-3">
                SEND, AND RECIEVE QUICK TRANSACTION TO MULTIPLE CHAINS
              </p>
            <a href="/login">  <button className="btn btn-primary d-inline-flex flex-row align-items-center"  >
                Get started now
                <em className="ml-2" data-feather="arrow-right"></em>
              </button></a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

const AboutComponent = () => {
  return (
    <div id="About-Us" className="about-component">
      <div style={{ fontSize: "40px", fontWeight: "bold", opacity: "0.7" }}>
        WHO ARE WE?
      </div>
      <div className="about-component1">
        <div
          className="about-component2"
          style={{ fontSize: "13px", opacity: "0.7" }}
        >
          <p className="mb-4">
            The most trusted and secure cloud crypto wallet. Send, receive, and
            exchange cryptocurrencies!
          </p>
          <p className="mb-4">
            We are building the cryptoeconomy – a more fair, accessible,
            efficient, and transparent financial system enabled by crypto
          </p>
          <p className="mb-4">
            We started in 2013 with the radical idea that anyone, anywhere,
            should be able to easily and securely send and receive Bitcoin.
            Today, we offer a trusted and easy-to-use platform for accessing the
            broader cryptoeconomy.
          </p>
          <p className="mb-4">
            Customers around the world discover and begin their journeys with
            crypto through Meta-Chains.
          </p>
          <p className="mb-4">Meta-chains powers the cryptoeconomy.</p>
          <p>
            Approximately 2 million verified users, 2,000 institutions, and
            1,000 ecosystem partners in over 54 countries trust Meta-chains to
            easily and securely invest, spend, save, earn, and use crypto.
          </p>
        </div>
        <div style={{ width: "250px", height: "250px" }}>
          <Image
            src={bgImage} // Use the imported image URL
            alt="Description of the image"
            layout="responsive"
            objectFit="cover"
            objectPosition="center center"
            priority
          />
        </div>
      </div>
    </div>
  );
};

const BlogSection = () => {
  return (
    <section
      className="py-7 bg-dark section-angle top-left bottom-left"
      id="Learn"
    >
      <div className="container">
        <div className="row">
          <div
            className="col-md-6 mx-auto text-center"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h2 className="heading-black">LEARN</h2>
            <p
              className="text-muted lead"
              style={{
                backgroundColor: "#FFDA39",
                width: "50px",
                height: "10px",
              }}
            ></p>
          </div>
        </div>
        <div className="table">
          <div className="col-md-4" style={{ marginBottom: "10px" }}>
            <div className="card">
              <a href="#" className="card1">
                <div className="card2"></div>
                <Image
                  src={bgImage2} // Use the imported image URL
                  alt="Description of the image"
                  layout="responsive"
                  objectFit="cover"
                  objectPosition="center center"
                  priority
                />
              </a>
              <div className="card-body">
                <a href="#" className="card-title mb-2">
                  <h5 style={{ color: "#FFDA39" }}>What is Crypto?</h5>
                </a>
                <p className="card-text">
                  Bitcoin, Ethereum, and other crypto are revolutionizing how we
                  invest, bank, and use money.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4" style={{ marginBottom: "10px" }}>
            <div className="card">
              <a href="#" className="card1">
                <div className="card2"></div>
                <Image
                  src={bgImage3} // Use the imported image URL
                  alt="Description of the image"
                  layout="responsive"
                  objectFit="cover"
                  objectPosition="center center"
                  priority
                />
              </a>
              <div className="card-body">
                <a href="#" className="card-title mb-2">
                  <h5 style={{ color: "#FFDA39" }}>What is Bitcoin?</h5>
                </a>
                <p className="card-text">
                  Bitcoin is the world&apos;s first widely adopted
                  cryptocurrency — it allows for secure and seamless
                  peer-to-peer transactions on the internet.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4" style={{ marginBottom: "10px" }}>
            <div className="card">
              <a href="#" className="card1">
                <div className="card2"></div>
                <Image
                  src={bgImage4} // Use the imported image URL
                  alt="Description of the image"
                  layout="responsive"
                  objectFit="cover"
                  objectPosition="center center"
                  priority
                />
              </a>
              <div className="card-body">
                <a href="#" className="card-title mb-2">
                  <h5 style={{ color: "#FFDA39" }}>Market Updates</h5>
                </a>
                <p className="card-text">
                  Grasp market shifts through understanding news and events
                  influencing the latest movements.{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const FAQSection = () => {
  return (
    <section className="py-7 bg-dark" id="faq">
      <div className="container">
        <div className="row">
          <div className="col-md-6 mx-auto text-center">
            <h2>TRUSTED CRYPTOCURRENCY PLATFORM</h2>
            <p className="text-muted lead">
              Here are a few reasons why you should choose Meta-chains
            </p>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-md-10 mx-auto">
            <div className="row">
              <div className="col-md-6 mb-5">
                <h6 style={{ display: "flex", alignItems: "center" }}>
                  <MdStorage fontSize="40px" /> &nbsp; &nbsp; SECURE STORAGE
                </h6>
                <p className="text-muted">
                  We store the vast majority of the digital assets in secure
                  offline storage.
                </p>
              </div>
              <div className="col-md-6 mb-5">
                <h6 style={{ display: "flex", alignItems: "center" }}>
                  <FaKey fontSize="35px" /> &nbsp; &nbsp; Protected by insurance
                </h6>
                <p className="text-muted">
                  Meta-Chains maintains crypto insurance and all USD cash balances
                  are covered by FDIC insurance, up to a maximum of $340,000.
                </p>
              </div>
              <div className="col-md-6 mb-5">
                <h6 style={{ display: "flex", alignItems: "center" }}>
                  <BsShieldShaded fontSize="35px" /> &nbsp; &nbsp;Industry best
                  practices
                </h6>
                <p className="text-muted">
                  Meta-Chains supports a variety of the most popular digital
                  currencies.
                </p>
              </div>
              <div className="col-md-6 mb-5">
                <h6 style={{ display: "flex", alignItems: "center" }}>
                  <BiSolidLockAlt fontSize="35px" /> &nbsp; &nbsp;Safe
                </h6>
                <p className="text-muted">
                  Your private keys are encrypted and never leave your computer.
                </p>
              </div>
              <div className="col-md-6 mb-5">
                <h6 style={{ display: "flex", alignItems: "center" }}>
                  <AiTwotoneThunderbolt fontSize="35px" /> &nbsp; &nbsp;No
                  Downtimes
                </h6>
                <p className="text-muted">
                  Meta-chains servers are decentralized and redundant. Your wallet
                  is never down.{" "}
                </p>
              </div>
              <div className="col-md-6 mb-5">
                <h6 style={{ display: "flex", alignItems: "center" }}>
                  <BsFillCheckSquareFill fontSize="26px" color="white" /> &nbsp;
                  &nbsp;Proof Checking
                </h6>
                <p className="text-muted">
                  Meta-chains Wallet verifies all the transactions in your history
                  using SPV.
                </p>
              </div>
              <div className="col-md-6 mb-5">
                <h6 style={{ display: "flex", alignItems: "center" }}>
                  <BiTime fontSize="35px" /> &nbsp; &nbsp;Instant On
                </h6>
                <p className="text-muted">
                  Meta-chains is fast, because it uses servers that index the
                  Bitcoin blockchain.{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ContactSection = () => {
  return (
    <section
      className="bg-hero py-7"
      id="contact"
      style={{ backgroundImage: "url(img/mockup.png)" }}
    >
      <div className="container">
        <div className="row">
          <div className="col-md-6 my-md-auto text-center text-md-left pb-5 pb-md-0">
            <h1 className="display-4 text-white">
              SAFEGUARDING YOUR FUNDS AND YOUR PRIVACY IS OUR NUMBER ONE
              OBJECTIVE.
            </h1>
            <p className="lead text-light" style={{ fontSize: "13px" }}>
              Meta-chains takes a comprehensive approach to protecting your
              investments. Our team of experts have built in a number of
              sophisticated measures to prevent the theft of money or
              information. Theft isn&apos;t the only threat of course. As a
              professional exchange we offer financial stability, with full
              reserves, healthy banking relationships and the highest standards
              of legal compliance. .
            </p>

            <p className="lead text-light" style={{ fontSize: "13px" }}>
              We’ve assembled a global team of top security professionals who
              take a risk-based approach to ensuring our clients’ assets are
              protected at the highest levels while maintaining exceptional
              performance and an unparalleled client experience. Our team has
              decades of experience building security programs for the world’s
              top brands, investigating the largest consumer data breaches,
              developing security technology trusted by millions of businesses
              and discovering vulnerabilities in the technology used by billions
              of people every day.
            </p>
          </div>
          <div className="col-md-5 ml-auto">
            <div className="card">
              <div className="card-body p-4">
                <h5 className="text-center">SUBSCRIBE TO OUR NEWS LETTER.</h5>
                <form className="signup-form">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="email"
                    />
                  </div>
                  <div className="form-group">
                    <button className="btn btn-primary btn-block">Send </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-6" style={{ background: "black" }}>
      <div className="container">
        <div className="row">
          <div className="col-sm-5 mr-auto">
            <h5 style={{ display: "flex", gap: "14px" }}>
              About Meta-Chains
              <div
                style={{ height: "25px", width: "25px", objectFit: "cover" }}
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
            </h5>
            <p className="text-muted">
              The most trusted & secure cloud crypto wallet. Send, receive, and
              exchange cryptocurrencies!
            </p>
            <ul className="">
              <div style={{ whiteSpace: "nowrap" }}>
                Email: <a href=""> hello@meta-chains.com</a>
              </div>
            </ul>
          </div>
          <div className="col-sm-2">
            <h5>Useful Links</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">About Us</a>
              </li>
              <li>
                <a href="#">Learn</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-12 text-muted text-center small-xl">
            &copy; Copyrights 2022 - All Rights Reserved
          </div>
        </div>
      </div>
    </footer>
  );
};

const LandingPage = () => {
  return (
    <div className="body">
      <Navbar />
      <HeroSection />
      <AboutComponent />
      <BlogSection />
      <FAQSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default LandingPage;
