import { AUTH_COOKIE_NAMES } from "@/lib/auth-cookies";
import { YachtPositionInput } from "@/types/yatch";
import axios from "axios";
import { getCookie } from "cookies-next";

export const addYachtPosition = async (yachtPosition:  YachtPositionInput) => {
    const access_token = getCookie(AUTH_COOKIE_NAMES.ACCESS_TOKEN);

    if (!access_token) {
        throw new Error("No access token found");
    }

    const response = await axios.post(
        `https://api0.superyachtapi.com/api/positions`,
        yachtPosition,
        {
            headers: {
                Authorization: `Bearer ${access_token}`,
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        }
    );

    return response.data;
}