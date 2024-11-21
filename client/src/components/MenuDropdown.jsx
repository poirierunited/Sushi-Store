"use client";

// import { useState, useEffect } from "react";
import { Dropdown } from "flowbite-react";

export function MenuDropdown() {
  return (
    <>
      <Dropdown
        label="☰"
        dismissOnClick={false}
        color="light"
        renderTrigger={() => (
          <button
            type="button"
            className="inline-flex items-center p-2 justify-center text-sm text-custom-yellow rounded-lg hover:bg-gray-100 hover:text-yellow-600 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-label="Abrir menú principal"
          >
            <span className="sr-only">Abrir menú principal</span>
            <svg
              className="w-5 h-5"
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
        )}
      >
        <a href="#promotions">
          <Dropdown.Item>Promociones</Dropdown.Item>
        </a>
        <a href="#menu">
          <Dropdown.Item>Carta</Dropdown.Item>
        </a>
        <a href="#contact-section">
          <Dropdown.Item>Contacto</Dropdown.Item>
        </a>
      </Dropdown>
    </>
  );
}
