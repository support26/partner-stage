import React, { useEffect, useState } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import useCases from "../../hooks/useCases";
import AdminRepository from "../../api/AdminRepository";
import Cookies from "js-cookie";
import FormDataComponent from "./FromDataComponent";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import FileUploadComponent from "./FileUploadComponent";
import casesAssginTemplate from "../../assets/xlsxFiles/OdkCaseAssign-Agroforestry-sheet.xlsx";

const styleBox = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "520px",
  maxWidth: "90%",
  borderRadius: "25px",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 3,
  overflowY: "scroll",
  "&::-webkit-scrollbar": {
    display: "none",
  },
  maxHeight: "670px", // Initial maxHeight value
  maxWidth: "320px",
};

const styleBox2 = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "520px",
  maxWidth: "90%",
  borderRadius: "15px",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 3,
  overflowY: "scroll",
  "&::-webkit-scrollbar": {
    display: "none",
  },
  maxHeight: "100%", // Initial maxHeight value
  maxWidth: "100%",
};
function Cases() {
  const { uploadCaseDataSheet, getAllCasesData } = useCases();

  const [pageSize, setPageSize] = useState(100);
  const [applyData, setApplyData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showFormData, setShowFormData] = useState(false);
  const [selectedFormData, setSelectedFormData] = useState(null);
  const [openModle, setModel] = useState(false);
  const [openUploadFile, setUploadFile] = useState(false);

  const handleClose = () => setModel(false);
  const handleClose1 = () => setUploadFile(false);
  const handleOpen = (e) => {
    setModel(true);
  };

  const handleOpen1 = () => {
    setUploadFile(true);
  };
  const columns = [
    // { field: "id", headerName: "ID", width: 70 },
    { field: "Case_Number", headerName: "Case Number", width: 100 },
    { field: "Start_Date", headerName: "Start Date", width: 150 },
    { field: "End_Date", headerName: "End Date", width: 150 },
    { field: "Assign_To", headerName: "Assign To", width: 150 },
    { field: "Project_Id", headerName: "Project Id", width: 100 },
    { field: "Form_Name", headerName: "Form Name", width: 130 },
    { field: "created_by", headerName: "Created By", width: 100 },
    { field: "created_at", headerName: "Created At", width: 150 },
    { field: "updated_by", headerName: "Updated By", width: 100 },
    { field: "updated_at", headerName: "Updated At", width: 150 },
    { field: "status", headerName: "Status", width: 130 },
    {
      field: "formData",
      headerName: "View More",
      width: 120,
      renderCell: (params) => {
        const { row } = params;

        const handleViewMoreClick = () => {
          handleOpen();
          const parsedFormData = JSON.parse(row.formData);
          setSelectedFormData(parsedFormData);
          setShowFormData(true);
        };

        return (
          <div>
            <Button onClick={handleViewMoreClick}>View More</Button>
          </div>
        );
      },
    },
  ];

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarExport csvOptions={{ fileName: "Upload Cases" }} />
        <GridToolbarQuickFilter
          style={{ position: "absolute", right: "1%", maxWidth: "150px" }}
        />
      </GridToolbarContainer>
    );
  }

  const handleDownload = () => {
    window.location.href = casesAssginTemplate;
  };

  const allcases = async () => {
    setLoading(true);
    const cases = await getAllCasesData();
    setApplyData(cases.data.data);
    setLoading(false);
    return cases;
  };

  const fetchCasesData = () => {
    allcases();
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

  useEffect(() => {
    fetchCasesData();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            margin: "7px 10px 0px 0px",
          }}
        >
          <Button
            onClick={handleOpen1}
            style={{
              backgroundColor: "#33a2b5",
              padding: "7px 10px",
              border: "none",
              borderRadius: "10px",
              color: "#fff",
              width: "auto",
            }}
          >
            Cases Upload
          </Button>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            margin: "7px 10px 0px 0px",
          }}
        >
          <Button
            onClick={handleDownload}
            style={{
              backgroundColor: "#33a2b5",
              padding: "7px 10px",
              border: "none",
              borderRadius: "10px",
              color: "#fff",
              width: "auto",
            }}
          >
            Download Template
          </Button>
        </div>
      </div>

      <h3 style={{ margin: "5px" }}>Upload Cases</h3>
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
      </div>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openUploadFile}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openUploadFile}>
          <Box sx={styleBox}>
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
                  onClick={handleClose1}
                >
                  <CloseIcon />
                </IconButton>
              </div>
              <h4
                id="transition-modal-title"
                style={{ textAlign: "center", marginTop: "0px" }}
              >
                Upload file
              </h4>
              <FileUploadComponent />
            </div>
          </Box>
        </Fade>
      </Modal>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openModle}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModle}>
          <Box sx={styleBox2}>
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
                  onClick={handleClose}
                >
                  <CloseIcon />
                </IconButton>
              </div>
              <h4
                id="transition-modal-title"
                style={{ textAlign: "center", marginTop: "0px" }}
              >
                FROM DETAILS
              </h4>
              {showFormData && (
                <FormDataComponent
                  formData={selectedFormData}
                  onClose={() => {
                    setShowFormData(false);
                    setSelectedFormData(null);
                  }}
                />
              )}
            </div>
          </Box>
        </Fade>
      </Modal>
    </DashboardLayout>
  );
}

export default Cases;
