import { UserDropdown } from "../components/Dropdown";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogoutAction } from "../Redux/Actions/User";
import { useState } from "react";
import Checkout from "../pages/Checkout";
import { MenuDropdown } from "../components/MenuDropdown";

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
      {/*NAVBAR PARA ADMIN*/}
      {userInfo && userInfo.isAdmin ? (
        <nav className="bg-red-700 border-gray-200 dark:bg-gray-900">
          {/*CONTENEDOR DE LOGO Y NOMBRE*/}
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <div>
              <Link to="/" className="flex space-x-1 rtl:space-x-reverse">
                <img
                  src="/fukusuke-logo.png"
                  className="w-24 h-24 rounded-full"
                  alt="Fukusuke Logo"
                />
                <span className="self-center text-3xl font-extrabold whitespace-nowrap text-white dark:text-slate-600 rounded-lg px-4 py-2">
                  Fukusuke Sushi
                </span>
              </Link>
            </div>
            <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
              {!userInfo ? (
                <Link
                  to="/login"
                  className="text-black bg-white hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-lg text-sm px-2 py-2 text-center border-4 border-black dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 "
                >
                  Iniciar sesión →]
                </Link>
              ) : (
                <>
                  <UserDropdown
                    logoutHandler={logoutHandler}
                    isAdmin={true}
                  ></UserDropdown>
                </>
              )}
            </div>
          </div>
        </nav>
      ) : (
        <nav className="bg-red-600 border-gray-200 dark:bg-gray-900">
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <Link
              to="/"
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              {/* TODO!: AGREGAR LOGO */}
              <img
                src="/fukusuke-logo.png"
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
                  to="/login"
                  className="text-black bg-white hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-lg text-sm px-2 py-2 text-center border-2 border-black dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 "
                >
                  Iniciar sesión →]
                </Link>
              ) : (
                <>
                  <UserDropdown
                    logoutHandler={logoutHandler}
                    isAdmin={false}
                  ></UserDropdown>

                  <MenuDropdown></MenuDropdown>

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
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                      />
                    </svg>

                    <span>{qty}</span>
                  </button>

                  <Checkout open={open} setOpen={setOpen}></Checkout>
                </>
              )}
            </div>
          </div>
        </nav>
      )}
    </>
  );
};

export default Navbar;
