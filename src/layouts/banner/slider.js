import React, { useEffect, useState } from "react";
import useAdmin from "../../hooks/useAdmin";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import {
  CardActions,
  Modal,
  Fade,
  Button,
  Typography,
} from "@material-ui/core";

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
function Imageslider() {
  const { GetSliderImage, ChangeImageStatus, DeleteImage } = useAdmin();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const handleStatus = (event, id) => {
    if (event.target.value === "delete") {
      // setOpenening(true);
      setDeleteId(id);
      setOpenModal(true);
    } else {
      const update = images.map((image) => {
        if (image.id === id) {
          image.load = true;
        }
        return image;
      });
      setImages(update);
      var changeimagestatus = ChangeImageStatus(id, event.target.value);
      setTimeout(() => {
        changeimagestatus
          .then((response) => {
            // console.log(response)
            getSliderImage();
          })
          .catch((e) => {
            console.log(e);
          });
      }, 800);
    }
  };

  const getSliderImage = () => {
    GetSliderImage()
      .then((response) => {
        setImages(response.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getSliderImage();
  }, []);

  const handleClosees = () => {
    var deleteImage = DeleteImage(deleteId);
    deleteImage
      .then((res) => {
        if (res.status == 200) {
          console.log("deleted");
          getSliderImage();
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
    <div>
      <div
        style={{
          float: "left",
          marginLeft: "-2px",
          margin: "7px 0px 10px",
          width: "222px",
          height: "auto",
          paddingBottom: "10px",
        }}
      >
        <h4>Slider Images</h4>
      </div>
      <MDBox pt={1} mx={1}>
        <Grid container sx={{ overflowX: "scroll" }}>
          {images.length !== 0 ? (
            images.map((image, key) => (
              <Grid key={key} item xs={12} md={3} lg={3} mt={0}>
                <MDBox mb={0}>
                  <Card
                    sx={{
                      position: "relative",
                      maxWidth: 320,
                      height: "auto",
                    }}
                  >
                    <CardMedia
                      sx={{ maxHeight: 150, minHeight: 150 }}
                      component="img"
                      image={
                        image.image ||
                        "https://storage.googleapis.com/android-mapping-backend.appspot.com/1681362242026.blob"
                      }
                      alt=""
                    />

                    <CardActions sx={{ marginTop: -3 }}>
                      {image.load ? (
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
                          value={image.is_active}
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
                          onChange={(event) => handleStatus(event, image.id)}
                        >
                          <option value={1}>Show</option>
                          <option value={0}>Draft</option>

                          <option value={"delete"}>Delete</option>
                        </select>
                      )}
                    </CardActions>
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
                <span>No results found!!!</span>
              )}
            </div>
          )}
        </Grid>
      </MDBox>

      <div style={{ maxHeight: "170px", maxWidth: "320px" }}>
        <Modal open={openModal}>
          <Fade in={openModal}>
            <Box
              sx={styleCustom}
              {...{ minHeight: "170px", maxHeight: "170px", maxWidth: "320px" }}
            >
              <Typography gutterBottom variant="h6" component="div">
                Are you sure you want to delete ?
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
      </div>
    </div>
  );
}

export default Imageslider;
