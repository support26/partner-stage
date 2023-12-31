import React, { useState, useEffect } from "react";
import UserRepository from "api/UsersRepository";
import Compressor from "compressorjs";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";

import useAdmin from "../../hooks/useAdmin";

const styles = {
  form: {
    width: "100%",
    // maxWidth: "500px",
    margin: "0 auto",
    padding: "20px",
    border: "1px solid #eee",
    borderRadius: "5px",
    // boxShadow: "none", // add this property to remove the blur effect
    // outline: "none", // add this property to remove the default outline
  },
  input: {
    width: "100%",
    padding: "10px",
    border: "1px solid gray",
    borderRadius: "5px",
    marginBottom: "8px",
    // boxShadow: "none", // add this property to remove the blur effect
    // outline: "none", // add this property to remove the default outline
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
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  // width: 50,
};

const EditForm = ({ opportunity, getAllOpportunity, handleClose }) => {
  const { UpdateOpportunity } = useAdmin();
  const [values, setValues] = useState({
    icon: "",
    title: "",
    title_image: "",
    video_link: "",
    apply_link: "",
    location: "",
    description: "",
    odk_project_id: "",
    course_id: "",
  });
  const [projectDetails, setProjectDetails] = useState({
    title: "",
    description: "",
    image: "",
  });

  const [extraDetails, setExtraDetails] = useState([
    {
      title: "",
      description: "",
      image: "",
    },
  ]);
  const [tags, setTags] = useState("");
  const [image, setImage] = useState("");
  const [openImage, setopenImage] = useState(false);
  const handleImageClose = () => setopenImage(false);
  const handleImageOpen = (image) => {
    setImage(image);
    setopenImage(true);
  };
  useEffect(() => {
    // console.log(opportunity);
    setTags(opportunity.tags);
    setProjectDetails(opportunity.project_details);
    setExtraDetails(opportunity.extra_details);
    setValues(opportunity);
  }, []);
  const inputs = [
    // {
    //   id: 1,
    //   name: "icon",
    //   type: "text",
    //   placeholder: "Enter icon url...",
    //   errorMessage: "Url is not valid",
    //   label: "Icon Url",
    //   //   pattern: "^(https?://)?(((www\\.)?([-a-z0-9]{1,63}\\.)*?[a-z0-9][-a-z‌​0-9]{0,61}[a-z0-9]\\‌​.[a‌​-z]{2,6})|((\\d‌​{1,3}\\.){3}\\d{1,3}‌​))(:\\d{2,4})?((/|\\‌​?)[-\\w@\\+\\.~#\\?&‌​/=%]*)?$",
    //   required: false,
    // },
    {
      id: 1,
      name: "title",
      type: "text",
      placeholder: "Enter title of the project",
      errorMessage: "It should be not more than 50 words",
      // pattern: "^(?:\b\w+\b[\s\r\n]*){1,50}$",
      label: "Title",
      required: false,
    },
    {
      id: 2,
      name: "location",
      type: "text",
      placeholder: "Enter Location",
      errorMessage: "It should be not more than 50 words",
      label: "Location",
      // pattern: "^(?:\b\w+\b[\s\r\n]*){1,50}$",
      required: false,
    },
    {
      id: 3,
      name: "video_link",
      type: "text",
      placeholder: "Enter video url",
      errorMessage: "Url is not valid",
      label: "Video Link",
      // pattern: "/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g",
      required: false,
    },
    {
      id: 4,
      name: "apply_link",
      type: "text",
      placeholder: "Enter Apply Link",
      errorMessage: "Url is not valid",
      label: "Apply Link",
      //   pattern: "^(https?://)?(((www\\.)?([-a-z0-9]{1,63}\\.)*?[a-z0-9][-a-z‌​0-9]{0,61}[a-z0-9]\\‌​.[a‌​-z]{2,6})|((\\d‌​{1,3}\\.){3}\\d{1,3}‌​))(:\\d{2,4})?((/|\\‌​?)[-\\w@\\+\\.~#\\?&‌​/=%]*)?$",
      required: false,
    },
    {
      id: 5,
      name: "odk_project_id",
      type: "text",
      placeholder: "Enter Odk Project Id",
      errorMessage: "Project Id not defined",
      label: "Form Project Id",
      //   pattern: "^(https?://)?(((www\\.)?([-a-z0-9]{1,63}\\.)*?[a-z0-9][-a-z‌​0-9]{0,61}[a-z0-9]\\‌​.[a‌​-z]{2,6})|((\\d‌​{1,3}\\.){3}\\d{1,3}‌​))(:\\d{2,4})?((/|\\‌​?)[-\\w@\\+\\.~#\\?&‌​/=%]*)?$",
      required: false,
    },
    {
      id: 6,
      name: "course_id",
      type: "text",
      placeholder: "Enter Spayee Course Id",
      errorMessage: "It should be not more than 50 words",
      label: "Course Id",
      // pattern: "^(?:\b\w+\b[\s\r\n]*){1,50}$",
      required: false,
    },
  ];
  let file;
  let form_data = new FormData();
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const onChange1 = (e) => {
    setProjectDetails({ ...projectDetails, [e.target.name]: e.target.value });
  };
  const onChangeImage = (e) => {
    file = e.target.files[0];
    new Compressor(file, {
      quality: 0.8,
      success(result) {
        file = result;
        form_data.append("file", file);
        UserRepository.UploadImageFile(form_data)
          .then((response) => {
            // console.log(response.data);
            setValues({
              ...values,
              [e.target.name]: response.data.data.fileUrl,
            });
          })
          .catch((e) => {
            console.log(e);
          });
      },
      error(err) {
        console.log(err.message);
      },
    });
  };

  const onChangeImage1 = (e) => {
    file = e.target.files[0];
    new Compressor(file, {
      quality: 0.8,
      success(result) {
        file = result;
        form_data.append("file", file);
        UserRepository.UploadImageFile(form_data)
          .then((response) => {
            // console.log(response.data);
            setProjectDetails({
              ...projectDetails,
              [e.target.name]: response.data.data.fileUrl,
            });
          })
          .catch((e) => {
            console.log(e);
          });
      },
      error(err) {
        console.log(err.message);
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(projectDetails);
    // console.log(extraDetails);
    // console.log(tags);
    const data = {
      icon: values.icon,
      title: values.title,
      title_image: values.title_image,
      video_link: values.video_link,
      apply_link: values.apply_link,
      odk_project_id: values.odk_project_id,
      course_id: values.course_id,
      description: values.description,
      tags: {
        location: values.location,
        created: tags.created,
      },
      projectDetails: projectDetails,
      extraDetails: extraDetails,
    };
    // console.log(data);
    var updateOpportunity = UpdateOpportunity(data, values.id);
    updateOpportunity
      .then((response) => {
        // console.log(response);
        if (response.status === 200) {
          getAllOpportunity();
          handleClose();
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <>
      <div className="xyz">
        <form onSubmit={handleSubmit}>
          {/* <h4 style={{ textAlign: "center" }}>Edit Opportunity</h4> */}
          <label style={{ fontSize: "14px" }}>Project Icon</label>
          <div style={{ lineHeight: "1.3" }}>
            <Box
              component="img"
              sx={{
                height: 100,
                width: 200,
                ml: 3.5,
                mt: 2.5,
                borderRadius: "10px",
                boxShadow: 1,
              }}
              onClick={() => handleImageOpen(values.icon)}
              alt="No image.."
              src={values.icon}
              display="flex"
              // / src={URL.createObjectURL(profileImage)}
            />
            <IconButton
              style={{
                marginTop: "-165px",
                marginLeft: "228px",
                fontSize: "20px",
                color: "white",
                backgroundColor: "#33A2B5",
              }}
              // color="primary"
              aria-label="upload picture"
              component="label"
            >
              <input
                hidden
                name="icon"
                accept="image/*"
                type="file"
                onChange={onChangeImage}
              />
              <FileUploadIcon />
            </IconButton>
            <IconButton
              style={{
                marginTop: "-140px",
                marginLeft: "228px",
                fontSize: "20px",
                color: "white",
                backgroundColor: "#33A2B5",
              }}
              color="primary"
              aria-label="upload picture"
              component="label"
              onClick={() => {
                setValues({ ...values, icon: "" });
              }}
            >
              <DeleteIcon />
            </IconButton>
          </div>
          {inputs.map((input) => (
            <div key={input.id}>
              <label style={{ fontSize: "14px" }}>{input.label}</label>
              <input
                type={input.type}
                name={input.name}
                value={values[input.name] !== null ? values[input.name] : ""}
                onChange={onChange}
                placeholder={input.placeholder}
                style={{
                  ...styles.input,
                }}
                pattern={input?.pattern}
                required={input.required}
                // disabled={
                //   input.name === "odk_project_id" && values.odk_project_id !== null && values.odk_project_id.length > 3
                // }
              />
            </div>
          ))}

          <label style={{ fontSize: "14px" }}>Title Image</label>
          <div>
            <Box
              component="img"
              sx={{
                height: 100,
                width: 200,
                ml: 3.5,
                mt: 2.5,
                borderRadius: "10px",
                boxShadow: 1,
              }}
              onClick={() => handleImageOpen(values.title_image)}
              alt="No image.."
              src={values.title_image}
              display="flex"
              // / src={URL.createObjectURL(profileImage)}
            />
            <IconButton
              style={{
                marginTop: "-123px",
                marginLeft: "228px",
                fontSize: "20px",
                color: "white",
                backgroundColor: "#33A2B5",
              }}
              // color="primary"
              aria-label="upload picture"
              component="label"
            >
              <input
                hidden
                name="title_image"
                accept="image/*"
                type="file"
                onChange={onChangeImage}
              />
              <FileUploadIcon />
            </IconButton>
          </div>
          <label style={{ fontSize: "14px" }}>Share Description</label>
          <textarea
            name="description"
            value={values.description !== null ? values.description : ""}
            onChange={onChange}
            placeholder="Enter description"
            style={styles.input}
            rows="6"
            cols="24"
          />
          <hr />

          <h5 style={{ textAlign: "center", margin: "5px" }}>
            Project Details
          </h5>
          <div>
            <label style={{ fontSize: "14px" }}>Project Title</label>
            <input
              type="text"
              id="title"
              name="title"
              style={styles.input}
              placeholder="Enter project title..."
              value={projectDetails.title}
              onChange={onChange1}
            />
            <label style={{ fontSize: "14px" }}>Project Description</label>
            <textarea
              name="description"
              value={projectDetails.description}
              onChange={onChange1}
              placeholder="Enter project description"
              style={styles.input}
              rows="10"
              cols="24"
            />
            <label style={{ fontSize: "14px" }}>Project Image</label>
            <div>
              <Box
                component="img"
                sx={{
                  height: 100,
                  width: 200,
                  ml: 3.5,
                  mt: 2.5,
                  borderRadius: "10px",
                  boxShadow: 1,
                }}
                onClick={() => handleImageOpen(projectDetails.image)}
                alt="No image.."
                src={projectDetails.image}
                display="flex"
                // / src={URL.createObjectURL(profileImage)}
              />
              <IconButton
                style={{
                  marginTop: "-165px",
                  marginLeft: "228px",
                  fontSize: "20px",
                  color: "white",
                  backgroundColor: "#33A2B5",
                }}
                color="primary"
                aria-label="upload picture"
                component="label"
              >
                <input
                  hidden
                  name="image"
                  accept="image/*"
                  type="file"
                  onChange={onChangeImage1}
                />
                <FileUploadIcon />
              </IconButton>
              <IconButton
                style={{
                  marginTop: "-140px",
                  marginLeft: "228px",
                  fontSize: "20px",
                  color: "white",
                  backgroundColor: "#33A2B5",
                }}
                color="primary"
                aria-label="upload picture"
                component="label"
                onClick={() => {
                  setProjectDetails({
                    ...projectDetails,
                    ["image"]: "",
                  });
                }}
              >
                <DeleteIcon />
              </IconButton>
            </div>
          </div>
          <hr />
          <h5 style={{ textAlign: "center", margin: "5px" }}>Extra Details</h5>
          <div>
            {extraDetails.map((detail, index) => (
              <div key={index}>
                <label style={{ fontSize: "14px" }}>Title</label>
                <input
                  type="text"
                  name="title"
                  value={detail.title}
                  onChange={(e) => {
                    const values = [...extraDetails];
                    values[index].title = e.target.value;
                    setExtraDetails(values);
                  }}
                  placeholder="Enter title"
                  style={styles.input}
                />
                <label style={{ fontSize: "14px" }}>Description</label>
                <textarea
                  name="description"
                  value={detail.description}
                  onChange={(e) => {
                    const values = [...extraDetails];
                    values[index].description = e.target.value;
                    setExtraDetails(values);
                  }}
                  placeholder="Enter description"
                  style={styles.input}
                  rows="10"
                  cols="24"
                />
                <label style={{ fontSize: "14px" }}>Image</label>
                {/* <input
                type="file"
                name="image"
                // value={detail.image}
                onChange={(e) => {
                  file = e.target.files[0];
                  new Compressor(file, {
                    quality: 0.8,
                    success(result) {
                      file = result;
                      form_data.append("file", file);
                      UserRepository.UploadImageFile(form_data)
                        .then((response) => {
                          console.log(response.data);
                          const values = [...extraDetails];
                          values[index].image = response.data.data.fileUrl;
                          setExtraDetails(values);
                        })
                        .catch((e) => {
                          console.log(e);
                        });
                    }
                  });
                }}
                placeholder="Upload Image"
                style={styles.input}
                accept='image/*'
              /> */}
                <div>
                  <Box
                    component="img"
                    sx={{
                      height: 100,
                      width: 200,
                      ml: 3.5,
                      mt: 2.5,
                      borderRadius: "10px",
                      boxShadow: 1,
                    }}
                    onClick={() => handleImageOpen(detail.image)}
                    alt="No image"
                    src={detail.image}
                    display="flex"
                    // / src={URL.createObjectURL(profileImage)}
                  />
                  <IconButton
                    style={{
                      marginTop: "-165px",
                      marginLeft: "228px",
                      fontSize: "20px",
                      color: "white",
                      backgroundColor: "#33A2B5",
                    }}
                    color="primary"
                    aria-label="upload picture"
                    component="label"
                  >
                    <input
                      hidden
                      name="image"
                      accept="image/*"
                      type="file"
                      onChange={(e) => {
                        file = e.target.files[0];
                        new Compressor(file, {
                          quality: 0.8,
                          success(result) {
                            file = result;
                            form_data.append("file", file);
                            UserRepository.UploadImageFile(form_data)
                              .then((response) => {
                                console.log(response.data);
                                const values = [...extraDetails];
                                values[index].image =
                                  response.data.data.fileUrl;
                                setExtraDetails(values);
                              })
                              .catch((e) => {
                                console.log(e);
                              });
                          },
                        });
                      }}
                    />
                    <FileUploadIcon />
                  </IconButton>
                  <IconButton
                    style={{
                      marginTop: "-140px",
                      marginLeft: "228px",
                      fontSize: "20px",
                      color: "white",
                      backgroundColor: "#33A2B5",
                    }}
                    color="primary"
                    aria-label="upload picture"
                    component="label"
                    onClick={() => {
                      const values = [...extraDetails];
                      values[index].image = "";
                      setExtraDetails(values);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </div>
                <button
                  type="button"
                  style={styles.addButton}
                  onClick={() => {
                    const values = [...extraDetails];
                    values.splice(index, 1);
                    setExtraDetails(values);
                  }}
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              style={styles.addButton}
              type="button"
              onClick={() => {
                setExtraDetails([
                  ...extraDetails,
                  { title: "", description: "", image: "" },
                ]);
              }}
            >
              Add more
            </button>
          </div>

          <button type="submit" style={styles.button}>
            Submit
          </button>
        </form>
      </div>

      <Modal
        open={openImage}
        onClose={handleImageClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <img src={image} width="600px" height="auto" />
        </Box>
      </Modal>
    </>
  );
};

export default EditForm;
