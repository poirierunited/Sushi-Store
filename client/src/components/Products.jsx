import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { productListAction } from "../Redux/Actions/Product";

const Products = () => {
  const userLoginReducer = useSelector((state) => state.userLoginReducer);
  const { userInfo } = userLoginReducer;
  const dispatch = useDispatch();
  const productListReducer = useSelector((state) => state.productListReducer);
  const { loading, error, products = [] } = productListReducer;

  useEffect(() => {
    dispatch(productListAction());
  }, [dispatch]);

  const addProductHandler = () => {
    // Navigate to the AddProduct page
    window.location.href = "/add-product";
  };

  return (
    <div>
      {loading ? (
        <h1 className="text-center text-lg font-semibold">Cargando...</h1>
      ) : error ? (
        <h1 className="text-center text-lg font-semibold text-red-500">
          {error}
        </h1>
      ) : (
        <>
          <section className="text-gray-600 body-font">
            <div className="container px-4 py-16 mx-auto sm:px-6 lg:px-8">
              {userInfo && userInfo.isAdmin && (
                <button
                  type="button"
                  onClick={addProductHandler}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
                >
                  Agregar Producto
                </button>
              )}
              <div className="flex flex-wrap -m-4">
                {products.map(
                  (product) =>
                    (product.countInStock > 0 ||
                      (userInfo && userInfo.isAdmin)) && (
                      <div
                        className="p-4 w-full sm:w-1/2 lg:w-1/3 xl:w-1/4"
                        key={product.id}
                      >
                        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                          <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200 group-hover:opacity-75 lg:h-64">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="h-full w-full object-cover object-center"
                            />
                          </div>
                          <div className="p-4">
                            <h3 className="text-sm text-gray-700 font-medium">
                              {userInfo && userInfo.isAdmin ? (
                                <Link to={`/editProduct/${product._id}`}>
                                  {product.name}
                                </Link>
                              ) : (
                                <Link to={`/products/${product._id}`}>
                                  {product.name}
                                </Link>
                              )}
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">
                              Opiniones del combo: {product.numReview}
                            </p>
                            <p className="mt-1 text-sm text-gray-500">
                              Cantidad disponible: {product.countInStock}
                            </p>
                            <p className="mt-2 text-sm font-medium text-gray-900">
                              ${product.price}
                            </p>
                          </div>
                        </div>
                      </div>
                    )
                )}

                {/* <div
                        className="p-4 w-full sm:w-1/2 lg:w-1/3 xl:w-1/4"
                        key={product.id}
                      >
                        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                          <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200 group-hover:opacity-75 lg:h-64">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="h-full w-full object-cover object-center"
                            />
                          </div>
                          <div className="p-4">
                            <h3 className="text-sm text-gray-700 font-medium">
                              {userInfo && userInfo.isAdmin ? (
                                <Link to={`/editProduct/${product._id}`}>
                                  {product.name}
                                </Link>
                              ) : (
                                <Link to={`/products/${product._id}`}>
                                  {product.name}
                                </Link>
                              )}
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">
                              Opiniones del combo: {product.numReview}
                            </p>
                            <p className="mt-1 text-sm text-gray-500">
                              Cantidad disponible: {product.countInStock}
                            </p>
                            <p className="mt-2 text-sm font-medium text-gray-900">
                              ${product.price}
                            </p>
                          </div>
                        </div>
                      </div> */}
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default Products;
