import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import { mobile } from "../responsive";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { publicRequest } from "../requestMethods";
import { addProduct } from "../redux/cartRedux";
import { useDispatch } from "react-redux";
import { popularProducts } from "../data";
import { Modal } from 'react-bootstrap';
import {
  Cancel,
  FavoriteBorderOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  SwapVerticalCircleOutlined,
} from "@material-ui/icons";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection: "column" })}
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
  ${mobile({ height: "40vh" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;

  &:hover {
   border: .5px solid black;
  }
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background-color: #f8f4f4;
  }
`;

const Product = ({ quantityx, setQuantityx }) => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [product, setProduct] = useState(popularProducts[1]);
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [cartId, setId] = useState("");
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const navigate = useNavigate()


  useEffect(() => {
    const getProduct = async () => {
      const response = await fetch(`https://threadsandtextiles.adaptable.app/api/products/find/${id}`, {
        method: "GET"
      })
      const data = await response.json()
      setProduct(data)
      setColor(data.color[0])
      setSize(data.size[0])
    };
    getProduct();
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

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

  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };

  const handleClose = () => {
    setShow(false)
  };

  const handleShow = () => {
    setShow(true)
  };

  const createCart = async () => {
    const response = await fetch("https://threadsandtextiles.adaptable.app/api/carts", {
      method: "POST",
      headers: ({ "Content-Type": "application/json" }),
      body: JSON.stringify({
        user: localStorage.getItem("name"),
        products: [
          {
            name: product.title,
            image: product.img,
            price: quantity * product.price,
            quantity,
            size,
            color
          }
        ]
      })
    })
    const data = await response.json()
    console.log(data)
    handleShow()
  }

  const addToCart = async () => {
    const response = await fetch(`https://threadsandtextiles.adaptable.app/api/carts/${cartId}`, {
      method: "PUT",
      headers: ({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify({
        product: {
          name: product.title,
          image: product.img,
          price: quantity * product.price,
          quantity,
          size,
          color
        }
      })
    })
    const data = await response.json()
    console.log(data)
    handleShow()
  }

  const handleClick = () => {
    if (localStorage.getItem("name")){
      if (cartId == "") {
        createCart()
        setQuantityx(quantityx++)
        setQuantityx(quantityx)
        getId()
      }
      else {
        addToCart()
        setQuantityx(quantityx++)
        setQuantityx(quantityx)
        getId()
      }
    }
    else {
      navigate("/register")
    }
  }

  return (
    <Container>
      <Navbar quantity={quantityx} setQuantity={setQuantityx} />
      <Announcement />
      <Wrapper>
        <ImgContainer>
          <Image src={product.img} />
        </ImgContainer>
        <InfoContainer>
          <Title>{product.title}</Title>
          <Desc>{product.desc}</Desc>
          <Price>₦ {product.price}</Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Color</FilterTitle>
              {product.color?.map((c) => (
                <FilterColor color={c} key={c} onClick={() => setColor(c)} />
              ))}
            </Filter>
            <Filter>
              <FilterTitle>Size</FilterTitle>
              <FilterSize onChange={(e) => setSize(e.target.value)}>
                {product.size?.map((s) => (
                  <FilterSizeOption key={s}>{s}</FilterSizeOption>
                ))}
              </FilterSize>
            </Filter>
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              <Remove onClick={() => handleQuantity("dec")} />
              <Amount>{quantity}</Amount>
              <Add onClick={() => handleQuantity("inc")} />
            </AmountContainer>
            <Button onClick={handleClick}>ADD TO CART</Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <Newsletter />
      <Footer />
      <Modal show={show}>
        <Modal.Header closeButton onClick={handleClose}>
          <Modal.Title><h3>Congratulations!! <span style={{ color: "green", fontSize: "smaller" }}> {product.title} </span> Has Been Added To Your Cart</h3></Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <ShoppingCartOutlined style={{ color: "#0b7fab", fontSize: "large" }} onClick={() => { window.location = "/cart" }} />
          <Cancel style={{ color: "red", fontSize: "large" }} onClick={handleClose} />
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Product;
