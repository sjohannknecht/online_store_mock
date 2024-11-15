import { useState } from "react";

export default function useUser() {
  const [user, setUser] = useState();

  return { user, setUser };
}
