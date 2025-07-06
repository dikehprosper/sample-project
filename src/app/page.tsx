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
                Welcome To Zentra
              </h1>
              <p className="lead py-3">
                SEND, AND RECIEVE QUICK TRANSACTION TO MULTIPLE CHAINS
              </p>
            <a href="/signup">  <button className="btn btn-primary d-inline-flex flex-row align-items-center"  >
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
    <div id='About-Us' className='about-component'>
      <div style={{fontSize: "40px", fontWeight: "bold", opacity: "0.7"}}>
        WHO ARE WE?
      </div>
      <div className='about-component1'>
        <div
          className='about-component2'
          style={{fontSize: "13px", opacity: "0.7"}}
        >
          <p className='mb-4'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
            facilisi. Cras ac nunc in lorem porttitor fermentum.
          </p>
          <p className='mb-4'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non
            justo nec urna fermentum euismod vel sit amet augue.
          </p>
          <p className='mb-4'>
            In hac habitasse platea dictumst. Suspendisse potenti. Vivamus ut
            risus nec risus aliquet vestibulum in sit amet justo.
          </p>
          <p className='mb-4'>
            Aenean sagittis, justo nec fringilla blandit, orci velit varius
            nisl, nec finibus nunc sapien ac leo. Integer a libero eu nulla
            vulputate interdum.
          </p>
          <p className='mb-4'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
            facilisis est sit amet nunc aliquam, in sagittis libero euismod.
          </p>
          <p>
            Morbi consectetur, ipsum non varius pulvinar, justo lacus porta
            ligula, sed suscipit nunc magna id nunc. Fusce vel massa nec nulla
            volutpat sollicitudin.
          </p>
        </div>
        <div style={{width: "250px", height: "250px"}}>
          <Image
            src={bgImage} // Use the imported image URL
            alt='Description of the image'
            layout='responsive'
            objectFit='cover'
            objectPosition='center center'
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
      className='py-7 bg-dark section-angle top-left bottom-left'
      id='Learn'
    >
      <div className='container'>
        <div className='row'>
          <div
            className='col-md-6 mx-auto text-center'
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h2 className='heading-black'>LEARN</h2>
            <p
              className='text-muted lead'
              style={{
                backgroundColor: "#FFDA39",
                width: "50px",
                height: "10px",
              }}
            ></p>
          </div>
        </div>
        <div className='table'>
          <div className='col-md-4' style={{marginBottom: "10px"}}>
            <div className='card'>
              <a href='#' className='card1'>
                <div className='card2'></div>
                <Image
                  src={bgImage2}
                  alt='Description of the image'
                  layout='responsive'
                  objectFit='cover'
                  objectPosition='center center'
                  priority
                />
              </a>
              <div className='card-body'>
                <a href='#' className='card-title mb-2'>
                  <h5 style={{color: "#FFDA39"}}>Lorem Ipsum Dolor</h5>
                </a>
                <p className='card-text'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Integer nec odio. Praesent libero.
                </p>
              </div>
            </div>
          </div>

          <div className='col-md-4' style={{marginBottom: "10px"}}>
            <div className='card'>
              <a href='#' className='card1'>
                <div className='card2'></div>
                <Image
                  src={bgImage3}
                  alt='Description of the image'
                  layout='responsive'
                  objectFit='cover'
                  objectPosition='center center'
                  priority
                />
              </a>
              <div className='card-body'>
                <a href='#' className='card-title mb-2'>
                  <h5 style={{color: "#FFDA39"}}>Sed Ut Perspiciatis</h5>
                </a>
                <p className='card-text'>
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium.
                </p>
              </div>
            </div>
          </div>

          <div className='col-md-4' style={{marginBottom: "10px"}}>
            <div className='card'>
              <a href='#' className='card1'>
                <div className='card2'></div>
                <Image
                  src={bgImage4}
                  alt='Description of the image'
                  layout='responsive'
                  objectFit='cover'
                  objectPosition='center center'
                  priority
                />
              </a>
              <div className='card-body'>
                <a href='#' className='card-title mb-2'>
                  <h5 style={{color: "#FFDA39"}}>Neque Porro Quisquam</h5>
                </a>
                <p className='card-text'>
                  Neque porro quisquam est, qui dolorem ipsum quia dolor sit
                  amet, consectetur, adipisci velit.
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
    <section className='py-7 bg-dark' id='faq'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-6 mx-auto text-center'>
            <h2>Lorem Ipsum Dolor Sit</h2>
            <p className='text-muted lead'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
        </div>
        <div className='row mt-5'>
          <div className='col-md-10 mx-auto'>
            <div className='row'>
              <div className='col-md-6 mb-5'>
                <h6 style={{display: "flex", alignItems: "center"}}>
                  <MdStorage fontSize='40px' /> &nbsp; &nbsp; Lorem Ipsum
                </h6>
                <p className='text-muted'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Integer ut sapien vitae dolor accumsan.
                </p>
              </div>
              <div className='col-md-6 mb-5'>
                <h6 style={{display: "flex", alignItems: "center"}}>
                  <FaKey fontSize='35px' /> &nbsp; &nbsp; Dolor Sit Amet
                </h6>
                <p className='text-muted'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Vestibulum in erat at arcu bibendum fermentum.
                </p>
              </div>
              <div className='col-md-6 mb-5'>
                <h6 style={{display: "flex", alignItems: "center"}}>
                  <BsShieldShaded fontSize='35px' /> &nbsp; &nbsp; Consectetur
                  Elit
                </h6>
                <p className='text-muted'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Curabitur vehicula quam sed felis facilisis.
                </p>
              </div>
              <div className='col-md-6 mb-5'>
                <h6 style={{display: "flex", alignItems: "center"}}>
                  <BiSolidLockAlt fontSize='35px' /> &nbsp; &nbsp; Amet Elit
                </h6>
                <p className='text-muted'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Aenean gravida, odio ac tempus finibus, velit urna cursus
                  nulla.
                </p>
              </div>
              <div className='col-md-6 mb-5'>
                <h6 style={{display: "flex", alignItems: "center"}}>
                  <AiTwotoneThunderbolt fontSize='35px' /> &nbsp; &nbsp; Nulla
                  Vitae
                </h6>
                <p className='text-muted'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
                  vel lorem ut sapien faucibus aliquam non at augue.
                </p>
              </div>
              <div className='col-md-6 mb-5'>
                <h6 style={{display: "flex", alignItems: "center"}}>
                  <BsFillCheckSquareFill fontSize='26px' color='white' /> &nbsp;
                  &nbsp; Quis Nostrud
                </h6>
                <p className='text-muted'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Phasellus ut nisl a leo euismod consequat.
                </p>
              </div>
              <div className='col-md-6 mb-5'>
                <h6 style={{display: "flex", alignItems: "center"}}>
                  <BiTime fontSize='35px' /> &nbsp; &nbsp; Tempor Incididunt
                </h6>
                <p className='text-muted'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Mauris luctus magna nec nisl convallis facilisis.
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
      className='bg-hero py-7'
      id='contact'
      style={{backgroundImage: "url(img/mockup.png)"}}
    >
      <div className='container'>
        <div className='row'>
          <div className='col-md-6 my-md-auto text-center text-md-left pb-5 pb-md-0'>
            <h1 className='display-4 text-white'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </h1>
            <p className='lead text-light' style={{fontSize: "13px"}}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
              vitae turpis in justo laoreet rutrum. Aenean iaculis turpis sed
              velit suscipit, ac iaculis ex facilisis. Integer bibendum, erat ut
              ullamcorper fermentum, leo justo tempor lacus, vel tristique
              sapien nulla non nulla.
            </p>

            <p className='lead text-light' style={{fontSize: "13px"}}>
              Nullam fermentum, nulla a eleifend luctus, velit ipsum feugiat
              erat, at egestas lacus leo non lorem. Proin in nisi ac nisl
              scelerisque accumsan a sed nisl. Quisque ac dui vitae nisi porta
              mattis. Sed nec sapien lorem. Vestibulum convallis, lorem ut
              ullamcorper placerat, orci erat dignissim nulla, nec tincidunt
              enim leo nec ex.
            </p>
          </div>
          <div className='col-md-5 ml-auto'>
            <div className='card'>
              <div className='card-body p-4'>
                <h5 className='text-center'>SUBSCRIBE TO OUR NEWS LETTER.</h5>
                <form className='signup-form'>
                  <div className='form-group'>
                    <input
                      type='text'
                      className='form-control'
                      placeholder='email'
                    />
                  </div>
                  <div className='form-group'>
                    <button className='btn btn-primary btn-block'>Send</button>
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
    <footer className='py-6' style={{background: "black"}}>
      <div className='container'>
        <div className='row'>
          <div className='col-sm-5 mr-auto'>
            <h5 style={{display: "flex", gap: "14px"}}>
              About Zentra
              <div style={{height: "25px", width: "25px", objectFit: "cover"}}>
                <Image
                  src={bgImage1} // Use the imported image URL
                  alt='Description of the image'
                  layout='responsive'
                  objectFit='cover'
                  objectPosition='center center'
                  priority
                />
              </div>
            </h5>
            <p className='text-muted'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Send,
              receive, and exchange digital assets with ease!
            </p>
            <ul className=''>
              <div style={{whiteSpace: "nowrap"}}>
                Email: <a href=''> hello@Zentra.com</a>
              </div>
            </ul>
          </div>
          <div className='col-sm-2'>
            <h5>Useful Links</h5>
            <ul className='list-unstyled'>
              <li>
                <a href='#'>Home</a>
              </li>
              <li>
                <a href='#'>About Us</a>
              </li>
              <li>
                <a href='#'>Learn</a>
              </li>
            </ul>
          </div>
        </div>
        <div className='row mt-5'>
          <div className='col-12 text-muted text-center small-xl'>
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
