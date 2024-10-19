const Footer = () => {
  return (
    <>
    
      <footer className="bg-red-600 shadow dark:bg-gray-900 mt-4">
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
                <a className="me-4 md:me-6 text-lg">
                  Sobre nosotros
                </a>
                <div className="mb-20"></div>
              </li>
              <li className="flex flex-col mb-10">
                <a
                  className=" ml-4 md:ml-64 me-4 md:me-64 text-lg"
                >
                  Ubicación
                </a>
                <div className="flex item-center ml-48">
                  <img
                    src="/marcador-de-posicion.png"
                    className="h-5 mb-2 mt-2"
                    alt="Ubicacion"
                  />
                  <a href="#" className="hover:underline mt-2 ml-1">Nombre calle, Comuna, Ciudad</a>
                </div>
              </li>
              {/* <li>
                <a href="#" className="hover:underline me-4 md:me-6">
                  Licensing
                </a>
              </li> */}
              <li>
                <a
                  id="contact-section"
                  
                  className=" text-lg "
                >
                  Contacto
                </a>
                <div className="flex item-center">
                  <img
                    src="/logotipo-de-instagram.png"
                    className="h-5 mb-2 mt-2"
                    alt="Instagram Logo"
                  />
                  <a href="#" className="hover:underline mt-2 ml-1">@Fukusuke_Sushi</a>
                </div>
                <div className="flex item-center">
                  <img
                    src="/whatsapp.png"
                    className="h-5 mb-2"
                    alt="Whatsapp Logo"
                  />
                  <a href="#" className="hover:underline ml-1">+56 9 2384 1912</a>
                </div>
                <div className="flex item-center">
                  <img
                    src="/facebook.png"
                    className="h-5 "
                    alt="Facebook Logo"
                  />
                  <a href="#" className="hover:underline ml-1">Fukusuke Sushi</a>
                </div>
                
              </li>
            </ul>
          </div>
          {/*<hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />*/}
          <div className="block mt-10 py-1 px-1 bg-yellow-200 shadow-xl border border-gray-300 p-6  rounded-lg"></div>
          <a
            href="/"
            className="flex items-center mb-7 space-x-3 rtl:space-x-reverse justify-center py-2 px-2"
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
