import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

/**
 * ProtectedRoute component
 * 
 * @param {ReactNode} children - Optional: child components to render
 * @param {Array} allowedRoles - Optional: array of roles allowed to access this route (e.g., ['admin'])
 */
export default function ProtectedRoute({ children, allowedRoles }) {
  const { user } = useSelector((state) => state.auth);

  // Not logged in → redirect to login page
  if (!user) return <Navigate to="/login" replace />;

  // Get role from user object
  const userRole = user.role;

  // Role not allowed → redirect to unauthorized page
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Render children if provided, otherwise render nested routes using Outlet
  return children ? children : <Outlet />;
}
