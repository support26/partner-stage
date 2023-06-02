import React, { useEffect, useState } from "react";
import useAdmin from "../../hooks/useAdmin";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Details from "./details";
import CalendarIcon from "@mui/icons-material/CalendarTodayOutlined";
import "./datepicker.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "900px",
  maxWidth: "90%",
  height: "750px",
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  background: "lightgray",
  p: 3,
  overflowY: "scroll",
  "&::-webkit-scrollbar": {
    display: "none",
  },
};

const styles = {
  form: {
    width: "100%",
    margin: "0 auto",
    padding: "20px",
    border: "1px solid #eee",
    borderRadius: "5px",
  },
  input: {
    width: "100%",
    padding: "10px",
    border: "1px solid gray",
    borderRadius: "5px",
    marginBottom: "8px",
  },
  button: {
    width: "100%",
    padding: "10px",
    margin: "10px 0 0 0",
    border: "none",
    borderRadius: "10px",
    backgroundColor: "#33a2b5",
    color: "#fff",
    cursor: "pointer",
  },
  addButton: {
    padding: "6px 12px",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#33a2b5",
    color: "#fff",
    cursor: "pointer",
  },
};

function Ticket() {
  const { GetAllTickets } = useAdmin();
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [tickets, setTickets] = useState([]);

  const [extraDetails, setExtraDetails] = useState([
    {
      remarks: "",
      res_date: "",
      status: "",
    },
  ]);
  const [loading, setLoading] = useState(true);

  const handleCloseImage = () => {
    setShowImage(false);
  };

  const handleClose1 = () => setOpen1(false);

  const handleSave = () => {
    alert("details successfully saved");
  };
  const getAllTickets = () => {
    setLoading(true);
    var getalltickets = GetAllTickets();
    getalltickets
      .then((res) => {
        const ticketData = res.data.map((ticket) => ({
          name: ticket.name,
          phoneNumber: ticket.phone_number,
          ticketId: ticket.ticketId,
          date: ticket.raisedDate,
          subject: ticket.ticketSubject,
          message: ticket.ticketMessage,
        }));
        setTickets(ticketData);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getAllTickets();
  }, []);

  const handleOpen1 = (ticketId) => {
    console.log("Selected Ticket ID:", ticketId);
    const selected = tickets.find((ticket) => ticket.ticketId === ticketId);
    setSelectedTicket(selected);
    setOpen1(true);
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      {showImage && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 999,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={handleCloseImage}
        >
          {/* <img
            src={
              ticket.title_image
                ? ticket.title_image
                : "https://storage.googleapis.com/android-mapping-backend.appspot.com/1681362242026.blob"
            }
            alt=""
            style={{ maxWidth: "80%", maxHeight: "80%", objectFit: "contain" }}
          /> */}
        </div>
      )}
      <div
        style={{
          float: "left",
          marginLeft: "-2px",
          padding: "0px",
          margin: "7px  0px 10px",
          width: "222px",
        }}
      >
        <input
          style={{
            margin: "7px 10px 0px 10px",
            padding: "6px 10px",
            borderColor: "#33a2b5",
            borderRadius: "10px",
            width: "142%",
            height: "6vh",
            outline: "none",
            border: "2px solid #33a2b5",
          }}
          type="text"
          placeholder="Search..."
        />
      </div>

      <MDBox pt={1} mx={1}>
        <Grid container spacing={1}>
          {tickets.length !== 0 ? (
            tickets.map((ticket, key) => (
              <Grid key={key} item xs={12} mt={0}>
                <MDBox mb={0}>
                  <Card
                    sx={{
                      position: "relative",
                      maxWidth: "100%",
                      maxHeight: 600,
                    }}
                  >
                    <CardMedia
                      sx={{ maxHeight: 50, minHeight: 50, maxWidth: 50 }}
                      component="img"
                      image={
                        "https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg"
                      }
                      alt=""
                      position="relative"
                    />

                    <CardContent>
                      <p
                        style={{
                          fontSize: "15px",
                          color: "gray",
                          marginTop: "-50px",
                          marginLeft: "10%",
                        }}
                        // name="name"
                      >
                        <strong>Name- </strong> {ticket.name}
                      </p>
                      <p
                        style={{
                          fontSize: "15px",
                          color: "gray",
                          marginTop: "-25px",
                          marginLeft: "40%",
                        }}
                        // name="phone"
                      >
                        <span>
                          <strong>Phone No- </strong> {ticket.phoneNumber}
                        </span>
                      </p>
                      <p
                        style={{
                          fontSize: "15px",
                          color: "gray",
                          marginTop: "-25px",
                          marginLeft: "70%",
                        }}
                        // name="ticketno"
                      >
                        <strong>Ticket No- {ticket.ticketId}</strong>
                      </p>
                      <p
                        style={{
                          fontSize: "15px",
                          color: "gray",
                          marginTop: "5px",
                          marginLeft: "10%",
                        }}
                        // name="subject"
                      >
                        <strong>Subject- </strong> {ticket.subject}
                      </p>
                    </CardContent>
                    <div
                      sx={{
                        position: "absolute",
                        bottom: 50,
                        flex: 10,
                        justifyContent: "space-between",
                        justifyContent: "flex-end",
                        bottom: 0,
                      }}
                    >
                      <CardActions sx={{ marginTop: -3 }}>
                        <div
                          style={{
                            margin: "0px 2px 2px 00px",
                            cursor: "pointer",
                          }}
                        >
                          <Button
                            style={{
                              width: "100px",
                              height: "30px",
                              borderRadius: "5px",
                              position: "absolute",
                              bottom: 0,
                              right: "14%",
                              border: "1px solid #1A73E8",
                              marginBottom: "5px",
                              outline: "none",
                              // name: "status",
                            }}
                          >
                            Open
                          </Button>
                        </div>
                        <Button
                          style={{
                            width: "100px",
                            height: "30px",
                            borderRadius: "5px",
                            position: "absolute",
                            bottom: 0,
                            right: "5%",
                            border: "1px solid #1A73E8",
                            marginBottom: "5px",
                            outline: "none",
                          }}
                          onClick={() => handleOpen1(ticket.ticketId)}
                        >
                          View Details
                        </Button>
                      </CardActions>
                    </div>
                  </Card>
                </MDBox>
              </Grid>
            ))
          ) : (
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                paddingTop: "20vh",
                fontSize: "30px",
              }}
            >
              {loading ? (
                <Box sx={{ display: "flex" }}>
                  <CircularProgress />
                </Box>
              ) : (
                <span>No Result's found !!!!</span>
              )}
            </div>
          )}
        </Grid>
      </MDBox>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open1}
        // onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open1}>
          <Box sx={style}>
            <div
              style={{
                position: "sticky",
                top: "-25px",
                zIndex: "1",
                backgroundColor: "#fff",
                padding: "0px 0px",
                margin: "0px -7px",
                borderRadius: "10px 10px 10px 10px",
              }}
            >
              <div style={{ marginTop: "-6px" }}>
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="close"
                  onClick={handleClose1}
                  style={{
                    display: "block",
                    float: "right",
                    marginTop: "-25px",
                    marginRight: "-25px",
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </div>
              <h4
                id="transition-modal-title"
                style={{
                  textAlign: "center",
                  marginTop: "0px",
                  position: "sticky",
                  widht: "100%",
                }}
              >
                Query Raised
              </h4>
            </div>
            <div>
              <div>
                {showImage && (
                  <div
                    style={{
                      position: "fixed",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      backgroundColor: "rgba(0, 0, 0, 0.5)",
                      zIndex: 999,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    onClick={handleCloseImage}
                  >
                    <img
                      src={
                        "https://storage.googleapis.com/android-mapping-backend.appspot.com/1681362242026.blob"
                      }
                      alt=""
                      style={{
                        maxWidth: "80%",
                        maxHeight: "80%",
                        objectFit: "contain",
                      }}
                    />
                  </div>
                )}
                {selectedTicket && (
                  <div className="xyz">
                    <MDBox pt={1} mx={1}>
                        
                            <Card
                              sx={{
                                position: "relative",
                                maxWidth: "100%",
                                maxHeight: 600,
                              }}
                            >
                              <CardMedia
                                sx={{ height: 100, width: 100 }}
                                component="img"
                                image="https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg"
                              ></CardMedia>
                              <CardContent>
                                <p
                                  style={{
                                    fontSize: "15px",
                                    color: "gray",
                                    marginTop: "-100px",
                                    marginLeft: "20%",
                                  }}
                                >
                                  <strong>Name- </strong> {selectedTicket.name}
                                </p>
                                <p
                                  style={{
                                    fontSize: "15px",
                                    color: "gray",
                                    marginLeft: "60%",
                                    marginTop: "-25px",
                                  }}
                                  // name="name"
                                >
                                  <span>
                                    <strong>Phone No- </strong>{" "}
                                    {selectedTicket.phoneNumber}
                                  </span>
                                </p>
                                <p
                                  style={{
                                    fontSize: "15px",
                                    color: "gray",
                                    marginLeft: "20%",
                                    marginTop: "3%",
                                  }}
                                >
                                  <strong>Ticket No- </strong>{" "}
                                  {selectedTicket.ticketId}
                                </p>

                                <p
                                  style={{
                                    fontSize: "15px",
                                    color: "gray",
                                    marginLeft: "60%",
                                    marginTop: "-3%",
                                  }}
                                >
                                  <strong>Ticket Raised Date- </strong>{" "}
                                  {selectedTicket.date}
                                </p>
                                <p
                                  style={{
                                    fontSize: "15px",
                                    color: "gray",
                                    marginLeft: "20%",
                                    marginTop: "0",
                                  }}
                                >
                                  <strong>Ticket Subject- </strong>{" "}
                                  {selectedTicket.subject}
                                </p>
                                <p
                                  style={{
                                    fontSize: "15px",
                                    color: "gray",
                                    border: "2px solid gray",
                                    height: "auto",
                                    marginBottom: "10px",
                                    borderRadius: "10px",
                                    marginTop: "20px",
                                  }}
                                >
                                  {selectedTicket.message}
                                </p>
                                {/* <CardMedia
                sx={{ maxHeight: "400px", minHeight: 100, maxWidth: "400px", alignItems:"center", marginLeft:"22%" }}
                component="img"
                image={
                  "https://storage.googleapis.com/android-mapping-backend.appspot.com/1683205156389.blob"
                }
              ></CardMedia> */}
                              </CardContent>
                            </Card>
                    </MDBox>

                    <br />
                    <hr />
                    <h5 style={{ textAlign: "center", margin: "5px" }}>
                      Support Provided
                    </h5>
                    <div>
                      {extraDetails.map((detail, index) => (
                        <div key={index}>
                          <label style={{ fontSize: "14px" }}>Remarks</label>
                          <textarea
                            // name="remarks"
                            placeholder="Remarks.."
                            style={styles.input}
                            rows="5"
                            cols="24"
                            required
                            // value={detail.remarks}
                            onChange={(e) => {
                              const values = [...extraDetails];
                              values[index].title = e.target.value;
                              setExtraDetails(values);
                            }}
                          />
                          <label style={{ fontSize: "14px" }}>
                            {" "}
                            Resolved date:
                          </label>
                          <DatePicker
                            // name="res_date"
                            placeholder="Enter the ticket resolved date"
                            style={styles.input}
                            dateFormat="dd/MM/yyyy"
                            selected={selectedDate}
                            onChange={(date) => setSelectedDate(date)}
                            popperPlacement="auto-start"
                            popperModifiers={{
                              preventOverflow: {
                                enabled: true,
                                escapeWithReference: false,
                                boundariesElement: "viewport",
                              },
                            }}
                            customInput={
                              <input className="react-datepicker-ignore-onclickoutside" />
                            }
                            renderInput={(props) => (
                              <div className="react-datepicker-wrapper">
                                <input {...props} />
                                <CalendarIcon
                                  className="react-datepicker-icon"
                                  onClick={props.onClick}
                                />
                              </div>
                            )}
                          />
                          <br />
                          <label
                            style={{ fontSize: "14px" }}
                            // name="status"
                            onChange={(e) => {
                              const values = [...extraDetails];
                              values[index].title = e.target.value;
                              setExtraDetails(values);
                            }}
                          >
                            Status:{" "}
                          </label>
                          <select
                            style={{
                              width: "135px",
                              height: "35px",
                              borderRadius: "5px",
                              marginLeft: "55px",
                              background: "white",
                            }}
                          >
                            <option value={1}>Open</option>
                            <option value={2}>In Process</option>
                            <option value={3}>Closed</option>
                          </select>
                        </div>
                      ))}
                    </div>
                    <button
                      type="submit"
                      style={styles.button}
                      onClick={handleSave}
                    >
                      Save
                    </button>
                  </div>
                )}
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
    </DashboardLayout>
  );
}
export default Ticket;
