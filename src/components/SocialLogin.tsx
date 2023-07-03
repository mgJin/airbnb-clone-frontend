import { Box, Button, Divider, HStack, Text, VStack } from "@chakra-ui/react";
import { FaGithub, FaComment } from "react-icons/fa";
export default function SocialLogin() {

    const kakaoParams = {
        client_id: "760221471c74b3cd520857d48689035e",
        redirect_uri: "http://127.0.0.1:3000/social/kakao",
        response_type: "code",
    }
    //위에 적은 정보들을 url에 들어갈 수 있게 한줄 string 으로 정리
    const params = new URLSearchParams(kakaoParams).toString();
    console.log(params);
    return (
        <Box mb={4}>
            <HStack my={8}>
                <Divider />
                <Text textTransform={"uppercase"} color="gray.500" fontSize="xs" as="b">or</Text>
                <Divider />
            </HStack>
            <VStack>

                <Button
                    as="a"
                    href="https://github.com/login/oauth/authorize?client_id=c48d69df2372cf7ffb3c&scope=read:user,user:email"
                    w="100%"
                    leftIcon={<FaGithub />} colorScheme="blackAlpha">
                    Continue with Github
                </Button>
                <Button
                    as="a"
                    href={`https://kauth.kakao.com/oauth/authorize?${params}`}
                    w="100%"
                    leftIcon={<FaComment />}
                    colorScheme="yellow">
                    Continue with Kakao
                </Button>
            </VStack>
        </Box>
    )
}