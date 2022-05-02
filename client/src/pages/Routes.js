import { Routes, Route } from "react-router-dom";

import SignUp from './SignUp'
import Login from './Login'
import Logout from "./Logout";
import Users from "./Users";
import NotFound from "./404"

const RoutesComponent = () => (
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path="signup" element={<SignUp />} />
    <Route path="logout" element={<Logout />} />
    <Route path="users" element={<Users />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default RoutesComponent;