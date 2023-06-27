import { Box, Button, Input, InputGroup, InputLeftElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, VStack } from "@chakra-ui/react";
import { FaLock, FaUserNinja } from "react-icons/fa";
import SocialLogin from "./SocialLogin";

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
    return (
        <Modal motionPreset="slideInRight" isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    Log in
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <VStack>
                        <InputGroup>
                            <InputLeftElement children=
                                {<Box color="gray.500"><FaUserNinja /></Box>} />
                            <Input variant={"filled"} placeholder="Username" />
                        </InputGroup>
                        <InputGroup>
                            <InputLeftElement children={<FaLock />}></InputLeftElement>
                            <Input variant={"filled"} placeholder="Password" />
                        </InputGroup>
                        <Button mt={4} colorScheme="red" w={"100%"}>
                            Log In
                        </Button>
                    </VStack>
                    <SocialLogin />

                </ModalBody>

            </ModalContent>
        </Modal>
    )
}