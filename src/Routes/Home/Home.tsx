import React, {useState, useEffect}  from "react";
import { invoke } from "@tauri-apps/api/tauri";
import {
    Heading,
    Stack,
  } from "@chakra-ui/react";

  export default function Home() {
    const [name, setName] = useState("");

    function greet() {
        invoke("greet").then((t: any)=> setName(t));
    }

    useEffect(greet, [])

    return (
        <Stack spacing={4}>
          <Heading as='h1'>Welcome to newton, {name}</Heading>
        </Stack>
     )
  }

