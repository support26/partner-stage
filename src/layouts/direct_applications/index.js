import React from "react";
import { useState, useEffect } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import useAdmin from "../../hooks/useAdmin";
import AdminRepository from "api/AdminRepository";
import Cookies from "js-cookie";
import useForms from "../../hooks/useForms";
import Button from "@mui/material/Button";
import CaseAndGeographyAssign from "./CaseAndGeographyAssign";
// const style = {
//     position: "absolute",
//     top: "50%",
//     left: "50%",
//     transform: "translate(-50%, -50%)",
//     // width: 50,
//   };
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

const DirectApplications = () => {
  const { GetDirectApplicationList, GetCardClicks } = useAdmin();
  const {
    UpdateUserTrainingStatusById,
    GetAllActiveUserRoles,
    ApproveUserById,
    AssignRoleToUser,
    UserCaseFileUpload,
  } = useForms();
  const [applyData, setApplyData] = useState([]);
  const [clickData, setClickData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [pageSize, setPageSize] = useState(100);
  const [pageSize1, setPageSize1] = useState(100);

  const roleId = localStorage.getItem("roleId");
  const [disabled, setDisabled] = useState(roleId == 1 ? true : false);
  const [allActiveRoles, setAllActiveRoles] = useState([]);
  const [selectedRoleId, setSelectedRoleId] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [openModleCase, setModelCase] = useState(false);
  const [openModleGeography, setModelGeography] = useState(false);
  const [inputGeogrphy, setGeogrphyButton] = useState("");
  const [inputCasebutton, setCaseButton] = useState("");
  const passdata = { 1: "case", 2: "geography" };
  const directApplications = () => {
    setLoading(true);
    var getApplications = GetDirectApplicationList();
    getApplications
      .then((res) => {
        if (res.status === 200) {
          setApplyData(res.data.data);
          getAllActiveRoles();
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getcardClicks = () => {
    setLoading1(true);
    var getCardClick = GetCardClicks();
    getCardClick
      .then((res) => {
        if (res.status === 200) {
          setClickData(res.data.data);
          setLoading1(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchApplications = () => {
    directApplications();
    getcardClicks();
    getAllActiveRoles();
    AdminRepository.checkUserActive()
      .then((res) => {
        if (res.data.data.is_active === "N") {
          window.location.href = "/";
          localStorage.clear();
          Cookies.remove("token");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const changeUserTrainingStatusById = (e, id) => {
    const data = {
      [e.target.name]: e.target.checked ? "Yes" : "No",
    };
    if (e.target.name === "is_approved") {
      var updateaOption = ApproveUserById(id, data);
      updateaOption
        .then((response) => {
          // console.log("response@@@", response);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      var updateaOption = UpdateUserTrainingStatusById(id, data);
      updateaOption
        .then((response) => {
          // console.log("response@@@", response);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  const updateState = (key, value, id) => {
    setApplyData((prevObjects) => {
      const objectToUpdate = prevObjects.find((object) => object.id === id);
      const updatedObject = { ...objectToUpdate, [key]: value ? "Yes" : "No" };
      const updatedObjects = prevObjects.map((object) =>
        object.id === id ? updatedObject : object
      );
      return updatedObjects;
    });
  };

  const onChangeStatus = (e, params) => {
    if (e.target.name === "is_approved") {
      if (params.row.role_id === null || params.row.role_id === "") {
        openSuccessDialog("Please assign a role first before approving");
        return;
      }
    }
    changeUserTrainingStatusById(e, params.id);
    updateState(e.target.name, e.target.checked, params.id);
  };

  const getAllActiveRoles = () => {
    GetAllActiveUserRoles()
      .then((res) => {
        setAllActiveRoles(res.data.data);
        setLoading(false);
      })
      .catch((err) => {});
  };

  const onSelectList = (e, id) => {
    const selectedRoleId = e.target.value;
    let data = {
      id: id,
      role_id: parseInt(selectedRoleId, 10),
    };
    AssignRoleToUser(data)
      .then((res) => {
        directApplications();
        // console.log("res.data.message".res.data.message);
        openSuccessDialog(res.data.message);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const openSuccessDialog = (message) => {
    setSuccessMessage(message);
    setDialogOpen(true);

    setTimeout(() => {
      setDialogOpen(false);
    }, 1000);
  };

  const uploadFileData = () => {
    UserCaseFileUpload()
      .then((res) => {
        console.log("res", res);
        // setAllActiveRoles(res.data.data);
        setLoading(false);
      })
      .catch((err) => {});
  };

  const handleOpenCase = (e) => {
    console.log("&&&&&&case", e.id);
    setCaseButton(e);
    setModelCase(true);
  };
  const handleOpenGeography = (e) => {
    console.log("&&&&&&Geography", e);
    setGeogrphyButton();
    setModelGeography(true);
  };

  const handleCloseCase = () => setModelCase(false);
  const handleCloseGeography = () => setModelGeography(false);

  // const SSE = () => {
  //   const source = new EventSource('http://localhost:8001/opt/webapp/opportunityCardClicksSSE');
  //     const source2 = new EventSource('http://localhost:8001/opt/webapp/opportunityApplySSE');
  // source.onmessage = (event) => {
  //   // Handle the event here
  //   console.log("click data aaya",JSON.parse(event.data));
  //   if(event.data.length > 0){
  //     const clickdata = JSON.parse(event.data);
  //     if(clickdata.fields){
  //       setClickData(prevObjects => {
  //         // Find the object with the matching id
  //         const objectToUpdate = prevObjects.find(object => object.id === clickdata.id);
  //         // Create a copy of the object with the updated key value
  //         const updatedObject = { ...objectToUpdate, ...clickdata.fields };
  //         // Create a new array with the updated object
  //         const updatedObjects = prevObjects.map(object =>
  //           object.id === clickdata.id ? updatedObject : object
  //         );
  //         return updatedObjects;
  //       });
  //     }
  //     else{
  //     // add data to the first row
  //     setClickData((old) => [JSON.parse(event.data), ...old]);
  //     }
  //   }
  // }
  // source2.onmessage = (event) => {
  //   // Handle the event here
  //   // console.log("apply like data aaya",JSON.parse(event.data));
  //   if(event.data.length > 0){
  //     const dataa = JSON.parse(event.data);
  //     console.log("dataa",dataa)
  //     if(dataa.fields){
  //       setApplyData(prevObjects => {
  //         // Find the object with the matching id
  //         const objectToUpdate = prevObjects.find(object => object.id === dataa.id);
  //         // Create a copy of the object with the updated key value
  //         const updatedObject = { ...objectToUpdate, ...dataa.fields };
  //         // Create a new array with the updated object
  //         const updatedObjects = prevObjects.map(object =>
  //           object.id === dataa.id ? updatedObject : object
  //         );
  //         return updatedObjects;
  //       });
  //     }
  //     else{
  //       console.log("id not exists")
  //     setApplyData((old) => [JSON.parse(event.data), ...old]);
  //     console.log("applyData",[...applyData])
  //     }
  //   }
  // }
  // }

  const showAllActiveRoles = (project_id) => {
    return allActiveRoles.map((role) => {
      if (role.project_id === project_id) {
        return (
          <option key={role.id} value={role.id}>
            {role.role_name}
          </option>
        );
      }
    });
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarExport csvOptions={{ fileName: "DirectApplications" }} />
        <GridToolbarQuickFilter
          style={{ position: "absolute", right: "1%", maxWidth: "150px" }}
        />
      </GridToolbarContainer>
    );
  }

  const columns = [
    // { field: "id", headerName: "ID", width: 70 },
    { field: "runner_name", headerName: "Name", width: 170 },
    { field: "runner_number", headerName: "Number", width: 130 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "project_name", headerName: "Project", width: 270 },
    { field: "tehsil", headerName: "Tehsil", width: 110 },
    { field: "district", headerName: "District", width: 110 },
    { field: "is_liked", headerName: "Like", width: 100 },
    { field: "is_applied", headerName: "Apply", width: 100 },
    {
      field: "zoom_meeting_status",
      headerName: "Zoom Meeting",
      width: 100,
      renderCell: (params) => {
        return (
          <input
            name="zoom_meeting_status"
            disabled={disabled}
            type="checkbox"
            checked={params.row.zoom_meeting_status === "Yes" ? true : false}
            onChange={(e) => onChangeStatus(e, params)}
          />
        );
      },
    },
    {
      field: "training_status",
      headerName: "Training Status",
      width: 100,
      renderCell: (params) => {
        return (
          <input
            name="training_status"
            disabled={disabled}
            type="checkbox"
            checked={params.row.training_status === "Yes" ? true : false}
            onChange={(e) => onChangeStatus(e, params)}
          />
        );
      },
    },
    {
      field: "role_id",
      headerName: "Role ID",
      width: 100,
      renderCell: (params) => {
        return (
          <select
            style={{
              width: "70px",
              height: "30px",
              borderRadius: "5px",
              border: "1px solid #33A2B5",
              outline: "none",
            }}
            value={params.row.role_id}
            onChange={(e) => onSelectList(e, params.id)}
          >
            <option value="">Select an option</option>
            {showAllActiveRoles(params.row.project_id)}
          </select>
        );
      },
    },
    {
      field: "is_approved",
      headerName: "Is Approved",
      width: 100,
      renderCell: (params) => {
        return (
          <input
            name="is_approved"
            disabled={disabled}
            type="checkbox"
            checked={params.row.is_approved === "Yes" ? true : false}
            onChange={(e) => onChangeStatus(e, params)}
          />
        );
      },
    },
    {
      field: "applied_at",
      headerName: "Applied At",
      width: 180,
      type: "date",
      valueFormatter: (params) => {
        // console.log(params)
        return params.value
          ? new Date(
              new Date(params.value).getTime() - 19800000
            ).toLocaleString()
          : "";
      },
    },
  ];
  const columns1 = [
    // { field: "id", headerName: "ID", width: 70 },
    { field: "project_name", headerName: "Project", width: 280 },
    { field: "runner_number", headerName: "Number", width: 130 },
    {
      field: "card_clicked_at",
      headerName: "Card Clicked at",
      width: 180,
      type: "date",
      valueFormatter: (params) => {
        return new Date(
          new Date(params.value).getTime() - 19800000
        ).toLocaleString();
      },
    },
    {
      field: "video_clicked_at",
      headerName: "Video Clicked at",
      width: 180,
      type: "date",
      valueFormatter: (params) => {
        return params.value
          ? new Date(
              new Date(params.value).getTime() - 19800000
            ).toLocaleString()
          : "";
      },
    },
    {
      field: "apply_link_clicked_at",
      headerName: "Apply Link Clicked at",
      width: 180,
      type: "date",
      valueFormatter: (params) => {
        return params.value
          ? new Date(
              new Date(params.value).getTime() - 19800000
            ).toLocaleString()
          : "";
      },
    },
  ];
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <div style={{ float: "right", flex: 1, margin: "7px 10px 0px 0px" }}>
        <Button
          onClick={handleOpenCase}
          style={{
            backgroundColor: "#33a2b5",
            padding: "7px 10px",
            border: "none",
            borderRadius: "10px",
            color: "#fff",
          }}
        >
          Cases Upload
        </Button>
        <Button
          onClick={handleOpenGeography}
          style={{
            backgroundColor: "#33a2b5",
            padding: "7px 10px",
            border: "none",
            borderRadius: "10px",
            color: "#fff",
          }}
        >
          Geography Upload
        </Button>
      </div>

      {/* model use cases */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openModleCase}
        //  onClose={handleCloseCase}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModleCase}>
          <Box sx={styleCustom}>
            <div
              style={{
                position: "sticky",
                top: "-25px",
                zIndex: "1",
                backgroundColor: "#fff",
                padding: "0px 0px",
                margin: "0px -7px",
                borderRadius: "10px 10px 10px 10px",
              }}
            >
              <div style={{ marginTop: "-6px" }}>
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="close"
                  style={{
                    display: "block",
                    float: "right",
                    marginTop: "-5px",
                    marginRight: "-10px",
                  }}
                  onClick={handleCloseCase}
                >
                  <CloseIcon />
                </IconButton>
              </div>
              <h4
                id="transition-modal-title"
                style={{ textAlign: "center", marginTop: "0px" }}
              >
                Geography assign
              </h4>
              <div>
                <CaseAndGeographyAssign name={passdata[1]} />
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>

      {/* model Geography */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openModleGeography}
        // onClose={handleCloseGeography}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModleGeography}>
          <Box sx={styleCustom}>
            <div
              style={{
                position: "sticky",
                top: "-25px",
                zIndex: "1",
                backgroundColor: "#fff",
                padding: "0px 0px",
                margin: "0px -7px",
                borderRadius: "10px 10px 10px 10px",
              }}
            >
              <div style={{ marginTop: "-6px" }}>
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="close"
                  style={{
                    display: "block",
                    float: "right",
                    marginTop: "-5px",
                    marginRight: "-10px",
                  }}
                  onClick={handleCloseGeography}
                >
                  <CloseIcon />
                </IconButton>
              </div>
              <h4
                id="transition-modal-title"
                style={{ textAlign: "center", marginTop: "0px" }}
              >
                User Cases
              </h4>
              <div>
                <CaseAndGeographyAssign name={passdata[2]} />
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
      <h3 style={{ margin: "5px" }}>Direct Applications</h3>
      <div style={{ height: 460, width: "100%", marginTop: "10px" }}>
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
          rows={applyData}
          columns={columns}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[50, 100]}
          loading={loading}
          components={{
            Toolbar: (column) => <CustomToolbar {...column} />,
          }}
        />
        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
          <DialogContent>{successMessage}</DialogContent>
        </Dialog>
      </div>
      <h3 style={{ marginTop: "25px" }}>Click Analysis</h3>
      <div style={{ height: 460, width: "100%", marginTop: "10px" }}>
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
          rows={clickData}
          columns={columns1}
          pageSize={pageSize1}
          onPageSizeChange={(newPageSize) => setPageSize1(newPageSize)}
          rowsPerPageOptions={[50, 100]}
          loading={loading1}
          components={{
            Toolbar: (column) => <CustomToolbar {...column} />,
          }}
        />
      </div>
    </DashboardLayout>
  );
};

export default DirectApplications;
