export const addCart = (product) => {
  if (typeof window !== "undefined") {
    // client-side operation such as local storage.
    let state = JSON.parse(localStorage.getItem("cartItems"));
    if (state) {
      const existingItemIndex = state?.cart_items?.findIndex(
        (item) => item.id === product.id
      );
      let updatedCartItems;
      if (existingItemIndex !== -1) {
        updatedCartItems = state?.cart_items?.map((item, index) => {
          if (index === existingItemIndex) {
            return {
              ...item,
              isChecked: false,
              quantity: item.quantity + product.quantity,
              total: (item.quantity + product.quantity) * item.listPrice,
            };
          }
          return item;
        });
      } else {
        updatedCartItems = [
          ...state.cart_items,
          { ...product, total: product.quantity * product.listPrice },
        ];
      }

      let total = 0;
      updatedCartItems?.forEach((item) => {
        total += item.total || item.quantity * item.listPrice;
      });

      const updatedState = {
        ...state,
        total: total,
        cart_items: updatedCartItems,
      };

      localStorage.setItem("cartItems", JSON.stringify(updatedState));
      window.dispatchEvent(new Event("storage"));
    } else {
      const updatedState = {
        cart_items: [
          { ...product, total: product.quantity * product.listPrice },
        ],
        total: product?.total,
      };
      localStorage.setItem("cartItems", JSON.stringify(updatedState));
      window.dispatchEvent(new Event("storage"));
    }
  }
};

export const getCart = () => {
  if (typeof window !== "undefined") {
    let state = JSON.parse(localStorage.getItem("cartItems"));
    return state;
  }
};

export const removeFromCart = (listProduct) => {
  if (typeof window !== "undefined") {
    let total = 0;
    listProduct?.forEach((item) => {
      total += item.total || item.quantity * item.listPrice;
    });

    const updatedState = {
      total: total,
      cart_items: listProduct,
    };
    localStorage.setItem("cartItems", JSON.stringify(updatedState));
    window.dispatchEvent(new Event("storage"));
  }
};

export const addQuantityProduct = (listProduct) => {
  if (typeof window !== "undefined") {
    let total = 0;
    listProduct?.forEach((item) => {
      total += item.total || item.quantity * item.listPrice;
    });

    const updatedState = {
      total: total,
      cart_items: listProduct,
    };
    localStorage.setItem("cartItems", JSON.stringify(updatedState));
    window.dispatchEvent(new Event("storage"));
  }
};

export const removeQuantityProduct = (listProduct) => {
  if (typeof window !== "undefined") {
    let total = 0;
    listProduct?.forEach((item) => {
      total += item.total || item.quantity * item.listPrice;
    });

    const updatedState = {
      total: total,
      cart_items: listProduct,
    };
    localStorage.setItem("cartItems", JSON.stringify(updatedState));
    window.dispatchEvent(new Event("storage"));
  }
};
