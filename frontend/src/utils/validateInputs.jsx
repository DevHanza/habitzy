export function validateEmail(email) {
  //
  const emailRegex = /^[^@\s+]+@[^@\s]+\.[^@\s]+$/;

  if (!email || email.trim() === "") {
    //
    throw new Error("Email is required.");
    //
  } else if (email.length < 5) {
    //
    throw new Error("Email must be longer than 5 characters.");
    //
  } else if (!emailRegex.test(email)) {
    //
    throw new Error("Please enter a valid email address.");
    //
  }

  return true;
  //
}
