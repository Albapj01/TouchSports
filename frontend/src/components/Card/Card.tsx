import { IonCard, IonCardHeader, IonCardTitle } from "@ionic/react";

interface ExampleProps {
  title: string;
  imageUrl: string;
}

const Card = ({ title, imageUrl }: ExampleProps) => {
  return (
    <IonCard>
      <img alt={title} src={imageUrl} />
      <IonCardHeader>
        <IonCardTitle>{title}</IonCardTitle>
      </IonCardHeader>
    </IonCard>
  );
};
export default Card;
