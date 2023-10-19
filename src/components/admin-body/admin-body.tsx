import AllUsers from "../all-users/all-users";

const AdminBody = ({ price, data }: any) => {
  //   const fullName = data.fullname; // Replace with your actual full name

  //   // Split the full name into an array of words
  //   const fullNameArray = fullName.split(" ");

  //   // Check if the array has elements before accessing the first name
  //   const firstName = fullNameArray.length > 0 ? fullNameArray[0] : "";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#0F172A",
        width: "100%",
        padding: "10px",
      }}
    >
      <div
        style={{
          fontSize: "22.5px",
          fontWeight: "700",
          width: "95%",
          height: "88px",
          borderBottom: "1px solid #334155",
          display: "flex",
          alignSelf: "center",
          flexDirection: 'column',
          justifyContent: 'end',
          paddingBottom: "5px",
          gap: "12px"
        }}
      >
       <div> All Users</div>
           <div style={{display: 'flex', alignItems: "center", gap: '20px', fontWeight:'200'}}>
             <div style={{display: 'flex', alignItems: "center", gap: "10px" }}>
             <span style={{fontSize: '12px' }}> open tickets ={">"} </span>
             <span style={{width: "12px", height: "12px", borderRadius: '8px', backgroundColor: "rgba(256, 0, 0, 0.9)"}}></span>
             </div>
              <div style={{display: 'flex', alignItems: "center",  gap: "10px" }}>
             <span style={{fontSize: '12px'}}>pending transaction ={">"}  </span>
             <span style={{width: "12px", height: "12px", borderRadius: '8px', backgroundColor: "rgba(0, 0, 256, 0.9)"}}></span>
             </div>
           </div>
      </div>

      <AllUsers price={price} data={data} />
    </div>
  );
};

export default AdminBody;
