// import { BrowserRouter, Routes, Route } from "react-router";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import {
  Navbar,
  HomePage,
  Login,
  ForgetPassword,
  Signup,
  ContectUs,
  Dashboard,
  PageNotFound,
} from "./dev";

function App() {
  return (
    <div className="App">
      <Navbar fullName="FirstName LastName" gender="female" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/ForgetPassword" element={<ForgetPassword />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/ContectUs" element={<ContectUs />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/PageNotFound" element={<PageNotFound />} />
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
