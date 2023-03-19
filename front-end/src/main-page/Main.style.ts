import { LabelHTMLAttributes } from "react";
import styled, { css } from "styled-components";
import { Input } from "@mui/material";

export const Container = styled.div`
  ${() => css`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100vh;
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
    font-family: "Indie Flower";
    font-size: 3rem;
    margin-bottom: 3rem;
  `};
`;

export const Header = styled.div`
  ${() => css`
    font-family: "Indie Flower";
    font-size: 3rem;
    background-color: #e5fdd1;
    width: 100%;
    position: fixed;
    top: 0;
  `};
`;
