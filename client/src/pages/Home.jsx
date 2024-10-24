import Products from "../components/Products";
import Layout from "../Layouts/Layouts";

const Home = () => {
  return (
    <Layout>
      <div className="block bg-[url('/public/Fondo-promociones.jpeg')] h-64 w-full">
        <h1 className="block py-20 text-Black text-center text-7xl font-bold">
          Promociones
        </h1>
      </div>
      <div className="block py-2 px-2 bg-red-500 shadow-xl border border-gray-300 p-6 bg-white rounded-lg"></div>
      <Products></Products>
      <div className="block py-2 px-2 bg-red-500 shadow-xl border border-gray-300 p-6 bg-white rounded-lg"></div>
      <div className="block bg-[url('/public/Fondo-promociones.jpeg')] h-64 w-full">
        <h1 className="block py-20 text-Black text-center text-7xl font-bold">
          Carta
        </h1>
      </div>


    </Layout>
  );
};

export default Home;
