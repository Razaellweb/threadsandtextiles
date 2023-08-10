import { useEffect, useState } from "react";
import styled from "styled-components";
import { popularProducts } from "../data";
import Product from "./Product";
import axios from "axios";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Products = ({ cat, filters, sort, quantity, setQuantity }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      
      const response = await fetch(cat ? `https://threadsandtextiles.adaptable.app/api/products/find/category/${cat}` : "https://threadsandtextiles.adaptable.app/api/products", {
        method: "GET"
      })
      const data = await response.json()
      setProducts(data)
      console.log(data)
     
    };
    getProducts();
  }, [cat]);

  useEffect(() => {
    if (sort === "newest") {
      setProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);

  return (
    <Container>
      {cat
        ? products.map((item) => <Product item={item} key={item.id} quantity={quantity} setQuantity={setQuantity}/>)
        : products
            .map((item) => <Product item={item} key={item.id} quantity={quantity} setQuantity={setQuantity}/>)}
    </Container>
  );
};

export default Products;
