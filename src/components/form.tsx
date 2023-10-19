export default function Form({
  setUser,
  user,
  setConfirmPassword,
  confirmPassword,
  display,
}: any) {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          marginBottom: "32px",
        }}
      >
        <label
          htmlFor="fullname"
          style={{ color: "#94A4B8", fontSize: "14px", fontWeight: "500" }}
        >
          fullname
        </label>

        <input
          className="signup-input"
          id="fullname"
          type="text"
          value={user.fullname}
          onChange={(e) =>
            setUser({
              ...user,
              fullname: e.target.value,
            })
          }
          placeholder="Enter fullname"
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          marginBottom: "32px",
        }}
      >
        <label
          htmlFor="email"
          style={{ color: "#94A4B8", fontSize: "14px", fontWeight: "500" }}
        >
          Email
        </label>

        <input
          className="signup-input"
          id="email"
          type="text"
          value={user.email}
          onChange={(e) =>
            setUser({
              ...user,
              email: e.target.value,
            })
          }
          placeholder="Enter Email"
        />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          marginBottom: "32px",
        }}
      >
        <label
          htmlFor="phone"
          style={{ color: "#94A4B8", fontSize: "14px", fontWeight: "500" }}
        >
          Phone
        </label>

        <input
          className="signup-input"
          id="phone"
          type="text"
          value={user.phone}
          onChange={(e) =>
            setUser({
              ...user,
              phone: e.target.value,
            })
          }
          placeholder="Enter Phone number"
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          marginBottom: "32px",
        }}
      >
        <label
          htmlFor="password"
          style={{ color: "#94A4B8", fontSize: "14px", fontWeight: "500" }}
        >
          Password
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
          placeholder="Enter Password"
        />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          marginBottom: "32px",
        }}
      >
        <label
          htmlFor="confirmPassword"
          style={{
            color: "#94A4B8",
            fontSize: "14px",
            fontWeight: "500",
            display: "flex",
            gap: "20px",
            alignItems: "center",
          }}
        >
          Confirm Password{" "}
          {display && (
            <div style={{ color: "red", fontSize: "10px" }}>
              Entry must be same as password
            </div>
          )}
        </label>

        <input
          className="signup-input"
          id="confirmPassword"
          type="text"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
          placeholder="Confirm Password"
        />
      </div>
    </>
  );
}
