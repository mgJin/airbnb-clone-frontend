import { useQuery } from "@tanstack/react-query";
import { getMe } from "../api";
import { IUser } from "../types";

export default function useUser() {
    //error가 있는지 없는지를 알려주는 isError => 이게 있으면 로그인안되니깐 검증가능
    const { isLoading, data, isError } = useQuery<IUser>([`me`], getMe,
        {
            retry: false,//실패를 해도 재시도를 하지 않겠다는 듯
        });
    return {
        userLoading: isLoading,
        user: data,
        isLoggedIn: !isError
    };
}