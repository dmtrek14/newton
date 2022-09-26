import React from 'react';
import {
    Box,
    Flex,
    Text,
  } from "@chakra-ui/react";
  import { MdHome } from "react-icons/md";
  import NavItem from '../NavItem/';


const Sidebar = (props) => {

    return (
        <Box
        as="nav"
        pos="fixed"
        top="0"
        left="0"
        zIndex="sticky"
        h="full"
        pb="10"
        overflowX="hidden"
        overflowY="auto"
        bg="white"
        _dark={{ bg: "gray.800" }}
        border
        color="inherit"
        borderRightWidth="1px"
        w="60"
        {...props}
      >
            <Flex px="4" py="5" align="center">
                <Text
                    fontSize="2xl"
                    ml="2"
                    color="brand.500"
                    _dark={{ color: "white" }}
                    fontWeight="semibold"
                    >
                    newton
                </Text>
            </Flex>
            <Flex
                direction="column"
                as="nav"
                fontSize="sm"
                color="gray.600"
                aria-label="Main Navigation"
            >
                <NavItem icon={MdHome}>Home</NavItem>
            </Flex>
        </Box>
    );
};

export default Sidebar;