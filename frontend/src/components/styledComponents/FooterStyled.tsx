import styled, { css } from "styled-components";
import {flexBoxStyles} from "./utilityFiles/styledFunctions"
import { primaryFontColor } from './utilityFiles/variables'

interface footerDivProps{
    margin : string
}

const FooterRow = styled.div`
  ${flexBoxStyles("row")}
  flex-wrap: wrap;
  margin: 5px 0;
`;

const FooterLink = styled.a`
  color: ${primaryFontColor};
  text-decoration: none;
  margin-left: 5px;
  margin-right: 5px;
  font-size: 13px;
  font-weight: 500;
  &:visited{
    color: ${primaryFontColor};
  }
`;

const FooterDiv = styled.div`
  ${flexBoxStyles("column")}
  margin-top: ${({margin}:footerDivProps) => margin} ;
  margin-bottom: 60px;
`;

export { FooterDiv, FooterRow, FooterLink };
