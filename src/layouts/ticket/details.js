// import React, { useEffect, useState } from "react";
// import Compressor from "compressorjs";
// import UserRepository from "api/UsersRepository";
// import AdminRepository from "api/AdminRepository";
// import useAdmin from "../../hooks/useAdmin";
// import MDBox from "components/MDBox";
// import { CardContent, CardMedia, Grid } from "@mui/material";
// import Card from "@mui/material/Card";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import Box from "@mui/material/Box";
// import CircularProgress from "@mui/material/CircularProgress";
// import CalendarIcon from "@mui/icons-material/CalendarTodayOutlined";
// import './datepicker.css' 
// const styles = {
//   form: {
//     width: "100%",
//     margin: "0 auto",
//     padding: "20px",
//     border: "1px solid #eee",
//     borderRadius: "5px",
//   },
//   input: {
//     width: "100%",
//     padding: "10px",
//     border: "1px solid gray",
//     borderRadius: "5px",
//     marginBottom: "8px",
//   },
//   button: {
//     width: "100%",
//     padding: "10px",
//     margin: "10px 0 0 0",
//     border: "none",
//     borderRadius: "10px",
//     backgroundColor: "#33a2b5",
//     color: "#fff",
//     cursor: "pointer",
//   },
//   addButton: {
//     padding: "6px 12px",
//     border: "none",
//     borderRadius: "8px",
//     backgroundColor: "#33a2b5",
//     color: "#fff",
//     cursor: "pointer",
//   },

// };

// function Details() {
//   // const selectedTicket = tickets.find((ticket) => ticket.ticketId === ticketId);
//   const {UpdateTickets} = useAdmin();
//   const [selectedDate, setSelectedDate] = useState(null)
//   const [tickets, setTickets] = useState([]);
  
//   const [extraDetails, setExtraDetails] = useState([
//     {
//       remarks: "",
//       res_date: "",
//       status: "",
//     },
//   ]);
//   // const [tickets, setTickets] = useState([]);
//   const [showImage, setShowImage] = useState(false);
//   const [ticketId, setTicketId] = useState('');
//   const [loading, setLoading] = useState(true)

//   const updateTickets = () => {
//     setLoading(true);
//     var updateTickets = UpdateTickets();
//     updateTickets
//       .then((res) => {
//         const ticketData = res.data.map((ticket) => ({
//           name: ticket.name,
//           phoneNumber: ticket.phone_number,
//           ticketId: ticket.ticketId,
//           date:ticket.raisedDate,
//           subject:ticket.ticketSubject,
//           message:ticket.ticketMessage
//         }));
//         // setTickets(ticketData);
//         setTicketId(ticketId);
//         setLoading(false);
//         // console.log(ticketData)
//       })
//       .catch((e) => {
//         console.log(e);
//       });
//   };

//   useEffect(() =>{
//     updateTickets();
//   }, [ticketId])


//   const handleCloseImage = () => {
//     setShowImage(false);
//   };
//   const handleSave =()=>{
//     alert("details successfully saved");
//   }

//   return (
//     <div>
//       {showImage && (
//         <div
//           style={{
//             position: "fixed",
//             top: 0,
//             left: 0,
//             width: "100%",
//             height: "100%",
//             backgroundColor: "rgba(0, 0, 0, 0.5)",
//             zIndex: 999,
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//           onClick={handleCloseImage}
//         >
//           <img
//             src={
//               "https://storage.googleapis.com/android-mapping-backend.appspot.com/1681362242026.blob"
//             }
//             alt=""
//             style={{ maxWidth: "80%", maxHeight: "80%", objectFit: "contain" }}
//           />
//         </div>
//       )}
//       <div className="xyz">
//         <MDBox pt={1} mx={1}>
//           <Grid>
//           {tickets.length !== 0 ? (
//             tickets.map((ticket, key) => (
//             <Card
//               sx={{
//                 position: "relative",
//                 maxWidth: "100%",
//                 maxHeight: 600,
//               }}
//             >
//               <CardMedia
//                 sx={{ height: 100, width: 100 }}
//                 component="img"
//                 image="https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg"
//               ></CardMedia>
//               <CardContent>
//                 <p
//                   style={{
//                     fontSize: "15px",
//                     color: "gray",
//                     marginTop: "-100px",
//                     marginLeft: "20%",
//                   }}
//                   name="name"
//                 >
//                   <strong>Name- </strong> {ticket.name}
//                 </p>
//                 <p
//                   style={{ fontSize: "15px", color: "gray", marginLeft: "60%", marginTop:"-25px" }}
//                   name="name"
//                 >
//                   <span name="phone">
//                     <strong>Phone No- </strong> {ticket.phoneNumber}
//                   </span>
//                 </p>
//                 <p
//                   style={{ fontSize: "15px", color: "gray", marginLeft: "20%", marginTop:"3%" }}
//                 >
//                   <strong>Ticket No- </strong> {ticket.ticketId}
//                 </p>

