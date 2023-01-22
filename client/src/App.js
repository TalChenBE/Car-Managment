// import { BrowserRouter, Routes, Route } from "react-router";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import {
  Navbar,
  Login,
  ForgetPassword,
  ResetPassword,
  Signup,
  ContactUs,
  Dashboard,
  PageNotFound,
} from "./dev";
import { RequireAuth, RequireAuthExistence} from "./components/Auth/RequireAuth";
import PersistLogin from "./components/PersistLogin/PersistLogin";
import SessionLogin from "./components/PersistLogin/SessionLogin";

function App() {
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
        <Routes>
          {/* public routes*/}
          {/*<Route element={<PersistLogin />}>*/}
          {/*  <Route path="/" element={<Login />} />*/}
          {/*  <Route path="/Login" element={<Login />} />*/}
          {/*</Route>*/}
          <Route path="/" element={<Login />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/ForgetPassword" element={<ForgetPassword />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/ContactUs" element={<ContactUs />} />
          <Route path="/ResetPassword/:token" element={<ResetPassword />} />
          <Route path="/*" element={<PageNotFound />} />

          {/* protected routes */}
          <Route element={<SessionLogin />}>
            <Route element={<PersistLogin />}>
              <Route element={<RequireAuth />}>
                <Route path="/Dashboard" element={<Dashboard />} />
              </Route>
            </Route>
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
