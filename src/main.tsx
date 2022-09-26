import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ChakraProvider, extendTheme, ColorModeScript } from '@chakra-ui/react'

const colors = {
  brand: {
    50: "#ecefff",
    100: "#cbceeb",
    200: "#a9aed6",
    300: "#888ec5",
    400: "#666db3",
    500: "#4d5499",
    600: "#3c4178",
    700: "#2a2f57",
    800: "#181c37",
    900: "#080819"
  }
};

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false
};

const theme = extendTheme({ colors, config });

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
    <ColorModeScript initialColorMode="dark"/>
      <App />
    </ChakraProvider>   
  </React.StrictMode>
);
