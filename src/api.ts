import Cookie from "js-cookie";
import axios from "axios";
import { QueryFunctionContext } from "@tanstack/react-query"

const instance = axios.create({
    baseURL: "http://127.0.0.1:8000/api/v1/",
    withCredentials: true,
})

// export async function getRooms() {
//     const response = await fetch(`${BASE_URL}/rooms/`);
//     const json = await response.json();
//     return json;
// }
//같은 역할 

export const getRooms = () =>
    instance.get("rooms/").then((response) => response.data)

export const getRoom = ({ queryKey }: QueryFunctionContext) => {
    const [_, roomPk] = queryKey
    return instance.get(`rooms/${roomPk}`).then((response) => response.data)
}

export const getRoomReviews = ({ queryKey }: QueryFunctionContext) => {
    const [_, roomPk] = queryKey
    return instance.get(`rooms/${roomPk}/reviews`)
        .then((response) => response.data)
}

export const getMe = () =>
    instance.get(`users/me`)
        .then((response) => response.data);

export const logOut = () =>
    instance.post(`users/log-out`
        , null, {
        headers: {
            "X-CSRFToken": Cookie.get("csrftoken") || "",
        }
    }
    )
        .then((response) => response.data)


export const githubLogin = (code: string) => instance.post(`users/github`, { code }, {
    headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
    }
})
    .then((response) => response.status)


export const kakaoLogin = (code: string) =>
    instance.post(
        `users/kakao`,
        { code },
        {
            headers:
            {
                "X-CSRFToken": Cookie.get("csrftoken") || "",
            }
        })
        .then((response) => response.status)

export interface IUsernameLoginVariables {
    username: string;
    password: string
}
export interface IUsernameLoginSuccess {
    ok: string;
}
export interface IUsernameLoginError {
    error: string;
    request: {
        response: string
    }
}
export const usernameLogin = ({ username, password }: IUsernameLoginVariables) =>
    instance.post(
        `users/log-in`,
        { username, password },
        {
            headers:
            {
                "X-CSRFToken": Cookie.get("csrftoken") || "",
            }
        })
        .then((response) => response.data)

export interface IUsernameSignupVariables extends IUsernameLoginVariables {
    name: string;
    email: string;
}
export const usernameSignup = ({ name, email, username, password }: IUsernameSignupVariables) =>
    instance.post(
        "users/",
        { name, email, username, password },
        {
            headers:
            {
                "X-CSRFToken": Cookie.get("csrftoken") || "",
            }
        }
    ).then((response) => response.data)

