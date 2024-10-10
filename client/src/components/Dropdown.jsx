"use client";

import { Dropdown } from "flowbite-react";
import { Link } from "react-router-dom";
export function UserDropdown({ logoutHandler }) {
  return (
    <Dropdown label="Mi cuenta" dismissOnClick={false} color="light">
      <Link to="/order-history">
        <Dropdown.Item>Historial de pedidos</Dropdown.Item>
      </Link>
      <Dropdown.Item onClick={logoutHandler}>Cerrar cuenta</Dropdown.Item>
    </Dropdown>
  );
}
