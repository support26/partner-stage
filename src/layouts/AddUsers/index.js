import axios from 'axios'
import { useState, useEffect } from 'react'
import './style.css'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import { Navigate } from 'react-router-dom'
import { token } from '../../api/config'
import useAdmin from '../../hooks/useAdmin'
import { useSelector } from 'react-redux'
//material UI
import { DataGrid } from '@mui/x-data-grid'
import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import Button from '@mui/material/Button'
import { hover } from '@testing-library/user-event/dist/hover'
// mui custom style
const style = {
  position: 'absolute',
  top: '42%',
  left: '60%',
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
  top: '44%',
  left: '60%',
  transform: 'translate(-50%, -50%)',
  width: '350px',
  padding: '35px',
  height: '560px',
  borderRadius: '15px',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 3
}
function AddUsers() {
  const { getAlladminUser } = useAdmin()
  const { GetAlladminUser } = useSelector((state) => state.auth)
  const token = localStorage.getItem('token');
  const [employee_name, setEmployee_name] = useState('')
  const [sNo, setSNo] = useState(0)
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
  // const openEditUserModal = () => setEditUserModal(true)
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
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }
  //useEffect to get all users  from the database and set it to the state of users array to be displayed in the table
  useEffect(() => {
    const admin = getAlladminUser();
    // setUsers(admin);
    console.log(admin)
    setUsers(GetAlladminUser)
  }, [])
  // if (!session_token) {
  //   return <Navigate to='/' />
  // }
  const GetUsers = () => {
    getAlladminUser();
    setUsers(GetAlladminUser)
    // console.log("session_token", session_token);
    // axios.get('http://localhost:8001/admin/allUsers/10', {
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': 'Bearer ' + session_token
    //   }
    // }).then(response => {
    //   console.log(response)
    //   setUsers(response.data.data)
    // }).catch(e => {
    //   console.log(e)
    // })
  }
  const columns = [
    {
      field: 'action',
      type: 'actions',
      headerName: 'Action',
      sortable: false,
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
          return console.log(params)
        }
        return (
          <Button onClick={onClick} variant='contained' sx={{ color: '#000', backgroundColor: '#33A2B5', '&:hover': { backgroundColor: '#2A90A2' } }}>
            Edit
          </Button>
        )
      }
    },
    {
      field: 's_no', headerName: 'S No.', width: 70,
      renderCell: function (params) {
        return params.value
      }
    },
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'users_name', headerName: 'users_name', width: 130 },
    { field: 'users_email', headerName: 'users_email', width: 130 },
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
    }
  ]
  const data = {
    users_name: users_name,
    users_email: users_email,
    user_type: user_type,
    employee_name: employee_name
  }
  const handleSubmit = event => {
    event.preventDefault()
    axios
      .post('http://localhost:8001/admin/create', data, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      })
      .then(response => {
        console.log(response)
        handleOpen('Added ')
        GetUsers()
        closeModal()
      }).catch(e => {
        console.log(e)
        // handleOpen(e.message)
      })
    console.log(user_type)
    console.log(users_name)
    console.log(users_email)
    setUsers_name('')
    setUsers_email('')
  }
  const data_1 = {
    users_name: users_name,
    users_email: users_email,
    user_type: user_type,
    employee_name: employee_name,
    is_active: is_active
  }
  const updateUser = event => {
    event.preventDefault()
    axios
      .put(`http://localhost:8001/admin/update/${user_id}`, data_1, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      })
      .then(response => {
        console.log(response.data)
        handleOpen('Updated ')
        GetUsers()
        closeEditUserModal()
      })
    console.log(user_type)
    console.log(users_name)
    console.log(users_email)
    console.log(is_active)
    console.log(employee_name)
    setUsers_name('')
    setUsers_email('')
    setEmployee_name('')
  }
  if(!localStorage.getItem('token')){
    return <Navigate to='/' />
  }

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
        <Alert
          sx={{
            backgroundColor: 'rgb(17 200 25 / 50%)',
            color: '#fff',
            fontWeight: 'bold',
            width: '100%',
            position: 'relative',
            left: '118px'
          }}
          onClose={handleClose}
          severity='success'
        >
          User {snackType} Successfully!
        </Alert>
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
            <form onSubmit={handleSubmit}>
              <h2 className='addUserHeading'>Add Users</h2>
              <label>Employee Name</label>
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
              <label>Username</label>
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
              <label>Email</label>
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
              <label>User type</label>
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
              {/* </FormControl> */}
              <input
                className='modalSubmit'
                type='submit'
                value='Submit'
              // onClick={createPost}
              ></input>
            </form>
          </Box>
        </Fade>
      </Modal>
      {/* edit user modal  */}
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
              <label style={{ fontSize: "16px" }}>Active User</label>
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
                  Enable
                </option>
                <option
                  style={{ margin: '20px', fontSize: '16px' }}
                  value={'N'}
                >
                  Disable
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
      <div style={{ height: 550, width: '100%', marginTop: '70px' }}>
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