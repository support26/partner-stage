import React, { useState } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import useCases from "../../hooks/useCases";

function Cases() {
  const { uploadCaseDataSheet, getAllCasesData } = useCases();
  const [pageSize, setPageSize] = useState(100);
  const [applyData, setApplyData] = useState([]);
  const [loading, setLoading] = useState(false);

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
    // {
    //   field: "zoom_meeting_status",
    //   headerName: "Zoom Meeting",
    //   width: 100,
    //   renderCell: (params) => {
    //     return (
    //       <input
    //         name="zoom_meeting_status"
    //         disabled={disabled}
    //         type="checkbox"
    //         checked={params.row.zoom_meeting_status === "Yes" ? true : false}
    //         onChange={(e) => onChangeStatus(e, params)}
    //       />
    //     );
    //   },
    // },
    // {
    //   field: "training_status",
    //   headerName: "Training Status",
    //   width: 100,
    //   renderCell: (params) => {
    //     return (
    //       <input
    //         name="training_status"
    //         disabled={disabled}
    //         type="checkbox"
    //         checked={params.row.training_status === "Yes" ? true : false}
    //         onChange={(e) => onChangeStatus(e, params)}
    //       />
    //     );
    //   },
    // },
    // {
    //   field: "role_id",
    //   headerName: "Role ID",
    //   width: 100,
    //   renderCell: (params) => {
    //     return (
    //       <select
    //         style={{
    //           width: "70px",
    //           height: "30px",
    //           borderRadius: "5px",
    //           border: "1px solid #33A2B5",
    //           outline: "none",
    //         }}
    //         value={params.row.role_id ? params.row.role_id : ""}
    //         onChange={(e) => onSelectList(e, params.id)}
    //       >
    //         <option value="">Select an option</option>
    //         {showAllActiveRoles(params.row.project_id)}
    //       </select>
    //     );
    //   },
    // },
    // {
    //   field: "is_approved",
    //   headerName: "Is Approved",
    //   width: 100,
    //   renderCell: (params) => {
    //     return (
    //       <input
    //         name="is_approved"
    //         disabled={disabled}
    //         type="checkbox"
    //         checked={params.row.is_approved === "Yes" ? true : false}
    //         onChange={(e) => onChangeStatus(e, params)}
    //       />
    //     );
    //   },
    // },
    // {
    //   field: "applied_at",
    //   headerName: "Applied At",
    //   width: 180,
    //   type: "date",
    //   valueFormatter: (params) => {
    //     // console.log(params)
    //     return params.value
    //       ? new Date(
    //           new Date(params.value).getTime() - 19800000
    //         ).toLocaleString()
    //       : "";
    //   },
    // },
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
  return (
    <DashboardLayout>
      <DashboardNavbar />
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
    </DashboardLayout>
  );
}

export default Cases;
