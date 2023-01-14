import React from 'react'
import { useState, useEffect } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { DataGrid, GridToolbarContainer, GridToolbarExport, GridToolbarQuickFilter } from "@mui/x-data-grid";
import useAdmin from '../../hooks/useAdmin';
import AdminRepository from 'api/AdminRepository';
import Cookies from "js-cookie";


// const style = {
//     position: "absolute",
//     top: "50%",
//     left: "50%",
//     transform: "translate(-50%, -50%)",
//     // width: 50,
//   };
const DirectApplications = () => {

    const { GetDirectApplicationList, GetCardClicks } = useAdmin();
    const [applyData, setApplyData] = useState([]);
    const [clickData, setClickData] = useState([])
    const [loading, setLoading] = useState(false);
    const [loading1, setLoading1] = useState(false);
  const [pageSize, setPageSize] = useState(20);
  const [pageSize1, setPageSize1] = useState(20);

  const directApplications = () => {
    setLoading(true);
        var getApplications = GetDirectApplicationList();
        getApplications.then((res) => {
            if(res.status === 200){
                setApplyData(res.data.data);
                setLoading(false);
            }
        })
        .catch((err) => {
            console.log(err);
        });
  }

  const getcardClicks = () => {
    setLoading1(true);
    var getCardClick = GetCardClicks();
    getCardClick.then((res) => {
      if(res.status === 200){
        setClickData(res.data.data)
        setLoading1(false)
      }
    })
    .catch((err) => {
      console.log(err);
    })
  }


    const fetchApplications = () => {
        directApplications();
        getcardClicks();
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
    }

    
    useEffect(() => {
        fetchApplications();
    }, []);
            


  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarExport csvOptions= {{ fileName: 'DirectApplications' }} />
        <GridToolbarQuickFilter style={{ position: "absolute", right: "1%", maxWidth: "150px" }} />
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
        { field: "applied_at", headerName: "Applied At", width: 180, type: 'date',
        valueFormatter: (params) => {
          // console.log(params)
          return params.value ? new Date(new Date(params.value).getTime() - 19800000).toLocaleString() : "";
        } },
        ];
        const columns1 = [
          // { field: "id", headerName: "ID", width: 70 },
          { field: "project_name", headerName: "Project", width: 280 },
          { field: "runner_number", headerName: "Number", width: 130 },
          { field: "card_clicked_at", headerName: "Card Clicked at", width: 180, type: 'date',
          valueFormatter: (params) => {
            return new Date(new Date(params.value).getTime() - 19800000).toLocaleString();
          }},
          { field: "video_clicked_at", headerName: "Video Clicked at", width: 180, type: 'date',
          valueFormatter: (params) => {
            return params.value ? new Date(new Date(params.value).getTime() - 19800000).toLocaleString() : "";
          }},
          { field: "apply_link_clicked_at", headerName: "Apply Link Clicked at", width: 180, type: 'date',
          valueFormatter: (params) => {
            return params.value ? new Date(new Date(params.value).getTime() - 19800000).toLocaleString() : "";
          }},
          ];
  return (
    <DashboardLayout>
        <DashboardNavbar />
          <h3 style={{margin: "5px"}} >Direct Applications</h3>
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
          rowsPerPageOptions={[20, 50, 100]}
          loading={loading}
            components={{ 
                Toolbar: column => <CustomToolbar {...column} />,
            }}
        />
      </div>
      <h3 style={{marginTop: "25px"}} >Click Analysis</h3>
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
          rowsPerPageOptions={[20, 50, 100]}
          loading={loading1}
            components={{ 
                Toolbar: column => <CustomToolbar {...column} />,
            }}
        />
      </div>
    </DashboardLayout>
  )
}

export default DirectApplications