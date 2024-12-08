import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../Layouts/Layouts";
import { BASE_URL } from "../Redux/Constants/BASE_URL";

function EditProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Estado local para los campos editables
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [countInStock, setCountInStock] = useState(0);
  const [image, setImage] = useState("");

  const userLoginReducer = useSelector((state) => state.userLoginReducer);
  const { userInfo } = userLoginReducer;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${BASE_URL}/api/products/${id}`);
        setName(data.name);
        setDescription(data.description);
        setPrice(data.price);
        setCountInStock(data.countInStock);
        setImage(data.image);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchProductDetails();
  }, [id]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!userInfo.isAdmin) {
      alert("No tienes permisos para editar este producto.");
      return;
    }

    try {
      setLoading(true);
      await axios.put(
        `${BASE_URL}/api/tableproduct/editProduct/${id}`,
        { name, description, price, countInStock, image },
        { headers: { Authorization: `Bearer ${userInfo.token}` } }
      );
      setLoading(false);
      alert("Producto actualizado con éxito.");
      navigate("/"); // Redirige a la lista de productos
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const deleteHandler = async (e) => {
    if (!userInfo.isAdmin) {
      alert("No tienes permisos para eliminar este producto.");
      return;
    }

    e.preventDefault();

    if (!window.confirm("¿Estás seguro de eliminar este producto?")) {
      return;
    }

    try {
      setLoading(true);
      await axios.delete(`${BASE_URL}/api/tableproduct/deleteProduct/${id}`, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      setLoading(false);
      alert("Producto eliminado con éxito.");
      navigate("/"); // Redirige a la lista de productos
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto p-5">
        {loading && <h2>Cargando...</h2>}
        {error && <h2 className="text-red-500">{error}</h2>}
        {!loading && !error && (
          <form
            onSubmit={submitHandler}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          >
            <h1 className="text-2xl font-bold mb-5">Editar Producto</h1>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Nombre del Producto
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Descripción
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Precio
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Cantidad en Stock
              </label>
              <input
                type="number"
                value={countInStock}
                onChange={(e) => setCountInStock(Number(e.target.value))}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Imagen (URL)
              </label>
              <input
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Guardar Cambios
              </button>
              <button
                type="button"
                onClick={deleteHandler}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Eliminar Producto
              </button>
            </div>
          </form>
        )}
      </div>
    </Layout>
  );
}

export default EditProductPage;
