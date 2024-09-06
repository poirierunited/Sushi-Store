import Home from "./pages/Home.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/products/:id" element={<ProductDetail />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
