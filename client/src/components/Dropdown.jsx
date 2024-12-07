"use client";

import { Dropdown } from "flowbite-react";
import { Link } from "react-router-dom";
// eslint-disable-next-line react/prop-types
export function UserDropdown({ logoutHandler, isAdmin }) {
  return (
    <>
      {isAdmin ? (
        <Dropdown
          label="Admin"
          dismissOnClick={false}
          color="light"
          renderTrigger={() => (
            <button
              type="button"
              className="inline-flex items-center p-2 justify-center text-sm text-custom-yellow rounded-lg hover:bg-gray-100 hover:text-yellow-600 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="admin-info"
              aria-expanded="false"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 17H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2zm0-12H5v10h14V5zm-7 14h-2v2h2v-2z"
                />
              </svg>
              <span className="ml-2 text-sm font-medium">Admin</span>
            </button>
          )}
        >
          <Link to="/edit-user">
            <Dropdown.Item>Gestión de usuarios</Dropdown.Item>
          </Link>
          <Link to="/sell-dashboard">
            <Dropdown.Item>Gestión de ventas</Dropdown.Item>
          </Link>
          <Link to="/">
            <Dropdown.Item>Gestión de menú</Dropdown.Item>
          </Link>
          <Dropdown.Item onClick={logoutHandler}>Salir de admin</Dropdown.Item>
        </Dropdown>
      ) : (
        <Dropdown
          label="Mi cuenta"
          dismissOnClick={false}
          color="light"
          renderTrigger={() => (
            <button
              type="button"
              className="inline-flex items-center p-2 justify-center text-sm text-custom-yellow rounded-lg hover:bg-gray-100 hover:text-yellow-600 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="user-info"
              aria-expanded="false"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zM12 14c-3.31 0-6 1.69-6 3v2h12v-2c0-1.31-2.69-3-6-3z"
                />
              </svg>
            </button>
          )}
        >
          <Link to="/order-history">
            <Dropdown.Item>Historial de pedidos</Dropdown.Item>
          </Link>
          <Dropdown.Item onClick={logoutHandler}>Cerrar cuenta</Dropdown.Item>
        </Dropdown>
      )}
    </>
  );
}
