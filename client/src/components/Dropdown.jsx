"use client";

import { Dropdown } from "flowbite-react";
import { Link } from "react-router-dom";
// eslint-disable-next-line react/prop-types
export function UserDropdown({ logoutHandler, isAdmin }) {
  return (
    <>
      {isAdmin ? (
        <Dropdown label="Admin" dismissOnClick={false} color="light">
          <Link to="/">
            <Dropdown.Item>Gestión de usuarios</Dropdown.Item>
          </Link>
          <Link to="/">
            <Dropdown.Item>Gestión de usuarios</Dropdown.Item>
          </Link>
          <Dropdown.Item onClick={logoutHandler}>Salir de admin</Dropdown.Item>
        </Dropdown>
      ) : (
        <Dropdown label="Mi cuenta" dismissOnClick={false} color="light">
          <Link to="/order-history">
            <Dropdown.Item>Historial de pedidos</Dropdown.Item>
          </Link>
          <Dropdown.Item onClick={logoutHandler}>Cerrar cuenta</Dropdown.Item>
        </Dropdown>
      )}
    </>
  );
}
