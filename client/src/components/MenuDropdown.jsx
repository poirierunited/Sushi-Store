"use client";

import { useState, useEffect } from "react";
import { Dropdown } from "flowbite-react";

export function MenuDropdown() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {isSmallScreen ? (
        <Dropdown
          label="☰"
          dismissOnClick={false}
          color="light"
          renderTrigger={() => (
            <button
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
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
      ) : (
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-cta"
        >
          <ul className="flex flex-col font-bold p-4 md:p-0 mt-4 rounded-lg bg-white md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-red-600 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <a
                href="#promotions"
                className="block py-2 px-5 text-white bg-yellow-100 rounded md:text-black md:bg-yellow-100 md:hover:bg-yellow-400 hover:text-white"
                aria-current="page"
              >
                Promociones
              </a>
            </li>
            <li>
              <a
                href="#menu"
                className="block py-2 px-5 bg-yellow-400 md:bg-yellow-100 md:hover:bg-yellow-400 text-white md:text-black rounded hover:text-white"
              >
                Carta
              </a>
            </li>
            <li>
              <a
                href="#contact-section"
                className="block py-2 px-5 text-white bg-yellow-400 rounded md:text-black md:bg-yellow-100 md:hover:bg-yellow-400 hover:text-white"
              >
                Contacto
              </a>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
