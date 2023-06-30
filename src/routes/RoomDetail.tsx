import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom"
import { getRoom, getRoomReviews } from "../api";
import { IReview, IRoomDetail } from "../types";
import { Avatar, Box, Container, Grid, GridItem, HStack, Heading, Image, Skeleton, Text, VStack } from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";

export default function RoomDetail() {
    const tempArray: number[] = [0, 1, 2, 3, 4]
    const { roomPk } = useParams();
    const { isLoading, data } = useQuery<IRoomDetail>([`rooms`, roomPk], getRoom)
    const { data: reviewsData, isLoading: isReviewsLoading } = useQuery<IReview[]>([`rooms`, roomPk, `reviews`], getRoomReviews)
    return (
        <Box
            mt={10}
            px={{
                base: 10,
                lg: 40
            }}>
            <Skeleton height={"43px"} w={"25%"} isLoaded={!isLoading}>
                <Heading>{data?.name}</Heading>
            </Skeleton>
            <Grid
                rounded={"lg"}
                overflow={"hidden"}
                mt={8}
                gap={3}
                minH={"60vh"}
                templateRows={"1fr 1fr"}
                templateColumns={"repeat(4,1fr)"}
            >
                {tempArray.map((index) =>
                    <GridItem
                        colSpan={index === 0 ? 2 : 1}
                        rowSpan={index === 0 ? 2 : 1}
                        overflow={"hidden"} key={index}>
                        <Skeleton isLoaded={!isLoading} h={"100%"} w={"100%"}>
                            <Image objectFit={"cover"} w={"100%"} h={"100%"} src={data?.photos[index].file} />
                        </Skeleton>
                    </GridItem>)}
            </Grid>
            <HStack
                justifyContent={"space-between"}
                w={"40%"}>

                <VStack alignItems={"flex-start"}>
                    <Skeleton isLoaded={!isLoading} h={"30px"}>
                        <Heading fontSize={"2xl"}>House hosted by {data?.owner.name}</Heading>
                    </Skeleton>
                    <Skeleton isLoaded={!isLoading} h={"30px"}>

                        <HStack justifyContent={"flex-start"} w={"100%"}>
                            <Text>{data?.toilet}toilet{data?.toilet === 1 ? "" : "s"}</Text>
                            <Text>•</Text>
                            <Text>{data?.rooms}room{data?.rooms === 1 ? "" : "s"}</Text>
                        </HStack>
                    </Skeleton>
                </VStack>
                <Avatar name={"data?.owner.name"} size={"xl"} src={data?.owner.profile_photo} />
            </HStack>
            <Box mt={10}>
                <Heading mb={5} fontSize={"2xl"}>
                    <Skeleton isLoaded={!isReviewsLoading} h={"30%"}>
                        <HStack>
                            <FaStar />
                            <Text>
                                {data?.rating}
                            </Text>
                            <Text>
                                •
                            </Text>
                            <Text>
                                {reviewsData?.length} review{reviewsData?.length === 1 ? "" : "s"}
                            </Text>
                        </HStack>
                    </Skeleton>
                </Heading>
                <Container mt={15} maxW={"lg"} marginX={0}>
                    <Grid gap={10} templateColumns={"1fr 1fr"}>
                        {reviewsData?.map((review, index) =>
                            <VStack spacing={0} alignItems={"flex-start"} key={index}>
                                <HStack>
                                    <Avatar name={review.user.name} src={review.user.profile_photo}
                                        size={"md"} />
                                    <VStack alignItems={"flex-start"}>
                                        <Heading fontSize={"md"}>
                                            {review.user.name}
                                        </Heading>
                                        <HStack spacing={1}>
                                            <FaStar size={"10px"} />
                                            <Text>{review.rating}</Text>
                                        </HStack>
                                        <Text>{review.payload}</Text>
                                    </VStack>
                                </HStack>
                            </VStack>)}
                    </Grid>
                </Container>
            </Box>
        </Box>
    )
}