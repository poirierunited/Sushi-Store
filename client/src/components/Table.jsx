import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../Redux/Constants/BASE_URL";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export default function Table() {
  const [data, setData] = useState(null); // Estado para almacenar los datos de la API
  const [loading, setLoading] = useState(false); // Estado para el indicador de carga
  const [error, setError] = useState(null); // Estado para manejar errores
  const [startDate, setStartDate] = useState("2024-05-01"); // Fecha inicial por defecto
  const [endDate, setEndDate] = useState("2024-12-01"); // Fecha final por defecto

  // Obtener el token desde Redux
  const userLoginReducer = useSelector((state) => state.userLoginReducer);
  const { userInfo } = userLoginReducer;

  const fetchData = async (startDate, endDate) => {
    try {
      setLoading(true); // Activar indicador de carga
      setError(null); // Reiniciar errores previos
      const response = await axios.get(
        `${BASE_URL}/api/reports/sales?startDate=${startDate}&endDate=${endDate}`,
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

  // Llamado inicial con las fechas por defecto
  useEffect(() => {
    if (userInfo?.token) {
      fetchData(startDate, endDate);
    } else {
      setLoading(false);
      setError("No se encontró un token válido.");
    }
  }, [userInfo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData(startDate, endDate); // Actualiza los datos con las fechas seleccionadas
  };

  if (loading) {
    return <div>Cargando datos...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data || !data.allOrders) {
    return <div>No hay datos para mostrar.</div>;
  }

  const humanizeDate = (dateString) => {
    const date = new Date(`${dateString}T00:00:00`); // Forzar hora inicial
    return format(date, "d 'de' MMM, yyyy", { locale: es });
  };

  return (
    <div className="p-5">
      <form onSubmit={handleSubmit} className="mb-5 text-center">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <label>
            Fecha de inicio:
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1"
            />
          </label>
          <label>
            Fecha de fin:
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1"
            />
          </label>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Actualizar
          </button>
        </div>

        <br />

        <h2 className="text-2xl font-bold text-center mb-5">
          Reporte desde{" "}
          <span style={{ color: "#C81F1D" }}>{humanizeDate(startDate)}</span>{" "}
          hasta{" "}
          <span style={{ color: "#C81F1D" }}>{humanizeDate(endDate)}</span>
        </h2>
      </form>

      <div className="flex flex-col md:flex-row space-x-4 items-center justify-center">
        {/* Tabla de productos */}
        <div className="relative overflow-x-auto mb-5 md:mb-0 w-full">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border border-gray-300">
            <thead className="text-xs text-black uppercase bg-[#FCEA69] dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3 border-r border-black">
                  Nombre del producto
                </th>
                <th scope="col" className="px-6 py-3 border-r border-black">
                  Cantidad
                </th>
                <th scope="col" className="px-6 py-3 border-r border-black">
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
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white border-r border-gray-300"
                    >
                      {item.name}
                    </th>
                    <td className="px-6 py-4 text-black border-r border-gray-300">
                      {item.quantity}
                    </td>
                    <td className="px-6 py-4 text-black border-r border-gray-300">{`$${item.price}`}</td>
                    <td className="px-6 py-4 text-black">{`$${order.totalPrice}`}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Tabla de resumen */}
        <div className="relative overflow-x-auto w-full">
          <table className="text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border border-gray-300">
            <thead className="text-xs text-black uppercase bg-[#FCEA69] dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-4 py-2 border-r border-black">
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
                    <td className="px-4 py-2 text-black border-r border-gray-300">{`$${summary.totalPrice}`}</td>
                    <td className="px-4 py-2 text-black">
                      {summary.totalOrders}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="2"
                    className="px-4 py-2 text-center text-black dark:text-gray-400"
                  >
                    No hay datos disponibles.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
