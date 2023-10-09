import React from "react";
import FormLogin from "../Fragments/FormLogin";
import AuthLayouts from "../Layouts/AuthLayouts";
import { BrowserRouter as Router } from "react-router-dom";
const Login = () => {
  return (
    <div className="bg-dark-blue p-3 md:p-0 h-screen w-screen max-md:h-full max-md:w-full flex max-tablet:h-fit justify-center items-center   ...">
      {/* px-96 pt-16 py-48 */}
      <Router>
        <AuthLayouts></AuthLayouts>;
      </Router>
    </div>
  );
};

export default Login;
