import React from "react";
import { Outlet } from "react-router-dom";

const UserPanel = () => {
  return (
    <div className="p-4">
      

      {/* This is where child routes will render */}
      <Outlet />
    </div>
  );
};

export default UserPanel;