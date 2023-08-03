import { useContext } from "react";
import { Button, Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Contexto from "../context/Contexto";
import "../assets/css/Pizzas.css"

const Pizza = () => {
  const { id } = useParams();
  const { pizzas, cart, setCart } = useContext(Contexto);

  const [pizza] = pizzas?.filter((pizza) => pizza?.id === id) ?? [];

  if (!pizza) {
    return <div>Esa Pizza aún no llega a nuestro menú</div>;
  }

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
    <div className="pizzas-container">
      <Card style={{ width: "100%" }}>
      <div className="card-container">
        <div className="img-column">
          <Card.Img className="card-img-top" variant="top" src={pizza.img} />
        </div>
        <div className="content-column">
          <Card.Title className="pizza-titulo">{pizza.name}</Card.Title>
          <hr className="title-line" />
          <Card.Text className="pizza-desc">{pizza.desc}</Card.Text>
          <h6>Ingredientes:</h6>
          <ul>
            {pizza.ingredients?.map((ingredient) => (
              <li key={ingredient}>🍕{ingredient}</li>
            ))}
          </ul>
          <div className="price-and-button">
          <Card.Text className="pizza-precio">Precio: {`$ ${pizza.price.toLocaleString("es-CL")}`}</Card.Text>
            <Button variant="danger" className="btn-add" onClick={() => handleAddToCart(pizza)}>
              Añadir 🛒
            </Button>
          </div>
        </div>
      </div>
    </Card>

    </div>
    
  );
};

export default Pizza;
