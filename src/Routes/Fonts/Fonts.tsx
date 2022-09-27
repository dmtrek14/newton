import React, {useState}  from "react";
import { invoke } from "@tauri-apps/api/tauri";
import {
   Heading,
   Stack
 } from "@chakra-ui/react";

const Fonts = (props) => {
const [fonts, setFonts] = useState(null);

async function getFonts(){
   setFonts(await invoke("get_fonts"))
 }

 getFonts()

 return (
    <Stack spacing={4}>
      <Heading as='h2'>System Fonts</Heading>
      <div>
            {
                fonts &&
                fonts.map((v)=> {
                  return <p>{v}</p>
                })
              }
      </div>
    </Stack>
 )
}

export default Fonts;


