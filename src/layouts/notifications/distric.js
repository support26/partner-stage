import { useState } from "react";
import TextField from "@mui/material/TextField";
import UserRepository from "api/UsersRepository";

import Dialog from "@mui/material/Dialog";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
// @mui material components
import Card from "@mui/material/Card";
import NativeSelect from "@mui/material/NativeSelect";
import LoadingButton from "@mui/lab/LoadingButton";

//  React components
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
//  React example components
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useEffect } from "react";
import useAdmin from "../../hooks/useAdmin";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import "./style.css";
import InputBase from "@mui/material/InputBase";
import { styled } from "@mui/material/styles";
// mui custom style

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
  },
}));
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 20;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 5.5 + ITEM_PADDING_TOP,
      width: 250,
      padding: 10,
    },
  },
};


// mui custom style

function Distric() {
  const [state, setState] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [sId, setsId] = useState(null);
  const [image, setImage] = useState(null);
  const [body, setBody] = useState("");
  const [title, setTitle] = useState("");
  const [district, setDistrict] = useState([]);
  const [error, setError] = useState(null);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [sendBtn, setSendBtn] = useState("send");
  const [loading, setLoading] = useState(false);
  const { SendNotificationByDistrict, GetStateList, GetDistrictList } =
    useAdmin();

  const GetStateListForNotification = () => {
    var stateList = GetStateList();
    stateList
      .then((res) => {
        setState(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getDistrict = (e) => {
    const demo = e.target.value;
    // console.log(demo);
    const districtList = GetDistrictList(demo);
    districtList
      .then((res) => {
        setDistricts(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    GetStateListForNotification();
  }, []);

  let file;
  let form_data = new FormData();
  const handelDistricImages = (event) => {
    setBtnDisabled(true);
    file = event.target.files[0];
    form_data.append("file", file);
    UserRepository.UploadImageFile(form_data)
      .then((response) => {
        // console.log(response.data);
        setImage(response.data.data.fileUrl);
        setBtnDisabled(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const sendNotification = (event) => {
    event.preventDefault();

    if (district.length === 0 || district === "") {
      setError("Please select district");
    } else if (!title || !body) {
      setError("Please fill all the fields");
    } else {
      setSendBtn(null);
      setLoading(true);
      // console.log("#####", district);
      const admin_email = localStorage.getItem("user_email");
      const notification = {
        title: title,
        body: body,
        image: image,
      };
      // console.log("@@@@@@", notification);
      setSendBtn(null);
      setLoading(true);
      var sendNotificationByDistrict = SendNotificationByDistrict(
        notification,
        admin_email,
        district
      );
      sendNotificationByDistrict
        .then((res) => {
          // console.log("%%%%%%%%%", res);
          setLoading(false);
          setSendBtn("sent succesfully");
          setTimeout(() => {
            setSendBtn("send");
          }, 2000);
        })
        .catch((err) => {
          console.log("err", err);
        });
    }
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setDistrict(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    // console.log(district)
  };

  return (
    <Card sx={{ px: 5, py: 1, pb: 4, width: "100%" }}>
      <MDTypography align="center" variant="h3" sx={{ pb: "20px" }}>
        District Notification
      </MDTypography>
      <FormControl sx={{ mb: 3 }} variant="standard">
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
          State
        </InputLabel>
        <br />
        <NativeSelect
          value={sId}
          onChange={getDistrict}
          input={<BootstrapInput />}
          MenuProps={MenuProps}
          renderValue={(selected) => selected.join(",")}
          style={{
            width: "100%",
            height:'5px'
          }}
        >
          <option >Select State</option>
          {/* <MenuItem value="" disabled>
            <em>select the value</em>
          </MenuItem> */}
          {state.map(({ name, sid }) => {
            return (
              <option key={name} value={sid} style={{ color: "black" }}>
                {name}
              </option>
            );
          })}
        </NativeSelect>
      </FormControl>
      <FormControl sx={{ mb: 3 }} variant="standard">
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
          District
        </InputLabel>
        <br />
        <Select
          value={district}
          id="demo-customized-select-native"
          onChange={handleChange}
          input={<BootstrapInput />}
          MenuProps={MenuProps}
          renderValue={(selected) => selected.join(", ")}
          style={{
            width: "100%",
          }}
          multiple
        >
          <em>Select District</em>
          <MenuItem className="font-edit" value={null} style={{ color: "black" }}>
            <Checkbox checked={district.indexOf(null) > -1} />
            <p>{"NONE"}</p>
          </MenuItem>
          {districts.map(({ name }) => {
            return (
              <MenuItem className="font-edit" key={name} value={name} style={{ color: "black" }}>
                <Checkbox checked={district.indexOf(name) > -1} />
                <p>{name} </p>
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <TextField
        type="text"
        label="Title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <br />
      <MDInput
        label="Type here your message..."
        multiline
        rows={5}
        style={{ minWidth: "auto", maxWidth: "400px", marginBottom: "10px" }}
        value={body}
        onChange={(e) => setBody(e.target.value)}
        required
      />{" "}
      {error && (
        <small style={{ color: "red", fontSize: "15px" }}>{error}</small>
      )}
      <TextField
        helperText="jpeg / jpg / png"
        type="file"
        inputProps={{ accept: ".png, .jpeg, .jpg" }}
        onChange={handelDistricImages}
      />{" "}
      <br />
      <LoadingButton
        style={
          btnDisabled == true
            ? { background: "#a7c5c9", color: "white" }
            : { background: "#33A2B5", color: "white" }
        }
        size="small"
        onClick={sendNotification}
        loading={loading}
        loadingPosition="center"
        variant="contained"
        disabled={btnDisabled}
      >
        {sendBtn}
      </LoadingButton>
    </Card>
  );
}

export default Distric;
