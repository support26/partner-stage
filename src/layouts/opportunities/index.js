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
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import CircularProgress from "@mui/material/CircularProgress";
// @mui material components
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Form from "./Form";
import EditForm from "./EditForm";
import RoleFroms from "./RoleFroms";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "520px",
  maxWidth: "90%",
  height: "550px",
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  p: 3,
  overflowY: "scroll",
  "&::-webkit-scrollbar": {
    display: "none",
  },
};
const style1 = {
  position: "relative",
  float: "right",
  // marginRight: "30px",
  top: "25%",
  right: "4%",
  // transform: 'translate(-50%, -50%)',
  width: "320px",
  maxWidth: "80%",
  // height: "550px",
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  p: 3,
  overflowY: "scroll",
  "&::-webkit-scrollbar": {
    display: "none",
  },
};

const styleCustom = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "320px",
  padding: "35px",
  height: "170px",
  borderRadius: "15px",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 3,
  maxHeight: "170px",
  maxWidth: "320px",
};

const styleBox = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "520px",
  maxWidth: "90%",
  borderRadius: "15px",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 3,
  overflowY: "scroll",
  "&::-webkit-scrollbar": {
    display: "none",
  },
  maxHeight: "670px", // Initial maxHeight value
  maxWidth: "320px",
};

