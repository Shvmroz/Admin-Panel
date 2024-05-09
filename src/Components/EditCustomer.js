import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router";
import Alert from "@mui/material/Alert"; // Import Alert from MUI

function EditCustomer() {

	const apiUrl = process.env.REACT_APP_API_URL;
	
	const { id } = useParams();
	const [loading, setLoading] = useState(true);
	const [customerData, setCustomerData] = useState({
		first_name: "",
		last_name: "",
		email: "",
		industry_type: "",
	});
	const [showSuccessMessage, setShowSuccessMessage] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		const fetchCustomerData = async () => {
			try {
				const token = localStorage.getItem("token");
				const headers = {
					"content-type": "application/json",
					"x-sh-auth": token,
				};
				const response = await axios.get(
					`http://146.190.164.174:4000/api/customer/detail_customer_by_admin/${id}`,
					{ headers: headers }
				);
				const customer = response.data.data;
				setCustomerData({
					first_name: customer.first_name,
					last_name: customer.last_name,
					email: customer.user.email,
				});
			} catch (error) {
				console.error("Error fetching customer data:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchCustomerData();
	}, [id]);

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setCustomerData({
			...customerData,
			[name]: value,
		});
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			setLoading(true);
			const token = localStorage.getItem("token");
			const headers = {
				"x-sh-auth": token,
			};
			const response = await axios.put(
				` ${apiUrl}api/customer/edit_customer_by_admin/${id}`,
				customerData,
				{
					headers: headers,
				}
			);
			console.log("Update Customer Success:", response.data);
			setShowSuccessMessage(true); // Show success message
			setTimeout(() => {
				setShowSuccessMessage(false); // Hide success message after 3 seconds
				navigate("/customer");
			}, 3000);
		} catch (error) {
			console.error("Update Customer Error:", error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="container" >
			<div style={{ marginTop: '10px', marginBottom: '10px'  }}>
				{showSuccessMessage && (
					<Alert severity="success">User Edited successfully!</Alert>
				)}
			</div>
			<div className="mb-5">
				<h2><b>Edit Customer</b></h2>
			</div>




			{loading ? (
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						marginTop: "16px",
					}}
				>
					<CircularProgress />
				</div>

			) : (
				<form onSubmit={handleSubmit}>
					<div>
						<TextField
							label="First Name"
							variant="outlined"
							fullWidth
							required
							name="first_name"
							value={customerData.first_name}
							onChange={handleInputChange}
							style={{ marginBottom: "16px" }}
						/>

						<TextField
							label="Last Name"
							variant="outlined"
							fullWidth
							required
							name="last_name"
							value={customerData.last_name}
							onChange={handleInputChange}
							style={{ marginBottom: "16px" }}
						/>

						<TextField
							label="Email"
							variant="outlined"
							fullWidth
							required
							name="email"
							value={customerData.email}
							onChange={handleInputChange}
							style={{ marginBottom: "16px" }}
						/>
					</div>

					<div style={{ textAlign: 'right', }}>
						<div>
							<Button
								className="btn-clr"

								variant="contained"
								onClick={() => navigate("/customer")}
								style={{ marginTop: "16px", marginRight: "16px" }}
							>
								Cancel
							</Button>

							<Button
								className="btn-clr"
								type="submit"
								variant="contained"
								color="primary"
								style={{ marginTop: "16px" }}
							>
								Save Changes
							</Button>
						</div>

					</div>
				</form>
			)}
		</div>
	);
}

export default EditCustomer;
