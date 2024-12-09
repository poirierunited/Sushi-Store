import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../Layouts/Layouts";
import { useSelector } from "react-redux";
import { BASE_URL } from "../Redux/Constants/BASE_URL";
import axios from "axios";

export default function EditUser() {
  const { id: paramId } = useParams();
  const navigate = useNavigate();

  const [id, setId] = useState(paramId || "");
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

      const updatedFields = data.updatedFields;

      const updatedData = Object.entries(updatedFields)
        .map(
          ([key, value]) =>
            `${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`
        )
        .join("\n");

      alert(`${data.message}\n\nCampos actualizados:\n${updatedData}`);

      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  const deleteHandler = async (e) => {
    if (!userInfo.isAdmin) {
      alert("No tienes permisos para eliminar este usuario.");
      return;
    }

    e.preventDefault();

    if (!window.confirm("¿Estás seguro de eliminar este usuario?")) {
      return;
    }

    try {
      setLoading(true);
      await axios.delete(`${BASE_URL}/api/users/profile/${id}`, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      setLoading(false);
      alert("Usuario eliminado con éxito.");
      navigate("/"); // Redirige a la lista de productos
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <Layout>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <form className="max-w-lg mx-auto py-10" onSubmit={submitHandler}>
          <div className="grid grid-cols-3 gap-4 mb-5">
            <div>
              <label htmlFor="id" className="block mb-2 text-sm font-medium">
                ID del Usuario
              </label>
              <input
                type="text"
                id="id"
                value={id}
                onChange={(e) => setId(e.target.value)}
                required
                className="form-input w-full"
              />
            </div>

            <div>
              <label htmlFor="run" className="block mb-2 text-sm font-medium">
                RUN
              </label>
              <input
                type="text"
                id="run"
                value={run}
                onChange={(e) => setRun(e.target.value)}
                required
                className="form-input w-full"
              />
            </div>

            <div>
              <label htmlFor="name" className="block mb-2 text-sm font-medium">
                Nombre
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="form-input w-full"
              />
            </div>

            <div>
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
                className="form-input w-full"
              />
            </div>

            <div>
              <label
                htmlFor="region"
                className="block mb-2 text-sm font-medium"
              >
                Región
              </label>
              <input
                type="text"
                id="region"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                required
                className="form-input w-full"
              />
            </div>

            <div>
              <label htmlFor="city" className="block mb-2 text-sm font-medium">
                Ciudad
              </label>
              <input
                type="text"
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
                className="form-input w-full"
              />
            </div>

            <div>
              <label
                htmlFor="address"
                className="block mb-2 text-sm font-medium"
              >
                Dirección
              </label>
              <input
                type="text"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                className="form-input w-full"
              />
            </div>

            <div>
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
                className="form-input w-full"
              />
            </div>

            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium">
                Email
              </label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="form-input w-full"
              />
            </div>
          </div>

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
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Actualizar Usuario
            </button>
            <button
              type="button"
              onClick={deleteHandler}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Eliminar Usuario
            </button>
          </div>

          {error && <p className="text-red-500 mt-5">{error}</p>}
        </form>
      )}
    </Layout>
  );
}
