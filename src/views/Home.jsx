import "../assets/css/Home.css";
import { useContext } from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Contexto from "../context/Contexto";
import "../assets/css/Home.css";

const Home = () => {
  const { pizzas, cart, setCart } = useContext(Contexto);

  const isPizzaInCart = (pizza) => {
    return cart.some((item) => item.id === pizza.id);
  };

  const handleAddToCart = (pizza) => {
    if (isPizzaInCart(pizza)) {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === pizza.id ? { ...item, cantidad: item.cantidad + 1 } : item
        )
      );
    } else {
      setCart((prevCart) => [...prevCart, { ...pizza, cantidad: 1 }]);
    }
  };

  return (
    <div className="card-container">
      {pizzas?.map((pizza) => (
        <Card key={pizza.id} style={{ width: "18rem" }}>
          <Card.Img src={pizza.img} />
          <Card.Body>
            <Card.Title className="home-title">{pizza.name}</Card.Title>
            <hr className="title-line" />
            <h6>Ingredientes:</h6>
            <ul>
              {pizza.ingredients?.map((ingredient) => (
                <li key={ingredient}>🍕 {ingredient}</li>
              ))}
            </ul>
            <hr className="title-line" />
            <Card.Text className="home-precio">{`$ ${pizza.price.toLocaleString("es-CL")}`}</Card.Text>
            <Link to={`/pizza/${pizza.id}`}>
              <Button variant="primary" type="submit">
                Ver Más 👀
              </Button>
            </Link>
            <Button variant="danger" onClick={() => handleAddToCart(pizza)}>
              Añadir 🛒
            </Button>{" "}
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default Home;
