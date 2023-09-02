import React, { useEffect, useState } from "react";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import useForms from "../../hooks/useForms";

const RoleFroms = ({ projectIDForRoles, handleClose3 }) => {
  const { AddRoles, ShowAllRoles, DeleteUserRole, EnableDisableUserRoles } =
    useForms();
  const [newRole, setNewRole] = useState("");
  const [input, setInput] = useState([]);
  const [showNoUserRolesFound, setShowNoUserRolesFound] = useState(false);

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
    var getAll = ShowAllRoles(projectIDForRoles);
    getAll
      .then((response) => {
        console.log("response", response);
        setInput(response.data.data);
        if (response.data.data.length === 0) {
          setShowNoUserRolesFound(true);
          setTimeout(() => {
            setShowNoUserRolesFound(false);
          }, 2000); // Hide message after 2 seconds
        }
      })
      .catch((e) => {
        console.log(e);
      });
    // var opportunitysequencelist = OpportunitySequenceList();
    // opportunitysequencelist.then((response) => {
    //   // console.log(response)
    //   setSequenceList(response.data.data);
    // })
    // .catch((e) => {
    //   console.log(e);
    // });
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
        console.log("disabel", res);
        getAllRolesByProjectID();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let data = {
      role_name: newRole,
      project_id: projectIDForRoles,
    };
    var addRoles = AddRoles(data);
    addRoles
      .then((res) => {
        getAllRolesByProjectID();
        setNewRole("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // ... (previous code)

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
        {showNoUserRolesFound && <p>No user roles found</p>}
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
