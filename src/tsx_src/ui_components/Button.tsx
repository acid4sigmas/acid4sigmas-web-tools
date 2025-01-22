interface DefaultProps {
  label: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export const DefaultButton: React.FC<DefaultProps> = ({
  label = "",
  onClick,
}) => {
  return (
    <div>
      <button
        onClick={onClick}
        className={[
          "bg-purple-800",
          "pb-1 pt-1 pr-3 pl-3",
          "text-primary-text-color",
          "rounded-lg",
          "drop-shadow-lg",
          "hover:opacity-80",
        ].join(" ")}
      >
        {label}
      </button>
    </div>
  );
};
