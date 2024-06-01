import {
  IonActionSheet,
  IonAlert,
  IonButton,
  IonContent,
  IonFooter,
  IonHeader,
  IonImg,
  IonList,
  IonPage,
} from "@ionic/react";
import Menu from "frontend/src/components/menu/menu";
import { useEffect, useState } from "react";
import Tabs from "frontend/src/components/tabs/tabs";
import Input from "frontend/src/components/input/input";
import ToolBar from "frontend/src/components/toolbar/toolbar";
import styled from "styled-components";
import { useHistory, useParams } from "react-router-dom";
import api from "../../utils/api/api";
import decodeJwt, { storage } from "frontend/src/utils/functions/storage";

const UpdateTeam = () => {
  const { teamId } = useParams<{ teamId: string }>();
  const [name, setName] = useState("");
  const history = useHistory();
  const [showAlert, setShowAlert] = useState(false);

  const { payload } = decodeJwt(storage.get("token"));

  useEffect(() => {
    if (teamId) {
      const fetchTeamData = async () => {
        try {
          const existingTeam = await api.getTeamById(payload.sub, teamId);
          
          if (existingTeam && existingTeam.team) {
            setName(existingTeam.team.name || "");
          }
        } catch (error) {
          console.error("Error al obtener datos del equipo:", error);
        }
      };

      fetchTeamData();
    } else {
      console.error("El equipo no existe.");
    }
  }, [payload.sub, teamId]);

  const handleUpdateTeam = async () => {
    if (name == "") {
      setShowAlert(true);
      return;
    }

    if (teamId) {
      await api.updateTeam(payload.sub, teamId, name);
    } else {
      console.error("El equipo no existe.");
    }
    history.push(window.location.href="/");
  };

  const handleImageUrl = (teamName: string) => {
    if (teamName.toLowerCase().includes("baloncesto")) {
      return "https://deportesinfantes.home.blog/wp-content/uploads/2022/06/4c02d07721d0182926385c17ddf3959bfe805f76.jpg?w=768"; 
    } else if (teamName.toLowerCase().includes("futbol") || teamName.toLowerCase().includes("fútbol")) {
      return "https://sisanjuan.b-cdn.net/media/k2/items/cache/665038ef3f33718594773fb6b1e055ef_XL.jpg"; 
    } else if (teamName.toLowerCase().includes("balonmano")) {
      return "https://t4.ftcdn.net/jpg/01/80/02/51/360_F_180025190_7Lt5WDVLnkYHUPZR5X9cJVxFnMbtPSJN.jpg"; 
    } else if(teamName.toLowerCase().includes("volley") || teamName.toLowerCase().includes("voleibol")){
      return "https://www.experienceboxspain.com/sites/default/files/styles/product_full/public/products/BeachVolley%20%281%29_0.jpg?h=cb3eb245&itok=6hYM_HIE"
    }
    return "https://www.infisport.com/media/amasty/blog/SprintDeportesEquipo1_2.jpg"; 
  };

  return (
    <>
      <IonPage>
        <IonHeader color="primary">
          <ToolBar />
        </IonHeader>
        <IonContent fullscreen>
          <br></br>
          <Menu disabled={false}/>
          <ImageContainer>
            <IonImg src={handleImageUrl(name)} />
          </ImageContainer>
          <IonList className="no-margin-padding">
            <Margin>
              <Input
                label="Nombre (Obligatorio)"
                placeholder="Nombre"
                elements={(name) => setName(name)}
                value={name}
              />
            </Margin>
          </IonList>
          <Space />
          <Button>
            <AddButton id="open-action-sheet">Actualizar</AddButton>
            <IonActionSheet
              trigger="open-action-sheet"
              buttons={[
                {
                  text: "Eliminar",
                  role: "destructive",
                  handler: () => history.push(window.location.href=`/home/teams/${teamId}`),
                },
                {
                  text: "Actualizar",
                  handler: () => {
                    handleUpdateTeam();
                  },
                },
                {
                  text: "Seguir editando",
                  role: "cancel",
                  handler: () => history.push(`/home/teams/${teamId}/update-team`),
                },
              ]}
            ></IonActionSheet>
          </Button>
          <IonAlert
            isOpen={showAlert}
            onDidDismiss={() => setShowAlert(false)}
            header="Error"
            message="El nombre es obligatorio"
            buttons={["OK"]}
          />
        </IonContent>
        <IonFooter>
          <Tabs disabled={false}/>
        </IonFooter>
      </IonPage>
    </>
  );
};

const ImageContainer = styled.div`
  text-align: center;
  margin: 10%;
`;

const Margin = styled.div`
  margin-right: 10%;
  margin-left: 10%;
`;

const Button = styled.div`
  text-align: center;
  align-items: center;
`;

const Space = styled.div`
  margin-bottom: 10%;
`;

const AddButton = styled(IonButton)`
  width: 30%;
`;

export default UpdateTeam;