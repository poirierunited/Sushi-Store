import Navbar from "./Navbar";
import Footer from "./Footer";
import PropTypes from "prop-types";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="bg-yellow-50">
        <div className="block py-2 px-2 bg-red-500 shadow-xl border border-gray-300 p-6 bg-white rounded-lg"></div>

        <div id="promotions">{children}</div>
      </main>
      <Footer />
    </>
  );
};

// Definir los prop-types para el componente Layout
Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
