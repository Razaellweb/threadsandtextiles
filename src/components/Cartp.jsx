import React from 'react'
import styled from "styled-components";
import { mobile } from "../responsive";
import { Add, Cancel, CancelOutlined, CancelPresentationRounded, CancelPresentationSharp, CancelScheduleSendSharp, Remove } from "@material-ui/icons";
import { Navigate, useAsyncError, useNavigate } from 'react-router-dom';



const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 20px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Cartp = ({ product, cart, id }) => {

  const navigate = useNavigate()

  const removeItem = async () => {
    var ogh = cart.filter((item) => item.name != product.name)
    console.log(ogh)
    const response = await fetch(`https://threadsandtextiles.adaptable.app/api/carts/edit/${id}`, {
      method: "POST",
      headers: ({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify({
        product: ogh
      })
    })

    const data = await response.json()
    console.log(data)
    window.location = "/cart"
  }
  return (
    <div>
      <>
        <Product>
          <ProductDetail>
            <Image src={product.image} />
            <Details>
              <ProductName>
                <b>Product:</b> {product.name}
              </ProductName>
              <ProductColor color={product.color} />
              <ProductSize>
                <b>Size:</b> {product.size}
              </ProductSize>
            </Details>
          </ProductDetail>
          <PriceDetail>
            <ProductAmountContainer>
              <ProductAmount>{product.quantity}</ProductAmount>
            </ProductAmountContainer>
            <ProductPrice>
              ₦ {product.price}
            </ProductPrice>
          </PriceDetail>
          <Cancel onClick={removeItem} style={{ color: "red", borderColor: "white", cursor: "pointer" }} />
        </Product>
        <hr />
      </>
    </div>
  )
}

export default Cartp