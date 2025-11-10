import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute({ children, allowedRoles }) {
  const { user, role } = useSelector((state) => state.auth);

  // If not logged in → redirect to login page
  if (!user) return <Navigate to="/login" replace />;

  // If role is not allowed → redirect to unauthorized page
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // If children exist, render them; otherwise, render nested routes using Outlet
  return children ? children : <Outlet />;
}



// import React from "react";
// import { Navigate, Outlet } from "react-router-dom";
// import { useSelector } from "react-redux";

// export default function PrivateRoute({ allowedRoles }) {
//   const { user } = useSelector((state) => state.auth);
//   if (!user) return <Navigate to="/" />;
//   if (allowedRoles && !allowedRoles.includes(user.role)) return <Navigate to="/" />;

//   return <Outlet />;
// }
