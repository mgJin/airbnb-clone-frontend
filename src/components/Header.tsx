import { Avatar, Box, Button, HStack, IconButton, LightMode, Menu, MenuButton, MenuItem, MenuList, Stack, useColorMode, useColorModeValue, useDisclosure, useToast } from "@chakra-ui/react";
import { FaAirbnb, FaMoon, FaSun } from "react-icons/fa";
import LoginModal from "./LoginModal";
import { Link } from "react-router-dom";
import SignUpModal from "./SignUpModal";
import useUser from "../lib/useUser";
import { logOut } from "../api";
import { useQueryClient } from "@tanstack/react-query";


export default function Header() {
    const {
        userLoading,
        isLoggedIn,
        user }
        = useUser();
    const {
        isOpen: isLoginOpen,
        onClose: onLoginClose,
        onOpen: onLoginOpen }
        = useDisclosure();
    const {
        isOpen: isSignUpOpen,
        onClose: onSignUpClose,
        onOpen: onSignUpOpen }
        = useDisclosure();
    const {
        colorMode,
        toggleColorMode }
        = useColorMode();
    const logoCol = useColorModeValue("red.500", "red.300");
    const Icon = useColorModeValue(FaMoon, FaSun);
    const queryClient = useQueryClient();
    const toast = useToast();

    const onLogOut = async () => {
        const toastID = toast({
            title: "Login out",
            description: "See you soon",
            status: "loading",
            position: "bottom-left",
            isClosable: true
        })
        const data = await logOut();
        //log out 된다음 화면을 바로 바꾸고 싶을 때
        //내가 refetch하고 싶은 query의 이름을 써주면 된다
        queryClient.refetchQueries(["me"]);
        toast.update(toastID, {
            status: "success",
            title: "updated",
            description: "done",
        })
    }
    return (
        <Stack
            direction={{
                sm: "column",
                md: "row",
            }}
            justifyContent={"space-between"}
            alignItems={"center"}
            py={"5"}
            px={"40"}
            spacing={{
                sm: 5,
                md: 0,
            }}
            borderBottomWidth={1}>
            <Box color={logoCol}>
                <Link to={"/"}>
                    <FaAirbnb size={48} />
                </Link>
            </Box>
            <HStack spacing={2}>
                <IconButton
                    onClick={toggleColorMode}
                    variant={"ghost"}
                    aria-label="Toggle dark mode"
                    icon={<Icon />}>
                </IconButton>
                {!userLoading ?
                    (!isLoggedIn ? (
                        <>
                            <Button onClick={onLoginOpen}>Log In</Button>
                            <LightMode>
                                <Button onClick={onSignUpOpen} colorScheme={"red"}>
                                    Sign Up
                                </Button>
                            </LightMode>
                        </>
                    ) : (
                        <Menu>
                            <MenuButton>

                                <Avatar
                                    name={user?.name} src={user?.profile_photo} size={"md"} />
                            </MenuButton>
                            <MenuList>
                                <MenuItem onClick={onLogOut}>Log out</MenuItem>
                            </MenuList>
                        </Menu>
                    )
                    ) : null
                }

            </HStack>
            <LoginModal isOpen={isLoginOpen} onClose={onLoginClose} />
            <SignUpModal isOpen={isSignUpOpen} onClose={onSignUpClose} />
        </Stack>
    )
}