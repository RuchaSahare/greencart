import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts, assets } from "../assets/assets";
import toast from "react-hot-toast";
import axios from "axios";

axios.defaults.withCredentials = true; // send cookies with API request
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY || "$";
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [isSeller, setIsSeller] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem("cartItems");
    return storedCart ? JSON.parse(storedCart) : {};
  });
  const [searchQuery, setSearchQuery] = useState({});

  // ======= Fetch user status, user data, cart items =======
  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/user/is-auth");
      if (data.success) {
        setUser(data.user);
        setCartItems(data.user.cartItems || cartItems);
      }
    } catch (error) {
      setUser(null);
    }
  };

  // ======= Fetch seller status =======
  const fetchSeller = async () => {
    try {
      const { data } = await axios.get("/api/seller/is-auth");
      setIsSeller(data.success ? true : false);
    } catch (error) {
      setIsSeller(false);
    }
  };

  // ======= Fetch all products =======
  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("/api/product/list");
      if (data.success) {
        setProducts(data.products);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  
  const addToCart = (itemId) => {
    const cartData = structuredClone(cartItems);
    cartData[itemId] = (cartData[itemId] || 0) + 1;
    setCartItems(cartData);
    localStorage.setItem("cartItems", JSON.stringify(cartData));
    toast.success("Added to Cart");
  };

  const updateCartItem = (itemId, quantity) => {
    const cartData = structuredClone(cartItems);
    cartData[itemId] = quantity;
    if (quantity === 0) delete cartData[itemId];
    setCartItems(cartData);
    localStorage.setItem("cartItems", JSON.stringify(cartData));
    toast.success("Cart Updated");
  };

  const removeFromCart = (itemId) => {
    const cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      cartData[itemId] -= 1;
      if (cartData[itemId] <= 0) delete cartData[itemId];
      setCartItems(cartData);
      localStorage.setItem("cartItems", JSON.stringify(cartData));
      toast.success("Removed from Cart");
    }
  };

  const getCartCount = () => {
    return Object.values(cartItems).reduce((acc, qty) => acc + qty, 0);
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const itemId in cartItems) {
      const product = products.find((p) => p._id === itemId);
      if (product && cartItems[itemId] > 0) {
        totalAmount += product.offerPrice * cartItems[itemId];
      }
    }
    return Math.floor(totalAmount * 100) / 100;
  };

  useEffect(() => {
    fetchSeller();
    fetchProducts();
    fetchUser();
  }, []);

 
  useEffect(() => {
    const updateCart = async () => {
      if (!user) return; 
      try {
        const { data } = await axios.post("/api/cart/update", { cartItems });
        if (!data.success) toast.error(data.message);
      } catch (error) {
        toast.error(error.message);
      }
    };

    updateCart();
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems, user]);


  const value = {
    fetchProducts,
    axios,
    getCartCount,
    getCartAmount,
    searchQuery,
    setSearchQuery,
    cartItems,
    removeFromCart,
    updateCartItem,
    addToCart,
    currency,
    navigate,
    user,
    setUser,
    isSeller,
    setIsSeller,
    showUserLogin,
    setShowUserLogin,
    products,
    setProducts,
    setCartItems,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);