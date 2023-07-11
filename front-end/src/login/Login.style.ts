import styled, { css } from "styled-components";
import { FormHTMLAttributes } from "react";

export const Container = styled.div`
  ${() => css`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-image: url(${require("../images/foodLogin.jpg")});

    background-repeat: no-repeat;
    background-size: cover;

    height: 100vh;
  `};
`;

export const InnerContainer = styled.div`
  ${() => css`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border: 2px solid #cff2fc;
    border-radius: 25px;
    padding: 4rem 10rem;
    background-color: #cfc2fc;
    box-shadow: 5px 6px 7px #bfcfff;
  `};
`;

export const Form = styled.div<FormHTMLAttributes<HTMLFormElement>>`
  ${() => css`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  `};
`;

export const TitleLabel = styled.div`
  ${() => css`
    font-family: "Indie Flower";
    font-size: 3rem;

    position: absolute;
    height: 5.5rem;
    background-image: url(${require("../images/sandw.png")});
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 70px;
    padding: 10px 20px;
    top: 10px;
    left: 50px;
  `};
`;

export const Title = styled.div`
  ${() => css`
    font-family: "Indie Flower";
    font-size: 3rem;
    margin-bottom: 3rem;
  `};
`;

export const Input = styled.input`
  ${() =>
    css`
      margin-bottom: 0.5rem;
      border: 2px solid #cfc2fc;
      border-radius: 20px;
      padding: 0.5rem 2rem;
    `};
`;

export const Submit = styled.input`
  ${() =>
    css`
      padding: 0.5rem 1.5rem;
      border: 2px solid #cfc2fc;
      border-radius: 20px;
      background-color: #aafdff;
    `};
`;

export const Error = styled.div`
  ${() => css`
    color: red;
    margin: 1rem 0;
  `};
`;
