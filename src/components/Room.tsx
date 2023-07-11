import { Box, Button, Grid, HStack, Image, Text, VStack, useColorModeValue } from "@chakra-ui/react";
import { FaCamera, FaRegHeart, FaStar } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

interface IRoomProps {
    pk: number
    imageURL: string;
    name: string;
    rating: number;
    city: string;
    country: string;
    price: number;
    isOwner: boolean;
}

export default function Room({ pk, imageURL, name, rating, city, country, price, isOwner }: IRoomProps) {
    const gray = useColorModeValue("grey.600", "red");
    const navigate = useNavigate();
    const onCameraClick = (event: React.SyntheticEvent<HTMLButtonElement>) => {
        //지금 링크자체가 rooms/${pk} 로 되어있어서 해당 이벤트를 멈추고 내가 가고싶은 nav로
        event.preventDefault();
        navigate(`/rooms/${pk}/photos`)
    };
    return (
        <Link to={`/rooms/${pk}`}>
            <VStack alignItems={"flex-start"}>
                <Box position={"relative"} mb={2} overflow="hidden" rounded={"3xl"}>
                    <Image
                        minH={250}
                        src={imageURL} />
                    <Button onClick={onCameraClick} variant={"unstyled"} cursor={"pointer"} position={"absolute"} top={0} right={0} color={"white"}>
                        {isOwner ? <FaCamera size={"15px"} /> : <FaRegHeart size={"15px"} />}
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
        </Link>
    )
}