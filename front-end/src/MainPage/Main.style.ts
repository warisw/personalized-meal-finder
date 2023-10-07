import { LabelHTMLAttributes } from "react";
import styled, { css } from "styled-components";
import { Button, Input } from "@mui/material";

export const Container = styled.div`
  ${() => css`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  `};
`;

export const InnerContainer = styled.div`
  ${() => css`
    display: flex;
    width: 100%;
    align-items: center;
    flex-direction: column;
    min-width: fit-content;
  `};
`;
export const Loader = styled.div`
  ${() => css`
    background-color: rgb(207, 194, 252, 0.8);
    border-radius: 24px;
    padding: 1.5rem;
  `};
`;

export const InputContainer = styled.div`
  ${() => css`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    min-width: fit-content;
    padding: 1rem;
    width: 80%;
    border-radius: 25px;
    background-color: rgb(207, 194, 252, 0.8);
    margin-bottom: 5rem;
  `};
`;
export const InputInnerCont = styled.div`
  ${() => css`
    display: flex;
    flex-direction: row;
  `};
`;

export const Label = styled.div<LabelHTMLAttributes<HTMLLabelElement>>`
  ${() => css`
    padding: 1rem 0.5rem;
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
    color: rgba(229, 253, 209, 1);
  `};
`;

export const SettingsContainer = styled.div`
  ${() => css`
    position: relative;
    z-index: 1;
    top: -35px;
    right: -40%;
  `};
`;

export const Header = styled.div`
  ${() => css`
    position: fixed;
    font-family: "Indie Flower";
    font-size: 3rem;
    background-color: rgba(229, 253, 209, 0.6);
    width: 100%;
    z-index: 1;
    top: 0;
  `};
`;

export const MealContainer = styled.div`
  ${() => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80%;
    padding: 0.4rem;
    margin-top: 1rem;
    margin-bottom: 3rem;
    border-radius: 25px;
    background-color: rgb(207, 194, 252, 0.8);
  `};
`;

export const MealTitle = styled.div`
  ${() => css`
    font-family: "Indie Flower";
    font-size: 2rem;
    margin-bottom: 1rem;
  `};
`;

type ButtonTypes = { disabled?: boolean };
export const SubmitButton = styled(Button)<ButtonTypes>`
  ${(disabled) => css`
    ${disabled && "color:red;"}
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

export const RecipeHistoryDropdown = styled.select`
  ${() => css`
    position: relative;
    top: 70px;
    left: -35%;
    padding: 0.5rem 0.7rem;
    font-size: 16px;
    font-family: "Lato";
    font-style: italic;
    background-color: rgb(207, 194, 252, 0.8);
    width: 20%;
    margin-bottom: 1rem;
    border-bottom-left-radius: 18px;
    border-bottom-right-radius: 18px;
    border-top: none;
  `};
`;
