import { useState } from "react";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import MDTypography from "components/MDTypography";

import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";

import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import CardMedia from "@mui/material/CardMedia";
import TextField from "@mui/material/TextField";
import MDInput from "components/MDInput";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

const State = () => {
  const [open, setOpen] = useState(false);
  const [maxWidth, setMaxWidth] = useState("sm");

  const [item, setItem] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState("");
  const [newItem, setNewItem] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const firstEvent = (event) => {
    setItem(event.target.value);
  };
  const descEvent = (event) => {
    setDesc(event.target.value);
  };

  const imageEvent = (event) => {
    setImage(event.target.file);
  };



  const secondEvent = () => {
    setNewItem((prev) => {
      setOpen(false);
      return [...prev, item];
    });

    setItem("");
    setDesc("");
    setImage("");
  };

  const thirdEvent = () => {
    setNewItem([]);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <MDBox mt={1} mb={1} sx={{ float: "left" }}>
        {/* onClick={secondEvent} */}

        <AddCircleRoundedIcon onClick={handleClickOpen} fontSize="large" />
      </MDBox>
      <MDBox mt={1} mb={1} sx={{ float: "left" }}>
        <Grid
          container
          spacing={0}
          justifyContent="center"
          sx={{ float: "left" }}
        >
          <Grid item xs={12} sx={{ display: "flex" }}>
            {newItem.map((title, body, image) => {
              // return <TextField value={val} />;
              return (
                <Grid container spacing={0} justifyContent="center">
                  <Card sx={{ width:'300px' ,height:'300px'}}>
                    <CardMedia
                      component="img"
                      height="140"
                      image={image}
                      alt="green iguana"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {body}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small">Edit</Button>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}

            <Button className="delBtn" onClick={thirdEvent}>
              <DeleteIcon />
              Delete All
            </Button>
          </Grid>
        </Grid>
      </MDBox>
      {/* pop up */}
      <Dialog maxWidth={maxWidth} open={open} onClose={handleClose}>
        <div>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
            style={{ float: "right" }}
          >
            <CloseIcon />
          </IconButton>
        </div>
        <Box
          noValidate
          component="form"
          sx={{
            maxWidth,
          }}
        >
          <Card sx={{ px: 5, py: 0, pb: 2, width: "100%" }}>
            <MDTypography align="center" variant="h3" sx={{ pb: "5px" }}>
              Oportunity
            </MDTypography>
            <TextField
              type="text"
              label="Title..."
              value={item}
              onChange={firstEvent}
              required
            />
            <br />
            <MDInput
              label="Type here..."
              multiline
              rows={5}
              style={{
                minWidth: "auto",
                maxWidth: "400px",
                marginBottom: "10px",
              }}
              value = {desc}
              onChange = {descEvent}
              required
            />
            <TextField helperText="Image " type="file" value={image} onChange = {imageEvent}/> <br />
            <Button
              variant="contained"
              style={{ background: "#33A2B5", color: "white" }}
             onClick={secondEvent}
            >
              Send
            </Button>
          </Card>
        </Box>
      </Dialog>
    </DashboardLayout>
  );
};

export default State;
