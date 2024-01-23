import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  useToast,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import axios from "axios";
import { BaseURLContext } from "../components/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";

export default function LoginCard() {
  const [showPassword, setShowPassword] = useState(false);
  const [userData, setUserdata] = useState({
    password: "",
    email: "",
  });
  const toast = useToast();
  const { baseUrl } = useContext(BaseURLContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserdata({
      ...userData,
      [name]: value,
    });
  };
  console.log(userData);
  const navigate = useNavigate();
  // token from context
  const { setToken } = useContext(BaseURLContext);

  // registering User
  console.log(baseUrl);
  const loginUser = () => {
    axios(`${baseUrl}/user/login`, {
      method: "POST",
      data: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.data.token) {
        setToken(res.data.token);
        localStorage.setItem("token", res.data.token);
        toast({
          title: res.data.result,
          status: "success",
          isClosable: true,
        });
        navigate("/quote");
      } else {
        toast({
          title: res.data.result,
          status: "error",
          isClosable: true,
        });
        navigate("/");
      }
    });
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Login Here
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            To Enjoy Random Quotes on your Gmail Daily ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                name="email"
                onChange={(e) => handleChange(e)}
                value={userData.email}
                type="email"
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  name="password"
                  onChange={(e) => handleChange(e)}
                  value={userData.password}
                  type={showPassword ? "text" : "password"}
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={loginUser}
              >
                Login
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
