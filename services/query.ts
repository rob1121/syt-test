import { AUTH_COOKIE_NAMES } from "@/lib/auth-cookies";
import { Yacht, YachtPosition } from "@/types/yatch";
import axios from "axios";
import { getCookie } from "cookies-next";

export const getYacht = async ({ search }: { search: string }): Promise<{
  meta: {total: number},
  yacht_likes: Yacht[]
}> => {
  const access_token = getCookie(AUTH_COOKIE_NAMES.ACCESS_TOKEN);
  if (!access_token) {
    throw new Error("No access token found");
  }

  const response = await axios.post(
    `https://www.superyachttimes.com/api/v2/yacht_likes/search`,
    {
      size: 25,
      from: 0,
      query: {
        bool: {
          should: [
            {
              multi_match: {
                query: search,
                fields: ["name^3", "previous_names^2"],
                type: "best_fields",
                fuzziness: "AUTO",
              },
            },
            {
              prefix: {
                name: {
                  value: search,
                  boost: 2,
                },
              },
            },
            {
              prefix: {
                previous_names: {
                  value: search,
                  boost: 1.5,
                },
              },
            },
            {
              term: {
                build_year: {
                  value: search,
                  boost: 5,
                },
              },
            },
          ],
          minimum_should_match: 1,
        },
      },
    },
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );

  return response.data;
};

export const getPositionById = async ({ yachtLikeId }: { yachtLikeId: number }): Promise<{
  meta: {total: number},
  positions: YachtPosition[]
}> => {
  const access_token = getCookie(AUTH_COOKIE_NAMES.ACCESS_TOKEN);
  if (!access_token) {
    throw new Error("No access token found");
  }

  const response = await axios.get(
    `https://api0.superyachtapi.com/api/positions?yacht_like_id=${yachtLikeId}`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );

  return response.data;
};
  
