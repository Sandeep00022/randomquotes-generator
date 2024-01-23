"use client";

import {
  Box,
  Flex,
  Avatar,
  HStack,
  Text,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { Link, useNavigate } from "react-router-dom";

const NavLink = (props) => {
  const { children } = props;

  return (
    <Box
      as="a"
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
      href={"#"}
    >
      {children}
    </Box>
  );
};

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  return (
    <>
      <Box
        pos={"fixed"}
        w={"100%"}
        zIndex={2}
        bg={useColorModeValue("gray.100", "gray.900")}
        px={4}
      >
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Avatar
              size={"sm"}
              src={
                "https://play-lh.googleusercontent.com/_Y43U3tR-49Mc1XIOSoHo-jGb-f1jV24Eg_U7pzSG4o__sj9nTV7RPuXIVlQ66aEtrA"
              }
            />
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {" "}
              <Text cursor={"pointer"}>
                {" "}
                <Link to="/quote">RandomQuotes</Link>
              </Text>
            </HStack>
          </HStack>
          <Flex gap={"3"} alignItems={"center"}>
            {token ? (
              <Button
                onClick={() => {
                  localStorage.removeItem("token");
                  navigate("/login");
                }}
                colorScheme="red"
              >
                Log-Out
              </Button>
            ) : (
              <>
                <Button
                  onClick={() => navigate("/login")}
                  colorScheme="twitter"
                >
                  Log In
                </Button>
                <Button
                  onClick={() => navigate("/")}
                  colorScheme="pink"
                  variant="solid"
                >
                  Sign Up
                </Button>
              </>
            )}
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              <Text cursor={"pointer"}>
                {" "}
                <Link to="/quote">RandomQuotes</Link>
              </Text>
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
