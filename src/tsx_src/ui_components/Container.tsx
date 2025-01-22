import React from "react";

interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return <div className="mt-14">{children}</div>;
};

const CenteredContainer: React.FC<ContainerProps> = ({ children }) => {
  return <div className="text-center">{children}</div>;
};

const SettingsContainer: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="bg-background-primary w-[100%] h-[95%] fixed flex items-center justify-center">
      <div className="w-[90%] pl-[5vh] pr-[5vh] h-[95%] bg-background-primary flex sm:w-full sm:pr-0 sm:pl-0 sm:h-full">
        {children}
      </div>
    </div>
  );
};

const SettingsContentContainer: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div
      className={[
        "bg-background-tertiary",
        "w-[100%] h-[100%]",
        "rounded-tr-lg rounded-br-lg",
        "drop-shadow-md",
        "border-t-2 border-b-2 border-r-2",
        "border-t-primary border-b-primary border-r-primary",
        "sm:border-t-0 sm:border-b-0 sm:border-r-0",
        "sm:rounded-tr-none sm:rounded-br-none",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="flex w-[100%] justify-center items-center ">
        {children}
      </div>
    </div>
  );
};

export {
  Container,
  CenteredContainer,
  SettingsContainer,
  SettingsContentContainer,
};
