import { IonAvatar } from "@ionic/react";
import { Link } from "react-router-dom";
import styled from "styled-components";

type AvatarProps = {
  imageUrl: string;
  name: string;
  route: string;
};

const Avatar = ({ imageUrl, name, route }: AvatarProps) => {
  return (
    <StyledLink to={route}>
      <AvatarContainer>
        <AvatarIcon>
          <img alt={name} src={imageUrl} />
        </AvatarIcon>
        <div>{name}</div>
      </AvatarContainer>
    </StyledLink>
  );
};

const AvatarContainer = styled.div`
  color: black;
`;

const AvatarIcon = styled(IonAvatar)`
  width: 120px; //cambiar a porcentajes
  height: 120px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

export default Avatar;
