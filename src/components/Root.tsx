import { Box, Button, HStack, IconButton, Input, InputGroup, InputLeftElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, VStack, useDisclosure } from "@chakra-ui/react"
import { Outlet } from "react-router-dom"
import { FaAirbnb, FaMoon, FaUserNinja, FaLock } from "react-icons/fa"
export default function Root() {
    const { isOpen, onClose, onOpen } = useDisclosure();
    return (
        <Box>
            <HStack justifyContent={"space-between"} py={"10"} px={"5"} borderBottomWidth={1}>
                <Box color="red.500">
                    <FaAirbnb size={48} />
                </Box>
                <HStack spacing={2}>
                    <IconButton variant={"ghost"} aria-label="Toggle dark mode" icon={<FaMoon />}></IconButton>
                    <Button onClick={onOpen}>Log In</Button>
                    <Button colorScheme={"red"}>Sign Up</Button>
                </HStack>
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
                                <Button mt={4} colorScheme="red" w={"100%"}>Log In</Button>
                            </VStack>
                        </ModalBody>

                    </ModalContent>
                </Modal>
            </HStack>
            <Outlet />
        </Box>
    )
}