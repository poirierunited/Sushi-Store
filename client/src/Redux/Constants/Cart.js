export const ADD_ITEM_TO_CART = "ADD_ITEM_TO_CART";
export const REMOVE_ITEM_FROM_CART = "REMOVE_ITEM_FROM_CART";
export const CART_ITEM_CLEAR = "CART_ITEM_CLEAR";

export const CART_SAVE_SHIPPING_ADDRESS = "CART_SAVE_SHIPPING_ADDRESS";
export const SAVE_PAYMENT_METHOD = "SAVE_PAYMENT_METHOD";

// Las constantes de acción se utilizan en Redux para:

// 	•	Evitar errores tipográficos: Si las acciones se definen como constantes,
// el riesgo de escribir incorrectamente el nombre de una acción en múltiples lugares del
// código es menor. Si cometes un error tipográfico en una constante, recibirás un error inmediato del sistema, pero si escribes el tipo de acción directamente como una cadena de texto, ese tipo de errores será más difícil de detectar.

// 	•	Facilitar la reutilización: Las constantes permiten que las acciones se
// definan una sola vez y luego se utilicen en cualquier parte del código,
// lo que hace que el código sea más mantenible.

// 	•	Mejorar la organización: Cuando un proyecto crece, usar constantes para las
// acciones ayuda a mantener una estructura organizada, ya que las diferentes acciones
// se centralizan en un archivo de constantes. Esto es especialmente útil en aplicaciones
// grandes donde el flujo de acciones puede ser complejo.
