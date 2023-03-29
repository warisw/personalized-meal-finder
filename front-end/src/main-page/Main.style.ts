import { LabelHTMLAttributes } from "react";
import styled, { css } from "styled-components";
import { Input } from "@mui/material";

export const Container = styled.div`
  ${() => css`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    background-color: #b5f1cc;
  `};
`;

export const InnerContainer = styled.div`
  ${() => css`
    display: flex;
    width: 100%;
    align-items: center;
    flex-direction: column;
  `};
`;

export const InputContainer = styled.div`
  ${() => css`
    display: flex;
    justify-content: flex-start;

    padding: 1rem;
    width: 80%;
    border-radius: 25px;
    background-color: #cfc2fc;
    margin-bottom: 5rem;
  `};
`;

export const Label = styled.div<LabelHTMLAttributes<HTMLLabelElement>>`
  ${() => css`
    padding: 1rem;
    font-size: 24px;
    min-width: fit-content;
    font-family: "Indie Flower";
  `};
`;

export const CustomInput = styled(Input)`
  ${() => css`
    padding: 0.5rem;
    font-size: 22px !important;
    font-family: "Lato" !important;
    font-style: italic;
    width: 80%;
  `};
`;

export const Title = styled.div`
  ${() => css`
    margin-top: 10rem;
    font-family: "Indie Flower";
    font-size: 3rem;
    margin-bottom: 3rem;
  `};
`;

export const Header = styled.div`
  ${() => css`
    position: sticky;
    font-family: "Indie Flower";
    font-size: 3rem;
    background-color: #e5fdd1;
    width: 100%;
    z-index: 11;
    top: 0;
  `};
`;

export const MealOutput = styled.div`
  margin-top: 20px;
  padding: 10px;
  background-color: #f5f5f5;
  border-radius: 5px;

  p {
    margin: 0;
    line-height: 1.5;
  }

  h4 {
    margin-top: 20px;
    margin-bottom: 10px;
    font-weight: bold;
  }

  ul {
    margin-top: 0;
    margin-bottom: 20px;
    list-style-type: none;
    padding: 0;
  }

  li {
    margin-bottom: 5px;
    font-size: 14px;
    line-height: 1.5;
  }
`;

export const MealContainer = styled.div`
  ${() => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80%;
    padding: 0.4rem;
    margin-top: 1rem;
    border-radius: 25px;
    background-color: #cfc2fc;
  `};
`;

export const MealTitle = styled.div`
  ${() => css`
    font-family: "Indie Flower";
    font-size: 2rem;
    margin-bottom: 1rem;
  `};
`;

export const MealDetails = styled.div`
  ${() => css`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-family: "Lato";
    font-size: 1.2rem;
    line-height: 1.5;
    margin-bottom: 1rem;
  `};
`;
