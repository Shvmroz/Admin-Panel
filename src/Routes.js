import React, { useEffect } from 'react';
import { Route, Routes, useNavigate, } from 'react-router-dom';
import LoginPage from './Pages/Page_Login';
import Signup from './Pages/Page_Signup';
import ForgotPassword from './Components/Form_ForgotPassword';
import Dashboard from './Components/DashBoard';
import Customers from './Components/Customers';
import { AddCustomerForm } from './Components/AddCustomerForm';
import EditCustomer from './Components/EditCustomer';
import { PublicLayout } from './Layout/PublicLayout';
import { PrivateLayout } from './Layout/PrivateLayout';
import PageNotFound from './Components/PageNotFound'
import SideBar from './Components/SideBar';
import { SupportTicket } from './Components/SupportTicket';

export const RoutesFile = () => {
    const navigate = useNavigate();
    useEffect(() => {

        const token = localStorage.getItem("token");
        if (!token) {
            navigate('/');
        } else {
            navigate('/dashboard');
        }
    }, []);
    
    return (
        <div>
            <Routes>
                {/* Login / Signup Public Routes */}
                <Route element={<PublicLayout />} >
                    <Route index element={<LoginPage />} />
                    <Route path='signup' element={<Signup />} />
                    <Route path='ResetPassword' element={<ForgotPassword />} />
                    <Route path="*" element={<PageNotFound />} />
                </Route>
                {/* Dashboard Private routes */}
                <Route element={<PrivateLayout />}>
                    <Route path='/sidebar' element={<SideBar />} />
                    <Route path='/dashboard' element={<Dashboard />} />
                    <Route path='/customer' element={<Customers />} />
                    <Route path='/Ticket' element={<SupportTicket />} />
                    <Route path='/add-new-customer' element={<AddCustomerForm />} />
                    <Route path='/edit-customer/:id' element={<EditCustomer />} />
                    <Route path="*" element={<PageNotFound />} />
                </Route>
            </Routes>
        </div>
    )
}
