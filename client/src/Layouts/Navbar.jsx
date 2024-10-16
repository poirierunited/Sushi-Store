import { UserDropdown } from "../components/Dropdown";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogoutAction } from "../Redux/Actions/User";
import { useState } from "react";
import Checkout from "../pages/Checkout";

const Navbar = () => {
  const userLoginReducer = useSelector((state) => state.userLoginReducer);
  const { userInfo } = userLoginReducer;
  const dispatch = useDispatch();

  const qty = useSelector((state) =>
    state.cartReducer.cartItems.reduce((total, item) => total + item.qty, 0)
  );

  const logoutHandler = () => {
    dispatch(userLogoutAction());
  };

  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="bg-red-600 border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            {/* TODO!: AGREGAR LOGO */}
            <img
              src="public\fukusuke-logo.png"
              className="w-24 h-24 rounded-full"
              alt="Fukusuke Logo"
            />
            <span className="self-center text-3xl font-extrabold whitespace-nowrap text-white dark:text-slate-600 rounded-lg px-4 py-2">
              Fukusuke Sushi
            </span>
          </Link>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            {!userInfo ? (
              <Link
                to="/register"
                className="text-black bg-white hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-lg text-sm px-4 py-2 text-center border-2 border-black dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 "
              >
                Iniciar sesión →]
              </Link>
            ) : (
              <>
                <UserDropdown logoutHandler={logoutHandler}></UserDropdown>
                <button
                  data-collapse-toggle="navbar-cta"
                  type="button"
                  className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg  hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                  aria-controls="navbar-cta"
                  aria-expanded="false"
                  onClick={() => setOpen(true)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                    />
                  </svg>

                  <span>{qty}</span>
                </button>

                <Checkout open={open} setOpen={setOpen}></Checkout>
              </>
            )}

            <button
              data-collapse-toggle="navbar-cta"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-cta"
              aria-expanded="false"
            >
              <span className="sr-only">Abrir menú principal</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-cta"
          >
            <ul className="flex flex-col font-bold p-4 md:p-0 mt-4 rounded-lg bg-white md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-red-600 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <a
                  href="#"
                  className="block py-2 px-5 text-white bg-yellow-100 rounded md:text-black md:bg-yellow-100 md:hover:bg-yellow-400 hover:text-white"
                  aria-current="page"
                >
                  Promociones
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-5  bg-yellow-400 md:bg-yellow-100 md:hover:bg-yellow-400 text-white md:text-black rounded hover:text-white"
                >
                  Carta
                </a>
              </li>

              {/*<li>
                <a
                  href="#"
                  className="block py-2 px-4 md:py-1 text-white bg-yellow-400 rounded md:bg-transparent md:text-black md:bg-yellow-100 md:hover:bg-yellow-400 hover:text-white"
                >
                  Sobre nosotros
                </a>
              </li>*/}
              <li>
                <a
                  href="#"
                  className="block py-2 px-5 text-white bg-yellow-400 rounded  md:text-black md:bg-yellow-100 md:hover:bg-yellow-400 hover:text-white"
                >
                  Contacto
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
