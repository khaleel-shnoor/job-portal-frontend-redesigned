import { Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function MainLayout() {
  const { user, logout } = useAuth();

  return (
    <div>
      <nav className="flex justify-between p-4 bg-black text-white">
        <h1>Job Portal</h1>

        <div className="flex gap-4">
          {user?.role === "user" && <span>User Panel</span>}
          <button onClick={logout}>Logout</button>
        </div>
      </nav>

      <Outlet />
    </div>
  );
}