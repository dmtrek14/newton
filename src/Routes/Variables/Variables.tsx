import React, {useState}  from "react";
import { invoke } from "@tauri-apps/api/tauri";
import {
   Heading,
   Stack
 } from "@chakra-ui/react";

const Variables = (props) => {
    const [env, setEnv] = useState(null);

    async function getEnv(){
      setEnv(await invoke("get_env"));
    }

    getEnv()

 return (
    <Stack spacing={4}>
      <Heading as='h2'>Env Variables</Heading>
      <div>
            {
                env &&
                env.map((v)=> {
                  return <p>{v}</p>
                })
              }
      </div>
    </Stack>
 )
}

export default Variables;


