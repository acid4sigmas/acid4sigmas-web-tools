import { Link, useNavigate } from "react-router-dom";

interface NavbarLinkProps {
  to: string;
  label: string;
}

const NavbarLink: React.FC<NavbarLinkProps> = ({ to, label }) => {
  const nav = useNavigate();

  return (
    <div
      className="rounded mt-0 p-3 bg-[rgba(255,255,255,0.0)] hover:bg-[rgba(255,255,255,0.1)] "
      onClick={() => nav(to)}
    >
      <Link
        to={to}
        className="no-underline text-primary-text-color drop-shadow-lg"
      >
        {label}
      </Link>
    </div>
  );
};

export default NavbarLink;
