import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  CircularProgress,
  Alert,
  IconButton,
  Tooltip,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import TablePagination from "@mui/material/TablePagination";
import { Delete, Edit, } from "@mui/icons-material";
import AddIcon from '@mui/icons-material/Add';

const columns = [
  { id: "#", label: "#", minWidth: 30 },
  // { id: "_id", label: "ID", minWidth: 170 },
  { id: "first_name", label: "First Name", minWidth: 100 },
  { id: "last_name", label: "Last Name", minWidth: 100 },
  { id: "email", label: "Email", minWidth: 170 },
  { id: "account_status", label: "Account Status", minWidth: 100 },
  { id: "customer_type", label: "Customer Type", minWidth: 100 },
  { id: "action", label: "Action", minWidth: 100 },
];

const Customer = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [customers, setCustomers] = useState([]);
  const [pagecount, setPagecount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const fetchCustomers = useCallback(async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const headers = {
        "x-sh-auth": token,
      };

      const response = await axios.post(
        `${apiUrl}api/customer/get_customers?page=${page}&limit=${rowsPerPage}`,
        {},
        { headers: headers }
      );

      console.log("Response data:", response.data);
      setCustomers(response.data.customer);
      setPagecount(response.data.count);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching customers:", error.response);
      setLoading(false);
    }
  }, [page, rowsPerPage]);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  const handleDelete = async (userId) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const headers = {
        "x-sh-auth": token,
      };
      await axios.delete(
        `${apiUrl}api/customer/delete_customer/${userId}`,
        { headers: headers }
      );
      setCustomers(customers.filter((customer) => customer.user._id !== userId));
      console.log("User deleted successfully");
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
    } catch (error) {
      console.error("Error deleting user:", error.response);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="customer-section">
      <div style={{ textAlign: 'right', marginBottom: '20px' }}>
        <Button
          className="btn-clr"
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate("/add-new-customer")}
        >
          Add Customer
        </Button>

      </div>
      <div style={{ marginBottom: 20, display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <h2 ><b>Customers</b></h2>
        </div>
        <div>
          <TextField
            label="Search customer"
            size="small"
            type="text"
            variant="outlined"
          />
        </div>
      </div>
      {showSuccessMessage && (
        <Alert severity="success">User deleted successfully!</Alert>
      )}

      <TableContainer component={Paper} >
        <Table stickyHeader >
          <TableHead >
            <TableRow >
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  style={{ minWidth: column.minWidth ,backgroundColor: '#FFE7DA' , }}
                 
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : (
              customers.map((customer, index) => (
                <TableRow key={customer._id}>
                  <TableCell>{index + 1}</TableCell>
                  {/* <TableCell>{customer._id}</TableCell> */}
                  <TableCell>{customer.first_name}</TableCell>
                  <TableCell>{customer.last_name}</TableCell>
                  <TableCell >{customer.user.email}</TableCell>
                  <TableCell ><span style={{  backgroundColor: '#E4F8DD', color: '#3AA62E', padding: '8px', borderRadius: '6px', fontSize: 'small', fontWeight: 'bold' }}>
                    {customer.account_status}</span></TableCell>
                  <TableCell>{customer.customer_type}</TableCell>
                  <TableCell>

                    <Tooltip title="Edit Customer" arrow>
                      <IconButton
                        onClick={() => navigate(`/edit-customer/${customer.user._id}`)}
                      >
                        <Edit />
                      </IconButton>
                    </Tooltip>
                    
                    <Tooltip title="Delete" arrow>
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(customer.user._id)}
                      >
                        <Delete />
                      </IconButton>
                    </Tooltip>
                  </TableCell>

                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={customers.length ? pagecount : 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 15, 25, 50]}
      
      />
    </div>
  );
};

export default Customer;
