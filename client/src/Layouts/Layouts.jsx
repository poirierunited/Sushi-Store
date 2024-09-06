import Navbar from "./Navbar";
import Footer from "./Footer";
import PropTypes from "prop-types";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
};

// Definir los prop-types para el componente Layout
Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
