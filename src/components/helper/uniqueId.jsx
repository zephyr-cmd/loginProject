export function generateUniqueId(length) {
  // Function to generate a random alphanumeric string
  function generateRandomString(length) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  // Generate a random string
  const randomString = generateRandomString(length || 4); // Adjust the length as needed

  // Add a timestamp to ensure uniqueness
  const timestamp = Date.now().toString();

  // Concatenate random string and timestamp
  const customerId = randomString + timestamp;

  return customerId;
}

// Example usage
// const uniqueId = generateUniqueId();
// console.log(uniqueId);
