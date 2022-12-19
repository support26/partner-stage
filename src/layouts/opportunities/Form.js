import React, {useState} from 'react'
import Compressor from 'compressorjs';
import UserRepository from "api/UsersRepository";
import useAdmin from '../../hooks/useAdmin';
// import FormInput from "./FormInput";
// import './form.css'


// add styles to the form
const styles = {
  form: {
    width: "100%",
    // maxWidth: "500px",
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

const Form = ({getAllOpportunity, handleClose}) => {
  const { AddOpportunity } = useAdmin();
    const [values, setValues] = useState({
        icon: "",
        title: "",
        title_image: "",
        video_link: "",
        apply_link: "",
        location: "",
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
      }
    ]);

      const inputs = [
        {
          id: 1,
          name: "icon",
          type: "text",
          placeholder: "Enter icon url...",
          errorMessage: "Url is not valid",
          label: "Icon Url",
          pattern: "^(https?://)?(((www\\.)?([-a-z0-9]{1,63}\\.)*?[a-z0-9][-a-z‌​0-9]{0,61}[a-z0-9]\\‌​.[a‌​-z]{2,6})|((\\d‌​{1,3}\\.){3}\\d{1,3}‌​))(:\\d{2,4})?((/|\\‌​?)[-\\w@\\+\\.~#\\?&‌​/=%]*)?$",
          required: true,
        },
        {
          id: 2,
          name: "title",
          type: "text",
          placeholder: "Enter title of the project",
          errorMessage: "It should be not more than 50 words",
          // pattern: "^(?:\b\w+\b[\s\r\n]*){1,50}$",
          label: "Title",
          required: true,
        },
        {
          id: 3,
          name: "location",
          type: "text",
          placeholder: "Enter Location",
          errorMessage: "It should be not more than 50 words",
          label: "Location",
          // pattern: "^(?:\b\w+\b[\s\r\n]*){1,50}$",
          required: true,
        },
        {
          id: 4,
          name: "video_link",
          type: "text",
          placeholder: "Enter video url",
          errorMessage: "Url is not valid",
          label: "Video Link",
          // pattern: "/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g",
          required: true,
        },
        {
          id: 5,
          name: "apply_link",
          type: "text",
          placeholder: "Enter Apply Link", 
          errorMessage: "Url is not valid",
          label: "Apply Link",
          pattern: "^(https?://)?(((www\\.)?([-a-z0-9]{1,63}\\.)*?[a-z0-9][-a-z‌​0-9]{0,61}[a-z0-9]\\‌​.[a‌​-z]{2,6})|((\\d‌​{1,3}\\.){3}\\d{1,3}‌​))(:\\d{2,4})?((/|\\‌​?)[-\\w@\\+\\.~#\\?&‌​/=%]*)?$",
          required: true,
        },
      ];

      const handleSubmit = (e) => {
        e.preventDefault();
        var data = {
          icon: values.icon,
          title: values.title,
          title_image: values.title_image,
          video_link: values.video_link,
          apply_link: values.apply_link,
          tags : {
            location: values.location,
            created : new Date(),
          },
          projectDetails: projectDetails,
          extraDetails: extraDetails,
        };
        var addOpportunity =  AddOpportunity(data);
        addOpportunity.then((res) => {
          // console.log(res);
          getAllOpportunity();
          handleClose();
        })
        .catch((err) => {
          console.log(err);
        })
          
        // console.log(values);
        // console.log(projectDetails);
        // console.log(extraDetails);
      };
    
      const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
      };
      const onChange1 = (e) => {
        setProjectDetails({ ...projectDetails, [e.target.name]: e.target.value  })
      }
      let file;
  let form_data = new FormData();
      const onChangeImage = (e) => {
        file = e.target.files[0];
        new Compressor(file, {
          quality: 0.8,
          success(result) {
            file = result;      
    form_data.append("file", file);
    UserRepository.UploadImageFile(form_data)
      .then((response) => {
        console.log(response.data);
        setValues({ ...values, [e.target.name]: response.data.data.fileUrl});
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
                console.log(response.data);
                setProjectDetails({ ...projectDetails, [e.target.name]: response.data.data.fileUrl});
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

  return (
    <div className="xyz">
      <form onSubmit={handleSubmit}>
      <h4 style={{textAlign: 'center' }}>Add New Oppprtunity</h4>
      { inputs.map((input) => (
          <div key={input.id}>
            <label style={{ fontSize: "14px" }} >{input.label}</label>
            <input
              type={input.type} 
              name={input.name}
              value={values[input.name]}
              onChange={onChange}
              placeholder={input.placeholder}
              style={styles.input}
              pattern={input.pattern}
              required={input.required}
            />
          </div>
        ))}

        <label style={{ fontSize: "14px" }}> Title Image</label>
        <input
          type="file"
          name="title_image"
          // value={values.title_image}
          onChange={onChangeImage}
          placeholder="Upload image"
          style={styles.input}
          required
          accept="image/*"
        />
        <hr/>

        <h5 style={{ textAlign: "center", margin: "5px"}} >Project Details</h5>
        <div>
          <label style={{ fontSize: "14px" }}>Project Title</label>
          <input
            required
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
            required
            rows="10"
            cols="24"
          />
          <label style={{ fontSize: "14px" }}>Project Image</label>
          <input
            type="file"
            name="image"
            // value={projectDetails.image}
            onChange={onChangeImage1}
            placeholder="Enter project image url"
            style={styles.input}
            required
            accept='image/*'
          />
        </div>
        <hr/>
        <h5 style={{ textAlign: "center", margin: "5px"}} >Extra Details</h5>
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
              <input
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
              />
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
                  setExtraDetails([...extraDetails, { title: "", description: "", image: "" }]);
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
  )
}

export default Form