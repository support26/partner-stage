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
  background: "#cfe8ef",
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
    bottom: 0,
    right: "14%",
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
          item.ticketStatus.toLowerCase().includes(lowerCaseValue) ||
          item.numericProperty === parseInt(e.target.value)
        );
      });
      setTickets(filteredData);
    }
    setFilter(e.target.value);
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
          onInput={(e) => handleFilter(e)}
        />
      </div>

      <MDBox pt={1} mx={1}>
        <Grid container spacing={1}>
          {currentTickets.length !== 0 ? (
            currentTickets.map((ticket, key) => (
              <Grid key={key} item xs={12} mt={0}>
                <MDBox mb={0}>
                  <Card
                    sx={{
                      position: "relative",
                      maxWidth: "100%",
                      maxHeight: 600,
                      backgroundColor: "whitesmoke",
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
                        <span style={{ color: "black" }}>Name- </span>{" "}
                        {ticket.name}
                      </p>
                      <p
                        style={{
                          fontSize: "15px",
                          color: "gray",
                          marginTop: "-25px",
                          marginLeft: "40%",
                        }}
                      >
                        <span>
                          <span style={{ color: "black" }}>Phone No- </span>{" "}
                          {ticket.phoneNumber}
                        </span>
                      </p>
                      <p
                        style={{
                          fontSize: "15px",
                          color: "gray",
                          marginTop: "-25px",
                          marginLeft: "70%",
                        }}
                      >
                        <span style={{ color: "black" }}>Ticket No- </span>{" "}
                        {ticket.ticketId}
                      </p>

                      <p
                        style={{
                          fontSize: "15px",
                          color: "gray",
                          marginTop: "5px",
                          marginLeft: "10%",
                        }}
                      >
                        <span style={{ color: "black" }}>Subject- </span>{" "}
                        {ticket.subject}
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
                        {ticket.ticketStatus === "Open" && (
                          <div
                            style={{
                              margin: "0px 2px 2px 00px",
                              cursor: "pointer",
                            }}
                          >
                            <Button
                              style={{
                                ...style.statusButton,
                                backgroundColor: "green",
                                border: "1px solid green",
                                color: "white",
                              }}
                            >
                              {ticket.ticketStatus}
                            </Button>
                          </div>
                        )}
                        {ticket.ticketStatus === "In Process" && (
                          <div
                            style={{
                              margin: "0px 2px 2px 00px",
                              cursor: "pointer",
                            }}
                          >
                            <Button
                              style={{
                                ...style.statusButton,
                                backgroundColor: "orange",
                                border: "1px solid yellow",
                                color: "white",
                              }}
                            >
                              {ticket.ticketStatus}
                            </Button>
                          </div>
                        )}
                        {ticket.ticketStatus === "Closed" && (
                          <div
                            style={{
                              margin: "0px 2px 2px 00px",
                              cursor: "pointer",
                            }}
                          >
                            <Button
                              style={{
                                ...style.statusButton,
                                backgroundColor: "red",
                                border: "1px solid red",
                                color: "white",
                              }}
                            >
                              {ticket.ticketStatus}
                            </Button>
                          </div>
                        )}
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
                            backgroundColor: "#33a2b5",
                            color: "white",
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
                            <span style={{ color: "black" }}>Name- </span>{" "}
                            {selectedTicket.name}
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
                              <span style={{ color: "black" }}>Phone No- </span>
                              {selectedTicket.phoneNumber}
                            </span>
                          </p>
                          <p
                            style={{
                              fontSize: "15px",
                              color: "gray",
                              marginLeft: "20%",
                              marginTop: "2%",
                            }}
                          >
                            <span style={{ color: "black" }}>Ticket No- </span>
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
                            <span style={{ color: "black" }}>
                              Ticket Raised Date-{" "}
                            </span>
                            {selectedTicket.date}
                          </p>

                          <p
                            style={{
                              fontSize: "15px",
                              color: "gray",
                              marginLeft: "20%",
                              marginTop: "2%",
                            }}
                          >
                            <span style={{ color: "black" }}>
                              Ticket Subject-{" "}
                            </span>
                            {selectedTicket.subject}
                          </p>
                          <p
                            style={{
                              fontSize: "15px",
                              color: "gray",
                              marginLeft: "60%",
                              marginTop: "-3%",
                            }}
                          >
                            <span style={{ color: "black" }}>
                              Status-{" "}
                              <span style={{ color: "gray" }}>
                                {selectedTicket.ticketStatus}
                              </span>
                            </span>
                          </p>
                          <p
                            style={{
                              fontSize: "15px",
                              color: "gray",
                              marginLeft: "20%",
                              marginTop: "2%",
                            }}
                          >
                            <span style={{ color: "black" }}>
                              Last Updated By-{" "}
                              <span style={{ color: "gray" }}>
                                {selectedTicket.updated_by}
                              </span>
                            </span>
                          </p>
                          <p
                            style={{
                              fontSize: "15px",
                              color: "gray",
                              marginLeft: "60%",
                              marginTop: "-3%",
                            }}
                          >
                            <span style={{ color: "black" }}>
                              Last Updated At-{" "}
                              <span style={{ color: "gray" }}>
                                {selectedTicket.updated_at}
                              </span>
                            </span>
                          </p>
                          <label style={{ fontSize: "14px", color: "black" }}>
                            User Message
                          </label>
                          <p
                            style={{
                              fontSize: "15px",
                              color: "gray",
                              border: "2px solid black",
                              height: "auto",
                              marginBottom: "10px",
                              borderRadius: "10px",
                              marginTop: "10px",
                              padding: "5px",
                            }}
                          >
                            {selectedTicket.message}
                          </p>
                          <div>
                            <label style={{ fontSize: "14px", color: "black" }}>
                              Previous Support Remarks
                            </label>
                            <p
                              style={{
                                fontSize: "15px",
                                color: "black",
                                border: "2px solid black",
                                height: "40px",
                                marginBottom: "10px",
                                borderRadius: "10px",
                                marginTop: "10px",
                                padding: "5px",
                              }}
                            >
                              {selectedTicket.supportMessage}
                            </p>
                          </div>

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
                    <form style={styles.form} onSubmit={handleSave}>
                      <label style={{ fontSize: "14px" }}>
                        Support Remarks
                      </label>
                      <textarea
                        name="supportMessage"
                        onChange={onChange}
                        placeholder="Enter description"
                        style={styles.input}
                        rows="6"
                        cols="24"
                        required
                      />

                      <label style={{ fontSize: "14px" }}>Status:</label>
                      <select
                        style={{
                          width: "200px",
                          height: "50px",
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

                      <button type="submit" style={styles.button}>
                        Save
                      </button>
                    </form>
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
