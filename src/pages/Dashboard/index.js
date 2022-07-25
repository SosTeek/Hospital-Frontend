import React from 'react';
import 'flowbite';
import SideNav from '../../components/NavBar/SideNav';
import DashBoard from '../../components/DashBoard';

const Dashboard = () => {
  return (
    <div class="flex">
      <div className="flex-none">
      <SideNav />
      </div>
      <div className=" flex-auto">
      <DashBoard />
      </div>
    </div>

  )
}

export default Dashboard