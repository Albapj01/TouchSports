import {
  IonContent,
  IonFooter,
  IonHeader,
  IonPage,
  IonText,
} from "@ionic/react";
import Menu from "frontend/src/components/menu/menu";
import Tabs from "frontend/src/components/tabs/tabs";
import ToolBar from "frontend/src/components/toolbar/toolbar";
import api from "frontend/src/utils/api/api";
import decodeJwt, { storage } from "frontend/src/utils/functions/storage";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

interface RouteParams {
  teamId: string;
  playerId: string;
}

const Diet = () => {
  const { teamId } = useParams<RouteParams>();
  const { playerId } = useParams<RouteParams>();

  const [selectedDiet, setSelectedDiet] = useState("");

  const { payload } = decodeJwt(storage.get("token"));

  useEffect(() => {
    const fetchPlayerData = async () => {
      try {
        const existingPlayer = await api.getPlayerById(
          payload.sub,
          teamId,
          playerId
        );
        if (existingPlayer && existingPlayer.player) {
          const playerDiet = existingPlayer.player.diet;
          if (playerDiet === "Dieta para perder grasa") {
            setSelectedDiet("Dieta para perder grasa");
          } else if (playerDiet === "Dieta para aumentar la masa muscular") {
            setSelectedDiet("Dieta para aumentar la masa muscular");
          } else {
            setSelectedDiet("Ninguna");
          }
        }
      } catch (error) {
        console.error("Error al obtener los datos del jugador:", error);
      }
    };
    fetchPlayerData();
  }, [payload.sub, teamId, playerId]);

  return (
    <>
      <IonPage>
        <IonHeader color="primary">
          <ToolBar />
        </IonHeader>
        <IonContent fullscreen>
          <Menu />
          {selectedDiet === "Dieta para perder grasa" && (
            <>
              <DietName>DIETA PARA PERDER GRASA</DietName>
              <MealsContainer>DESAYUNO</MealsContainer>
              <TextMeals>
                • Porridge de avena con arándanos. Café solo.
                <p />
                • Pan integral con aguacate y tomate cherry. Melón. Té verde.
                <p />• Pan integral con pavo. 1 kiwi. Café con leche desnatada.
              </TextMeals>
              <Space></Space>
              <MealsContainer>COMIDA</MealsContainer>
              <TextMeals>
                • Alcachofas al horno con vinagreta de Módena y pimienta negra.
                Muslo de pollo deshuesado a la plancha con limón. Biscotes de
                pan integral. Yogur desnatado.
                <p />
                • Berenjena rellena de verduras y arroz integral. Sepia a la
                plancha. Yogur desnatado.
                <p />• Acelgas con patatas. Solomillo de cerdo a la plancha.
                Yogur desnatado.
              </TextMeals>
              <Space></Space>
              <MealsContainer>MERIENDA</MealsContainer>
              <TextMeals>
                • Fresas con zumo de naranja natural.
                <p />
                • 2 mandarinas.
                <p />
                • Arándanos y frambuesas.
                <p />
              </TextMeals>
              <Space></Space>
              <MealsContainer>CENA</MealsContainer>
              <TextMeals>
                • Revuelto de 1 huevo con setas y gambas. Pan. Yogur desnatado.
                <p />
                • Crema de calabacín, puerro y patata. Emperador a la plancha.
                Gelatina sin azúcar.
                <p />
                • Ensalada de pasta integral con atún, palitos de cangrejo y
                lentejas. Yogur desnatado.
                <p />
              </TextMeals>
            </>
          )}
          {selectedDiet === "Dieta para aumentar la masa muscular" && (
            <>
              <DietName>DIETA PARA AUMENTAR MASA MUSCULAR</DietName>
              <MealsContainer>DESAYUNO</MealsContainer>
              <TextMeals>
                • Porridge de copos de avena con bebida de arroz y 2 kiwis.
                <p />• Vaso de leche. Bocadillo de jamón serrano. 1 bol de uvas.
              </TextMeals>
              <Space></Space>
              <MealsContainer>MEDIA MAÑANA</MealsContainer>
              <TextMeals>
                • Bocadillo de humus con rúcula y rodajas de tomate + 1 zumo de
                naranja natural.
                <p />• Yogur con semillas de chía y arándanos + 1 plátano con un
                puñado de castañas.
              </TextMeals>
              <Space></Space>
              <MealsContainer>COMIDA</MealsContainer>
              <TextMeals>
                • Macarrones con pisto. Filete de buey con patata al horno.
                Yogur natural con frutos rojos.
                <p />• Crema de champiñones, puerro y patata. Espaguetis
                salteados con rebozuelos y dos huevos poché. Macedonia de
                frutas.
              </TextMeals>
              <Space></Space>
              <MealsContainer>MERIENDA</MealsContainer>
              <TextMeals>
                • Tostadas con membrillo.
                <p />• Yogur con corn flakes.
              </TextMeals>
              <Space></Space>
              <MealsContainer>POST ENTRENO</MealsContainer>
              <TextMeals>
                • Batido recuperador con queso batido 0%, fresas y miel.
                <p />• Batido recuperador a base de kéfir con frambuesas y whey.
              </TextMeals>
              <Space></Space>
              <MealsContainer>CENA</MealsContainer>
              <TextMeals>
                • Ensalada de arroz. Lubina al horno con verduras y patata.
                Requesón.
                <p />• Ensalada de patata. Sardinas plancha acompañadas de pan
                con tomate. Yogur con mermelada.
              </TextMeals>
              <Space></Space>
              <MealsContainer>RECENA</MealsContainer>
              <TextMeals>
                • Vaso de leche con quínoa hinchada.
                <p />• Galletas caseras de plátano y avena (ver receta abajo)
              </TextMeals>
            </>
          )}
          {selectedDiet === "Ninguna" && (
            <TextContainer>
              <IonText>No tienes ninguna dieta asignada.</IonText>
            </TextContainer>
          )}
        </IonContent>
        <IonFooter>
          <Tabs />
        </IonFooter>
      </IonPage>
    </>
  );
};

const ButtonContainer = styled.div`
  margin-top: 10%;
  margin-left: 24%;
  width: 50%;
`;

const MealsContainer = styled.div`
  background-color: #1f7189;
  color: white;
  padding-top: 2%;
  padding-bottom: 2%;
  border-radius: 8px;
  text-align: center;
  align-items: center;
  margin: 4%;
  font-size: 22px;
`;

const TextMeals = styled.div`
  margin: 6%;
  font-size: 20px;
  text-align: justify;
`;

const Space = styled.div`
  margin-top: 10%;
`;

const DietName = styled.h1`
  color: #1f7189;
  margin: 4%;
  text-align: center;
  align-items: center;
  font-weight: bold;
`;

const TextContainer = styled.div`
  text-align: center;
  color: #666;
  margin-top: 5%;
  font-size: 20px;
  font-weight: bold;
`;

export default Diet;
