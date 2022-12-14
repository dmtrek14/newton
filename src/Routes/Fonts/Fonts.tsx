import React, {useState, useEffect}  from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { isPermissionGranted, requestPermission, sendNotification } from '@tauri-apps/api/notification';
import {
   Heading,
   Stack,
   FormControl,
  FormLabel,
  Button,
   Select,
   Divider,
   TableContainer,
  Table,
  Thead,
  Tbody,
  Tr, Td, Th
 } from "@chakra-ui/react";

 interface Font {
  id: number,
  title: string,
  installed: boolean
 }

 function useFonts() {
  const [fonts, setFonts] = useState<Font[]>([]);
  const [systemFonts, setSystemFonts] = useState([]);

  function loadSystemFonts(){
    invoke('get_system_fonts').then((t: any) => setSystemFonts(t))
  }

  function loadFonts(){
    invoke('fonts_list').then((t: any) => setFonts(JSON.parse(t)))
  }

  useEffect(loadSystemFonts, [])
  useEffect(loadFonts, [])
  
  function createFont(title: string, installed: boolean){
    invoke('font_create', {title, installed}).then(loadFonts);
    notify("Dev Fonts", title + " has been added!");
  }

  function removeFont(id: number){
    invoke('font_remove', {id}).then(() => {
      setFonts(fonts.filter(f => f.id !== id))
    })
  }

  async function notify(title: string, body: string){
    let permissionGranted = await isPermissionGranted();
    if (!permissionGranted) {
      const permission = await requestPermission();
      permissionGranted = permission === 'granted';
    }
    if (permissionGranted) {
      sendNotification({ title: title, body: body });
    }
  }

  return { fonts, createFont, systemFonts, removeFont}

 }

export default function Fonts() {
  const [fontTitle, setFontTitle] = useState("")
  const { createFont, fonts, systemFonts, removeFont} = useFonts()

  const onFontTitleChange =  (e:React.ChangeEvent<HTMLSelectElement>) => setFontTitle(e.target.value)

  const handleAddFont = () => {
    createFont(fontTitle, true);
  }

  const handleRemoveFont = (e: React.MouseEvent<HTMLButtonElement>) => {
    const id = e.currentTarget.dataset.id
    if (!id) return
    removeFont(parseInt(id));
  }

 return (
    <Stack spacing={4}>
      <Heading as='h1'>My Dev Fonts</Heading>
      <FormControl>
        <FormLabel>Font</FormLabel>
        <Select placeholder='Select font' onChange={onFontTitleChange}>
          { systemFonts.sort().map((v) => {
            return <option value={v} key={v}>{v}</option>
          })}
        </Select>
      </FormControl>
      <Button colorScheme='teal' onClick={handleAddFont}>
        Add font to my list
      </Button>
      <Divider p={3}/>
      <TableContainer>
        <Table size='sm'>
          <Thead>
            <Tr>
              <Th>Id</Th>
              <Th>Name</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {
              fonts &&
              fonts.map((v)=> {
                return (
                  <Tr key={v.id}>
                    <Td>{v.id}</Td>
                    <Td>{v.title}</Td>
                    <Td isNumeric>
                      <Button colorScheme='red' size='sm' data-id={v.id}  onClick={handleRemoveFont}>Remove</Button>
                    </Td>
                  </Tr>
                )
              })
            }
          </Tbody>
        </Table>
      </TableContainer>
    </Stack>
 )
}




