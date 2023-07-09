import { Box, Button, Checkbox, Container, FormControl, FormHelperText, FormLabel, Grid, Heading, Input, InputGroup, InputLeftAddon, Select, Textarea, VStack } from "@chakra-ui/react";
import { HostOnlyPage, useHostOnlyPage } from "../components/HostOnlyPage";
import ProtectedPage from "../components/ProtectedPage";
import { FaBed, FaDollarSign, FaToilet } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { getAmenities, getCategories } from "../api";
import { IAmenity, ICategory } from "../types";


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
export default function UploadRoom() {
    const { data: amenities, isLoading: isAmenitiesLoading } = useQuery<IAmenity[]>(["amenities"], getAmenities);
    const { data: categories, isLoading: isCategoriesLoading } = useQuery<ICategory[]>(["categories"], getCategories)
    useHostOnlyPage();
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
                    <VStack spacing={10} as={"form"} mt={5}>
                        <FormControl>
                            <FormLabel>Name</FormLabel>
                            <Input required type="text" />
                            <FormHelperText>Write the name of the room</FormHelperText>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Country</FormLabel>
                            <Input required type="text" />
                        </FormControl>
                        <FormControl>
                            <FormLabel>City</FormLabel>
                            <Input required type="text" />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Address</FormLabel>
                            <Input required type="text" />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Price</FormLabel>
                            <InputGroup>
                                <InputLeftAddon children={<FaDollarSign />} />
                                <Input type="number" min={0} />
                            </InputGroup>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Rooms</FormLabel>
                            <InputGroup>
                                <InputLeftAddon children={<FaBed />} />
                                <Input type="number" min={0} />
                            </InputGroup>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Toilets</FormLabel>
                            <InputGroup>
                                <InputLeftAddon children={<FaToilet />} />
                                <Input type="number" min={0} />
                            </InputGroup>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Description</FormLabel>
                            <Textarea />
                        </FormControl>
                        <FormControl>
                            <Checkbox>Pet friendly?</Checkbox>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Kind of Room</FormLabel>
                            <Select placeholder="Choose a kind">
                                <option value="entire_place">Entire Place</option>
                                <option value="private_place">Private Place</option>
                                <option value="shared_place">Shared Place</option>
                            </Select>
                            <FormHelperText>What kind of room are you renting?</FormHelperText>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Category</FormLabel>
                            <Select placeholder="Choose a kind">
                                {categories?.map(category =>
                                    <option key={category.pk} value={category.pk}>{category.name}</option>)}
                            </Select>
                            <FormHelperText>What category describes your room?</FormHelperText>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Amenities</FormLabel>
                            <Grid templateColumns={"1fr 1fr"} gap={5}>
                                {amenities?.map(amenity => (
                                    <Box key={amenity.pk}>
                                        <Checkbox>{amenity.name}</Checkbox>
                                        <FormHelperText >{amenity.description}</FormHelperText>
                                    </Box>
                                )
                                )}
                            </Grid>
                        </FormControl>
                        <Button w={"100%"} type="submit" colorScheme={"red"} size={"lg"}>Upload Room</Button>
                    </VStack>
                </Container>
            </Box>
        </ProtectedPage>

    )
}