import { Add, Remove } from "@material-ui/icons";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import StripeCheckout from "react-stripe-checkout";
import { useEffect, useState } from "react";
import { userRequest } from "../requestMethods";
import { Navigate, useHistory, useNavigate } from "react-router";
import Cartp from "../components/Cartp";
import { Link } from "react-router-dom";

const KEY = process.env.REACT_APP_STRIPE;

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopButtond = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
  ${mobile({ display: "none" })}

`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;



const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

const Cart = ({ setSumx, setCartx, quantity, setQuantity }) => {
  const [cart, setCart] = useState([]);
  const [id, setId] = useState([]);
  const [items, setItems] = useState(0);
  var [sum, setSum] = useState(0);
  const navigate = useNavigate()

  const getCart = async () => {
    const response = await fetch(`https://threadsandtextiles.adaptable.app/api/carts/find/${localStorage.getItem("name")}`, {
      method: "GET",
      headers: ({
        "Content-Type": "application/json"
      })
    })
    const data = await response.json()
    setId(data ? data._id : 0)
    setCart(data ? data.products : [])
    setCartx(data ? data.products : [])
    setItems(data ? data.products.length : 0)
    console.log(cart[0])

    if (data) {
      for (let i = 0; i < data.products.length; i++) {
        sum = (sum * 1) + (data.products[i].price)
        setSum(sum)
        setSumx(sum)
      }
    }
    else {

    }

  }

  useEffect(() => {
    getCart()
  }, [])

  const clearCart = async () => {
    const response = await fetch(`https://threadsandtextiles.adaptable.app/api/carts/${localStorage.getItem("name")}`, {
      method: "DELETE"
    })
    const data = await response.json()
    console.log(data)
    if(data) {
      window.location = "/"
    }
  }



  return (
    <Container>
      <Navbar quantity={quantity} setQuantity={setQuantity} />
      <Announcement />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <TopButton onClick={() => { navigate("/home") }}>CONTINUE SHOPPING</TopButton>
          <TopTexts>
            <TopText>Shopping Bag({items})</TopText>
            <TopText>Your Wishlist (0)</TopText>
          </TopTexts>
          <TopButton type="filled" onClick={clearCart}>Clear Cart</TopButton>
          <TopButtond type="filled">CHECKOUT NOW</TopButtond>
        </Top>
        <Bottom>
          <Info>
            {(cart).map((product) => (
              <Cartp product={product} cart={cart} id={id}/>
            ))}
            <Hr />
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>₦ {sum}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>₦ 0</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>₦ 0</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>₦ {sum}</SummaryItemPrice>
            </SummaryItem>
            <Link to="/checkout" sum={sum} cart={cart} id={id}>
              <Button>CHECKOUT NOW</Button>
            </Link>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
