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
      <Products></Products>
    </Layout>
  );
};

export default Home;
