import { useEffect, useState } from "react";
import * as React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import MDBox from "components/MDBox";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "40%",
  transform: "translate(-50%, -50%)",
  width: 50,
};

const UploadImages = (props) => {
  const [imgopen, setimgOpen] = React.useState(false);
  const imageshandleOpen = () => setimgOpen(true);
  const imageshandleClose = () => setimgOpen(false);
  const pancard_image = props.ravi.image;

  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  const name = "Ravi";
  const email = "ravi@123";
  const image = selectedFile;
  const changeHandler = (event) => {
    setSelectedFile(URL.createObjectURL(event.target.files[0]));
    //setIsSelected(true);
  };
  console.log(props.id);

  const handleSubmission = () => {
    console.log(selectedFile)

    axios
      .put(`http://localhost:3000/user/${props.id}`, { image, name, email })
      .then((response) => {
        console.log(response);
        // console.log(response.data[0])
      });
    // console.log(setSelectedFile.type)
  };
  // const [runnerphoto, setrunnerphoto] = useState("");

  // const file = URL.createObjectURL(e.target.files[0])

  return (
    <>
      {/*Runner Photos  */}
      <Box
        component="img"
        sx={{
          height: 233,
          width: 350,
          maxHeight: { xs: 230, md: 167 },
          maxWidth: { xs: 350, md: 250 },
          position: "relative",
        }}
        onClick={imageshandleOpen}
        // alt="The house from the offer."
        src={pancard_image}
        style={{ width: "50px", height: "50px", marginLeft: "20px" }}
      />
      <span
        style={{
          color: "rgba(0, 0, 0, 0.6)",
          position: "relative",
          top: "30px",
          fontSize: "18px",
          right: "60px",
        }}
      >
        RunnerPhoto
      </span>

      <Modal
        open={imgopen}
        onClose={imageshandleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <img src={pancard_image} width="500px" height="500px" />
        </Box>
      </Modal>
      <input type="file" name="file" onChange={changeHandler} />
      <button onClick={handleSubmission}>Submit</button>
    </>
  );
};

export default UploadImages;
