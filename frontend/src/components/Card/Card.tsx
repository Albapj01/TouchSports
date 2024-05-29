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

  const handleRedirect = () => {
    window.location.href = route;
  };

  return (
    <IonCard onClick={handleRedirect}>
      <img alt={title} src={imageUrl} />
      <IonCardHeader>
        <TitleText>{title}</TitleText>
      </IonCardHeader>
      <IonCardContent onClick={hideDescription}>{description}</IonCardContent>
    </IonCard>
  );
};

const TitleText = styled.div`
  font-weight: 800;
  font-size: 18px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

export default Card;
