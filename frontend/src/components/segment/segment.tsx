import { IonLabel, IonSegment, IonSegmentButton } from "@ionic/react";
import styled from "styled-components";

const Segment = () => {
  return (
    <SegmentContainer>
      <IonSegment value="default">
        <IonSegmentButton value="default">
          <IonLabel>No</IonLabel>
        </IonSegmentButton>
        <IonSegmentButton value="segment">
          <IonLabel>Sí</IonLabel>
        </IonSegmentButton>
      </IonSegment>
    </SegmentContainer>
  );
};

const SegmentContainer = styled.div`
  text-align: center;
  align-items: center;
  margin-right: 5%;
  margin-top: 3%;
`;

export default Segment;
