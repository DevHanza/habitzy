export function validateEmail(email) {
  //
  email = email.trim().toLowerCase();

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

export function validatePassword(pass) {
  if (!pass || pass === "") {
    //
    throw new Error("Password is required.");
    //
  } else if (pass.length < 5 || pass.length > 10) {
    //
    throw new Error("Invalid password.");
    //
  }
  return true;
}
