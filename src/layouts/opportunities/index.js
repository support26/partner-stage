import React, { useEffect, useState} from "react";
import useAdmin from "../../hooks/useAdmin";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import InfoIcon from '@mui/icons-material/Info';
// @mui material components
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Form from "./Form";
import EditForm from "./EditForm";
import Icon from '@mui/material/Icon';
import { tab } from "@testing-library/user-event/dist/tab";


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "520px",
  maxWidth: "90%",
  height: "550px",
  bgcolor: 'background.paper',
  borderRadius: '10px',
  boxShadow: 24,
  p: 3,
  overflowY: "scroll",
  "&::-webkit-scrollbar": {
    display: "none",
  },
};


function Opportunities() {
  const {GetAllOpportunity} = useAdmin();
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [opportunities, setOpportunities] = useState("")
  const [opportunity, setOpportunity] = useState("")
  const handleOpen = () => setOpen(true);
  const handleOpen1 = (id) => {
    let opt = opportunities.find((opportunity) => opportunity.id === id);
    opt.location = opt.tags.location;
    setOpportunity(opt);
    setOpen1(true);
  }
  const handleClose = () => setOpen(false);
  const handleClose1 = () => setOpen1(false);
 const getAllOpportunity = () => {
  var getallopportunity = GetAllOpportunity();
  getallopportunity.then((response) => {
    parseData(response.data.data);
  })
  .catch((e) => {
    console.log(e);
  });
  }
const parseData = (opportunities) => {
  opportunities.map((opportunity, index) => {
    let data = [...opportunities]
    data[index].tags = JSON.parse(opportunity.tags);
    data[index].project_details = JSON.parse(opportunity.project_details);
    data[index].extra_details = JSON.parse(opportunity.extra_details);
    setOpportunities(data)
  })
}
  useEffect(() => {
    getAllOpportunity();

  }, [])
  
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <div style ={{float: "right", margin: "7px 10px 0px 0px"}}>
        <Button onClick={handleOpen} style={{backgroundColor: "#33a2b5", padding: "7px 10px", border: "none", borderRadius: "10px", color: "#fff"}} >
          Add New Opportunity
        </Button>
        <Button style={{ fontSize: "10px", backgroundColor: "#33a2b5", color: "white", marginLeft: "3px", padding: "0px"}}>
    <InfoIcon /> help
        </Button>
        {/* <Icon>star</Icon> */}
      </div>
      <MDBox pt={1} mx={1}>
        <Grid container spacing={4}>
          {opportunities && opportunities.map((opportunity, key) => (
          <Grid key={key} item xs={12} md={6} lg={4} mt={0}>
            <MDBox mb={0}>
              <Card sx={{ maxWidth: 320}}>
                <CardMedia
                sx={{maxHeight: 160}}
                  component="img"
                  image={opportunity.title_image}
                  alt="opt image"
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {opportunity.title}
                  </Typography>
                  <p style={{ fontSize: "15px", color: "gray" }}>
                    <strong>Created at -</strong> {new Date(opportunity.tags.created).toLocaleString()}
                  </p>
                  <p style={{ fontSize: "15px", color: "gray" }}>
                    <strong>Location -</strong> {opportunity.tags.location}
                  </p>
                  <p style={{ fontSize: "15px", color: "gray" }}><strong>Likes -</strong> {opportunity.likes} </p>
                </CardContent>
                <CardActions sx={{ marginTop: -3 }}>
                  <Button onClick={() => handleOpen1(opportunity.id)} size="small">Edit</Button>
                  <Button onClick={() => {
                    window.open(opportunity.page_url, "_blank");
                  }} size="small">Preview</Button>
                </CardActions>
              </Card>
            </MDBox>
          </Grid>
          ))}
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
          <Box sx={style}>
          <div style={{marginTop: "0px"}}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="close"
            style={{display: "block", float: "right", marginTop: "-18px", marginRight: "-10px" }}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        </div>
        <div>
          {/* <EditForm/> */}
        <Form getAllOpportunity={getAllOpportunity} handleClose={handleClose}/>
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
          <div style={{marginTop: "0px"}}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="close"
            style={{display: "block", float: "right", marginTop: "-18px", marginRight: "-10px" }}
            onClick={handleClose1}
          >
            <CloseIcon />
          </IconButton>
        </div>
        <div>
          <EditForm opportunity={opportunity} getAllOpportunity={getAllOpportunity} handleClose={handleClose1} />
        {/* <Form getAllOpportunity={getAllOpportunity} handleClose={handleClose}/> */}
        </div>
          </Box>
        </Fade>
      </Modal>
    </DashboardLayout>
  );
}
export default Opportunities;
