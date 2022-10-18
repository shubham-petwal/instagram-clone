
type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;

const pageBgColor:HEX = `#f8f8f8`;
const whiteBackgroundColor:RGB = `rgb( 255, 255, 255 )`;
const borderColor:HEX = `#d2d2d2`;
const primaryFontColor:RGBA = `rgba( 142, 142, 142, 1)`;
const secondaryFontColor:RGBA = `rgba( 38, 38, 38, 1)`;
const globalLinkColor : HEX = `#292a34`;
const globalFacebookColor:RGBA = `rgba( 0, 149, 246, 1)`;
const globalDangerColor : RGB = `rgb(201, 0, 0)`;
const globalFontFamily:string =  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';

export {
    pageBgColor,
    borderColor,
    primaryFontColor,
    secondaryFontColor,
    globalFacebookColor,
    globalFontFamily,
    globalLinkColor,
    globalDangerColor,
    whiteBackgroundColor
  }

