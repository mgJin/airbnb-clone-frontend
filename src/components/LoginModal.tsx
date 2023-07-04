import { Box, Button, Input, InputGroup, InputLeftElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text, VStack, useToast } from "@chakra-ui/react";
import { FaLock, FaUserNinja } from "react-icons/fa";
import SocialLogin from "./SocialLogin";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IUsernameLoginError, IUsernameLoginSuccess, IUsernameLoginVariables, usernameLogin } from "../api";

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface IForm {
    username: string;
    password: string;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<IForm>();
    const toast = useToast();
    const queryClient = useQueryClient();
    const mutation = useMutation<
        IUsernameLoginSuccess,
        IUsernameLoginError,
        IUsernameLoginVariables
    >(usernameLogin, {
        onMutate: () => {
            console.log("a string start");
        },
        onSuccess: (data) => {
            toast({
                status: "success",
                title: "welcome",
                description: "success"

            });
            onClose();
            queryClient.refetchQueries(["me"]);
            reset();
        },
        onError: (error) => {
            console.log("errrrorr");
        }
    });
    const onSubmit = ({ username, password }: IForm) => {
        mutation.mutate({ username, password })
    }
    return (
        <Modal motionPreset="slideInRight" isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    Log in
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody as="form" onSubmit={handleSubmit(onSubmit)}>
                    <VStack>
                        <InputGroup>
                            <InputLeftElement children=
                                {<Box color="gray.500"><FaUserNinja /></Box>} />
                            <Input isInvalid={Boolean(errors.username?.message)} {...register("username", { required: "plz write username" })} variant={"filled"} placeholder="Username" />
                        </InputGroup>
                        <InputGroup>
                            <InputLeftElement children={<FaLock />}></InputLeftElement>
                            <Input isInvalid={Boolean(errors.password?.message)} type="password" {...register("password", { required: true })} variant={"filled"} placeholder="Password" />
                        </InputGroup>
                        {mutation.isError ? <Text color="blue.200" textAlign={"center"} fontSize={"md"}>Username or Password are wrong!!</Text> : null}
                        <Button isLoading={mutation.isLoading} type="submit" mt={4} colorScheme="red" w={"100%"}>
                            Log In
                        </Button>
                    </VStack>
                    <SocialLogin />

                </ModalBody>

            </ModalContent>
        </Modal>
    )
}