import { Badge } from "@material-ui/core";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";


const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Navbar = ({quantity, setQuantity}) => {
  const [out, setOut] = useState("none")
  const [cart, setCart] = useState([])
  const [ind, setInd] = useState("block")
  const navigate = useNavigate()

  useEffect(() => {
    var name = localStorage.getItem("name")
    if (name) {
      setOut("block")
      setInd("none")
    }
    else {
      setOut("none")
      setInd("block")
    }
  }, [])

  const getCart = async () => {
    const response = await fetch(`https://threadsandtextiles.adaptable.app/api/carts/find/${localStorage.getItem("name")}`, {
      method: "GET",
      headers: ({
        "Content-Type": "application/json"
      })
    })

    const data = await response.json()
    setCart(data)
    console.log(cart)
  }

  useEffect(() => {
    getCart()
  }, [])

  const logout = () => {
    localStorage.clear()
    navigate("/")
  }
  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input placeholder="Search" />
            <Search style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer>
        </Left>
        <Center>
          <Link to="/" style={{ color: "black", textDecoration: "none" }}>
            <Logo>T&T.</Logo>
          </Link>
        </Center>
        <Right>
          <Link to="/register" style={{ color: "black", textDecoration: "none", display: ind }}>
            <MenuItem>REGISTER</MenuItem>
          </Link>
          <Link to="/login" style={{ color: "black", textDecoration: "none", display: ind }}>
            <MenuItem>SIGN IN</MenuItem>
          </Link>
          <Link to="/" style={{ color: "black", textDecoration: "none", display: out }}>
            <MenuItem onClick={logout}>Logout</MenuItem>
          </Link>
          <Link to="/cart">
            <MenuItem>
              <Badge badgeContent={quantity} color="primary">
                <ShoppingCartOutlined />
              </Badge>
            </MenuItem>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
