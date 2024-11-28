import logo from "../assets/chef-logo.png";

export default function Header() {
  return (
    <header className="title">
      <img src={logo} alt="chef-logo" />
      <span>Food Genie </span>
    </header>
  );
}
