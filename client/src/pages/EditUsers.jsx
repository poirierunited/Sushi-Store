import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../Layouts/Layouts";
import { useSelector } from "react-redux";
import { BASE_URL } from "../Redux/Constants/BASE_URL";
import axios from "axios";

export default function EditUser() {
  const { id: paramId } = useParams();
  const navigate = useNavigate();

  const [id, setId] = useState(paramId || ""); // ID desde URL o input manual
  const [run, setRun] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [region, setRegion] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const userLoginReducer = useSelector((state) => state.userLoginReducer);
  const { userInfo } = userLoginReducer;

  const fetchUserData = async (userId) => {
    setLoading(true);
    setError("");

    try {
      const { data } = await axios.get(
        `${BASE_URL}/api/users/get-user/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${userInfo?.token}`,
          },
        }
      );

      // Asignar datos del usuario a los estados locales
      setRun(data.run);
      setName(data.name);
      setLastname(data.lastname);
      setRegion(data.region);
      setCity(data.city);
      setAddress(data.address);
      setPhoneNumber(data.phoneNumber);
      setEmail(data.email);
      setIsAdmin(data.isAdmin);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchUserData(id);
    }
  }, [id]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Realiza la solicitud PUT para actualizar los datos del usuario
      const { data } = await axios.put(
        `${BASE_URL}/api/users/profile/${id}`,
        {
          run,
          name,
          lastname,
          region,
          city,
          address,
          phoneNumber,
          email,
          isAdmin,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo?.token}`,
          },
        }
      );

      // Extraemos los campos actualizados de la respuesta
      const updatedFields = data.updatedFields;

      // Formateamos los campos cambiados en un formato legible
      const updatedData = Object.entries(updatedFields)
        .map(
          ([key, value]) =>
            `${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`
        )
        .join("\n");

      // Mostrar alerta con el mensaje y los campos actualizados
      alert(`${data.message}\n\nCampos actualizados:\n${updatedData}`);

      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  return (
    <Layout>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <form className="max-w-sm mx-auto py-10" onSubmit={submitHandler}>
          <div className="mb-5">
            <label htmlFor="id" className="block mb-2 text-sm font-medium">
              ID del Usuario
            </label>
            <input
              type="text"
              id="id"
              value={id}
              onChange={(e) => setId(e.target.value)}
              required
              className="form-input"
            />
          </div>

          <div className="mb-5">
            <label htmlFor="run" className="block mb-2 text-sm font-medium">
              RUN
            </label>
            <input
              type="text"
              id="run"
              value={run}
              onChange={(e) => setRun(e.target.value)}
              required
              className="form-input"
            />
          </div>

          <div className="mb-5">
            <label htmlFor="name" className="block mb-2 text-sm font-medium">
              Nombre
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="form-input"
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="lastname"
              className="block mb-2 text-sm font-medium"
            >
              Apellido
            </label>
            <input
              type="text"
              id="lastname"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              required
              className="form-input"
            />
          </div>
          <div className="mb-5">
            <label htmlFor="region" className="block mb-2 text-sm font-medium">
              Región
            </label>
            <input
              type="text"
              id="region"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              required
              className="form-input"
            />
          </div>
          <div className="mb-5">
            <label htmlFor="city" className="block mb-2 text-sm font-medium">
              Ciudad
            </label>
            <input
              type="text"
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
              className="form-input"
            />
          </div>
          <div className="mb-5">
            <label htmlFor="address" className="block mb-2 text-sm font-medium">
              Dirección
            </label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              className="form-input"
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="phoneNumber"
              className="block mb-2 text-sm font-medium"
            >
              Teléfono
            </label>
            <input
              type="text"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              className="form-input"
            />
          </div>
          <div className="mb-5">
            <label htmlFor="email" className="block mb-2 text-sm font-medium">
              Email
            </label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-input"
            />
          </div>

          {/* Más campos del formulario */}
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium">Rol</label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="role"
                  value="true"
                  checked={isAdmin === true}
                  onChange={() => setIsAdmin(true)}
                  className="form-radio"
                />
                <span className="ml-2">Admin</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="role"
                  value="false"
                  checked={isAdmin === false}
                  onChange={() => setIsAdmin(false)}
                  className="form-radio"
                />
                <span className="ml-2">No Admin</span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="text-white bg-blue-500 px-5 py-2 rounded-lg"
          >
            Actualizar Usuario
          </button>
          {error && <p className="text-red-500 mt-5">{error}</p>}
        </form>
      )}
    </Layout>
  );
}
