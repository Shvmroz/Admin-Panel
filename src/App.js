
import { Route, Routes } from 'react-router-dom';
import './App.css';
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

function App() {
  const token = localStorage.getItem("token")
  console.log(typeof token, "test")
  return (
    <div>
      <Routes>
        {/* Login / Signup Public Routes */}
        <Route path='/' element={(token && token !== null && token !== "undefined" && token !== "") ? <PrivateLayout /> : <PublicLayout />} >
          <Route index element={<LoginPage />} />
          <Route path='signup' element={<Signup />} />
          <Route path='ResetPassword' element={<ForgotPassword />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
        {/* Dashboard Private routes */}
        <Route path='/' element={(token && token !== null && token !== "undefined" && token !== "") ? <PrivateLayout /> : <PublicLayout />}>
          <Route path='/sidebar' element={<SideBar />}/>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/customer' element={<Customers />} />
          <Route path='/add-new-customer' element={<AddCustomerForm />} />
          <Route path='/edit-customer/:id' element={<EditCustomer />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

