import React from "react";
import { FooterLink } from "../components/styledComponents/FooterStyled"

function Footer({ data, link }: footerInterface) {
  return (
    <FooterLink href={link}>
      <span>{data}</span>
    </FooterLink>
  );
}

export default Footer;
