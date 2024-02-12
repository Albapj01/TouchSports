import { IonCard, IonCardContent, IonCardHeader, IonCardTitle } from "@ionic/react";

interface ExampleProps {
  title: string;
  imageUrl: string;
  description: string;
}

const Card = ({ title, imageUrl, description }: ExampleProps) => {

  const hideDescription = () => {
    if (description == ""){
      return true;
    }
    return false;
  }

  return (
    <IonCard>
      <img alt={title} src={imageUrl} />
      <IonCardHeader>
        <IonCardTitle>{title}</IonCardTitle>
      </IonCardHeader>
      <IonCardContent onClick={hideDescription}>{description}</IonCardContent>
    </IonCard>
  );
};
export default Card;
