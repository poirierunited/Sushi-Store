import { useSelector } from "react-redux";
import Home from "./pages/Home.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {
  const userLoginReducer = useSelector((state) => state.userLoginReducer);
  const { userInfo } = userLoginReducer;

  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/products/:id" element={<ProductDetail />}></Route>
          <Route
            exact
            path="/login"
            element={userInfo ? <Navigate to="/"></Navigate> : <Login />}
          ></Route>
          <Route
            exact
            path="/register"
            element={userInfo ? <Navigate to="/"></Navigate> : <Register />}
          ></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
