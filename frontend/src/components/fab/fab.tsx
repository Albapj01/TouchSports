import { IonFab, IonFabButton, IonFabList, IonIcon } from "@ionic/react";
import {
  ellipsisVerticalOutline,
  pencilOutline,
  trashOutline,
} from "ionicons/icons";
import styled from "styled-components";

function Fab() {
  return (
    <>
      <IonFab slot="fixed" vertical="top" horizontal="end" edge={true}>
        <FabContainer>
          <TransparentFabButton>
            <IonIcon color="primary" icon={ellipsisVerticalOutline}></IonIcon>
          </TransparentFabButton>
          <IonFabList side="bottom">
            <IonFabButton>
              <IonIcon color="primary" icon={pencilOutline}></IonIcon>
            </IonFabButton>
            <IonFabButton>
              <IonIcon color="primary" icon={trashOutline}></IonIcon>
            </IonFabButton>
          </IonFabList>
        </FabContainer>
      </IonFab>
    </>
  );
}

const FabContainer = styled.div`
  margin-top: 10%;
`;

const TransparentFabButton = styled(IonFabButton)`
  --background: transparent;
  --box-shadow: none;
`;

export default Fab;
