import {
  Cancel,
  FavoriteBorderOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  SwapVerticalCircleOutlined,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { Modal } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";



const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
`;

const Container = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 280px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative;

  &:hover ${Info}{
    opacity: 1;
  }
`;

const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
`;

const Image = styled.img`
  height: 75%;
  z-index: 2;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;

const Product = ({ item, quantity, setQuantity }) => {

  const [cartId, setId] = useState(0);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const getId = async () => {
    const response = await fetch(`https://threadsandtextiles.adaptable.app/api/carts/findmycart/${localStorage.getItem("name")}`, {
      method: "GET"
    })
    const data = await response.json()
    setId(data)
  };

  useEffect(() => {
    getId();
  }, []);

  const createCart = async () => {
    getId()
    const response = await fetch("https://threadsandtextiles.adaptable.app/api/carts", {
      method: "POST",
      headers: ({ "Content-Type": "application/json" }),
      body: JSON.stringify({
        user: localStorage.getItem("name"),
        products: [
          {
            name: item.title,
            image: item.img,
            price: item.price,
            quantity: 1,
            size: item.size[0],
            color: item.color[0]
          }
        ]
      })
    })
    const data = await response.json()
    console.log(data)
    handleShow()
    window.location = "/home"
  }

  const addToCart = async () => {
    const response = await fetch(`https://threadsandtextiles.adaptable.app/api/carts/${cartId}`, {
      method: "PUT",
      headers: ({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify({
        product: {
          name: item.title,
          image: item.img,
          price: item.price,
          quantity: 1,
          size: item.size[0],
          color: item.color[0]
        }
      })
    })
    const data = await response.json()
    console.log(data)
    handleShow()
  }

  const handleClick = () => {
    if (localStorage.getItem("name")) {
      if (cartId == "") {
        createCart()
        setQuantity(quantity++)
        setQuantity(quantity)
      }
      else {
        addToCart()
        setQuantity(quantity++)
        setQuantity(quantity)
      }
    }
    else {
     navigate("/register")
    }
  }

  const handleClose = () => {
    setShow(false)
  };

  const handleShow = () => {
    setShow(true)
  };

  return (
    <Container>
      <Circle />
      <Image src={item.img} />
      <Info>
        <Icon>
          <ShoppingCartOutlined onClick={handleClick} />
        </Icon>
        <Icon>
          <Link to={`/product/${item._id}`}>
            <SearchOutlined />
          </Link>
        </Icon>
        <Icon>
          <ShoppingCartOutlined onClick={handleClick} />
        </Icon>
      </Info>
      <Modal show={show}>
        <Modal.Header closeButton onClick={handleClose}>
          <Modal.Title><h3>Congratulations!! <span style={{ color: "green", fontSize: "smaller" }}> {item.title} </span> Has Been Added To Your Cart</h3></Modal.Title>
        </Modal.Header>

        <Modal.Footer>
          <ShoppingCartOutlined style={{ color: "#0b7fab", fontSize: "large" }} onClick={() => { navigate("/cart") }} />
          <Cancel style={{ color: "red", fontSize: "large" }} onClick={handleClose} />
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Product;
