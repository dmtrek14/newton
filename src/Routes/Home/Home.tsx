import React, {useState}  from "react";
import { invoke } from "@tauri-apps/api/tauri";
import {
    Heading,
    Stack,
    Input,
    InputGroup,
    InputRightElement,
    Button,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription
  } from "@chakra-ui/react";

  const Home = (props) => {
    const [greetMsg, setGreetMsg] = useState("");
    const [name, setName] = useState("");

    async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
        setGreetMsg(await invoke("greet", { name }));
    }
    return (
        <Stack spacing={4}>
          <Heading as='hq'>Welcome to newton</Heading>
          <InputGroup>
              <Input id="greet-input"
               onChange={(e) => setName(e.currentTarget.value)}
               placeholder="Enter a name..."
              />
              <InputRightElement width='4.5rem'>
                <Button size='sm' colorScheme="blue" onClick={() => greet()}>Greet</Button>
              </InputRightElement>
            </InputGroup>
            {greetMsg &&
              <Alert status='info' variant='left-accent'>
              <AlertIcon />
              <AlertTitle>Greetings!</AlertTitle>
              <AlertDescription>{greetMsg}</AlertDescription>
            </Alert>
            }
        </Stack>
     )
  }

  export default Home;