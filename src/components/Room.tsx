import { Box, Button, Grid, HStack, Image, Text, VStack, useColorModeValue } from "@chakra-ui/react";
import { FaRegHeart, FaStar } from "react-icons/fa";

interface IRoomProps {
    imageURL: string;
    name: string;
    rating: number;
    city: string;
    country: string;
    price: number;

}

export default function Room({ imageURL, name, rating, city, country, price }: RoomProps) {
    const gray = useColorModeValue("grey.600", "red")
    return (
        <VStack alignItems={"flex-start"}>
            <Box position={"relative"} mb={2} overflow="hidden" rounded={"3xl"}>
                <Image
                    minH={250}
                    src={imageURL} />
                <Button variant={"unstyled"} cursor={"pointer"} position={"absolute"} top={0} right={0} color={"white"}>
                    <FaRegHeart size={"15px"} />
                </Button>
            </Box>
            <Box>
                <Grid gap={1} templateColumns={"7fr 1fr"}>
                    <Text as={"b"} noOfLines={1} fontSize={"md"}>
                        {name}
                    </Text>
                    <HStack _hover={{
                        color: "red.100",
                    }} spacing={1}>
                        <FaStar size={15} />
                        <Text>{rating}</Text>
                    </HStack>
                </Grid>
                <Text fontSize={"sm"} color={gray}> {city}, {country}</Text>
            </Box>

            <Text fontSize={"sm"} color={gray}>
                <Text as={"b"}>${price}</Text>/ night
            </Text>
        </VStack>
    )
}