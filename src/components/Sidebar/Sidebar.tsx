import React from 'react';
import {
    Box,
    Flex,
    Text,
    Collapse,
    Icon,
    useDisclosure
  } from "@chakra-ui/react";
  import { MdHome, MdKeyboardArrowRight } from "react-icons/md";
  import { FaFont } from "react-icons/fa";
  import { IoColorPaletteSharp, IoCogOutline } from "react-icons/io5";
  import { HiCode, HiOutlineTranslate, HiColorSwatch } from "react-icons/hi";
  import NavItem from '../NavItem/';


const Sidebar = (props) => {
    const configs = useDisclosure();
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
        _dark={{ bg: "gray.700" }}
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
                _dark={{ color: "white" }}
                aria-label="Main Navigation"
            >
                <NavItem icon={MdHome}>Home</NavItem>
                <NavItem icon={IoCogOutline}>Env variables</NavItem>
                <NavItem icon={FaFont}>Fonts</NavItem>
                <NavItem icon={IoColorPaletteSharp}>Application Themes</NavItem>
                <NavItem icon={HiCode} onClick={configs.onToggle}>
                    Configs
                    <Icon
                        as={MdKeyboardArrowRight}
                        ml="auto"
                        transform={configs.isOpen && "rotate(90deg)"}
                    />
                    </NavItem>
                    <Collapse in={configs.isOpen}>
                    <NavItem pl="12" py="2">
                        Git
                    </NavItem>
                    <NavItem pl="12" py="2">
                        Neovim
                    </NavItem>
                    <NavItem pl="12" py="2">
                        Starship
                    </NavItem>
                    </Collapse>
            </Flex>
        </Box>
    );
};

export default Sidebar;