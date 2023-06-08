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
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import "./styles.css";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";

import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Tabs,
  Tab,
} from "@mui/material";

const style = {
  position: "relative",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "55%",
  maxWidth: "60%",
  maxHeight: "75%",
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  background: "rgb(230, 228, 228)",
  p: 3,
  overflowY: "scroll",
  "&::-webkit-scrollbar": {
    display: "none",
  },
  statusButton: {
    width: "100px",
    height: "30px",
    borderRadius: "5px",
    position: "absolute",
    bottom: "45%",
    right: "5%",
    marginBottom: "5px",
    outline: "none",
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
    border: "1px solid black",
    borderRadius: "5px",
    marginBottom: "8px",
  },
  button: {
    width: "15vh",
    height: "5vh",
    padding: "10px",
    margin: "0 0 0 5px",
    border: "none",
    borderRadius: "10px",
    backgroundColor: "#33a2b5",
    color: "#fff",
    cursor: "pointer",
  },
};

function Ticket() {
  const { GetAllTickets, UpdateTickets } = useAdmin();
  const [open1, setOpen1] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [tickets, setTickets] = useState([]);

  const [searchApiData, setSearchApiData] = useState([]);
  const [filter, setFilter] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const ticketsPerPage = 10;
  const offset = currentPage * ticketsPerPage;
  const currentTickets = tickets.slice(offset, offset + ticketsPerPage);

  const [values, setValues] = useState([
    {
      supportMessage: "",
      ticketStatus: "",
    },
  ]);
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  const [loading, setLoading] = useState(true);

  const handleCloseImage = () => {
    setShowImage(false);
  };

  const handleClose1 = () => setOpen1(false);
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
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
          date: new Date(ticket.raisedDate).toLocaleDateString("en-GB"),
          subject: ticket.ticketSubject,
          message: ticket.ticketMessage,
          ticketStatus: ticket.ticketStatus,
          supportMessage: ticket.supportMessage,
          updated_by: ticket.updated_by,
          updated_at: new Date(ticket.updated_at).toLocaleDateString("en-GB"),
          profile: ticket.profilePhoto,
        }));
        setTickets(ticketData);
        setSearchApiData(ticketData);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleFilter = (e) => {
    setLoading(false);
    if (e.target.value === "") {
      setTickets(searchApiData);
    } else {
      const filteredData = searchApiData.filter((item) => {
        const lowerCaseValue = e.target.value.toLowerCase();
        return (
          item.name.toLowerCase().includes(lowerCaseValue) ||
          item.subject.toLowerCase().includes(lowerCaseValue) ||
          item.ticketId.toString().includes(e.target.value) ||
          item.phoneNumber.toLowerCase().includes(lowerCaseValue) ||
          item.numericProperty === parseInt(e.target.value)
        );
      });
      setTickets(filteredData);
    }
    setFilter(e.target.value);
  };

  const handleStatus = (e) => {
    setLoading(false);
    if (e.target.value === "All") {
      setTickets(searchApiData);
    } else {
      const filteredData = searchApiData.filter((item) => {
        return (
          item.ticketStatus.toLowerCase() === "open" || "in process" || "closed"
        );
      });
      setTickets(filteredData);
    }
  };

  const handleStatusOpen = (e) => {
    setLoading(false);
    const filteredData = searchApiData.filter((item) => {
      return item.ticketStatus.toLowerCase() === "open";
    });
    setTickets(filteredData);
  };
  const handleStatusInprocess = (e) => {
    setLoading(false);
    const filteredData = searchApiData.filter((item) => {
      return item.ticketStatus.toLowerCase() === "in process";
    });
    setTickets(filteredData);
  };
  const handleStatusClose = (e) => {
    setLoading(false);
    const filteredData = searchApiData.filter((item) => {
      return item.ticketStatus.toLowerCase() === "closed";
    });
    setTickets(filteredData);
  };

  useEffect(() => {
    getAllTickets();
  }, []);
  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };
  const handleOpen1 = (ticketId) => {
    console.log("Selected Ticket ID:", ticketId);
    const selected = tickets.find((ticket) => ticket.ticketId === ticketId);
    setSelectedTicket(selected);
    setOpen1(true);
  };
  const handleSave = (e) => {
    e.preventDefault();
    const data = {
      supportMessage: values.supportMessage,
      ticketStatus: values.ticketStatus,
    };

    var updateTicket = UpdateTickets(data, selectedTicket.ticketId);
    updateTicket
      .then((response) => {
        // console.log(response);
        if (response.status === 200) {
          getAllTickets();
          handleClose1();
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  function getStatusColor(status) {
    switch (status) {
      case "Open":
        return "green";
      case "In Process":
        return "orange";
      case "Closed":
        return "red";
      default:
        return "black";
    }
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <div
        style={{
          float: "left",
          marginLeft: "-2px",
          padding: "0px",
          margin: "7px  0px 10px",
          width: "90%",
        }}
      >
        <input
          style={{
            margin: "7px 10px 0px 10px",
            padding: "6px 10px",
            borderColor: "#33a2b5",
            borderRadius: "10px",
            width: "20%",
            height: "6vh",
            outline: "none",
            border: "2px solid #33a2b5",
          }}
          type="text"
          placeholder="Search..."
          onInput={(e) => handleFilter(e)}
        />
        <Select
          style={{
            margin: "7px 10px 0px 10px",
            padding: "6px 10px",
            borderColor: "#33a2b5",
            borderRadius: "10px",
            width: "20%",
            height: "6vh",
            outline: "none",
            border: "2px solid #33a2b5",
            background: "#fff",
            color: "black",
            fontSize: "14px",
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='5' viewBox='0 0 10 5'%3E%3Cpath fill='%2333a2b5' d='M0 0l5 4.998L10 0z'/%3E%3C/svg%3E")`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 8px center",
            backgroundSize: "10px 5px",
          }}
          defaultValue={"All"}
        >
          <MenuItem
            onClick={handleStatus}
            style={{
              border: "2px solid lightgray",
              height: "40px",
              marginTop: "5px",
            }}
            value={"All"}
          >
            All
          </MenuItem>
          <MenuItem
            onClick={handleStatusOpen}
            style={{
              border: "2px solid lightgray",
              height: "40px",
              marginTop: "2px",
            }}
            value={"Open"}
          >
            Open
          </MenuItem>
          <MenuItem
            onClick={handleStatusInprocess}
            style={{
              border: "2px solid lightgray",
              height: "40px",
              marginTop: "2px",
            }}
            value={"In Process"}
          >
            In Process
          </MenuItem>
          <MenuItem
            onClick={handleStatusClose}
            style={{
              border: "2px solid lightgray",
              height: "40px",
              marginTop: "2px",
            }}
            value={"Closed"}
          >
            Closed
          </MenuItem>
        </Select>
      </div>

      <MDBox pt={1} mx={1}>
        <Grid container spacing={1}>
          {currentTickets.length !== 0 ? (
            currentTickets.map((ticket, key) => (
              <Grid key={key} item xs={50} mt={0}>
                <MDBox mb={0}>
                  <Card
                    sx={{
                      position: "relative",
                      width: "100%",
                      height: "100%",
                      backgroundColor: "whitesmoke",
                      display: "flex",
                      overflowX: "inherit",
                    }}
                  >
                    <CardMedia
                      sx={{ maxHeight: 50, minHeight: 50, maxWidth: 50 }}
                      component="img"
                      image={
                        ticket.profile
                          ? ticket.profile
                          : "https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg"
                      }
                      alt=""
                      position="relative"
                    />

                    <CardContent>
                      <Stack
                        style={{ justifyContent: "left" }}
                        direction="row"
                        spacing={2}
                        marginLeft="-8px"
                      >
                        <Item style={{ width: "200px" }}>
                          {" "}
                          <strong>Name:</strong> {ticket.name}{" "}
                        </Item>
                        <Item style={{ width: "300px" }}>
                          {" "}
                          <strong>Phone Number:</strong> {ticket.phoneNumber}
                        </Item>
                        <Item style={{ width: "200px" }}>
                          {" "}
                          <strong>Ticket Id:</strong> {ticket.ticketId}
                        </Item>
                        <Item style={{ width: "400px" }}>
                          {" "}
                          <strong>Subject: </strong>
                          {ticket.subject}
                        </Item>
                        <>
                          <Button
                            style={{
                              backgroundColor: getStatusColor(
                                ticket.ticketStatus
                              ),
                              width: "15vh",
                              height: "5vh",
                              padding: "10px",
                              margin: "0 0 0 5px",
                              border: "none",
                              borderRadius: "10px",
                              color: "#fff",
                              cursor: "pointer",
                            }}
                          >
                            {ticket.ticketStatus}
                          </Button>
                          <Button
                            onClick={() => handleOpen1(ticket.ticketId)}
                            style={styles.button}
                          >
                            View Details
                          </Button>
                        </>
                      </Stack>
                    </CardContent>
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

        <br />
      </MDBox>
      {tickets.length > ticketsPerPage && (
        <div className="pagination-container">
          <p>
            Rows Per Page: 10
            <IconButton
              disabled={currentPage === 0}
              onClick={handlePreviousPage}
            >
              <ChevronLeft />
            </IconButton>
            {/* ... */}
            <IconButton
              disabled={
                currentPage >= Math.ceil(tickets.length / ticketsPerPage) - 1
              }
              onClick={handleNextPage}
            >
              <ChevronRight />
            </IconButton>
          </p>
        </div>
      )}

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
                margin: "10px 5px",
                borderRadius: "10px 10px 10px 10px",
                // width:"80%"
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
                    marginTop: "-40px",
                    marginRight: "-25px",
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </div>
              <h4
                // id="transition-modal-title"
                style={{
                  textAlign: "center",
                  marginTop: "20px",
                  position: "sticky",
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
                          maxWidth: "auto",
                          maxHeight: "auto",
                        }}
                      >
                        <CardMedia
                          sx={{
                            display: "flex",
                          
                            height: 100,
                            width: 100,
                          }}
                          component="img"
                          image={
                            selectedTicket.profile
                              ? selectedTicket.profile
                              : "https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg"
                          }
                        />

                        <CardContent>
                          <Grid item xs={6} mt={0}>
                            <Item sx={{width:"50%", display:"flex"}}>
                              <span style={{ color: "black" }}>Name- </span>{" "}
                              {selectedTicket.name}
                            </Item>
                            <Item sx={{width:"50%", display:"flex", marginTop:"-42px", marginLeft:"50%", overflow:"hidden"}}>
                              <span style={{ color: "black" }}>
                                Phone-{" "}
                              </span>{" "}
                              {selectedTicket.phoneNumber}
                            </Item>
                            <Item sx={{width:"50%", display:"flex"}}>
                              <span style={{ color: "black" }}>
                                Ticket Id-{" "}
                              </span>{" "}
                              {selectedTicket.ticketId}
                            </Item>
                            <Item sx={{width:"50%", display:"flex", marginTop:"-42px", marginLeft:"50%", overflow:"hidden"}}>
                              <span style={{ color: "black" }}>Date- </span>{" "}
                              {selectedTicket.date}
                            </Item>
                            <Item sx={{width:"50%", display:"flex"}}>
                              <span style={{ color: "black" }}>Subject- </span>{" "}
                              {selectedTicket.subject}
                            </Item>
                            <Item sx={{width:"50%", display:"flex", marginTop:"-42px", marginLeft:"50%"}}>
                              <span style={{ color: "black" }}>Status- </span>{" "}
                              {selectedTicket.ticketStatus}
                            </Item>
                            {selectedTicket.updated_by && (
                            <Item sx={{width:"50%", display:"flex"}}>
                              <span style={{ color: "black" }}>
                                Updated by-{" "}
                              </span>{" "}
                              {selectedTicket.updated_by}
                            </Item>
                            )}
                            {selectedTicket.updated_at !== "01/01/1970" && (
                            <Item sx={{width:"50%", display:"flex", marginTop:"-42px", marginLeft:"50%"}}>
                              <span style={{ color: "black" }}>
                                Updated At-{" "}
                              </span>{" "}
                              {selectedTicket.updated_at}
                            </Item>
                            )}
                            <br/>
                            <label style={{ fontSize: "14px", color: "black" }}>
                              User Message
                          </label>
                              <Item sx={{width:"100%", display:"flex"}}>
                              {selectedTicket.message}
                            </Item>
                            {selectedTicket.supportMessage && (

                              <div>
                            <br/>

                            <label style={{ fontSize: "14px", color: "black" }}>
                              Previous Support Remarks
                            </label>
                            <Item sx={{width:"100%", display:"flex"}}>
                              {selectedTicket.supportMessage}
                            </Item>
                            </div>
                            )}
                          </Grid>
                          <br />
                         
                        </CardContent>
                      </Card>

                      {/* <CardMedia
                sx={{ maxHeight: "400px", minHeight: 100, maxWidth: "400px", alignItems:"center", marginLeft:"22%" }}
                component="img"
                image={
                  "https://storage.googleapis.com/android-mapping-backend.appspot.com/1683205156389.blob"
                }
              ></CardMedia> */}
                    </MDBox>
                    <br />
                    <hr />
                    <h5 style={{ textAlign: "center", margin: "5px" }}>
                      Support Provided
                    </h5>
                    <div>
                      <form style={styles.form} onSubmit={handleSave}>
                        <label style={{ fontSize: "14px" }}>
                          Support Remarks
                        </label>
                        <textarea
                          name="supportMessage"
                          onChange={onChange}
                          placeholder="Enter description"
                          style={styles.input}
                          rows="5"
                          cols="24"
                          required
                        />

                        <label style={{ fontSize: "14px" }}>Status:</label>
                        <select
                          style={{
                            width: "auto",
                            height: "40px",
                            borderRadius: "5px",
                            marginLeft: "55px",
                            background: "white",
                          }}
                          name="ticketStatus"
                          onChange={onChange}
                          required
                          defaultValue={selectedTicket.ticketStatus}
                        >
                          <option value="" disabled>
                            -- Select Status --
                          </option>
                          <option value={"Open"}>Open</option>
                          <option value={"In Process"}>In Process</option>
                          <option value={"Closed"}>Closed</option>
                        </select>
                        <br />
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "flex-end",
                          }}
                        >
                          <button style={styles.button} onClick={handleClose1}>
                            Discard
                          </button>
                          <button type="submit" style={styles.button}>
                            Save
                          </button>
                        </div>
                      </form>
                    </div>
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
