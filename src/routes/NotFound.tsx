import { VStack, Heading, Text, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function NotFound() {
    return (

        <VStack justifyContent={"center"} minH="100vh">
            <Heading>Page not Found</Heading>
            <Text>It seems that you're lost</Text>
            <Link to="/">
                <Button variant={"link"}>Go home &rarr;</Button>
            </Link>


        </VStack>
    )
}