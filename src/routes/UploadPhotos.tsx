import { Box, Button, Container, FormControl, Heading, Input, VStack, useToast } from "@chakra-ui/react";
import ProtectedPage from "../components/ProtectedPage";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useHostOnlyPage } from "../components/HostOnlyPage";
import { useMutation } from "@tanstack/react-query";
import { createPhoto, getUploadURL, uploadImage } from "../api";

interface IForm {
    file: FileList;
}

interface IUploadURLResponse {
    id: string;
    uploadURL: string;
}
export default function UploadPhotos() {
    const { register, handleSubmit, watch, reset } = useForm<IForm>();
    const { roomPk } = useParams();
    const toast = useToast();
    const createPhotoMutation = useMutation(createPhoto, {
        onSuccess: () => {
            toast({
                status: "success",
                title: "Image Uploaded",
                isClosable: true,
            });
            reset();
        },
        onError: () => {
            console.log("something happenning ");
        }
    })
    const uploadImageMutation = useMutation(uploadImage, {
        onSuccess: ({ result }: any) => {
            if (roomPk) {
                createPhotoMutation.mutate({
                    description: "I love django",
                    file: `https://imagedelivery.net/EIW42v3uo6uaoKlbs6UUPA/${result.id}/public`,
                    roomPk,
                }
                )
            }
        },
        onError: (error) => {
            console.log(error);
        }
    })
    const uploadURLMutation = useMutation(getUploadURL, {
        onSuccess: (data: IUploadURLResponse) => {
            console.log(watch());
            uploadImageMutation.mutate({
                uploadURL: data.uploadURL,
                file: watch("file"),
            })
        }
    })
    useHostOnlyPage();
    const onSubmit = (data: any) => {
        uploadURLMutation.mutate();
    }
    return (
        <ProtectedPage>
            <Box
                pb={40}
                mt={10}
                px={{
                    base: 10,
                    lg: 40,
                }}
            >
                <Container>
                    <Heading textAlign={"center"}>Upload a Photo</Heading>
                    <VStack as="form" onSubmit={handleSubmit(onSubmit)} spacing={5} mt={10}>
                        <FormControl>
                            <Input {...register("file")} type="file" accept="image/*" />
                        </FormControl>
                        <Button isLoading={
                            createPhotoMutation.isLoading || uploadImageMutation.isLoading || uploadURLMutation.isLoading} type="submit" w="full" colorScheme={"red"}>
                            Upload photos
                        </Button>
                    </VStack>
                </Container>
            </Box>
        </ProtectedPage>
    )
}