import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  modal: ReactNode;
};

const BeforeLoginLayout = ({ children, modal }: Props) => {
  return (
    <div>
      {children}
      {modal}
    </div>
  );
};

export default BeforeLoginLayout;
