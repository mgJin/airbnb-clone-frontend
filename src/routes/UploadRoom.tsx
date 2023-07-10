import { Box, Button, Checkbox, Container, FormControl, FormHelperText, FormLabel, Grid, Heading, Input, InputGroup, InputLeftAddon, Select, Text, Textarea, VStack } from "@chakra-ui/react";
import { HostOnlyPage, useHostOnlyPage } from "../components/HostOnlyPage";
import ProtectedPage from "../components/ProtectedPage";
import { FaBed, FaDollarSign, FaToilet } from "react-icons/fa";
import { useMutation, useQuery } from "@tanstack/react-query";
import { IUploadRoomVariables, getAmenities, getCategories, uploadRoom } from "../api";
import { IAmenity, ICategory } from "../types";
import { useForm } from "react-hook-form";


// 이건 다 컴포넌트로 둘러싸는 형식
// export default function UploadRoom() {
//     return (
//         <ProtectedPage>
//             <HostOnlyPage>
//                 <h1>hi</h1>
//             </HostOnlyPage>
//         </ProtectedPage>
//     )
// }

//이건 훅을 사용하는 방식

interface ISuccess {
    ok: string;
}
interface IError {
    error: string;
}

export default function UploadRoom() {
    const { register, watch, handleSubmit } = useForm<IUploadRoomVariables>();
    const { data: amenities, isLoading: isAmenitiesLoading } = useQuery<IAmenity[]>(["amenities"], getAmenities);
    const { data: categories, isLoading: isCategoriesLoading } = useQuery<ICategory[]>(["categories"], getCategories)
    const mutation = useMutation(uploadRoom, {
        onSuccess: () => {
            console.log("wow succeed");
        },
        onError: () => {
            console.log("fine, you can fix it")
        },
    });
    useHostOnlyPage();
    const onSubmit = (data: IUploadRoomVariables) => {
        mutation.mutate(data);
    };
    return (
        <ProtectedPage>
            <Box
                pb={40}
                mt={10}
                px={{
                    base: 10,
                    lg: 40,
                }}>
                <Container>
                    <Heading textAlign={"center"}>Upload</Heading>
                    <VStack spacing={10} as={"form"} onSubmit={handleSubmit(onSubmit)} mt={5}>
                        <FormControl>
                            <FormLabel>Name</FormLabel>
                            <Input {...register("name", { required: true })} required type="text" />
                            <FormHelperText>Write the name of the room</FormHelperText>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Country</FormLabel>
                            <Input {...register("country", { required: true })} required type="text" />
                        </FormControl>
                        <FormControl>
                            <FormLabel>City</FormLabel>
                            <Input {...register("city", { required: true })} required type="text" />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Address</FormLabel>
                            <Input {...register("address", { required: true })} required type="text" />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Price</FormLabel>
                            <InputGroup>
                                <InputLeftAddon children={<FaDollarSign />} />
                                <Input {...register("price", { required: true })} type="number" min={0} />
                            </InputGroup>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Rooms</FormLabel>
                            <InputGroup>
                                <InputLeftAddon children={<FaBed />} />
                                <Input {...register("rooms", { required: true })} type="number" min={0} />
                            </InputGroup>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Toilets</FormLabel>
                            <InputGroup>
                                <InputLeftAddon children={<FaToilet />} />
                                <Input {...register("toilet", { required: true })} type="number" min={0} />
                            </InputGroup>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Description</FormLabel>
                            <Textarea {...register("description", { required: true })} />
                        </FormControl>
                        <FormControl>
                            <Checkbox {...register("pet_friendly", { required: true })}>Pet friendly?</Checkbox>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Kind of Room</FormLabel>
                            <Select {...register("kind", { required: true })} placeholder="Choose a kind">
                                <option value="entire_place">Entire Place</option>
                                <option value="private_place">Private Place</option>
                                <option value="shared_place">Shared Place</option>
                            </Select>
                            <FormHelperText>What kind of room are you renting?</FormHelperText>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Category</FormLabel>
                            <Select {...register("category", { required: true })} placeholder="Choose a cateogry">
                                {categories?.map(category =>
                                    <option key={category.pk} value={category.pk}>{category.name}</option>)}
                            </Select>
                            <FormHelperText>What category describes your room?</FormHelperText>
                        </FormControl>
                        <FormControl>
                            <FormLabel >Amenities</FormLabel>
                            <Grid templateColumns={"1fr 1fr"} gap={5}>
                                {amenities?.map(amenity => (
                                    <Box key={amenity.pk}>
                                        <Checkbox {...register("amenities", { required: true })} value={amenity.pk}>{amenity.name}</Checkbox>
                                        <FormHelperText >{amenity.description}</FormHelperText>
                                    </Box>
                                )
                                )}
                            </Grid>
                        </FormControl>
                        {mutation.isError ? <Text>something wrong</Text> : null}
                        <Button isLoading={mutation.isLoading} w={"100%"} type="submit" colorScheme={"red"} size={"lg"}>Upload Room</Button>
                    </VStack>
                </Container>
            </Box>
        </ProtectedPage>

    )
}