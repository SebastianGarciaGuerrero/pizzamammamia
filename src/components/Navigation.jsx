import { useContext } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Contexto from "../context/Contexto"; // Asegúrate de importar el componente Carrito

const Navigation = () => {
  const { totalPrecio } = useContext(Contexto);

  const setActiveClass = ({ isActive }) => {
    const aux = "text-decoration-none me-3";
    return isActive ? `text-white ${aux}` : `text-secondary ${aux}`;
  };

  return (
    <Navbar expand="lg" bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand>
          <NavLink to="/" className="text-white text-decoration-none">
          🍕 Pizzeria Mamma Mia
          </NavLink>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <NavLink to="/" className={setActiveClass}>
              Home
            </NavLink>
            <NavLink to="/carrito" className={setActiveClass}>
              🛒 {totalPrecio}
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
