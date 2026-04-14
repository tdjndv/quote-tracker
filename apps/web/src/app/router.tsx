import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { LoginPage } from "../pages/LoginPage";
import { SignupPage } from "../pages/SignupPage";
import { DashboardPage } from "../pages/DashboardPage";
import { NewQuotePage } from "../pages/NewQuotePage";
import { EditQuotePage } from "../pages/EditQuotePage";
import { PublicQuotesPage } from "../pages/PublicQuotesPage";
import { ProtectedRoute } from "../components/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "login", element: <LoginPage /> },
      { path: "signup", element: <SignupPage /> },
      { path: "public", element: <PublicQuotesPage /> },
      {
        element: <ProtectedRoute />,
        children: [
          { path: "quotes/new", element: <NewQuotePage /> },
          { path: "quotes/:id/edit", element: <EditQuotePage /> },
        ],
      },
    ],
  },
]);