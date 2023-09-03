import React, { useEffect, useState } from "react";
import useForms from "../../hooks/useForms";
import {
  Backdrop,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

const RoleFroms = ({ projectIDForRoles, handleClose3 }) => {
  const { AddRoles, ShowAllRoles, DeleteUserRole, EnableDisableUserRoles } =
    useForms();
  const [newRole, setNewRole] = useState("");
  const [input, setInput] = useState([]);
  const [isOverlayVisible, setOverlayVisible] = useState(false);
  const [isAlertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

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

  const onChange = (e) => {
    setNewRole(e.target.value);
  };

  const getAllRolesByProjectID = () => {
    try {
      var getAll = ShowAllRoles(projectIDForRoles);
      getAll
        .then((response) => {
          if (response.status === 400) {
            console.log(response.data.message);
          } else {
            setInput(response.data.data);
          }
        })
        .catch((e) => {
          console.log("error form", e);
        });
    } catch (error) {
      console.log("error form", error);
    }
  };
  useEffect(() => {
    getAllRolesByProjectID();
  }, [projectIDForRoles]);

  const handleDeleteButton = (RoleId) => {
    var addRoles = DeleteUserRole(RoleId);
    addRoles
      .then((res) => {
        getAllRolesByProjectID();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDisableButton = (data) => {
    var updatedata = {
      id: data.id,
      status: data.is_active === 1 ? 0 : 1,
    };
    console.log("updateeeee", updatedata);
    var addRoles = EnableDisableUserRoles(updatedata);
    addRoles
      .then((res) => {
        getAllRolesByProjectID();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setOverlayVisible(true);
    let data = {
      role_name: newRole,
      project_id: projectIDForRoles,
    };
    var addRoles = AddRoles(data);
    addRoles
      .then((res) => {
        setOverlayVisible(false);
        if (res.status === 400) {
          setAlertMessage(res.data.message);
          setAlertOpen(true);
          setNewRole("");
        } else {
          console.log("user added succesful");
          getAllRolesByProjectID();
          setNewRole("");
        }
      })
      .catch((err) => {
        console.log(err);
        setOverlayVisible(false);
      });
  };

  return (
    <>
      <div className="formDiv">
        <label style={{ fontSize: "14px" }}>Users Role</label>
        <input
          type="text"
          id="title"
          name="title"
          value={newRole}
          style={styles.input}
          placeholder="Enter Role"
          onChange={onChange}
        />
        <button style={styles.addButton} onClick={handleSubmit} type="button">
          Add Role
        </button>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isOverlayVisible}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <Dialog open={isAlertOpen} onClose={() => setAlertOpen(false)}>
          <DialogTitle>Alert</DialogTitle>
          <DialogContent>
            <p>{alertMessage}</p>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setAlertOpen(false)} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
        {Array.isArray(input)
          ? input.map((role) => (
              <div key={role.id}>
                <label key={role.id}>
                  {role.role_name}
                  <button
                    style={styles.addButton}
                    onClick={() => handleDeleteButton(role.id)}
                    type="button"
                  >
                    Delete
                  </button>
                  <button
                    style={{
                      ...styles.addButton,
                      backgroundColor: role.is_active === 1 ? "#33a2b5" : "red",
                    }}
                    onClick={() => handleDisableButton(role)}
                    type="button"
                  >
                    {role.is_active === 1 ? "Disable" : "Enable"}
                  </button>
                </label>
              </div>
            ))
          : null}
      </div>
    </>
  );
};

export default RoleFroms;
