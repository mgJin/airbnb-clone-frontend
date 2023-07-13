import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom"
import { checkBooking, getRoom, getRoomReviews } from "../api";
import { IReview, IRoomDetail } from "../types";
import { Avatar, Box, Button, Container, Grid, GridItem, HStack, Heading, Image, Skeleton, Text, VStack } from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";
import UploadPhotos from "./UploadPhotos";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

export default function RoomDetail() {
    const tempArray: number[] = [0, 1, 2, 3, 4]
    const { roomPk } = useParams();
    const { isLoading, data } = useQuery<IRoomDetail>([`rooms`, roomPk], getRoom)
    const { data: reviewsData, isLoading: isReviewsLoading } = useQuery<IReview[]>([`rooms`, roomPk, `reviews`], getRoomReviews)
    const tempRange: number[] = tempArray.slice(0, data?.photos.length)
    const [dates, setDates] = useState<Date[]>();
    const { data: checkBookingData, isLoading: isLoadingCheckBooking, refetch } = useQuery(
        ["check", dates, roomPk],
        checkBooking, {
        cacheTime: 0,
        enabled: dates !== undefined,
    })

    const onChange = (event: any) => {
        setDates(event);
    }
    console.log(`t or f ? : ${checkBookingData?.ok}`)
    return (
        <Box
            mt={10}
            px={{
                base: 10,
                lg: 40
            }}>
            <Helmet>
                <title>
                    {data ? data.name : "Loading..."}
                </title>
            </Helmet>
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
                {tempRange.map((index) =>
                    <GridItem
                        colSpan={index === 0 ? 2 : 1}
                        rowSpan={index === 0 ? 2 : 1}
                        overflow={"hidden"} key={index}>
                        <Skeleton isLoaded={!isLoading} h={"100%"} w={"100%"}>
                            {
                                data?.photos && data.photos.length > 0 ?
                                    <Image objectFit={"cover"} w={"100%"} h={"100%"} src={data?.photos[index].file} />
                                    : null

                            }
                        </Skeleton>
                    </GridItem>)}
            </Grid>
            <Grid gap={20} templateColumns={"2fr 1fr"} maxW="container.lg">
                <Box>
                    <HStack
                        justifyContent={"space-between"}
                        w={"100%"}>

                        <VStack alignItems={"flex-start"}>
                            <Skeleton isLoaded={!isLoading} h={"20px"}>
                                <Heading fontSize={"2xl"}>House hosted by {data?.owner.name}</Heading>
                            </Skeleton>
                            <Skeleton isLoaded={!isLoading} h={"20px"}>

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
                <Box pt={10}>
                    <Calendar selectRange onChange={onChange} minDate={new Date()} maxDate={new Date(Date.now() + (60 * 60 * 24 * 7 * 4 * 6 * 1000))} prev2Label={null} next2Label={null} minDetail="month" />
                    <Button
                        isLoading={isLoadingCheckBooking}
                        isDisabled={!checkBookingData?.ok}
                        mt={5}
                        w="100%"
                        colorScheme="red"
                    >
                        Make Booking
                    </Button>
                    {!isLoadingCheckBooking && !checkBookingData?.ok ? <Text color={"red.200"}>Can't book on these dates</Text> : null}
                </Box>
            </Grid>
        </Box>
    )
}