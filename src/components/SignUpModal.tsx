import { Box, Button, Input, InputGroup, InputLeftElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, VStack } from "@chakra-ui/react";
import { FaLock, FaUserNinja, FaEnvelope, FaUserSecret } from "react-icons/fa";
import SocialLogin from "./SocialLogin";

interface SignUpModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SignUpModal({ isOpen, onClose }: SignUpModalProps) {
    return (
        <Modal motionPreset="slideInRight" isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    Sign up
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <VStack>
                        <InputGroup>
                            <InputLeftElement children=
                                {<Box color="gray.500"><FaUserSecret /></Box>} />
                            <Input variant={"filled"} placeholder="Name" />
                        </InputGroup>
                        <InputGroup>
                            <InputLeftElement children=
                                {<Box color="gray.500"><FaEnvelope /></Box>} />
                            <Input variant={"filled"} placeholder="Email" />
                        </InputGroup>
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
                            Sign up
                        </Button>
                    </VStack>
                    <SocialLogin />

                </ModalBody>

            </ModalContent>
        </Modal>
    )
}