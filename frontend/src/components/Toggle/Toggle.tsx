import { IonToggle } from "@ionic/react";
import { useState } from "react";

const Toggle = () => {
  const [toggleChecked, setToggleChecked] = useState(false);

  const checkedToggle = () => {
    setToggleChecked(!toggleChecked);
    console.log(toggleChecked);
  };

  return (
    <>
      <IonToggle checked={toggleChecked} onIonChange={checkedToggle}>
        Checked Toggle
      </IonToggle>
    </>
  );
};
export default Toggle;
