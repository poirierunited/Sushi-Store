import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../Redux/Constants/BASE_URL";

export default function Table() {
  const [data, setData] = useState(null); // Estado para almacenar los datos de la API
  const [loading, setLoading] = useState(true); // Estado para el indicador de carga
  const [error, setError] = useState(null); // Estado para manejar errores

  // Obtener el token desde Redux
  const userLoginReducer = useSelector((state) => state.userLoginReducer);
  const { userInfo } = userLoginReducer;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Activar indicador de carga
        const response = await axios.get(
          `${BASE_URL}/api/reports/sales?startDate=2024-05-01&endDate=2024-09-10`,
          {
            headers: {
              Authorization: `Bearer ${userInfo?.token}`,
            },
          }
        );
        setData(response.data); // Guardar los datos en el estado
      } catch (err) {
        console.error("Error al obtener los datos:", err);
        setError(err.message); // Manejar errores
      } finally {
        setLoading(false); // Desactivar indicador de carga
      }
    };

    if (userInfo?.token) {
      fetchData();
    } else {
      setLoading(false);
      setError("No se encontró un token válido.");
    }
  }, [userInfo]);

  if (loading) {
    return <div>Cargando datos...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data || !data.allOrders) {
    return <div>No hay datos para mostrar.</div>;
  }

  return (
    <div className="flex space-x-4">
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Nombre del producto
              </th>
              <th scope="col" className="px-6 py-3">
                Cantidad
              </th>
              <th scope="col" className="px-6 py-3">
                Precio c/u
              </th>
              <th scope="col" className="px-6 py-3">
                Precio
              </th>
            </tr>
          </thead>
          <tbody>
            {data.allOrders.map((order, orderIndex) =>
              order.orderItems.map((item, itemIndex) => (
                <tr
                  key={`${orderIndex}-${itemIndex}`}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {item.name}
                  </th>
                  <td className="px-6 py-4">{item.quantity}</td>
                  <td className="px-6 py-4">{`$${item.price}`}</td>
                  <td className="px-6 py-4">{`$${
                    // item.quantity * item.price
                    order.totalPrice
                  }`}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="relative overflow-x-auto">
        <table className="text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border border-gray-300">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-4 py-2">
                Total vendido
              </th>
              <th scope="col" className="px-4 py-2">
                Total de órdenes
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(data?.totalSummary) &&
            data.totalSummary.length > 0 ? (
              data.totalSummary.map((summary, summaryIndex) => (
                <tr
                  key={summaryIndex}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td className="px-4 py-2">{summary.totalPrice}</td>
                  <td className="px-4 py-2">{summary.totalOrders}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="2"
                  className="px-4 py-2 text-center text-gray-500 dark:text-gray-400"
                >
                  No hay datos disponibles.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
