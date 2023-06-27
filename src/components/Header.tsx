import { Box, Button, HStack, IconButton, LightMode, useColorMode, useColorModeValue, useDisclosure } from "@chakra-ui/react";
import { FaAirbnb, FaMoon, FaSun } from "react-icons/fa";
import LoginModal from "./LoginModal";
import { Link } from "react-router-dom";
import SignUpModal from "./SignUpModal";

export default function Header() {
    const { isOpen: isLoginOpen, onClose: onLoginClose, onOpen: onLoginOpen } = useDisclosure();
    const { isOpen: isSignUpOpen, onClose: onSignUpClose, onOpen: onSignUpOpen } = useDisclosure();
    const { colorMode, toggleColorMode } = useColorMode();
    const logoCol = useColorModeValue("red.500", "red.300");
    const Icon = useColorModeValue(FaMoon, FaSun);
    return (
        <HStack justifyContent={"space-between"} py={"10"} px={"5"} borderBottomWidth={1}>
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
                <Button onClick={onLoginOpen}>Log In</Button>
                <LightMode>
                    <Button onClick={onSignUpOpen} colorScheme={"red"}>Sign Up</Button>
                </LightMode>
            </HStack>
            <LoginModal isOpen={isLoginOpen} onClose={onLoginClose} />
            <SignUpModal isOpen={isSignUpOpen} onClose={onSignUpClose} />
        </HStack>
    )
}