import { CenteredContainer } from "./ui_components/Container";
import NavbarLink from "./ui_components/NavLink";

export default function Navbar() {
  return (
    <div className="w-[250px] fixed h-[100vh] backdrop-blur border-r border-[rgba(255,255,255,calc(var(--transparency)+0.25))] z-10 overflow-hidden navbar">
      <CenteredContainer>
        <NavbarLink to="/" label="Home" />
      </CenteredContainer>
    </div>
  );
}
