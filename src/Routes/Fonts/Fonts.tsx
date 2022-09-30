import React, {useState, useEffect}  from "react";
import { invoke } from "@tauri-apps/api/tauri";
import {
   Heading,
   Stack,
   FormControl,
   Input,
  FormLabel,
  Checkbox,
  Button
 } from "@chakra-ui/react";

 interface Font {
  id: number,
  title: string,
  installed: boolean
 }

 function useFonts() {
  const [fonts, setFonts] = useState<Font[]>([]);
  function loadFonts(){
    invoke('fonts_list').then((t: any) => setFonts(JSON.parse(t)))
  }

  useEffect(loadFonts, [])
  
  function createFont(title: string){
    invoke('font_create', {title}).then(loadFonts);
  }

  return { fonts, createFont}

 }

export default function Fonts() {
  const [fontTitle, setFontTitle] = useState("")
  const [installed, setInstalled] = useState(false)
  const { createFont, fonts} = useFonts()

  const onFontTitleChange =  (e:React.ChangeEvent<HTMLInputElement>) => setFontTitle(e.target.value)

  const handleAddFont = () => {
    createFont(fontTitle);
  }
console.log(fonts)
  //const [fonts, setFonts] = useState(null);

// async function getFonts(){
//    setFonts(await invoke("get_fonts"))
//    fonts.sort()
//  }

 //getFonts()

 return (
    <Stack spacing={4}>
      <Heading as='h2'>System Fonts</Heading>
      <FormControl>
        <FormLabel>Font name</FormLabel>
        <Input type='text' value={fontTitle} onChange={onFontTitleChange} />
      </FormControl>
      <FormControl>
        <Checkbox checked={installed} onChange={(e) => setInstalled(e.target.checked)}>Installed</Checkbox>
      </FormControl>
      <Button colorScheme='teal' onClick={handleAddFont}>
        Button
      </Button>
      <div>
            {/* {
                fonts &&
                fonts.map((v)=> {
                  return <p>{v}</p>
                })
              } */}
        {JSON.stringify(fonts)}
      </div>
    </Stack>
 )
}




