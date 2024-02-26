import { IonAvatar } from "@ionic/react";
import styled from "styled-components";

type AvatarProps = {
  imageUrl: string;
  name: string;
};

const Avatar = ({ imageUrl, name }: AvatarProps) => {
  return (
    <AvatarContainer>
      <AvatarIcon>
        <img alt={name} src={imageUrl} />
      </AvatarIcon>
      <div>{name}</div>
    </AvatarContainer>
  );
};

const AvatarContainer = styled.div`
  color: black;
`;

const AvatarIcon = styled(IonAvatar)`
  width: 120px; //cambiar a porcentajes
  height: 120px;
`;

export default Avatar;
