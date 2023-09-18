import { useState, useEffect } from "react";
import "./style.css";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Cookies from "js-cookie";
//Hooks
import useAdmin from "../../hooks/useAdmin";
import AdminRepository from "api/AdminRepository";
import { useSelector } from "react-redux";
//material UI
import Icon from "@mui/material/Icon";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import Alert from "@mui/material/Alert";
import EditIcon from '@mui/icons-material/Edit';
import Snackbar from "@mui/material/Snackbar";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
// import Button from "@mui/material/Button";
// import Switch from "@mui/material/Switch";

// mui custom style
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "350px",
  padding: "35px",
  height: "488px",
  borderRadius: "15px",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 3,
};
const style_1 = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "350px",
  padding: "35px",
  height: "488px",
  borderRadius: "15px",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 3,
};
function AddUsers() {
  const {
    AddAdminUser,
    UpdateAdminUser,
    ChangeAdminUserStatus,
    GetAlladminUser,
  } = useAdmin();
  const { successMessage } = useSelector((state) => state.auth);
  const { msg } = useSelector((state) => state.auth);
  const [employee_name, setEmployee_name] = useState("");
  const [users_name, setUsers_name] = useState("");
  const [users_email, setUsers_email] = useState("");
  const [user_type, setUser_type] = useState("0");
  const [user_id, setUser_id] = useState("");
  const [is_active, setIs_active] = useState("");
  const [users, setUsers] = useState([]);
  const [pageSize, setPageSize] = useState(50);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const handleModal = () => {
    setUser_type("0");
    setOpenModal(true);
  };
  const closeModal = () => {
    setOpenModal(false);
    setUsers_name("");
    setUsers_email("");
    setEmployee_name("");
  };
  const [editUserModal, setEditUserModal] = useState(false);
  const closeEditUserModal = () => {
    setEditUserModal(false);
    setUsers_name("");
    setUsers_email("");
    setEmployee_name("");
  };

  const [vertical, setVertical] = useState("top");
  const [horizontal, setHorizontal] = useState("center");
  const [snackType, setSnackType] = useState("");
  const handleOpen = (snack) => {
    setSnackType(snack);
    setOpen(true);
  };
  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const [loading, setLoading] = useState(false);

  const GetUsers = () => {
    setLoading(true);
    var AllAdminUsers = GetAlladminUser();
    AllAdminUsers.then((response) => {
      if (response.status === 200) {
        setLoading(false);
        setUsers(response.data.data);
      }
    }).catch((e) => {
      console.log(e);
    });
    //check is user is active or not
    AdminRepository.checkUserActive()
      .then((res) => {
        if (res.data.data.is_active === "N" ) {
          window.location.href = "/";
          localStorage.clear();
          Cookies.remove("token");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //useEffect to get all users  from the database and set it to the state of users array to be displayed in the table
  useEffect(() => {
      GetUsers();
  }, []);

  const columns = [
    {
      field: "action",
      type: "actions",
      headerName: "Action",
      width: 70,
      renderCell: function (params) {
        const onClick = function (e) {
          e.stopPropagation(); // don't select this row after clicking
          setUser_type(params.row.roleId);
          setUser_id(params.id);
          setUsers_name(params.row.users_name);
          setUsers_email(params.row.users_email);
          // setIs_active(params.row.is_active);
          setEmployee_name(params.row.employee_name);
          setEditUserModal(true);
          return 
          // console.log(thisRow);
        };
        return (
          <GridActionsCellItem
          style={{ color: "#1c68eb" }}
            icon={<EditIcon />}
            label="Edit"
            onClick={onClick}
          />
        );
      },
    },
    { field: "employee_name", headerName: "Employee Name", width: 150 },
    { field: "users_name", headerName: "User Name", width: 140 },
    { field: "users_email", headerName: "Email", width: 200 },
    {
      field: "roleId",
      headerName: "User Type",
      width: 100,
      renderCell: function (params) {
        return params.row.roleId === 0 ? (
          <p style={{ textAlign: "center" }}>Admin</p>
        ) : (
          <p style={{ textAlign: "center" }}>Support</p>
        );
      },
    },
    {
      field: "is_active",
      headerName: "Status",
      width: 100,
      sortable: false,
      renderCell: function (params) {
        const handleActiveStatus = (event) => {
          event.preventDefault();
          const id = params.row.id;
          var ChangeStatus = ChangeAdminUserStatus(id, event.target.value);
          ChangeStatus.then((response) => {
            if (response.status === 200) {
              GetUsers();
            }
          }).catch((e) => {
            console.log(e);
          });          
        };
        return (
         <select
         value={params.row.is_active}
            style={{
              width: "100px",
              height: "30px",
              borderRadius: "5px",
              border: "1px solid #33A2B5",
              outline: "none",
            }}
            onChange={handleActiveStatus}
          >
            <option value="Y">Active</option>
            <option value="N">Inactive</option>
          </select>
        );
      },
    },
  ];
  const data = {
    users_name: users_name,
    users_email: users_email,
    user_type: user_type,
    employee_name: employee_name,
  };

  const addAdminUsers = (event) => {
    event.preventDefault();
    var UserAddedSuccessfully = AddAdminUser(data);
    UserAddedSuccessfully.then((response) => {
      if (response.status === 200) {
        GetUsers();
        closeModal();
        handleOpen();
      }
    }).catch((e) => {
      console.log(e);
    });
    setUsers_name("");
    setUsers_email("");
    setEmployee_name("");
  };

  const data_1 = {
    users_name: users_name,
    users_email: users_email,
    user_type: user_type,
    employee_name: employee_name,
    // is_active: is_active,
  };
  const updateUser = (event) => {
    event.preventDefault();
    var UserUpdatedSuccessfully = UpdateAdminUser(data_1, user_id);
    UserUpdatedSuccessfully.then((response) => {
      if (response.status === 200) {
        GetUsers();
        closeEditUserModal();
        handleOpen();
      }
    }).catch((e) => {
      console.log(e);
    });
    setUsers_name("");
    setUsers_email("");
    setEmployee_name("");
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        key={vertical + horizontal}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        {successMessage !== "" ? (
          <Alert
            severity="success"
            sx={{
              backgroundColor: "rgb(17 200 25 / 60%)",
              color: "#fff",
              fontWeight: "bold",
              width: "100%",
              position: "relative",
              left: "118px",
            }}
          >
            {successMessage}
          </Alert>
        ) : (
          <Alert
            severity="error"
            sx={{
              backgroundColor: "rgb(255 0 0 / 50%)",
              color: "#fff",
              fontWeight: "bold",
              width: "100%",
              position: "relative",
              left: "118px",
            }}
          >
            {msg}
          </Alert>
        )}
      </Snackbar>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openModal}
        // onClose={closeModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModal}>
          <Box sx={style}>
            <Icon
              sx={{
                float: "right",
                color: "black",
                cursor: "pointer",
                marginRight: -1.5,
                marginTop: -2,
                transform: "translateY(-1px)",
              }}
               onClick={closeModal}
            >
              close
            </Icon>
            <form onSubmit={addAdminUsers}>
              <h2 className="addUserHeading">Add Users</h2>

              <label style={{ fontSize: "16px" }}>Employee Name</label>
              <input
                className="modalInput"
                required
                type="text"
                id="employee_name"
                name="employee_name"
                placeholder="Enter employee name..."
                value={employee_name}
                onChange={(e) => setEmployee_name(e.target.value)}
              ></input>
              <label style={{ fontSize: "16px" }}>Username</label>
              <input
                className="modalInput"
                required
                type="text"
                id="users_name"
                name="users_name"
                placeholder="Enter username..."
                value={users_name}
                onChange={(e) => setUsers_name(e.target.value)}
              ></input>
              <label style={{ fontSize: "16px" }}>Email</label>
              <input
                className="modalInput"
                required
                type="email"
                id="users_email"
                name="users_email"
                placeholder="Enter email..."
                value={users_email}
                onChange={(e) => setUsers_email(e.target.value)}
              ></input>
              <label style={{ fontSize: "16px" }}>User type</label>
              <select
                required
                className="modalInput"
                type="text"
                name="user_type"
                value={user_type}
                onChange={(e) => setUser_type(e.target.value)}
              >
                <option
                  style={{ margin: "20px", fontSize: "16px" }}
                  value={"0"}
                >
                  Admin
                </option>
                <option
                  style={{ margin: "20px", fontSize: "16px" }}
                  value={"1"}
                >
                  Support
                </option>
              </select>
              <input
                className="modalSubmit"
                type="submit"
                value="Submit"
              ></input>
            </form>
          </Box>
        </Fade>
      </Modal>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={editUserModal}
        // onClose={closeEditUserModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={editUserModal}>
          <Box sx={style_1}>
            <Icon
              sx={{
                float: "right",
                color: "black",
                cursor: "pointer",
                fontSize: "50px",
                marginRight: -1.5,
                marginTop: -1.5,
              }}
              onClick={closeEditUserModal}
            >
              close
            </Icon>
            <form onSubmit={updateUser}>
              <h2 className="addUserHeading">Edit Users</h2>
              <label style={{ fontSize: "16px" }}>Employee Name</label>
              <input
                className="modalInput"
                required
                type="text"
                id="employee_name"
                name="employee_name"
                placeholder="Enter employee name..."
                value={employee_name}
                onChange={(e) => setEmployee_name(e.target.value)}
              ></input>
              <label style={{ fontSize: "16px" }}>Username</label>
              <input
                className="modalInput"
                required
                type="text"
                id="users_name"
                name="users_name"
                placeholder="Enter username..."
                value={users_name}
                onChange={(e) => setUsers_name(e.target.value)}
              ></input>
              <label style={{ fontSize: "16px" }}>Email</label>
              <input
                className="modalInput"
                required
                type="users_email"
                id="users_email"
                name="users_email"
                placeholder="Enter email.."
                value={users_email}
                onChange={(e) => setUsers_email(e.target.value)}
              ></input>
              <label style={{ fontSize: "16px" }}>User type</label>
              <select
                required
                className="modalInput"
                type="text"
                name="user_type"
                value={user_type}
                onChange={(e) => setUser_type(e.target.value)}
              >
                <option
                  style={{ margin: "20px", fontSize: "16px" }}
                  value={"0"}
                >
                  Admin
                </option>
                <option
                  style={{ margin: "20px", fontSize: "16px" }}
                  value={"1"}
                >
                  Support
                </option>
              </select>
              {/* <label style={{ fontSize: "16px" }}>Active Status</label>
              <select
                required
                className="modalInput"
                type="text"
                name="user_type"
                value={is_active}
                onChange={(e) => setIs_active(e.target.value)}
              >
                <option
                  style={{ margin: "20px", fontSize: "16px" }}
                  value={"Y"}
                >
                  Active
                </option>
                <option
                  style={{ margin: "20px", fontSize: "16px" }}
                  value={"N"}
                >
                  Inactive
                </option>
              </select> */}
              <input
                className="modalSubmit"
                type="submit"
                value="Submit"
              ></input>
            </form>
          </Box>
        </Fade>
      </Modal>
      <div>
        <button className="modalOpenBtn" onClick={handleModal} style ={{ color:'#fff'}}>
          Add Users
        </button>
      </div>
      <div style={{ height: 460, width: "100%", marginTop: "55px" }}>
        <DataGrid
          sx={{
            boxShadow: 2,
            border: 2,
            borderColor: "ravi.main",
            "& .MuiDataGrid-cell:hover": {
              color: "ravi.main",
            },
            "& .MuiDataGrid-row:focus": {
              backgroundColor: "#33A2B5",
            },
          }}
          rows={users}
          columns={columns}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[50, 100]}
          loading={loading}
        />
      </div>
    </DashboardLayout>
  );
}
export default AddUsers;
