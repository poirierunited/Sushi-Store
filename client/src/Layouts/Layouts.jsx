import Navbar from "./Navbar";
import Footer from "./Footer";
import PropTypes from "prop-types";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="bg-yellow-50">
        {/*<div className="block bg-[url('/public\Fondo-promociones.jpeg')] h-64 w-full">
          <h1 className="block py-20 text-Black text-center text-7xl font-bold">Promociones</h1>
        </div>
        <div className="block py-2 px-2 bg-red-500 shadow-xl border border-gray-300 p-6 bg-white rounded-lg"></div>*/}
        
        {children}
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
