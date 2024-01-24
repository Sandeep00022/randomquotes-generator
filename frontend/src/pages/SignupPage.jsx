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
  useToast,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import axios from "axios";
import { BaseURLContext } from "../components/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function SignupCard() {
  const [showPassword, setShowPassword] = useState(false);
  const [userData, setUserdata] = useState({
    name: "",
    password: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const { baseUrl } = useContext(BaseURLContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserdata({
      ...userData,
      [name]: value,
    });
  };

  const navigate = useNavigate();
  const toast = useToast();
  // registering User
  console.log(baseUrl);
  const registerUser = () => {
    const { name, email, password } = userData;
    if (name == "" || email == "" || password == "") {
      toast({
        title: "Please fill all the fields",
        status: "error",
        isClosable: true,
      });
      return;
    }

    setLoading(true);
    axios(`${baseUrl}/user/signup`, {
      method: "POST",
      data: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.data === "email already exists") {
        toast({
          title: res.data,
          status: "error",
          isClosable: true,
        });
        setLoading(false);
        return;
      } else if (res.data === "email not exists") {
        toast({
          title: res.data,
          status: "error",
          isClosable: true,
        });
        setLoading(false);
        return;
      } else {
        toast({
          title: res.data,
          status: "success",
          isClosable: true,
        });
        navigate("/login");
      }
    });

    setUserdata({
      name: "",
      password: "",
      email: "",
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
            Sign up
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
            <Box>
              <FormControl id="name" isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                  name="name"
                  onChange={(e) => handleChange(e)}
                  value={userData.name}
                  type="text"
                />
              </FormControl>
            </Box>

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
                isLoading={loading == true}
                loadingText="Submitting"
                size="lg"
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={registerUser}
              >
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Already a user?
                <Link to="/login">
                  <Text color={"blue"}>Login</Text>
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
