const Footer = () => {
  return (
    <>
      <footer className="bg-red-600 shadow dark:bg-gray-900 m-4">
        <div className="w-full max-w-screen-xl mx-auto md:py-8">
          <div className="sm:flex sm:items-center">
            {/*<a
              href="/"
              className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
            >
              <img
                src="public/fukusuke-logo.png"
                className="w-16 h-16 rounded-full"
                // TODO!: AGREGAR LOGO
                alt="Fukusuke Logo"
              />
              <span className="self-center text-white text-2xl font-semibold whitespace-nowrap dark:text-white">
                Fukusuke Sushi
              </span>
            </a>*/}

            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-white sm:mb-0 dark:text-gray-400 justify-center w-full">
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">
                  Sobre nosotros
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:underline ml-4 md:ml-64 me-4 md:me-64"
                >
                  Política de privacidad
                </a>
                <p></p>
              </li>
              {/* <li>
                <a href="#" className="hover:underline me-4 md:me-6">
                  Licensing
                </a>
              </li> */}
              <li>
                <a
                  id="contact-section"
                  href="#"
                  className="hover:underline ml-2"
                >
                  Contacto
                </a>
                <p>
                  <img
                    src="/logotipo-de-instagram.png"
                    className="h-5 mb-2 mt-2"
                    alt="Instagram Logo"
                  />
                </p>
                <p>
                  <img
                    src="/whatsapp.png"
                    className="h-5 mb-2"
                    alt="Whatsapp Logo"
                  />
                </p>
                <p>
                  <img
                    src="/facebook.png"
                    className="h-5"
                    alt="Facebook Logo"
                  />
                </p>
              </li>
            </ul>
          </div>
          {/*<hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />*/}
          <a
            href="/"
            className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse justify-center py-5"
          >
            <img
              src="/fukusuke-logo.png"
              className="w-16 h-16 rounded-full "
              // TODO!: AGREGAR LOGO
              alt="Fukusuke Logo"
            />
            <span className="self-center text-white text-2xl font-semibold whitespace-nowrap dark:text-white">
              Fukusuke Sushi
            </span>
          </a>
          <span className="block text-sm text-black sm:text-center dark:text-gray-400">
            <a href="/" className="hover:underline">
              Los Santiago Boys Inc
            </a>
            . Todos los derechos reservados. © 2024{" "}
          </span>
        </div>
      </footer>
    </>
  );
};

export default Footer;
