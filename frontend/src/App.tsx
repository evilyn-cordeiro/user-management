import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import ProtectedRoute from "./context/protectedRoute.context";
import LoginPage from "./pages/Login/login.page";
import UsersPage from "./pages/Users/users.page";
import UserForm from "./pages/UserForm/userForm.page";

function UserFormWrapper({ edit = false }: { edit?: boolean }) {
  const navigate = useNavigate();

  return (
    <UserForm
      onSuccess={() => navigate("/users")}
      onCancel={() => navigate("/users")}
    />
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <UsersPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/users/new"
          element={
            <ProtectedRoute>
              <UserFormWrapper />
            </ProtectedRoute>
          }
        />

        <Route
          path="/users/:id/edit"
          element={
            <ProtectedRoute>
              <UserFormWrapper edit />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
