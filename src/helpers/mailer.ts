import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcrypts from "bcryptjs";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({
  email,
  emailType,
  userId,
  fullname,
}: any) => {
  console.log(emailType);
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);
    const randomNumbers = Array.from(
      { length: 4 },
      () => Math.floor(Math.random() * 9) + 1
    );
    const randomNumbersString = randomNumbers.join("");

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 86400000,
      });
    }

    if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 7200000,
      });
    }

    if (emailType === "SEND") {
      await User.findByIdAndUpdate(userId, {
        faToken: randomNumbersString,
        faTokenExpiry: Date.now() + 7200000,
      });
    }

var transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "a290f0af03809e",
    pass: "d7fbbdfa803376",
  },
});

    const mailOptions = {
      from: "meta-chains@gmail.com",
      to: email,
      subject: (() => {
        if (emailType === "VERIFY") {
          return "Verify your email";
        } else if (emailType === "RESET") {
          return "Reset your password";
        } else if (emailType === "WELCOME") {
          return "Welcome to Meta-chains";
        } else {
          return "2FA Password"; // You should define the subject for other cases
        }
      })(),
      html: (() => {
        if (emailType === "VERIFY") {
          return `
            <!DOCTYPE html>
         <html>
        <body
    style="
      text-align: center;
      width: 100%;
      height: 100%;
      background-color: #f0f0f0;
      font-family: Arial, sans-serif;
      display: flex;
      justify-content: center;
      flex-direction: column;
    "
  >
    <div
      style="
        text-align: center;
        width: 80%;
        height: 200px;
        align-self: center;
        padding: 10px 38px;
      "
    >
      <img src="https://firebasestorage.googleapis.com/v0/b/my-app-a50eb.appspot.com/o/meta%20(1).png?alt=media&token=e642c545-3389-47c1-ac45-c5bc66aa974a" alt="Firebase Image" width="200" height="150">
    </div>
    <div
      style="
        text-align: center;
        width: 80%;
        height: 420px;
        background-color: white;
        border-top: 3px solid #FFDA39;
        align-self: center;
        padding: 0px 38px;
      "
    >
      <h3 style="text-align: center; color: black; font-size: 24px;">
        Hello ${fullname}
      </h3>
      <p
        style="
          font-size: 15px;
          font-family: Arial, sans-serif;
          margin: 30px 15px;
          color: black;
        "
      >
        To verify your email, please click on the button below
      </p>
      <div style="margin-top: 70px; height: auto;">
        <a
          style="
            background-color: #FFDA39;
            padding: 17px 37px;
            border-radius: 25px;
            font-weight: bold;
            color: black;
            text-decoration: none;
          "
          href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}"
        >
      Verify YOUR EMAIL
        </a>
        <p
          style="
            margin-top: 40px;
            height: auto;
            color: black;
            font-size: 15px;
            line-height: 23px;
          "
        >
          If you're having trouble, try copying and pasting the following URL
          into your browser:
          <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">
         "${process.env.DOMAIN}/verifyemail?token=${hashedToken}"
          </a>
        </p>
        <p
          style="
            color: #afafaf;
            margin-top: 30px;
            font-size: 15px;
            color: black;
          "
        >
         This link will expire in 24 hours.
        </p>
      </div>
    </div>
    <p
      style="
        font-size: 12px;
        font-family: Arial, sans-serif;
        margin: 40px 0px 10px 0px;
        color: black;
        text-decoration: none;
      "
    >
      © Meta-chains | Address here
    </p>
    <p
      style="
        font-size: 12px;
        font-family: Arial, sans-serif;
        margin: 3px 15px;
        color: black;
      "
    >
      <a href="" style="color: black;">View Web Version </a> |
      <a href="" style="color: black;">Email Preferences</a> |
      <a href="" style="color: black;">Privacy Policy</a>
    </p>
    <p
      style="
        font-size: 12px;
        font-family: Arial, sans-serif;
        margin: 20px 15px 0px 15px;
        color: black;
      "
    >
      If you have any questions please contact us
      <a href="" style="color: black;">hello@meta-chains.com</a>
    </p>
    <p
      style="
        font-size: 12px;
        font-family: Arial, sans-serif;
        margin: 8px 15px;
        color: black;
      "
    >
      <a href="mailto@meta-chains.com" style="color: black;">Unsubscribe </a>
      from our mailing lists
    </p>
  </body>
</html> `;
        } else if (emailType === "RESET") {
          return `
                      <!DOCTYPE html>
         <html>
        <body
    style="
      text-align: center;
      width: 100%;
      height: 100%;
      background-color: #f0f0f0;
      font-family: Arial, sans-serif;
      display: flex;
      justify-content: center;
      flex-direction: column;
    "
  >
    <div
      style="
        text-align: center;
        width: 80%;
        height: 200px;
        align-self: center;
        padding: 10px 38px;
      "
    >
      <img src="https://firebasestorage.googleapis.com/v0/b/my-app-a50eb.appspot.com/o/meta%20(1).png?alt=media&token=e642c545-3389-47c1-ac45-c5bc66aa974a" alt="Firebase Image" width="200" height="150">
    </div>

    <div
      style="
        text-align: center;
        width: 80%;
        height: 420px;
        background-color: white;
        border-top: 3px solid #FFDA39;
        align-self: center;
        padding: 0px 38px;
      "
    >
      <h3 style="text-align: center; color: black; font-size: 24px;">
        Hello ${fullname}
      </h3>
      <p
        style="font-size: 18px; font-family: Arial, sans-serif; color: #999999;"
      >
        Forgot your password?
      </p>
      <p
        style="
          font-size: 15px;
          font-family: Arial, sans-serif;
          margin: 30px 15px;
          color: black;
        "
      >
        To reset your password, please click on the button below
      </p>
      <div style="margin-top: 70px; height: auto;">
        <a
          style="
            background-color: #FFDA39;
            padding: 17px 37px;
            border-radius: 25px;
            font-weight: bold;
            color: black;
            text-decoration: none;
          "
          href="${process.env.DOMAIN}/resetpassword?token=${hashedToken}"
        >
      RESET YOUR PASSWORD
        </a>
        <p
          style="
            margin-top: 40px;
            height: auto;
            color: black;
            font-size: 15px;
            line-height: 23px;
          "
        >
          If you're having trouble, try copying and pasting the following URL
          into your browser:
          <a href="${process.env.DOMAIN}/resetpassword?token=${hashedToken}">
         "${process.env.DOMAIN}/resetpassword?token=${hashedToken}"
          </a>
        </p>
        <p
          style="
            color: #afafaf;
            margin-top: 30px;
            font-size: 15px;
            color: black;
          "
        >
         This link will expire in 2 hours.
        </p>
      </div>
    </div>
    <p
      style="
        font-size: 12px;
        font-family: Arial, sans-serif;
        margin: 40px 0px 10px 0px;
        color: black;
        text-decoration: none;
      "
    >
      © Meta-chains | Address here
    </p>
    <p
      style="
        font-size: 12px;
        font-family: Arial, sans-serif;
        margin: 3px 15px;
        color: black;
      "
    >
      <a href="" style="color: black;">View Web Version </a> |
      <a href="" style="color: black;">Email Preferences</a> |
      <a href="" style="color: black;">Privacy Policy</a>
    </p>
    <p
      style="
        font-size: 12px;
        font-family: Arial, sans-serif;
        margin: 20px 15px 0px 15px;
        color: black;
      "
    >
      If you have any questions please contact us
      <a href="" style="color: black;">hello@meta-chains.com</a>
    </p>
    <p
      style="
        font-size: 12px;
        font-family: Arial, sans-serif;
        margin: 8px 15px;
        color: black;
      "
    >
      <a href="mailto@meta-chains.com" style="color: black;">Unsubscribe </a>
      from our mailing lists
    </p>
  </body>
</html>
          `;
        } else if (emailType === "WELCOME") {
          return `
                      <!DOCTYPE html>
         <html>
        <body
    style="
      text-align: center;
      width: 100%;
      height: 100%;
      background-color: #f0f0f0;
      font-family: Arial, sans-serif;
      display: flex;
      justify-content: center;
      flex-direction: column;
    "
  >
    <div
      style="
        text-align: center;
        width: 80%;
        height: 200px;
        align-self: center;
        padding: 10px 38px;
      "
    >
      <img src="https://firebasestorage.googleapis.com/v0/b/my-app-a50eb.appspot.com/o/meta%20(1).png?alt=media&token=e642c545-3389-47c1-ac45-c5bc66aa974a" alt="Firebase Image" width="200" height="150">
    </div>

    <div
      style="
        text-align: center;
        width: 80%;
        height: 420px;
        background-color: white;
        border-top: 3px solid #FFDA39;
        align-self: center;
        padding: 0px 38px;
      "
    >
      <h3 style="text-align: center; color: black; font-size: 24px;">
       Welcome to Meta-chains
      </h3>
      <p
        style="font-size: 18px; font-family: Arial, sans-serif; color: #999999;"
      >
       Getting Started With Meta-chains
      </p>
      <p
        style="
          font-size: 15px;
          font-family: Arial, sans-serif;
          margin: 15px 15px;
          color: black;
          word-wrap: break-word;
          width: 100%
        "
      >
       Meta-chains was founded in 2001 by Meta-traders.org  with the aim of making investing accessible for everyone. Our goals since day one has been to create a digital market environment where people can invest and earn regardless of their schedules trades will be carried out even in their absence, to reduce our investors burden.
      </p>

       <p
        style="
          font-size: 15px;
          font-family: Arial, sans-serif;
          margin: 30px 15px;
          color: black;
          word-wrap: break-word;
          width: 100%
        "
      >
   Now, 20 years later, and with more than 1,000 team members and over 30 thousand users, we're one of the fastest growing investment companies in Canada. With our service licence, state-of-the-art security and streamlined user experience, we make it possible for both first-time investors and seasoned experts to invest in what they believe in. </p>
     
      <p
        style="
          font-size: 15px;
          font-family: Arial, sans-serif;
          margin: 30px 15px;
          color: black;
          word-wrap: break-word;
          width: 100%
        "
      >
  Our user-friendly, and enhanced trading software platform empowers you to invest in the stocks, cryptocurrencies and other platforms you want — with any amount of money. 
  </p>

   <p
        style="
          font-size: 15px;
          font-family: Arial, sans-serif;
          margin: 30px 15px;
          color: black;
          word-wrap: break-word;
          width: 100%
        "
      >
Meta-chains aspires to leverage its expertise and strong capital position to own and operate a selection of retail, consumer products and wholesale businesses. </p>

  

    </div>
    <p
      style="
        font-size: 12px;
        font-family: Arial, sans-serif;
        margin: 40px 0px 10px 0px;
        color: black;
        text-decoration: none;
      "
    >
      © Meta-chains | Address here
    </p>
    <p
      style="
        font-size: 12px;
        font-family: Arial, sans-serif;
        margin: 3px 15px;
        color: black;
      "
    >
      <a href="" style="color: black;">View Web Version </a> |
      <a href="" style="color: black;">Email Preferences</a> |
      <a href="" style="color: black;">Privacy Policy</a>
    </p>
    <p
      style="
        font-size: 12px;
        font-family: Arial, sans-serif;
        margin: 20px 15px 0px 15px;
        color: black;
      "
    >
      If you have any questions please contact us
      <a href="" style="color: black;">hello@meta-chains.com</a>
    </p>
    <p
      style="
        font-size: 12px;
        font-family: Arial, sans-serif;
        margin: 8px 15px;
        color: black;
      "
    >
      <a href="mailto@meta-chains.com" style="color: black;">Unsubscribe </a>
      from our mailing lists
    </p>
  </body>
</html>
          `;
        } else {
          return `
              <!DOCTYPE html>
         <html>
        <body
    style="
      text-align: center;
      width: 100%;
      height: 100%;
      background-color: #f0f0f0;
      font-family: Arial, sans-serif;
      display: flex;
      justify-content: center;
      flex-direction: column;
    "
  >
    <div
      style="
        text-align: center;
        width: 80%;
        height: 200px;
        align-self: center;
        padding: 10px 38px;
      "
    >
      <img src="https://firebasestorage.googleapis.com/v0/b/my-app-a50eb.appspot.com/o/meta%20(1).png?alt=media&token=e642c545-3389-47c1-ac45-c5bc66aa974a" alt="Firebase Image" width="200" height="150">
    </div>

    <div
      style="
        text-align: center;
        width: 80%;
        height: 420px;
        background-color: white;
        border-top: 3px solid #FFDA39;
        align-self: center;
        padding: 0px 38px;
      "
    >
      <h3 style="text-align: center; color: black; font-size: 24px;">
        TWO FACTOR AUTHENTICATION
      </h3>
    

      <div style="margin-top: 70px; height: auto;">
        <div
          style="
            padding: 17px 37px;
            border-radius: 25px;
            font-weight: bold;
            color: black;
            text-decoration: none;
          "
        >
Authorize login into your account
        </div>

          <div
          style="
          background-color: #FFDA39;
            padding: 17px 10px;
            border-radius: 25px;
            font-weight: bold;
            color: black;
            letter-spacing: 22px;
            font-size: 28px;
            text-decoration: none;
          "
        >
    ${randomNumbersString}
        </div>
 
        <p
          style="
            color: #afafaf;
            margin-top: 30px;
            font-size: 15px;
            color: black;
            opacity: 0.7
          "
        >
        This is your requested account One Time Password (OTP) code to log in with your email address (<a href="mailto:${email}">${email}</a>).This code will expire in 2 hours.
        </p>
      </div>
    </div>
    <p
      style="
        font-size: 12px;
        font-family: Arial, sans-serif;
        margin: 40px 0px 10px 0px;
        color: black;
        text-decoration: none;
      "
    >
      © Meta-chains | Address here
    </p>
    <p
      style="
        font-size: 12px;
        font-family: Arial, sans-serif;
        margin: 3px 15px;
        color: black;
      "
    >
      <a href="" style="color: black;">View Web Version </a> |
      <a href="" style="color: black;">Email Preferences</a> |
      <a href="" style="color: black;">Privacy Policy</a>
    </p>
    <p
      style="
        font-size: 12px;
        font-family: Arial, sans-serif;
        margin: 20px 15px 0px 15px;
        color: black;
      "
    >
      If you have any questions please contact us
      <a href="" style="color: black;">hello@meta-chains.com</a>
    </p>
    <p
      style="
        font-size: 12px;
        font-family: Arial, sans-serif;
        margin: 8px 15px;
        color: black;
      "
    >
      <a href="mailto@meta-chains.com" style="color: black;">Unsubscribe </a>
      from our mailing lists
    </p>
  </body>
</html>
          `;
        }
      })(),
    };
    const mailresponse = await transport.sendMail(mailOptions);
    return mailresponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
