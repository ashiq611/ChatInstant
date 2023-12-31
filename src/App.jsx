import Error from "./pages/Error/Error";

import LoginPage from "./pages/login/LoginPage";
import Registration from "./pages/registration/registration";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import Notification from "./pages/Notifications/Notification";
import Homes from "./pages/Home/Homes";
import LayoutSidebar from "./pages/LayoutSidebar/LayoutSidebar";
import Settings from "./pages/Settings/Settings";
import Newsfeed from "./pages/Newsfeed/Newsfeed";
import Inbox from "./pages/Inbox/Inbox";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/registration" element={<Registration />} />
        <Route
          path="/home"
          element={
            <LayoutSidebar>
              <Homes />
            </LayoutSidebar>
          }
        />

        <Route
          path="/inbox"
          element={
            <LayoutSidebar>
              <Inbox />
            </LayoutSidebar>
          }
        />
        <Route
          path="/notifications"
          element={
           
              <Notification />
           
          }
        />
        <Route
          path="/settings"
          element={
            <LayoutSidebar>
              <Settings />
            </LayoutSidebar>
          }
        />
        <Route path="/newsfeed" element={<Newsfeed />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
