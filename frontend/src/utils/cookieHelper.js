export function setCookie(name, value, days) {
  // Create a new Date object
  const date = new Date();

  // Set the expiration date (in milliseconds)
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);

  // Convert expiration date to UTC string format
  const expires = `expires=${date.toUTCString()}`;

  // Set the cookie with name, value, and expiration
  document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; ${expires}; path=/`;
}

export function getCookie(name) {
  try {
    // Add an equals sign to match the cookie name pattern
    const target = `${encodeURIComponent(name)}=`;

    // Decode cookie string (in case it has encoded characters)
    const decodedCookie = decodeURIComponent(document.cookie);

    // Split cookies into an array
    const cookies = decodedCookie.split(";");

    // Loop through all cookies
    for (let cookie of cookies) {
      // Trim leading spaces
      cookie = cookie.trim();

      // Check if this cookie starts with our target name
      if (cookie.startsWith(target)) {
        // Return the value part only
        return cookie.substring(target.length);
      }
    }

    // Return an empty string if cookie is not found
    return "";
  } catch (error) {
    console.warn("Failed to parse quote from cookie:", error);
  }
}