function Opportunities() {
  const {
    GetAllOpportunity,
    DeleteOpportunityCard,
    ChangeOpportunityStatus,
    //  OpportunitySequenceList
  } = useAdmin();
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [opportunities, setOpportunities] = useState([]);
  const [opportunity, setOpportunity] = useState("");
  const [searchApiData, setSearchApiData] = useState([]);
  const [filter, setFilter] = useState("");
  const [deleteTitle, setDeleteTittle] = useState("");
  const [deleteId, setDeleteId] = useState("");

  const [loading, setLoading] = useState(true);

  const [openModal, setOpenModal] = useState(false);

  const [openRoleModel, setOpenRoleModel] = useState(false);
  const [projectIDForRoles, setProjectIDForRoles] = useState("");
  // const [sequenceList, setSequenceList] = useState([])
  const handleOpen = () => setOpen(true);
  const handleOpen2 = () => setOpen2(true);
  const handleOpen1 = (id) => {
    let opt = opportunities.find((opportunity) => opportunity.id === id);
    opt.location = opt.tags.location;
    setOpportunity(opt);
    setOpen1(true);
  };

  const handleOpen3 = (id) => {
    console.log("project id of the card", id);
    let opt = opportunities.find((opportunity) => opportunity.id === id);
    setProjectIDForRoles(opt.id);
    setOpenRoleModel(true);
  };
  const handleClose = () => setOpen(false);
  const handleClose1 = () => setOpen1(false);
  const handleClose2 = () => setOpen2(false);
  const handleClose3 = () => setOpenRoleModel(false);

  const handleStatus = (event, id, title) => {
    if (event.target.value === "delete") {
      // setOpenening(true);
      setDeleteTittle(title);
      setDeleteId(id);

      setOpenModal(true);

      // setShowDialoge(true);
    } else {
      const update = opportunities.map((opportunity) => {
        if (opportunity.id === id) {
          opportunity.load = true;
        }
        return opportunity;
      });

      setOpportunities(update);
      var changeopportunitystatus = ChangeOpportunityStatus(
        id,
        event.target.value
      );

      setTimeout(() => {
        changeopportunitystatus
          .then((response) => {
            // console.log(response)
            getAllOpportunity();
          })
          .catch((e) => {
            console.log(e);
          });
      }, 800);
    }
  };
  const getAllOpportunity = () => {
    var getallopportunity = GetAllOpportunity();
    getallopportunity
      .then((response) => {
        parseData(response.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
    // var opportunitysequencelist = OpportunitySequenceList();
    // opportunitysequencelist.then((response) => {
    //   // console.log(response)
    //   setSequenceList(response.data.data);
    // })
    // .catch((e) => {
    //   console.log(e);
    // });
  };

  const parseData = (opportunities) => {
    opportunities.map((opportunity, index) => {
      // opportunity.load = true;
      let data = [...opportunities];
      data[index].tags = JSON.parse(opportunity.tags);
      data[index].project_details = JSON.parse(opportunity.project_details);
      data[index].extra_details = JSON.parse(opportunity.extra_details);
      data[index].load = false;
    });
    setOpportunities(opportunities);
    setSearchApiData(opportunities);
  };
  useEffect(() => {
    getAllOpportunity();
  }, []);

  // filter section logic
  const handleFilter = (e) => {
    setLoading(false);
    // console.log(e);
    if (e.target.value === " ") {
      setOpportunities(searchApiData);
    } else {
      const Filter = searchApiData.filter(
        (item) =>
          item.title.toLowerCase().includes(e.target.value.toLowerCase()) ||
          item.tags.location
            .toLowerCase()
            .includes(e.target.value.toLowerCase()) ||
          new Date(item.tags.created).toLocaleString().includes(e.target.value)
        // item.tags.created.includes((e.target.value))
      );
      setOpportunities(Filter);
    }
    setFilter(e.target.value);
  };

  const handleClosees = () => {
    var deleteCardopprtunity = DeleteOpportunityCard(deleteId);
    deleteCardopprtunity
      .then((res) => {
        if (res.status === 200) {
          console.log("deleted");
          getAllOpportunity();
        }
      })
      .catch((e) => {
        console.log(e);
        console.log("not deleted");
      });
    setOpenModal(false);
  };

  const handleNo = () => {
    setOpenModal(false);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />

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
          value={filter}
          placeholder="Search Opportunities !!"
          onInput={(e) => handleFilter(e)}
        />
      </div>

      <div style={{ float: "right", margin: "7px 10px 0px 0px" }}>
        <Button
          onClick={handleOpen}
          style={{
            backgroundColor: "#33a2b5",
            padding: "7px 10px",
            border: "none",
            borderRadius: "10px",
            color: "#fff",
          }}
        >
          Add New Opportunity
        </Button>

        <Button
          onClick={handleOpen2}
          style={{
            fontSize: "10px",
            backgroundColor: "#33a2b5",
            color: "white",
            marginLeft: "3px",
            padding: "0px",
          }}
        >
          <InfoIcon /> help
        </Button>
        {/* <Icon>star</Icon> */}
      </div>
      <MDBox pt={1} mx={1}>
        <Grid container spacing={1}>
          {opportunities.length !== 0 ? (
            opportunities.map((opportunity, key) => (
              <Grid key={key} item xs={12} md={6} lg={4} mt={0}>
                <MDBox mb={0}>
                  <Card
                    sx={{
                      position: "relative",
                      maxWidth: 320,
                      maxHeight: 400,
                      minHeight: 400,
                    }}
                  >
                    <CardMedia
                      sx={{ maxHeight: 150, minHeight: 150 }}
                      component="img"
                      image={
                        opportunity.title_image
                          ? opportunity.title_image
                          : "https://storage.googleapis.com/android-mapping-backend.appspot.com/1681362242026.blob"
                      }
                      alt=""
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h6" component="div">
                        {opportunity.title}
                      </Typography>
                      <p style={{ fontSize: "15px", color: "gray" }}>
                        <strong>Created at -</strong>{" "}
                        {new Date(opportunity.tags.created).toLocaleString()}
                      </p>
                      <p style={{ fontSize: "15px", color: "gray" }}>
                        <strong>Location -</strong> {opportunity.tags.location}
                      </p>
                      <p style={{ fontSize: "15px", color: "gray" }}>
                        <strong>Likes -</strong> {opportunity.likes}{" "}
                      </p>
                    </CardContent>

                    <div
                      sx={{
                        position: "absolute",
                        bottom: 50,
                        flex: 10,
                        justifyContent: "space-between",
                        // justifyContent: "flex-end",
                        // bottom: 0,
                      }}
                    >
                      <CardActions sx={{ marginTop: -3 }}>
                        <div style={{ margin: "0px 2px 2px 00px" }}>
                          <Button
                            style={{
                              position: "absolute",
                              bottom: 0.5,
                              flex: 0,
                              justifyContent: "space-between",
                              // justifyContent: "flex-end",
                            }}
                            onClick={() => handleOpen1(opportunity.id)}
                            size="small"
                          >
                            Edit
                          </Button>
                        </div>
                        <div style={{ margin: "0px 2px 2px 50px" }}>
                          <Button
                            style={{ position: "absolute", bottom: 0.5 }}
                            onClick={() => {
                              window.open(opportunity.page_url, "_blank");
                            }}
                            size="small"
                          >
                            Preview
                          </Button>
                        </div>

                        <div style={{ margin: "0px 2px 2px 00px" }}>
                          <Button
                            style={{
                              position: "absolute",
                              bottom: 0,
                              right: "29%",
                              bottom: 0.5,
                            }}
                            onClick={() => handleOpen3(opportunity.id)}
                            size="small"
                          >
                            Add roles
                          </Button>
                        </div>

                        {opportunity.load ? (
                          <CircularProgress
                            size={20}
                            style={{
                              position: "absolute",
                              bottom: 0,
                              right: "12%",
                              marginBottom: "9px",
                              color: "blue",
                            }}
                          />
                        ) : (
                          <select
                            value={opportunity.status}
                            style={{
                              width: "60px",
                              height: "30px",
                              borderRadius: "5px",
                              position: "absolute",
                              bottom: 0,
                              right: "6%",
                              border: "1px solid #1A73E8",
                              // marginLeft: "18px",
                              marginBottom: "5px",

                              outline: "none",
                            }}
                            onChange={(event) =>
                              handleStatus(
                                event,
                                opportunity.id,
                                opportunity.title
                              )
                            }
                          >
                            <option value={1}>Show</option>
                            <option value={0}>Draft</option>

                            <option value={"delete"}>Delete</option>
                          </select>
                        )}

                        {/* <select
                                                        value={opportunity.sequence}
                                                            style={{
                                                              width: "50px",
                                                              height: "30px",
                                                              borderRadius: "5px",
                                                              border: "1px solid #1A73E8",
                                                              marginLeft: "15px",
                                                              outline: "none",
                                                            }}
                                                            // onChange={(event) => handleStatus(event, opportunity.id)}
                                                          >
                                                            {sequenceList && sequenceList.map((sequence) => (
                                                              <option key={sequence} value={sequence}>{sequence}</option>
                                                            ))}
                                                          </select> */}
                        {/* {opportunity.load && <CircularProgress size={20} style={{marginLeft: "10px", color: "blue"}} />
                                                          } */}
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
        open={open}
        // onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={styleCustom}>
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
                  style={{
                    display: "block",
                    float: "right",
                    marginTop: "-5px",
                    marginRight: "-10px",
                  }}
                  onClick={handleClose}
                >
                  <CloseIcon />
                </IconButton>
              </div>
              <h4
                id="transition-modal-title"
                style={{ textAlign: "center", marginTop: "0px" }}
              >
                Add New Opportunity
              </h4>
            </div>
            <div>
              {/* <EditForm/> */}
              <Form
                getAllOpportunity={getAllOpportunity}
                handleClose={handleClose}
              />
            </div>
          </Box>
        </Fade>
      </Modal>

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
                  style={{
                    display: "block",
                    float: "right",
                    marginTop: "-5px",
                    marginRight: "-10px",
                  }}
                  onClick={handleClose1}
                >
                  <CloseIcon />
                </IconButton>
              </div>
              <h4
                id="transition-modal-title"
                style={{ textAlign: "center", marginTop: "0px" }}
              >
                Edit Opportunity
              </h4>
            </div>
            <div>
              <EditForm
                opportunity={opportunity}
                getAllOpportunity={getAllOpportunity}
                handleClose={handleClose1}
              />
              {/* <Form getAllOpportunity={getAllOpportunity} handleClose={handleClose}/> */}
            </div>
          </Box>
        </Fade>
      </Modal>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open2}
        onClose={handleClose2}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open2}>
          <Box sx={style1}>
            <div style={{ fontSize: "14px" }}>
              <div>
                <h4>Bold--</h4>
                <p>
                  Use <b>&lt;b&gt;some text here&lt;/b&gt;</b> to make text bold
                </p>
              </div>
              <br />
              <hr />
              <br />
              <div>
                <h4>Italic--</h4>
                <p>
                  Use <i>&lt;i&gt;some text here&lt;/i&gt;</i> to make text
                  Italic
                </p>
              </div>
              <br />
              <hr />
              <br />
              <div>
                <h4>Link--</h4>
                <p>
                  Use{" "}
                  <strong>
                    &lt;a href = "https://www.google.com" &gt; click
                    here&lt;/a&gt;
                  </strong>{" "}
                  to make text a link
                </p>
              </div>
              {/* <div>
                <h4>Image</h4>
                <p>Use <strong>![alt text](image link)</strong> to add an image</p>
              </div> */}
            </div>
          </Box>
        </Fade>
      </Modal>
      <div style={{ maxHeight: "170px", maxWidth: "320px" }}>
        <Modal open={openModal}>
          <Fade in={openModal}>
            <Box
              sx={styleCustom}
              {...{ minHeight: "170px", maxHeight: "170px", maxWidth: "320px" }}
            >
              <Typography gutterBottom variant="h6" component="div">
                {`Are you sure you want to delete `} {deleteTitle} {"??"}
              </Typography>

              <CardActions>
                <Button
                  style={{ bottom: 0, marginLeft: "120px" }}
                  name="disagree"
                  onClick={() => handleNo()}
                >
                  No
                </Button>

                <Button
                  style={{
                    backgroundColor: "#33a2b5",
                    color: "white",
                    bottom: 0,
                  }}
                  name="agree"
                  onClick={() => handleClosees()}
                  autoFocus
                >
                  Yes
                </Button>
              </CardActions>
            </Box>
          </Fade>
        </Modal>

        {/* <Dialog 

            open={opening}
            // onClose={handleStatus}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >

            <DialogTitle  id="alert-dialog-title v">
              <Typography  gutterBottom variant="h6"  component="div">
                {`Are you sure you want to delete `} {deleteTitle} {"??"}
              </Typography>
              
            </DialogTitle>


            <DialogActions>
              <Button  name="disagree" onClick={handleClosees}>
                No
              </Button>
              <Button style={{ backgroundColor: "#33a2b5", color: "white" }}
                name="agree"
                onClick={handleClosees}
                autoFocus
              >
                Yes
              </Button>
            </DialogActions>


          </Dialog> */}
      </div>

      {/* roles modal */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openRoleModel}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openRoleModel}>
          <Box sx={styleBox}>
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
              <div style={{ marginTop: "" }}>
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="close"
                  style={{
                    display: "block",
                    float: "right",
                    marginTop: "-5px",
                    marginRight: "-10px",
                  }}
                  onClick={handleClose3}
                >
                  <CloseIcon />
                </IconButton>
              </div>
              <h4
                id="transition-modal-title"
                style={{ textAlign: "center", marginTop: "10px" }}
              >
                Add Roles
              </h4>
            </div>
            <div>
              <RoleFroms
                projectIDForRoles={projectIDForRoles}
                handleClose={handleClose3}
              />
            </div>
          </Box>
        </Fade>
      </Modal>
    </DashboardLayout>
  );
}
export default Opportunities;
