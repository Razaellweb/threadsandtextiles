import Product from "./pages/Product";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Success from "./pages/Success";
import { useSelector } from "react-redux";
import Checkout from "./pages/Checkout";
import { useEffect, useState } from "react";
import "./main.css";
import LandingPage from "./pages/landingPage";

const App = () => {
  const user = useSelector((state) => state.user.currentUser);
  const [sumx, setSumx] = useState(0);
  const [cartx, setCartx] = useState([]);
  const [quantity, setQuantity] = useState(0);

  const getCart = async () => {
    const response = await fetch(
      `https://threadsandtextiles.adaptable.app/api/carts/find/${localStorage.getItem(
        "name"
      )}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    setQuantity(data ? data.products.length : 0);
  };

  useEffect(() => {
    getCart();
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/"
          component={LandingPage}
          element={<LandingPage quantity={quantity} setQuantity={setQuantity} />}
        ></Route>
        <Route
          exact
          path="/home"
          component={Home}
          element={<Home quantity={quantity} setQuantity={setQuantity} />}
        ></Route>
        <Route
          path="/products/:category"
          component={ProductList}
          element={
            <ProductList quantity={quantity} setQuantity={setQuantity} />
          }
        ></Route>
        <Route
          path="/product/:id"
          component={Product}
          element={<Product quantityx={quantity} setQuantityx={setQuantity} />}
        ></Route>
        <Route
          path="/cart"
          component={Cart}
          element={
            <Cart
              sumx={sumx}
              setSumx={setSumx}
              cartx={cartx}
              setCartx={setCartx}
              quantity={quantity}
              setQuantity={setQuantity}
            />
          }
        ></Route>
        <Route
          path="/success"
          component={Success}
          element={<Success quantity={quantity} setQuantity={setQuantity} />}
        ></Route>
        <Route
          path="/checkout"
          component={Checkout}
          element={
            <Checkout
              quantity={quantity}
              setQuantity={setQuantity}
              sumx={sumx}
              setSumx={setSumx}
              cartx={cartx}
              setCartx={setCartx}
            />
          }
        ></Route>
        <Route path="/login" component={Login} element={<Login />}></Route>
        <Route
          path="/register"
          component={Register}
          element={<Register />}
        ></Route>
      </Routes>
    </Router>
  );
};

export default App;
