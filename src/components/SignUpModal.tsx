import { Box, Button, Input, InputGroup, InputLeftElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, VStack, useToast } from "@chakra-ui/react";
import { FaLock, FaUserNinja, FaEnvelope, FaUserSecret } from "react-icons/fa";
import SocialLogin from "./SocialLogin";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IUsernameLoginError, IUsernameLoginSuccess, IUsernameSignupVariables, usernameSignup } from "../api";

interface SignUpModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface ISignUP {
    name: string;
    email: string;
    username: string;
    password: string;
}

export default function SignUpModal({ isOpen, onClose }: SignUpModalProps) {
    const { register, reset, handleSubmit, formState: { errors } } = useForm<ISignUP>();
    const queryClient = useQueryClient();
    const toast = useToast();
    const mutation = useMutation<
        IUsernameLoginSuccess,
        IUsernameLoginError,
        IUsernameSignupVariables
    >(usernameSignup, {
        onMutate: () => {
            console.log("good working");
        },
        onSuccess: () => {
            toast({
                title: "WelCome",
                description: "firstLogin",
            })
            onClose();
            queryClient.refetchQueries(["me"])
            reset();
        },
        onError: (error) => {
            console.log("bad working error is occure")

            // console.log(error.request)
            const request = error.request;
            const response1 = request.response
            console.log(response1);

        }

    }
    );
    const onSubmit = ({ name, email, username, password }: ISignUP) => {
        mutation.mutate({ name, email, username, password });
    }
    return (
        <Modal motionPreset="slideInRight" isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    Sign up
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody as={"form"} onSubmit={handleSubmit(onSubmit)}>
                    <VStack>
                        <InputGroup>
                            <InputLeftElement children=
                                {<Box color="gray.500"><FaUserSecret /></Box>} />
                            <Input isInvalid={Boolean(errors.name?.message)} {...register("name", { required: "please input your name" })} variant={"filled"} placeholder="Name" />
                        </InputGroup>
                        <InputGroup>
                            <InputLeftElement children=
                                {<Box color="gray.500"><FaEnvelope /></Box>} />
                            <Input isInvalid={Boolean(errors.email?.message)} {...register("email", { required: "please input your email" })} variant={"filled"} placeholder="Email" />
                        </InputGroup>
                        <InputGroup>
                            <InputLeftElement children=
                                {<Box color="gray.500"><FaUserNinja /></Box>} />
                            <Input isInvalid={Boolean(errors.username?.message)} {...register("username", { required: "please input your Username" })} variant={"filled"} placeholder="Username" />
                        </InputGroup>
                        <InputGroup>
                            <InputLeftElement children={<FaLock />}></InputLeftElement>
                            <Input type="password" isInvalid={Boolean(errors.password?.message)} {...register("password", { required: "please input your password" })} variant={"filled"} placeholder="Password" />
                        </InputGroup>
                        <Button type="submit" mt={4} colorScheme="red" w={"100%"}>
                            Sign up
                        </Button>
                    </VStack>
                    <SocialLogin />

                </ModalBody>

            </ModalContent>
        </Modal>
    )
}