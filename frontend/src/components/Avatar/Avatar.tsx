import { IonAvatar } from "@ionic/react";

interface AvatarProps {
  imageUrl: string;
  name: string;
}

const Avatar = ({ imageUrl, name }: AvatarProps) => {
  
  return (
    <div style={{ color: "black" }}>
      <IonAvatar style={{width: "120px", height: "120px"}}>
        <img alt={name} src={imageUrl} />
      </IonAvatar>
      <div>{name}</div>
    </div>
  );
};

export default Avatar;
