import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { GroupsRounded, LanguageRounded, NotInterestedRounded } from '@mui/icons-material';

const Dashboard = () => {
  const apiUrl = process.env.REACT_APP_API_URL;

  const [totalUser, setTotalUser] = useState(0);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token")
      const headers = {
        'x-sh-auth': token,
      };
      const response = await axios.post(`${apiUrl}api/customer/get_customers`, {}, { headers: headers });
      setTotalUser(response.data.count);
      console.log("successful", response.data)
    } catch (error) {
      console.error('Error fetching domain data:', error.response);
    }
  };

  return (
    <>
      <div className="header-section">
        <h2>Hi, Welcome Back</h2>
      </div>
      <div className="cards-section container">
        <div className="row">
          <div className="col-md-12 col-lg-4">
            <div className="inner-card">
              <Card sx={{ padding: '20px', backgroundColor: '#EAFCD4', borderRadius: 4, textAlign: 'center' }}>
                <CardContent sx={{ color: '#0D640F' }}>
                  <Box sx={{ height: 60, width: 60, backgroundColor: '#D0EFBC', borderRadius: '50%', margin: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: 'inset 10px 2px 10px rgba(0, 0, 0, 0.1)', marginBottom: '30px' }}>
                    <GroupsRounded />
                  </Box>
                  <Typography variant="h4" component="div" sx={{ margin: '5px', fontWeight: 'bold' }}>
                    {totalUser}
                  </Typography>
                  <Typography variant="body2">Total Users</Typography>
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="col-md-12 col-lg-4">
            <div className="inner-card">
              <Card sx={{ padding: '20px', backgroundColor: '#D0F2FE', borderRadius: 4, textAlign: 'center' }}>
                <CardContent sx={{ color: '#275FA5' }}>
                  <Box sx={{ height: 60, width: 60, backgroundColor: '#B7DDF6', borderRadius: '50%', margin: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: 'inset 10px 2px 10px rgba(0, 0, 0, 0.1)', marginBottom: '30px' }}>
                    <LanguageRounded />
                  </Box>

                  <Typography variant="h4" component="div" sx={{ margin: '5px', fontWeight: 'bold' }}>
                    0
                  </Typography>
                  <Typography variant="body2">Verified Domains</Typography>
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="col-md-12 col-lg-4">
            <div className="inner-card">
              <Card sx={{ padding: '20px', backgroundColor: '#e5e0ff', borderRadius: 4, textAlign: 'center' }}>
                <CardContent sx={{ color: '#661f77' }}>
                  <Box sx={{ height: 60, width: 60, backgroundColor: '#ebcfff', borderRadius: '50%', margin: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: 'inset 10px 2px 10px rgba(0, 0, 0, 0.1)', marginBottom: '30px' }}>
                    <NotInterestedRounded />
                  </Box>

                  <Typography variant="h4" component="div" sx={{ margin: '5px', fontWeight: 'bold' }}>
                   0
                  </Typography>
                  <Typography variant="body2">Unverified Domains</Typography>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
