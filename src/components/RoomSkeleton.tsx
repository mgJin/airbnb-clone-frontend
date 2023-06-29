import { Box, HStack, Skeleton } from "@chakra-ui/react";


export default function RoomSkeleton() {
    return (
        <Box>
            <Skeleton rounded={"2xl"} height={"250px"} mb={7} />
            <HStack justifyContent={"space-between"}>
                <Skeleton rounded={"lg"} w={"60%"} height={5} mb={1} />
                <Skeleton rounded={"lg"} w={"15%"} height={5} />
            </HStack>
            <Skeleton rounded={"lg"} w={"40%"} height={4} mb={1} />
            <Skeleton rounded={"lg"} w={"30%"} height={4} mb={3} />
            <Skeleton rounded={"lg"} w={"25%"} height={4} />
        </Box>
    )
}