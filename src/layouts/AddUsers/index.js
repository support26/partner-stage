import { useState, useEffect } from 'react'
import './style.css'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
// import { Navigate } from 'react-router-dom'
import AdminRepository from "../../api/AdminRepository";
//Hooks
import useAdmin from '../../hooks/useAdmin'
import { useSelector } from 'react-redux'
//material UI
import Icon from "@mui/material/Icon";
import { DataGrid } from '@mui/x-data-grid'
import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import Button from '@mui/material/Button'
import Switch from '@mui/material/Switch';


// mui custom style
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '350px',
  padding: '35px',
  height: '488px',
  borderRadius: '15px',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 3
}
const style_1 = {
position: 'absolute',
top: '50%',
left: '50%',
transform: 'translate(-50%, -50%)',
width: '350px',
padding: '35px',
height: '570px',
borderRadius: '15px',
bgcolor: 'background.paper',
boxShadow: 24,
p: 3
}
function AddUsers() {
  const { AddAdminUser, UpdateAdminUser, ChangeAdminUserStatus } = useAdmin()
  const { successMessage } = useSelector((state) => state.auth)
  const { msg } = useSelector((state) => state.auth)
  const [employee_name, setEmployee_name] = useState('')
  const [users_name, setUsers_name] = useState('')
  const [users_email, setUsers_email] = useState('')
  const [user_type, setUser_type] = useState('0')
  const [user_id, setUser_id] = useState('')
  const [is_active, setIs_active] = useState('Y')
  const [users, setUsers] = useState([])
  const [pageSize, setPageSize] = useState(10)
  const [open, setOpen] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const handleModal = () => {
    setUser_type('0')
    setOpenModal(true)
  }
  const closeModal = () => setOpenModal(false)
  const [editUserModal, setEditUserModal] = useState(false)
  const closeEditUserModal = () => {
    setEditUserModal(false)
    setUsers_name('')
    setUsers_email('')
  }

  const [vertical, setVertical] = useState('top')
  const [horizontal, setHorizontal] = useState('center')
  const [snackType, setSnackType] = useState('')
  const handleOpen = snack => {
    setSnackType(snack)
    setOpen(true)
  }
  const handleClose = (reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }



  const GetUsers = () => {
    AdminRepository.GetAlladminUser()
      .then(response => {
        console.log(response)
        setUsers(response.data.data)
      }).catch(e => {
        console.log(e)
      })
  }

  //useEffect to get all users  from the database and set it to the state of users array to be displayed in the table
  useEffect(() => {
    GetUsers();
  }, [])


  const columns = [
    {
      field: 'action',
      type: 'actions',
      headerName: 'Action',
      renderCell: function (params) {
        const onClick = function (e) {
          e.stopPropagation() // don't select this row after clicking
          const api = params.api
          const thisRow = {}
          api
            .getAllColumns()
            .filter(c => c.field !== '__check__' && !!c)
            .forEach(
              c => (thisRow[c.field] = params.getValue(params.id, c.field))
            )
          setUser_type(thisRow.roleId)
          setUser_id(params.id)
          setUsers_name(thisRow.users_name)
          setUsers_email(thisRow.users_email)
          setIs_active(params.row.is_active)
          setEmployee_name(params.row.employee_name)
          setEditUserModal(true)
          return console.log(thisRow)
        }
        return (
          <Button onClick={onClick} variant='contained' sx={{ color: '#000', backgroundColor: '#33A2B5', '&:hover': { backgroundColor: '#378c9b', 'focus':{backgroundColor: 'red'} } }}>
            Edit
          </Button>
        )
      }
    },
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'employee_name', headerName: 'Employee Name', width: 150 },
    { field: 'users_name', headerName: 'User Name', width: 140 },
    { field: 'users_email', headerName: 'Email', width: 200 },
    {
      field: 'roleId',
      headerName: 'User Type',
      width: 100,
      renderCell: function (params) {

        return params.row.roleId === 0 ? (
          <p style={{ textAlign: 'center' }}>Admin</p>
        ) : (
          <p style={{ textAlign: 'center' }}>Support</p>
        )
      }
    },
    {
      field: 'is_active',
      headerName: 'Status',
      width: 100,
      sortable: false,
      renderCell: function (params) {
        const handleActiveStatus = (event) => {
          event.preventDefault()
          const id = params.row.id
          if (params.row.is_active === 'Y') {
            const is_active = 'N'
            ChangeAdminUserStatus(id, is_active)
          }
          else {
            const is_active = 'Y'
            ChangeAdminUserStatus(id, is_active)
          }
          GetUsers()
          console.log(id, is_active)
        }
        return params.row.is_active === 'Y' ? (
          <Switch onChange={handleActiveStatus} defaultChecked color="success" />
        ) : (
          <Switch onChange={handleActiveStatus} color="success" />

        )
      }
    }
  ]
  const data = {
    users_name: users_name,
    users_email: users_email,
    user_type: user_type,
    employee_name: employee_name
  }

  const addAdminUsers = event => {
    event.preventDefault()
    AddAdminUser(data)
    handleOpen()
    GetUsers()
    closeModal()
    console.log(user_type)
    console.log(users_name)
    console.log(users_email)
    setUsers_name('')
    setUsers_email('')
    setEmployee_name('')

  }

  const data_1 = {
    users_name: users_name,
    users_email: users_email,
    user_type: user_type,
    employee_name: employee_name,
    is_active: is_active,
  }
  const updateUser = event => {
    event.preventDefault()
    UpdateAdminUser(data_1, user_id)
    handleOpen()
    GetUsers()

    closeEditUserModal()
    console.log(user_id)
    console.log(user_type)
    console.log(users_name)
    console.log(users_email)
    console.log(is_active)
    console.log(employee_name)
    setUsers_name('')
    setUsers_email('')
    setEmployee_name('')
  }
  // if(!localStorage.getItem('token')){
  //   return <Navigate to='/' />
  // }

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
        {
          (successMessage !== '') ? (
            <Alert severity='success' sx={{
              backgroundColor: 'rgb(17 200 25 / 60%)',
              color: '#fff',
              fontWeight: 'bold',
              width: '100%',
              position: 'relative',
              left: '118px'
            }}>
              {successMessage}
            </Alert>
          ) : (
            <Alert severity='error' sx={{
              backgroundColor: 'rgb(255 0 0 / 50%)',
              color: '#fff',
              fontWeight: 'bold',
              width: '100%',
              position: 'relative',
              left: '118px'
            }}>
              {msg}
            </Alert>
          )
        }
      </Snackbar>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        open={openModal}
        onClose={closeModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={openModal}>
          <Box sx={style}>
          <Icon
              sx={{
                float: 'right',
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
           
              <h2 className='addUserHeading'>Add Users</h2>
              
              <label style={{ fontSize: "16px" }}>Employee Name</label>
              <input
                className='modalInput'
                required
                type='text'
                id='employee_name'
                name='employee_name'
                placeholder='Enter employee name...'
                value={employee_name}
                onChange={e => setEmployee_name(e.target.value)}
              ></input>
              <label style={{ fontSize: "16px" }}>Username</label>
              <input
                className='modalInput'
                required
                type='text'
                id='users_name'
                name='users_name'
                placeholder='Enter username...'
                value={users_name}
                onChange={e => setUsers_name(e.target.value)}
              ></input>
              <label style={{ fontSize: "16px" }}>Email</label>
              <input
                className='modalInput'
                required
                type='email'
                id='users_email'
                name='users_email'
                placeholder='Enter email...'
                value={users_email}
                onChange={e => setUsers_email(e.target.value)}
              ></input>
              <label style={{ fontSize: "16px" }}>User type</label>
              <select
                required
                className='modalInput'
                type='text'
                name='user_type'
                value={user_type}
                onChange={e => setUser_type(e.target.value)}
              >
                <option
                  style={{ margin: '20px', fontSize: '16px' }}
                  value={'0'}
                >
                  Admin
                </option>
                <option
                  style={{ margin: '20px', fontSize: '16px' }}
                  value={'1'}
                >
                  Support
                </option>
              </select>
              <input
                className='modalSubmit'
                type='submit'
                value='Submit'
              ></input>
            </form>
          </Box>
        </Fade>
      </Modal>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        open={editUserModal}
        onClose={closeEditUserModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={editUserModal}>
          <Box sx={style_1}>
          <Icon
              sx={{
                float: 'right',
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
              <h2 className='addUserHeading'>Edit Users</h2>
              <label style={{ fontSize: "16px" }}>Employee Name</label>
              <input
                className='modalInput'
                required
                type='text'
                id='employee_name'
                name='employee_name'
                placeholder='Enter employee name...'
                value={employee_name}
                onChange={e => setEmployee_name(e.target.value)}
              ></input>
              <label style={{ fontSize: "16px" }}>Username</label>
              <input
                className='modalInput'
                required
                type='text'
                id='users_name'
                name='users_name'
                placeholder='Enter username...'
                value={users_name}
                onChange={e => setUsers_name(e.target.value)}
              ></input>
              <label style={{ fontSize: "16px" }}>Email</label>
              <input
                className='modalInput'
                required
                type='users_email'
                id='users_email'
                name='users_email'
                placeholder='Enter email..'
                value={users_email}
                onChange={e => setUsers_email(e.target.value)}
              ></input>
              <label style={{ fontSize: "16px" }}>User type</label>
              <select
                required
                className='modalInput'
                type='text'
                name='user_type'
                value={user_type}
                onChange={e => setUser_type(e.target.value)}
              >
                <option
                  style={{ margin: '20px', fontSize: '16px' }}
                  value={'0'}
                >
                  Admin
                </option>
                <option
                  style={{ margin: '20px', fontSize: '16px' }}
                  value={'1'}
                >
                  Support
                </option>
              </select>
              <label style={{ fontSize: "16px" }}>Active Status</label>
              <select
                required
                className='modalInput'
                type='text'
                name='user_type'
                value={is_active}
                onChange={e => setIs_active(e.target.value)}
              >
                <option
                  style={{ margin: '20px', fontSize: '16px' }}
                  value={'Y'}
                >
                  Active
                </option>
                <option
                  style={{ margin: '20px', fontSize: '16px' }}
                  value={'N'}
                >
                  Inactive
                </option>
              </select>
              <input
                className='modalSubmit'
                type='submit'
                value='Submit'
              ></input>
            </form>
          </Box>
        </Fade>
      </Modal>
      <div>
        <button className='modalOpenBtn' onClick={handleModal}>
          Add Users
        </button>
      </div>
      <div style={{ height: 500, width: '100%', marginTop: '55px' }}>
        <DataGrid
          sx={{
            boxShadow: 2,
            border: 2,
            borderColor: '#33A2B5',
            '& .MuiDataGrid-cell:hover': {
              color: '#33A2B5',
            },
          }}
          rows={users}
          columns={columns}
          pageSize={pageSize}
          onPageSizeChange={newPageSize => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 10, 20, 50]}
        />
      </div>
    </DashboardLayout>
  )
}
export default AddUsers