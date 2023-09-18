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

const RoleFroms = ({ projectIDForRoles }) => {
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
      flex: "1",
      padding: "10px",
      border: "1px solid gray",
      borderRadius: "5px",
      marginRight: "8px",
      lineHeight: "normal",
    },
    button: {
      padding: "10px 9px ",
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

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
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
    var addRoles = EnableDisableUserRoles(updatedata);
    addRoles
      .then((res) => {
        getAllRolesByProjectID();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  setTimeout(() => {
    setAlertOpen(false);
  }, 6000);

  const handleSubmit = (e) => {
    e.preventDefault();
    setOverlayVisible(true);
    const capitalizedRoleName = capitalizeFirstLetter(newRole);

    let data = {
      role_name: capitalizedRoleName,
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
      <div className="xyz">
        <label
          style={{ fontSize: "14px", marginRight: "8px", fontWeight: "bold" }}
        >
          Users Role :
        </label>
        <div style={{ display: "flex", alignItems: "center" }}>
          <input
            type="text"
            id="title"
            name="title"
            value={newRole}
            style={styles.input}
            placeholder="Enter Role"
            onChange={onChange}
            onKeyDown={handleKeyPress}
          />
          <button
            style={{
              flex: "1",
              padding: "10px",
              border: "1px solid gray",
              backgroundColor: "#33a2b5",
              color: "#fff",
              borderRadius: "5px",
              cursor: "pointer",
              lineHeight: "normal",
            }}
            onClick={handleSubmit}
            type="button"
          >
            Add
          </button>
        </div>
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
        <div style={{ alignItems: "center", marginBlock: "10px" }}>
          {Array.isArray(input) && input.length > 0 && (
            <div
              style={{
                border: "1px solid #eee",
                borderRadius: "5px",
                padding: "10px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
              }}
            >
              {input.map((role) => (
                <div
                  key={role.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "5px",
                  }}
                >
                  <label
                    key={role.id}
                    style={{
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "1px",
                    }}
                  >
                    {role.role_name.charAt(0).toUpperCase() +
                      role.role_name.slice(1)}
                  </label>
                  <div>
                    <button
                      style={{ ...styles.addButton, marginRight: "4px" }}
                      onClick={() => handleDeleteButton(role.id)}
                      type="button"
                    >
                      Delete
                    </button>
                    <button
                      style={{
                        ...styles.addButton,
                        backgroundColor:
                          role.is_active === 1 ? "#33a2b5" : "red",
                      }}
                      onClick={() => handleDisableButton(role)}
                      type="button"
                    >
                      {role.is_active === 1 ? "Disable" : "Enable"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default RoleFroms;
