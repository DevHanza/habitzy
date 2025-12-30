export async function fetchClient({
  url,
  method = "GET",
  body,
  accessToken,
  onRefresh,
}) {
  //

  const API_URL = `${import.meta.env.VITE_BACKEND_API}/${url}`;
  const request = async (accToken) => {
    return fetch(API_URL, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(accToken ? { Authorization: `Bearer ${accToken}` } : {}),
      },
      credentials: "include",
      body: body ? JSON.stringify(body) : undefined,
    });
  };

  let res = await request(accessToken);

  if ((res.status === 401 || res.status) === 498 && onRefresh) {
    const newAccessToken = await onRefresh();

    if (!newAccessToken) return res;

    res = await request(newAccessToken);
  }

  return res;
  //
}
