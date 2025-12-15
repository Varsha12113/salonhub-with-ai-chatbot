
// PrivateRoute.js
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children, allowedRoles }) {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  console.log("ProtectedRoute hit:", {
    path: location.pathname,
    user,
    allowedRoles,
  });

  const publicPaths = ['/', '/about', '/contact', '/services', '/booking'];
  if (publicPaths.includes(location.pathname)) {
    return children || <Outlet />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const userRole = user.role;
  console.log("userRole:", userRole);

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children || <Outlet />;
}
