import React, {useState}  from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { 
  Box,
  Flex,
  Button,
  Avatar,
  Icon,
  Input,
  IconButton,
  InputRightElement,
  InputGroup,
  Drawer,
  DrawerContent,
  DrawerOverlay, 
  Spacer,
  Stack,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Heading,
  useDisclosure
} from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/color-mode";
import { FiMenu } from "react-icons/fi";
import { HiOutlineMoon, HiOutlineSun, HiBell } from "react-icons/hi";
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
            <Heading as='h1'>Welcome to newton</Heading>
            <InputGroup>
              <Input id="greet-input"
               onChange={(e) => setName(e.currentTarget.value)}
               placeholder="Enter a name..."
              />
              <InputRightElement width='4.5rem'>
                <Button size='sm' colorScheme="red" onClick={() => greet()}>Greet</Button>
              </InputRightElement>
            </InputGroup>
            {/* <p>{greetMsg}</p> */}
            {greetMsg &&
              <Alert status='info'>
              <AlertIcon />
              <AlertTitle>Greetings!</AlertTitle>
              <AlertDescription>{greetMsg}</AlertDescription>
            </Alert>
            }
          </Stack>

          
        </Box>
      </Box>
    </Box>
  );
}

export default App;
