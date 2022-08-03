import { useState } from "react";
import Card from "@mui/material/Card";

import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";

import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import "./oportunity.css";
import TextField from "@mui/material/TextField";
import MDInput from "components/MDInput";

const State = () => {
  const [item, setItem] = useState("");
  const [body, setBody] = useState("");
  const [newItem, setNewItem] = useState([]);

  const firstEvent = (event) => {
    setItem(event.target.value);
  };
  const bodyEvent = (event) => {
    setBody(event.target.value);
  };
  const secondEvent = () => {
    setNewItem((prev) => {
      return [...prev, item];
    });

    setItem("");
    setBody("");
  };

  const thirdEvent = () => {
    setNewItem([]);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <MDBox mt={1} mb={1}>
        <div style={{ float: "left" }}>
          <Card sx={{ minWidth: 105, p: 2 }}>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Anouncement
            </Typography>
            <TextField
              type="text"
              label="Title..."
              sx={{ my: 2 }}
              required
              value={item}
              placeholder="Add a task"
              onChange={firstEvent}
            />
            <MDInput
              label="Type here..."
              multiline
              rows={3}
              style={{ minWidth: "auto", maxWidth: "400px" }}
              value={body}
              onChange={bodyEvent}
              required
            />
            <Button className="AddBtn" onClick={secondEvent}>
              <AddIcon />
            </Button>
          </Card>
        </div>
        <Grid container spacing={0} justifyContent="center" xs ={12}>
          <Grid item xs={3}>
          
            {newItem.map((val) => {
              // return <TextField value={val} />;
           return   <Card sx={{ p: 2 ,my:2 }} xs={4} >
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Anouncement
              </Typography>
              <TextField
                type="text"
                label="Title..."
                sx={{ my: 2 }}
                required
                value={val}
                placeholder="Add a task"
               
              />
              <MDInput
                label="Type here..."
                multiline
                rows={3}
                style={{ minWidth: "auto", maxWidth: "400px" }}
                value={body}
                onChange={bodyEvent}
                required
              />
            
            </Card>
            })}


            <Button className="delBtn" onClick={thirdEvent}>
              <DeleteIcon />
              Delete All
            </Button>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
};

export default State;
