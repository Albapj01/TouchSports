import { IonCard, IonCardContent, IonCardHeader } from "@ionic/react";
import { Link } from "react-router-dom";
import styled from "styled-components";

type CardProps = {
  title: string;
  imageUrl: string;
  description: string;
  route: string;
};

const Card = ({ title, imageUrl, description, route }: CardProps) => {
  const hideDescription = () => {
    if (description == "") {
      return true;
    }
    return false;
  };

  return (
    <StyledLink to={route}>
      <IonCard>
        <img alt={title} src={imageUrl} />
        <IonCardHeader>
          <TitleText>{title}</TitleText>
        </IonCardHeader>
        <IonCardContent onClick={hideDescription}>{description}</IonCardContent>
      </IonCard>
    </StyledLink>
  );
};

const TitleText = styled.div`
  font-weight: 800;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

export default Card;
