import { IonButton, IonIcon } from "@ionic/react";
import styled from "styled-components";

type ButtonProps = {
  color: string;
  icon: string;
  text: string;
  onClick?: () => void;
};

const Button = ({ color, icon, text, onClick }: ButtonProps) => {
  return (
    <>
      <StyledButton color={color} onClick={onClick}>
        <IonIcon slot="start" icon={icon} />
        {text}
      </StyledButton>
    </>
  );
};

const StyledButton = styled(IonButton)`
  border-radius: 15px;
  box-shadow: 0 2px 6px 0 rgb(0, 0, 0, 0.25);
  margin-bottom: 3%;
  width: 95%; 
`;

export default Button;
