import User from "../../assets/imgs/user.svg";

export default function UserNavBarElement() {
  return (
    <div>
      <img
        src={User}
        alt="Shopping Cart Symbol"
        className="ShoppingCartWidget__image"
      ></img>
      Login
    </div>
  );
}
