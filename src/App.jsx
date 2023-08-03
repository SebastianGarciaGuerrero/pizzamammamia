import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Navigation from "./components/Navigation";
import Home from "./views/Home";
import Pizza from "./views/Pizza";
import Carrito from "./views/Carrito";
import Error from "./views/Error";
import Contexto from "./context/Contexto";

function App() {
  const [pizzas, setPizzas] = useState([]);
  const [cart, setCart] = useState([]);
  const url = "/pizzas.json"

  const getData = async (url) => {
    try {
      const resp = await fetch(url);
      const data = await resp.json();

      setPizzas(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getData(url);
  }, []);

  const totalPrecio = cart.reduce(
    (total, item) => total + item.price * item.cantidad,
    0
  );

  const globalState = {
    pizzas,
    cart,
    setCart,
    totalPrecio,
  }

  return (
    <>
      <Contexto.Provider value={ globalState }>
        <BrowserRouter>
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/carrito" element={<Carrito />} />
            <Route path="/pizza/:id" element={<Pizza />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </BrowserRouter>
      </Contexto.Provider>
    </>
  );
}

export default App;
