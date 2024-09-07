import jwt from "jsonwebtoken";
let { securityKey } = process.env;

export function generateBluishColor() {
  const hue = Math.floor(Math.random() * 61) + 180; // Hue range for blue colors (180-240)
  const saturation = Math.floor(Math.random() * 31) + 40; // Saturation 40% to 70%
  const lightness = Math.floor(Math.random() * 21) + 40; // Lightness 40% to 60%
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}
export function jwtTokenVerification(authHeader) {
  let success = false;
  try {
    const token = authHeader.split(" ")[1];
    let decoded = jwt.verify(token, securityKey);
    // console.log("L-12, token decode----------->", decoded);
    success = true;
    return { decoded, success };
  } catch (error) {
    console.log("L-20, error :", error);
    return { success };
  }
}
