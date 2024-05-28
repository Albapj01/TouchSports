import {
  IonContent,
  IonFooter,
  IonHeader,
  IonImg,
  IonPage,
  IonSearchbar,
} from "@ionic/react";
import Button from "frontend/src/components/button/button";
import Card from "frontend/src/components/card/card";
import Menu from "frontend/src/components/menu/menu";
import Tabs from "frontend/src/components/tabs/tabs";
import ToolBar from "frontend/src/components/toolbar/toolbar";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { addCircleOutline } from "ionicons/icons";
import { useEffect, useState } from "react";
import { Centres } from "frontend/src/utils/interfaces/Centres";
import decodeJwt, { storage } from "frontend/src/utils/functions/storage";
import api from "frontend/src/utils/api/api";

const CentresInfo = () => {
  const [centres, setCentres] = useState<Centres[]>([]);

  const { payload } = decodeJwt(storage.get("token"));

  useEffect(() => {
    const fetchCentres = async () => {
      try {
        const result = await api.getAllCentres(payload.sub);
        setCentres(result.centres);
      } catch (error) {
        console.error("Error al obtener los centros:", error);
      }
    };
    fetchCentres();
  }, []);

  return (
    <>
      <IonPage>
        <IonHeader>
          <ToolBar />
        </IonHeader>
        <IonContent fullscreen>
          <Menu disabled={false}/>
          <IonSearchbar placeholder="Buscar"></IonSearchbar>
          <CentresContainer>
            {centres &&
              centres.map((centre) => (
                <Card
                  key={centre.centresId}
                  route={`/home/centres/${centre.centresId}`}
                  title={centre.name}
                  imageUrl="https://inuba.com/wp-content/uploads/2022/03/que-es-un-complejo-deportivo.webp"
                  description=""
                />
              ))}
          </CentresContainer>
          <ButtonContainer>
            <Link to="/home/centres/add-centres">
              <Button
                color="primary"
                icon={addCircleOutline}
                text="Añadir centro"
              />
            </Link>
          </ButtonContainer>
        </IonContent>
        <IonFooter>
          <Tabs disabled={false}/>
        </IonFooter>
      </IonPage>
    </>
  );
};

const CentresContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 16px;
  font-size: small;
`;

const ButtonContainer = styled.div`
  margin-left: 24%;
  width: 50%;
`;

export default CentresInfo;
