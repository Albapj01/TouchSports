import { Player } from "../../domain/model/Player";
import { Team } from "../../domain/model/Team";
import { Trainer } from "../../domain/model/Trainer";
import { Notifier } from "../../domain/notifier/Notifier";
import nodemailer, { Transporter } from "nodemailer";

const nodemailer = require("nodemailer");

export class NodemailerNotifier implements Notifier {
  private transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASSWORD,
      },
    });
    this.transporter.verify((error, success) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Server is ready to take our messages", success);
      }
    });
  }

  async createPlayerNotification(player: Player, team: Team, trainer: Trainer) {
    await this.transporter.sendMail({
      from: '"TouchSport" <${process.env.NODEMAILER_USER}>',
      to: player.email,
      subject: "Has sido creado como jugador en un equipo 👏🏻",
      html: `
            <p>¡Has sido añadido por ${trainer.name} ${trainer.surname} al equipo ${team.name} con los siguientes datos!</p>
            <p>Nombre: ${player.name}</p>
            <p>Apellidos: ${player.surname}</p>
            <p>Correo electrónico: ${player.email}</p>
            <br></br>
            <p>Tu dieta asignada es: ${player.diet}</p>
            <br></br>
            <p>Entrenamientos personalizados:</p>
            <p>Los entrenamientos técnicos a seguir son: ${player.technicalTraining}</p>
            <p>Los entrenamientos físicos a seguir son: ${player.physicalTraining}</p>
            <p>Las mejoras que te ha escrito tu entrenador son:${player.improvements}</p>
        `,
    });
  }
}
