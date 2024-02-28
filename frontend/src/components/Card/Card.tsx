import { IonCard, IonCardContent, IonCardHeader } from "@ionic/react";
import styled from "styled-components";

type CardProps = {
  title: string;
  imageUrl: string;
  description: string;
};

const Card = ({ title, imageUrl, description }: CardProps) => {
  const hideDescription = () => {
    if (description == "") {
      return true;
    }
    return false;
  };

  return (
    <IonCard>
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
`;

export default Card;
