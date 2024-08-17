"use client";

import Cookies from "js-cookie";
import jwt from "jsonwebtoken";

const useProfile = () => {
  const token = Cookies.get("access_token") as any;
  if (!token) return null;
  try {
    const decoded = jwt.decode(token, { complete: true });
    return decoded?.payload as any;
  } catch (error) {
    console.error("Error decoding JWT:", error);
    return null;
  }
};

export default useProfile;
