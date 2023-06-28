import { Box, Button, Grid, HStack, Image, Text, VStack, useColorModeValue } from "@chakra-ui/react";
import { FaRegHeart, FaStar } from "react-icons/fa";

export default function Room() {
    const gray = useColorModeValue("grey.600", "red")
    return (
        <VStack alignItems={"flex-start"}>
            <Box position={"relative"} mb={2} overflow="hidden" rounded={"3xl"}>
                <Image
                    minH={250}
                    src="https://a0.muscache.com/im/pictures/prohost-api/Hosting-574843000111312410/original/1f34b234-14b9-4731-a897-7c660af030d0.jpeg?im_w=720" />
                <Button variant={"unstyled"} cursor={"pointer"} position={"absolute"} top={0} right={0} color={"white"}>
                    <FaRegHeart size={"15px"} />
                </Button>
            </Box>
            <Box>
                <Grid gap={1} templateColumns={"7fr 1fr"}>
                    <Text as={"b"} noOfLines={1} fontSize={"md"}>
                        Okcheon-dong, Suncheon, 전라남도, 한국
                    </Text>
                    <HStack _hover={{
                        color: "red.100",
                    }} spacing={1}>
                        <FaStar size={15} />
                        <Text>5.0</Text>
                    </HStack>
                </Grid>
                <Text fontSize={"sm"} color={gray}> Seoul, S. Korea</Text>
            </Box>

            <Text fontSize={"sm"} color={gray}>
                <Text as={"b"}>$72</Text>/ night
            </Text>
        </VStack>
    )
}