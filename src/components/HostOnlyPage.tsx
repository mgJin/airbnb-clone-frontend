import React from "react"
import useUser from "../lib/useUser";
import { useNavigate } from "react-router-dom";

interface IHostOnlyPageProps {
    children: React.ReactNode;
}

/**컴포넌트 방식 */
export function HostOnlyPage({ children }: IHostOnlyPageProps) {
    const { user, userLoading } = useUser();
    const navigate = useNavigate();
    React.useEffect(() => {
        if (!userLoading) {
            if (!user?.is_host) {
                navigate("/");
            }
        }
    }, [userLoading, navigate, user])
    return <>{children}</>
}
/** 훅 방식 */
export function useHostOnlyPage() {
    const { user, userLoading } = useUser();
    const navigate = useNavigate();
    React.useEffect(() => {
        if (!userLoading) {
            if (!user?.is_host) {
                navigate("/");
            }
        }
    }, [userLoading, navigate, user])
    return;
}