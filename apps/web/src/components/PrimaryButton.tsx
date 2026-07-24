import type { ReactNode } from "react";

interface PrimaryButtonProps {
  children: ReactNode;
  onClick?: () => void;
}

function PrimaryButton({ children, onClick }: PrimaryButtonProps) {
  return (
    <button className="primary-button" type="button" onClick={onClick}>
      {children}
    </button>
  );
}

export default PrimaryButton;
