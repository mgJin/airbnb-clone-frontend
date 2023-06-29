import { Box, Button, Grid, HStack, Heading, Image, Skeleton, SkeletonText, Text, VStack } from "@chakra-ui/react";
import { FaStar, FaRegHeart } from "react-icons/fa";
import Room from "../components/Room";
import RoomSkeleton from "../components/RoomSkeleton";
import { useQuery } from "@tanstack/react-query"
import { getRooms } from "../api";

interface IPhoto {
    pk: string;
    file: string;
    description: string
}

interface IRoom {
    id: number
    name: string
    country: string
    city: string
    price: number
    rating: number
    photos: IPhoto[]
    is_owner: boolean
}

export default function Home() {
    const { isLoading, data } = useQuery<IRoom[]>(["rooms"], getRooms);
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

            {/* <Room /> */}
            {isLoading ? (
                <>
                    <RoomSkeleton />
                    <RoomSkeleton />
                    <RoomSkeleton />
                    <RoomSkeleton />
                    <RoomSkeleton />
                    <RoomSkeleton />
                    <RoomSkeleton />
                    <RoomSkeleton />
                    <RoomSkeleton />
                    <RoomSkeleton />
                    <RoomSkeleton />
                </>
            ) : null}
            {data?.map(room => <Room
                imageURL={room.photos[0].file}
                name={room.name}
                rating={room.rating}
                city={room.city}
                country={room.country}
                price={room.price}
            />)}
        </Grid>
    )
}