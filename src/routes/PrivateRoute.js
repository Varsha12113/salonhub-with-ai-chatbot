// PrivateRoute.js
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children, allowedRoles }) {
  const { user, loading, token } = useSelector((state) => state.auth);
  const location = useLocation();

  const publicPaths = ['/', '/about', '/contact', '/services', '/booking'];
  if (publicPaths.includes(location.pathname)) {
    return children || <Outlet />;
  }

  // Still verifying token with backend — don't render anything yet
  if (loading) {
    return <div>Loading...</div>; // or a spinner component
  }

  // No token at all, or verification failed and cleared user
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  const userRole = user.role;

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children || <Outlet />;
}