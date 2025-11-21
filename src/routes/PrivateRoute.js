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

  if (!user) return <Navigate to="/login" replace />;

  const userRole = user.role;

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // If children exist, render them
  if (children) return children;

  // else render nested routes
  return <Outlet />;
}