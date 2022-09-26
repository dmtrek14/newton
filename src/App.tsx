import React, {useState}  from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { 
  Box,
  Flex,
  Avatar,
  Icon,
  IconButton,
  Drawer,
  DrawerContent,
  DrawerOverlay, 
  Input,
  InputGroup,
  InputLeftElement,
  useDisclosure
} from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/color-mode";
import { FaBell } from "react-icons/fa";
import { FiMenu, FiSearch } from "react-icons/fi";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi";
import Sidebar from "./components/Sidebar/";


function App() {
  const sidebar = useDisclosure();
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");
  const { colorMode, toggleColorMode } = useColorMode(); 
  const isDark = colorMode === "dark";

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke("greet", { name }));
  }

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
           <InputGroup w="96" display={{ base: "none", md: "flex" }} bg="gray.50" _dark={{ bg: "gray.700" }}>
            <InputLeftElement color="gray.700" _dark={{color: "white"}} >
              <FiSearch />
            </InputLeftElement>
            <Input placeholder="Search for something..." color="gray.700" _dark={{color: "white"}} />
          </InputGroup>
          <Flex align="center">
            <IconButton 
              aria-label="Toggle theme"
              icon={isDark ? <HiOutlineSun /> : <HiOutlineMoon />}
              onClick={toggleColorMode}
              size="sm"
            />
            <Icon color="gray.600" _dark={{color: "gray.400"}}  as={FaBell} cursor="pointer" ml="4" />
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
          <h1>Welcome to newton</h1>
        </Box>
      </Box>
    </Box>
  );
}

export default App;
