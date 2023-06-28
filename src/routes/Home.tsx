import { Box, Button, Grid, HStack, Heading, Image, Skeleton, SkeletonText, Text, VStack } from "@chakra-ui/react";
import { FaStar, FaRegHeart } from "react-icons/fa";
import Room from "../components/Room";
export default function Home() {
    return (
        //반응형으로 만들기 위해서 templateColumns 에 base를 할 것이고, object로 넘겨줄 것
        <Grid
            mt={10}
            px={{
                base: 10,
                lg: 40
            }}
            columnGap={10}
            rowGap={8}
            templateColumns={{
                sm: "1fr",
                md: "1fr 1fr",
                lg: "repeat(3,1fr)",
                xl: "repeat(4,1fr)",
                "2xl": "repeat(5,1fr)",
            }}>
            <Box>
                <Skeleton rounded="2xl" mb={6} height={250} />
                <SkeletonText w="50%" noOfLines={3} />
            </Box>
            <Room />

        </Grid>
    )
}