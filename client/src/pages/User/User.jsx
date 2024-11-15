import { useOutletContext } from "react-router-dom";

function User() {
  const { user } = useOutletContext();
  return (
    <>
      <h1>User</h1>
      <p>{user?.username} is logged in</p>
    </>
  );
}

export default User;
