import styled, { css } from "styled-components";
import { globalFacebookColor } from './variables';

function globalFontFamily(){
  return css`
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  `
}

function flexBoxStyles(direction: string) {
    return css`
      display: flex;
      flex-direction: ${direction};
      align-items: center;
      justify-content: center;
    `;
}
function blueButtonStyles(width : string){
  return css`
    border: 1px solid transparent;
    width: ${width};
    line-height: 18px;
    font-size: 14px;
    font-weight: 600;
    padding: 5px 9px;
    text-align: center;
    background-color: ${globalFacebookColor};
    color: white;
    cursor: pointer;
    border-radius: 4px;
  `
}
function w25(){
  return css`
    width: 350px;
    min-width: 350px;
  `
}
function commonContainer(){
  return css`
    border: 1px solid #d2d2d2;
    background-color: white;
    margin: 5px 0;
    padding: 15px 10px;
  `
}

export {flexBoxStyles, blueButtonStyles, globalFontFamily, w25, commonContainer}