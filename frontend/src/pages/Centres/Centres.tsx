import {
  IonContent,
  IonFooter,
  IonHeader,
  IonPage,
  IonSearchbar,
} from "@ionic/react";
import Button from "frontend/src/components/button/button";
import Card from "frontend/src/components/card/card";
import Menu from "frontend/src/components/menu/menu";
import Tabs from "frontend/src/components/tabs/tabs";
import ToolBar from "frontend/src/components/toolbar/toolbar";
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

  const handleImageUrl = (centreName: string) => {
    if (centreName.toLowerCase().includes("palacio")) {
      return "https://upload.wikimedia.org/wikipedia/commons/e/e8/Palacio_Municipal_de_Deportes_Vista_Alegre_-_C%C3%B3rdoba_%28Espa%C3%B1a%29.jpg"; 
    } else if (centreName.toLowerCase().includes("pidal")) {
      return "https://www.uco.es/empresa/ucodeporte/wp-content/uploads/slider_01_ucodeporte_pabellon.jpg"; 
    } 
    return "https://inuba.com/wp-content/uploads/2022/03/que-es-un-complejo-deportivo.webp";
  };

  return (
    <>
      <IonPage>
        <IonHeader>
          <ToolBar />
        </IonHeader>
        <IonContent fullscreen>
          <Menu disabled={false} />
          <IonSearchbar placeholder="Buscar"></IonSearchbar>
          <CentresContainer>
            {centres &&
              centres.map((centre) => (
                <Card
                  key={centre.centresId}
                  route={`/home/centres/${centre.centresId}`}
                  title={centre.name}
                  imageUrl={handleImageUrl(centre.name)}
                  description=""
                />
              ))}
          </CentresContainer>
          <ButtonContainer>
            <Button
              onClick={() => {
                window.location.href = "/home/centres/add-centres";
              }}
              color="primary"
              icon={addCircleOutline}
              text="Añadir centro"
            />
          </ButtonContainer>
        </IonContent>
        <IonFooter>
          <Tabs disabled={false} />
        </IonFooter>
      </IonPage>
    </>
  );
};

const CentresContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(45%, 1fr));
  gap: 16px;
  margin: 16px;
`;

const ButtonContainer = styled.div`
  margin-left: 24%;
  width: 50%;
`;

export default CentresInfo;