//                 <p
//                   style={{ fontSize: "15px", color: "gray", marginLeft: "60%", marginTop:"-3%" }}
//                 >
//                   <strong>Ticket Raised Date- </strong> {ticket.date}
//                 </p>
//                 <p
//                   style={{ fontSize: "15px", color: "gray", marginLeft: "20%", marginTop:"0" }}
//                 >
//                   <strong>Ticket Subject- </strong> {ticket.subject} 
//                 </p>
//                 <p
//                   style={{
//                     fontSize: "15px",
//                     color: "gray",
//                     border: "2px solid gray",
//                     height: "100px",
//                     marginBottom: "10px",
//                     borderRadius: "10px",
//                     marginTop:"20px"
//                   }}
//                 >
//                   {ticket.message}
//                 </p>
//                  {/* <CardMedia
//                 sx={{ maxHeight: "400px", minHeight: 100, maxWidth: "400px", alignItems:"center", marginLeft:"22%" }}
//                 component="img"
//                 image={
//                   "https://storage.googleapis.com/android-mapping-backend.appspot.com/1683205156389.blob"
//                 }
//               ></CardMedia> */}
//               </CardContent>
//             </Card>
//                ))
//                ):(
//                 <div
//                 style={{
//                   width: "100%",
//                   display: "flex",
//                   justifyContent: "center",
//                   paddingTop: "20vh",
//                   fontSize: "30px",
//                 }}
//               >
//                 {loading ? (
//                   <Box sx={{ display: "flex" }}>
//                     <CircularProgress />
//                   </Box>
//                 ) : (
//                   <span>No Result's found !!!!</span>
//                 )}
//               </div>
//             )}
               
//           </Grid>
//         </MDBox>
         
//         <br />
//         <hr />
//         <h5 style={{ textAlign: "center", margin: "5px" }}>Support Provided</h5>
//         <div>
//           {extraDetails.map((detail, index) => (
//             <div key={index}>
//               <label style={{ fontSize: "14px" }}>Remarks</label>
//               <textarea
//                 name="remarks"
//                 placeholder="Remarks.."
//                 style={styles.input}
//                 rows="5"
//                 cols="24"
//                 required
//                 // value={detail.remarks}
//                 onChange={(e)=>{
//                   const values = [...extraDetails];
//                   values[index].title = e.target.value;
//                   setExtraDetails(values);
//                 }}
//               />
//              <label style={{ fontSize: "14px" }}> Resolved date:</label>
//             <DatePicker
//               name="res_date"
//               placeholder="Enter the ticket resolved date"
//               style={styles.input}
//               dateFormat="dd/MM/yyyy"
//               selected={selectedDate}
//               onChange={(date) => setSelectedDate(date) }
//               popperPlacement="auto-start"
//               popperModifiers={{
//                 preventOverflow: {
//                   enabled: true,
//                   escapeWithReference: false,
//                   boundariesElement: "viewport",
//                 },
//               }}

//               customInput={<input className="react-datepicker-ignore-onclickoutside" />}
//               renderInput={(props) => (
//                 <div className="react-datepicker-wrapper">
//                   <input {...props} />
//                   <CalendarIcon
//                     className="react-datepicker-icon"
//                     onClick={props.onClick}
//                   />
//                 </div>
//               )}
//               // {selectedTicket && (
//               //   <div>
//               //     <p>Ticket Name: {selectedTicket.name}</p>
//               //     <p>Ticket Phone Number: {selectedTicket.phoneNumber}</p>
//               //     <p>Ticket ID: {selectedTicket.ticketId}</p>
//               //     {/* Render other ticket details as needed */}
//               //   </div>
//             />
//               <br/>
//               <label style={{ fontSize: "14px" }} name="status" onChange={(e) => {
//                 const values = [...extraDetails];
//                 values[index].title = e.target.value;
//                 setExtraDetails(values);
//               }}>Status: </label>
//               <select style={{width:"135px", height:"35px", borderRadius:"5px", marginLeft:"55px", background:"white"}}>
//                 <option value={1}>Open</option>
//                 <option value={2}>In Process</option>
//                 <option value={3}>Closed</option>
//               </select>
//             </div>
//           ))}

//         </div>
//         <button type="submit" style={styles.button} onClick={handleSave}>
//           Save
//         </button>
       

//       </div>
//     </div>
//   );
// }

// export default Details;
