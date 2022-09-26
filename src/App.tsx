import React from "react";
import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { Box } from "@chakra-ui/react"


function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke("greet", { name }));
  }

  return (
    <Box as="section" bg="gray.50" _dark={{ bg: "gray.700" }} minH="100vh">
      <h1>Welcome to newton!</h1>

      
    </Box>
  );
}

export default App;
