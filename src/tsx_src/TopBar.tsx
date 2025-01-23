import { useState } from "react";

export default function TopBar() {
  const [elapse, setElapse] = useState(false);

  const handleButtonClick = () => {
    setElapse((prevElapse) => !prevElapse);
  };

  return (
    <div>
      <div className="relative top-0">
        {elapse ? (
          <div>
            <Navbar />
          </div>
        ) : (
          <div></div>
        )}
      </div>
      <div
        className={[
          "fixed flex top-0 items-center overflow-hidden left-0",
          "w-full h-[50px]",
          "z-10",
          "bg-purple-500",
          "border-b-[1px] border-white",
        ].join(" ")}
      >
        <div className="fixed">
          <button
            className="border-none rounded-md p-2 ml-2 bg-secondary text-primary-text-color"
            onClick={handleButtonClick}
          >
            {elapse ? "Close Navbar" : "Open Navbar"}
          </button>
        </div>
      </div>
    </div>
  );
}

import { CenteredContainer } from "./ui_components/Container";
import NavbarLink from "./ui_components/NavLink";

function Navbar() {
  return (
    <div className="bg-purple-400 flex flex-col items-center justify-center top-0 left-0 fixed h-[100vh] border-r-white z-10 overflow-hidden">
      <div className="pr-2 pl-2 flex flex-col justify-center items-center">
        <CenteredContainer>
          <NavbarLink to="/" label="Home" />
          <NavbarLink to="/file" label="File" />
          <NavbarLink to="/editor" label="Editor" />
        </CenteredContainer>
      </div>
    </div>
  );
}
