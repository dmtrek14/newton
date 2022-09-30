import React, {useState}  from "react";
import { invoke } from "@tauri-apps/api/tauri";
import {
   Heading,
   Stack
 } from "@chakra-ui/react";

const Themes = (props) => {

 return (
    <Stack spacing={4}>
      <Heading as='h2'>Application Themes</Heading>
    </Stack>
 )
}

export default Themes;


