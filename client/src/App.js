// import { BrowserRouter, Routes, Route } from "react-router";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import {
  Navbar,
  Login,
  ForgetPassword,
  ResetPassword,
  Signup,
  ContectUs,
  Dashboard,
  PageNotFound,
} from "./dev";
import RequireAuth from "./components/Auth/RequireAuth";

function App() {
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
        <Routes>
          {/* public routes*/}
          <Route path="/" element={<Login />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/ForgetPassword" element={<ForgetPassword />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/ContectUs" element={<ContectUs />} />
          <Route path="/ResetPassword/:token" element={<ResetPassword />} />
          <Route path="/*" element={<PageNotFound />} />

          {/* protected routes */}
          <Route element={<RequireAuth />}>
            <Route path="/Dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <footer className="sticky-footer bg-white">
        <div className="container my-auto">
          <div className="copyright text-center my-auto">
            <span>Copyright &copy; Mosh_TalChen car-menagment 2022</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
