import { ArrowLeftOutlined, ArrowRightOutlined } from "@material-ui/icons";
import { useState } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";


const Container = styled.div`
  width: 100%;
  min-height: 80vh;
  height: max-content;
  display: flex;
  position: relative;
  overflow: hidden;
`;

const Arrow = styled.div`
  width: 50px;
  height: 50px;
  background-color: #fff7f7;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${(props) => props.direction === "left" && "10px"};
  right: ${(props) => props.direction === "right" && "10px"};
  margin: auto;
  cursor: pointer;
  opacity: 0.5;
  z-index: 2;
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transition: all 1.5s ease;
  transform: translateX(${(props) => props.slideIndex * -100}vw);
  ${mobile({ flexDirection: "column" })}
`;

const Slide = styled.div`
  width: 100vw;
  min-height: 80vh;
  display: flex;
  height: max-content;
  flex-wrap: wrap;
  align-items: center;
  background-color: #${(props) => props.bg};
`;

const ImgContainer = styled.div`
  height: 100%;
  margin-top: 3%;
  margin-left: 10%;
  flex: 1;
  ${mobile({ marginLeft: "2%"})}
`;

const Image = styled.img`
  height: 80%;
  ${mobile({ height: "300px", marginLeft: "10%"})}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 50px;
`;

const Title = styled.h1`
  font-size: 70px;
  ${mobile({ fontSize: "40px" })}
`;

const Desc = styled.p`
  margin: 50px 0px;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 3px;
`;

const Button = styled.button`
  padding: 10px;
  font-size: 20px;
  background-color: transparent;
  cursor: pointer;
`;

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const handleClick = (direction) => {
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
    } else {
      setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
    }
  };

  return (
    <Container data-aos="zoom-in-up">
      <Arrow direction="left">
        <ArrowLeftOutlined />
      </Arrow>
      <Wrapper slideIndex={slideIndex}>
          <Slide bg={"white"} key={2}>
            <ImgContainer>
              <Image src={"https://i.pinimg.com/564x/6d/cd/6c/6dcd6cad29b6dabef9eaef7bac7fb4fb.jpg"} />
            </ImgContainer>
            <InfoContainer>
              <Title>{"Threads And Textiles"}</Title>
              <Desc>{"HIGH QUALITY SPORT-WEARS, T-SHIRTS, UNIFORMS AND ACCESSORIES"}</Desc>
              <Button onClick={() => {window.location = "/home"}}>SHOP NOW</Button>
            </InfoContainer>
          </Slide>
      </Wrapper>
      <Arrow direction="right">
        <ArrowRightOutlined />
      </Arrow>
    </Container>
  );
};

export default Slider;
