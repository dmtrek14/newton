import React, {FC}  from "react";
import { Outlet } from "react-router-dom";
import { 
  Box,
  Flex,
  Avatar,
  Icon,
  IconButton,
  Drawer,
  DrawerContent,
  DrawerOverlay, 
  Spacer,
  Stack,
  useDisclosure
} from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/color-mode";
import { FiMenu } from "react-icons/fi";
import { HiOutlineMoon, HiOutlineSun, HiBell } from "react-icons/hi";
import Sidebar from "../../components/Sidebar";

export interface LayoutProps{
    children?: React.ReactNode;
}

const Layout: FC<LayoutProps> =  ({children}) => {
    const { colorMode, toggleColorMode } = useColorMode(); 
    const isDark = colorMode === "dark";
    const sidebar = useDisclosure();

    return (
        <Box as="section" bg="gray.50" _dark={{ bg: "gray.700" }} minH="100vh">
          <Sidebar display={{ base: "none", md: "unset" }} />
          <Drawer
            isOpen={sidebar.isOpen}
            onClose={sidebar.onClose}
            placement="left"
          >
            <DrawerOverlay />
            <DrawerContent>
              <Sidebar w="full" borderRight="none" />
            </DrawerContent>
          </Drawer>
          <Box ml={{ base: 0, md: 60 }} transition=".3s ease">
            <Flex
              as="header"
              align="center"
              justify="space-between"
              w="full"
              px="4"
              bg="white"
               _dark={{ bg: "gray.800" }}
              borderBottomWidth="1px"
              color="inherit"
              h="14"
            >
              <IconButton
                aria-label="Menu"
                display={{ base: "inline-flex", md: "none" }}
                onClick={sidebar.onOpen}
                icon={<FiMenu />}
                size="sm"
              />
              <Spacer />
              <Flex align="center" justify="center">
                <IconButton 
                  colorScheme={isDark ? "yellow" : "blue"}
                  aria-label="Toggle theme"
                  icon={isDark ? <HiOutlineSun /> : <HiOutlineMoon  />}
                  onClick={toggleColorMode}
                  size="sm"
                />
                <Icon color="gray.600" _dark={{color: "gray.400"}}  as={HiBell} cursor="pointer" ml="4" />
                <Avatar
                  ml="4"
                  size="sm"
                  name="testUser"
                  src="https://avatars.githubusercontent.com/u/3666105?v=4"
                  cursor="pointer"
                />
              </Flex>
            </Flex>  
            <Box as="main" p="4" bg="white" _dark={{ bg: "gray.600" }} minH="93vh">
              <Stack spacing={4}>
                <Outlet />
              </Stack>   
            </Box>
          </Box>
        </Box>
      );
}

export default Layout;