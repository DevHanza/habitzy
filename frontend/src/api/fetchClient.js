export async function fetchClient({
  url,
  method = "GET",
  body,
  accessToken,
  onRefresh,
}) {
  //
  const request = async (accToken) => {
    return fetch(url, {
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

  if (res.status === 401 && onRefresh) {
    const newAccessToken = await onRefresh();

    if (!newAccessToken) return res;

    res = await request(newAccessToken);
  }

  return res;
  //
}
