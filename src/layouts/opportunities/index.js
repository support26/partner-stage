import * as React from "react";
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
// @mui material components
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Form from "./Form";


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
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <div style ={{float: "right", margin: "7px 10px 0px 0px"}}>
        <Button onClick={handleOpen} style={{backgroundColor: "#33a2b5", padding: "7px 10px", border: "none", borderRadius: "10px", color: "#fff"}} >
          Add New Opportunity
        </Button>
      </div>
      <MDBox pt={1} mx={1}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6} lg={4} mt={0}>
            <MDBox mb={0}>
              <Card sx={{ maxWidth: 320}}>
                <CardMedia
                sx={{maxHeight: 160}}
                  component="img"
                  image="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png"
                  alt="opt image"
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    Escorts Tractor Survey | Tractor Owner की जानकारी लाएँ और
                    पैसे कमाएं।
                  </Typography>
                  <p style={{ fontSize: "15px", color: "gray" }}>
                    <strong>Created at -</strong> August 11, 2021 5:39 PM
                  </p>
                  <p style={{ fontSize: "15px", color: "gray" }}>
                    <strong>Location -</strong> यह काम मध्य प्रदेश, उत्तर प्रदेश
                    एवं महाराष्ट्र की कुछ डिस्ट्रिक्ट मे किया जाना है।
                  </p>
                  <p style={{ fontSize: "15px", color: "gray" }}><strong>Likes -</strong> 10 </p>
                </CardContent>
                <CardActions sx={{ marginTop: -3 }}>
                  <Button size="small">Edit</Button>
                  <Button size="small">Preview</Button>
                </CardActions>
              </Card>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4} mt={0} ml={0}>
            <MDBox mb={0}>
              <Card sx={{ maxWidth: 320 }}>
                <CardMedia
                sx={{maxHeight: 160}}
                  component="img"
                  image="https://anaxeeprojects.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F9ce4191a-f76c-4d72-9865-65d84f8e94fb%2Fewew-01.jpg?table=block&id=365f41ac-1522-47eb-8d37-3ef8f42e2009&spaceId=e73aa0c5-43fd-4176-9fe9-2cc1215510fb&width=2000&userId=&cache=v2g"
                  alt="opt image"
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    Escorts Tractor Survey | Tractor Owner की जानकारी लाएँ और
                    पैसे कमाएं।
                  </Typography>
                  <p style={{ fontSize: "15px", color: "gray" }}>
                    {" "}
                    <strong>Created at -</strong> August 11, 2021 5:39 PM
                  </p>
                  <p style={{ fontSize: "15px", color: "gray" }}>
                    <strong>Location -</strong> यह काम मध्य प्रदेश, उत्तर प्रदेश
                    एवं महाराष्ट्र की कुछ डिस्ट्रिक्ट मे किया जाना है।
                  </p>
                  <p style={{ fontSize: "15px", color: "gray" }}><strong>Likes -</strong> 10 </p>
                </CardContent>
                <CardActions sx={{ marginTop: -3 }}>
                  <Button size="small">Edit</Button>
                  <Button size="small">Preview</Button>
                </CardActions>
              </Card>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4} mt={0} ml={0}>
            <MDBox mb={0}>
              <Card sx={{ maxWidth: 320 }}>
                <CardMedia
                  component="img"
                  image="https://anaxeeprojects.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F9ce4191a-f76c-4d72-9865-65d84f8e94fb%2Fewew-01.jpg?table=block&id=365f41ac-1522-47eb-8d37-3ef8f42e2009&spaceId=e73aa0c5-43fd-4176-9fe9-2cc1215510fb&width=2000&userId=&cache=v2g"
                  alt="opt image"
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    Escorts Tractor Survey | Tractor Owner की जानकारी लाएँ और
                    पैसे कमाएं।
                  </Typography>
                  <p style={{ fontSize: "15px", color: "gray" }}>
                    {" "}
                    <strong>Created at -</strong> August 11, 2021 5:39 PM
                  </p>
                  <p style={{ fontSize: "15px", color: "gray" }}>
                    <strong>Location -</strong> यह काम मध्य प्रदेश, उत्तर प्रदेश
                    एवं महाराष्ट्र की कुछ डिस्ट्रिक्ट मे किया जाना है।
                  </p>
                  <p style={{ fontSize: "15px", color: "gray" }}><strong>Likes -</strong> 10 </p>
                </CardContent>
                <CardActions sx={{ marginTop: -3 }}>
                  <Button size="small">Edit</Button>
                  <Button size="small">Preview</Button>
                </CardActions>
              </Card>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4} mt={0} ml={0}>
            <MDBox mb={0}>
              <Card sx={{ maxWidth: 320 }}>
                <CardMedia
                  component="img"
                  image="https://anaxeeprojects.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F9ce4191a-f76c-4d72-9865-65d84f8e94fb%2Fewew-01.jpg?table=block&id=365f41ac-1522-47eb-8d37-3ef8f42e2009&spaceId=e73aa0c5-43fd-4176-9fe9-2cc1215510fb&width=2000&userId=&cache=v2g"
                  alt="opt image"
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    Escorts Tractor Survey | Tractor Owner की जानकारी लाएँ और
                    पैसे कमाएं।
                  </Typography>
                  <p style={{ fontSize: "15px", color: "gray" }}>
                    {" "}
                    <strong>Created at -</strong> August 11, 2021 5:39 PM
                  </p>
                  <p style={{ fontSize: "15px", color: "gray" }}>
                    <strong>Location -</strong> यह काम मध्य प्रदेश, उत्तर प्रदेश
                    एवं महाराष्ट्र की कुछ डिस्ट्रिक्ट मे किया जाना है।
                  </p>
                  <p style={{ fontSize: "15px", color: "gray" }}><strong>Likes -</strong> 10 </p>
                </CardContent>
                <CardActions sx={{ marginTop: -3 }}>
                  <Button size="small">Edit</Button>
                  <Button size="small">Preview</Button>
                </CardActions>
              </Card>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4} mt={0} ml={0}>
            <MDBox mb={0}>
              <Card sx={{ maxWidth: 320 }}>
                <CardMedia
                  component="img"
                  image="https://anaxeeprojects.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F9ce4191a-f76c-4d72-9865-65d84f8e94fb%2Fewew-01.jpg?table=block&id=365f41ac-1522-47eb-8d37-3ef8f42e2009&spaceId=e73aa0c5-43fd-4176-9fe9-2cc1215510fb&width=2000&userId=&cache=v2g"
                  alt="opt image"
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    Escorts Tractor Survey | Tractor Owner की जानकारी लाएँ और
                    पैसे कमाएं।
                  </Typography>
                  <p style={{ fontSize: "15px", color: "gray" }}>
                    {" "}
                    <strong>Created at -</strong> August 11, 2021 5:39 PM
                  </p>
                  <p style={{ fontSize: "15px", color: "gray" }}>
                    <strong>Location -</strong> यह काम मध्य प्रदेश, उत्तर प्रदेश
                    एवं महाराष्ट्र की कुछ डिस्ट्रिक्ट मे किया जाना है।
                  </p>
                  <p style={{ fontSize: "15px", color: "gray" }}><strong>Likes -</strong> 10 </p>
                </CardContent>
                <CardActions sx={{ marginTop: -3 }}>
                  <Button size="small">Edit</Button>
                  <Button size="small">Preview</Button>
                </CardActions>
              </Card>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4} mt={0} ml={0}>
            <MDBox mb={0}>
              <Card sx={{ maxWidth: 320 }}>
                <CardMedia
                  component="img"
                  image="https://anaxeeprojects.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F9ce4191a-f76c-4d72-9865-65d84f8e94fb%2Fewew-01.jpg?table=block&id=365f41ac-1522-47eb-8d37-3ef8f42e2009&spaceId=e73aa0c5-43fd-4176-9fe9-2cc1215510fb&width=2000&userId=&cache=v2g"
                  alt="opt image"
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    Escorts Tractor Survey | Tractor Owner की जानकारी लाएँ और
                    पैसे कमाएं।
                  </Typography>
                  <p style={{ fontSize: "15px", color: "gray" }}>
                    {" "}
                    <strong>Created at -</strong> August 11, 2021 5:39 PM
                  </p>
                  <p style={{ fontSize: "15px", color: "gray" }}>
                    <strong>Location -</strong> यह काम मध्य प्रदेश, उत्तर प्रदेश
                    एवं महाराष्ट्र की कुछ डिस्ट्रिक्ट मे किया जाना है।
                  </p>
                  <p style={{ fontSize: "15px", color: "gray" }}><strong>Likes -</strong> 10 </p>
                </CardContent>
                <CardActions sx={{ marginTop: -3 }}>
                  <Button size="small">Edit</Button>
                  <Button size="small">Preview</Button>
                </CardActions>
              </Card>
            </MDBox>
          </Grid>
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
        <Form/>
        </div>
          </Box>
        </Fade>
      </Modal>
    </DashboardLayout>
  );
}
export default Opportunities;
