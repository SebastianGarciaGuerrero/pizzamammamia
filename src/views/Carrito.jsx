import "../assets/css/Carrito.css"
import { useContext } from "react";
import { Button, Card } from "react-bootstrap";
import Contexto from "../context/Contexto";

const Carrito = () => {
  const { cart, setCart, totalPrecio } = useContext(Contexto);

  const handleRemoveFromCart = (id) => {
    const updatedCart = cart.map((item) =>
      item.id === id
        ? item.cantidad > 1
          ? { ...item, cantidad: item.cantidad - 1 }
          : null
        : item
    );

    setCart(updatedCart.filter((item) => item !== null));
  };

  const handleAddToCart = (id) => {
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, cantidad: item.cantidad + 1 } : item
    );
    setCart(updatedCart);
  };

  return (
    <div className="carrito-container">
      <h2 className="carrito-title">Carrito de compras</h2>
      {cart.length === 0 ? (
        <p>El carrito está vacío</p>
      ) : (
        cart.map((item) => (
          <Card key={item.id} style={{ width: "18rem" }}>
            <Card.Img className="carrito-img" src={item.img} />
            <Card.Body >
              <Card.Title className="carrito-title">{item.name}</Card.Title>
              <Card.Text>{item.price}</Card.Text>
              <p>Cantidad: {item.cantidad}</p>
              <Button
                variant="primary"
                onClick={() => handleRemoveFromCart(item.id)}
              >
                -
              </Button>
              <Button variant="danger" onClick={() => handleAddToCart(item.id)}>
                +
              </Button>
            </Card.Body>
          </Card>
        ))
      )}
      <p className="carrito-total">Total Precio: {totalPrecio}</p>
      <button className="btn-go-to-pay">Ir a pagar</button>
    </div>
  );
};

export default Carrito;
