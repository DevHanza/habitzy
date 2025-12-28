import { useAuth } from "@/hooks/useAuth";

const { refreshAccessToken } = useAuth();

export async function fetchClient(url, method = "GET", body, accessToken) {
  //
  const request = async (accToken) => {
    return fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${accToken}` } : {}),
      },
      credentials: "include",
      body: body ? JSON.stringify(body) : undefined,
    });
  };

  let res = await request(accessToken);

  if (res.status === 401) {
    const newAccessToken = await refreshAccessToken();

    if (!newAccessToken) return res;

    res = await request(newAccessToken);
  }

  return res;
  //
}
