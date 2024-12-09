import Products from "../components/Products";
import Layout from "../Layouts/Layouts";
import { useSelector } from "react-redux";

// Home component
const Home = () => {
  const userLoginReducer = useSelector((state) => state.userLoginReducer);
  const { userInfo } = userLoginReducer;
  return (
    <Layout>
      <>
        <div className="block bg-[url('/Fondo-promociones.jpeg')] h-64 w-full">
          {userInfo && userInfo.isAdmin ? (
            <h1 className="block py-20 text-black text-center text-4xl md:text-6xl lg:text-7xl">
              Panel de gestión de productos
            </h1>
          ) : (
            <h1 className="block py-20 text-black text-center text-4xl md:text-6xl lg:text-7xl font-bold">
              Promociones
            </h1>
          )}
        </div>
        <div className="block py-2 px-2 bg-red-500 shadow-xl border border-gray-300 p-6 bg-white rounded-lg"></div>
        <Products></Products>
        <div className="block py-2 px-2 bg-red-500 shadow-xl border border-gray-300 p-6 bg-white rounded-lg"></div>
        <div className="block bg-[url('/Fondo-promociones.jpeg')] h-64 w-full">
          {/* <h1 className="block py-20 text-black text-center text-4xl md:text-6xl lg:text-7xl font-bold">
            Carta
          </h1> */}
        </div>
      </>
    </Layout>
  );
};

export default Home;
