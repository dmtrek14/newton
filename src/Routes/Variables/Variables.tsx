import React, {useState}  from "react";
import { invoke } from "@tauri-apps/api/tauri";
import {
   Heading,
   Stack,
   Button,
   Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
 } from "@chakra-ui/react";


const Variables = (props) => {
    const [env, setEnv] = useState(null);

    async function getEnv(){
      setEnv(await invoke("get_env"));
    }

   // getEnv()

    console.log(env)


 return (
    <Stack spacing={4}>
      <Heading as='h2'>Env Variables</Heading>
      <Button size='sm' colorScheme="blue" onClick={() => getEnv()}>Get env</Button>
            <div>
              <TableContainer>
                  <Table size='sm'>
                    <Thead>
                      <Tr>
                        <Th>Name</Th>
                        <Th>Value</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {
                       env &&
                      env.map((v)=> {
                        return (
                        <Tr>
                          <Td>{v[0]}</Td>
                          <Td>{v[1]}</Td>
                        </Tr>
                        )
                      })
                      }
                      </Tbody>
                  </Table>
              </TableContainer>
            </div>
    </Stack>
 )
}

export default Variables;


