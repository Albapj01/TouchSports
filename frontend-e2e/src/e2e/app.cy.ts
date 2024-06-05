import "cypress-localstorage-commands";

describe("First access to the aplication", () => {
  it("Go to the signIn page", () => {
    cy.visit("http://localhost:4200/");
  });
});

describe("Create team", () => {
  it("should create a new team", () => {
    const token ="";
    cy.setLocalStorage("token", JSON.stringify(token));
    cy.visit("http://localhost:4200/home/teams/add-team");
    cy.get('input[placeholder="Nombre"]').type("Balonmano");
    cy.contains("Añadir").click();
    cy.get("ion-action-sheet").should("be.visible");
    cy.get("ion-action-sheet")
      .find("button")
      .contains("Añadir")
      .click({ force: true });
  });
});

describe("View team", () => {
  it("should view the team info", () => {
    const token ="";
    cy.setLocalStorage("token", JSON.stringify(token));
    cy.visit("http://localhost:4200/home/teams/");
    cy.get("ion-card").contains("Balonmano").closest("ion-card").click();
  });
});

describe("Update team", () => {
  it("should update a team info", () => {
    const token ="";
    cy.setLocalStorage("token", JSON.stringify(token));
    cy.visit("http://localhost:4200/home/teams/");
    cy.get("ion-card").contains("Balonmano").closest("ion-card").click();
    cy.get("ion-fab-button").first().click();
    cy.get("ion-fab-list ion-fab-button").eq(0).click();
    cy.url().should("include", "/update-team");
    cy.get('input[placeholder="Nombre"]').type(" Junior");
    cy.contains("Actualizar").click();
    cy.get("ion-action-sheet").should("be.visible");
    cy.get("ion-action-sheet")
      .find("button")
      .contains("Actualizar")
      .click({ force: true });
  });
});

describe("Create player", () => {
  it("should create a new player", () => {
    const token ="";
    cy.setLocalStorage("token", JSON.stringify(token));
    cy.visit("http://localhost:4200/home/teams/");
    cy.get("ion-card").contains("Balonmano").closest("ion-card").click();
    cy.contains("Añadir jugador").click();
    cy.url().should("include", "/add-player");
    cy.get('input[placeholder="Nombre"]').type("John", { force: true });
    cy.get('input[placeholder="Apellidos"]').type("Doe", { force: true });
    cy.get('input[placeholder="Correo"]').type("john@gmail.com", {
      force: true,
    });
    cy.contains("Añadir").click();
    cy.get("ion-action-sheet").should("be.visible");
    cy.get("ion-action-sheet")
      .find("button")
      .contains("Añadir")
      .click({ force: true });
  });
});

describe("View player", () => {
  it("should view the player info", () => {
    const token ="";
    cy.setLocalStorage("token", JSON.stringify(token));
    cy.visit("http://localhost:4200/home/teams/");
    cy.get("ion-card").contains("Balonmano").closest("ion-card").click();
    cy.contains("John")
      .parentsUntil("AvatarContainer")
      .first()
      .click({ force: true });
  });
});

describe("Update player", () => {
  it("should update the player info", () => {
    const token ="";
    cy.setLocalStorage("token", JSON.stringify(token));
    cy.visit("http://localhost:4200/home/teams/");
    cy.get("ion-card").contains("Balonmano").closest("ion-card").click();
    cy.contains("John")
      .parentsUntil("AvatarContainer")
      .first()
      .click({ force: true });
    cy.get("ion-fab-button").first().click();
    cy.get("ion-fab-list ion-fab-button").eq(0).click();
    cy.url().should("include", "/update-player");
    cy.get('input[placeholder="Apellidos"]').type("Doe", { force: true });
    cy.contains("Actualizar").click();
    cy.get("ion-action-sheet").should("be.visible");
    cy.get("ion-action-sheet")
      .find("button")
      .contains("Actualizar")
      .click({ force: true });
  });
});

describe("Delete player", () => {
  it("should delete a player", () => {
    const token ="";
    cy.setLocalStorage("token", JSON.stringify(token));
    cy.visit("http://localhost:4200/home/teams/");
    cy.get("ion-card").contains("Balonmano").closest("ion-card").click();
    cy.contains("John")
      .parentsUntil("AvatarContainer")
      .first()
      .click({ force: true });
    cy.get("ion-fab-button").first().click();
    cy.get("ion-fab-list ion-fab-button").eq(1).click();
    cy.get("ion-alert").find(".alert-button-role-confirm").click();
  });
});

describe("Delete team", () => {
  it("should delete a team", () => {
    const token ="";
    cy.setLocalStorage("token", JSON.stringify(token));
    cy.visit("http://localhost:4200/home/teams/");
    cy.get("ion-card").contains("Balonmano").closest("ion-card").click();
    cy.get("ion-fab-button").first().click();
    cy.get("ion-fab-list ion-fab-button").eq(1).click();
    cy.get("ion-alert").find(".alert-button-role-confirm").click();
  });
});

describe("Create centre", () => {
  it("should create a new centre", () => {
    const token ="";
    cy.setLocalStorage("token", JSON.stringify(token));
    cy.visit("http://localhost:4200/home/centres/add-centres");
    cy.get('input[placeholder="Nombre"]').type("Pidal");
    cy.get('input[placeholder="Ubicación"]').type("Córdoba");
    cy.contains("Añadir").click();
    cy.get("ion-action-sheet").should("be.visible");
    cy.get("ion-action-sheet")
      .find("button")
      .contains("Añadir")
      .click({ force: true });
  });
});

describe("View centre", () => {
  it("should view the centre info", () => {
    const token ="";
    cy.setLocalStorage("token", JSON.stringify(token));
    cy.visit("http://localhost:4200/home/centres/");
    cy.get("ion-card").contains("Pidal").closest("ion-card").click();
  });
});

describe("Update centre", () => {
  it("should update a centre info", () => {
    const token ="";
    cy.setLocalStorage("token", JSON.stringify(token));
    cy.visit("http://localhost:4200/home/centres/");
    cy.get("ion-card").contains("Pidal").closest("ion-card").click();
    cy.get("ion-fab-button").first().click();
    cy.get("ion-fab-list ion-fab-button").eq(0).click();
    cy.url().should("include", "/update-centre");
    cy.get('input[placeholder="Ubicación"]').type("Centro");
    cy.contains("Actualizar").click();
    cy.get("ion-action-sheet").should("be.visible");
    cy.get("ion-action-sheet")
      .find("button")
      .contains("Actualizar")
      .click({ force: true });
  });
});

describe("Create reserve", () => {
  it("should create a new reserve", () => {
    const token ="";
    cy.setLocalStorage("token", JSON.stringify(token));
    cy.visit("http://localhost:4200/home/centres/");
    cy.get("ion-card").contains("Pidal").closest("ion-card").click();
    cy.contains("Realizar reserva").click();
    cy.url().should("include", "/reserve");
    cy.get('input[placeholder="Nombre"]').type("John", { force: true });
    cy.get('input[placeholder="Apellidos"]').type("Doe", { force: true });
    cy.get('input[placeholder="Correo"]').type("john@gmail.com", {
      force: true,
    });
    cy.get('input[placeholder="Teléfono"]').type("612345678", { force: true });
    cy.get('ion-select[aria-label="Teams"]').click({ force: true });
    cy.get(".select-interface-option").should("be.visible");
    cy.contains("Fútbol").click({ force: true });
    cy.contains("OK").click({ force: true });
    cy.contains("Reservar").click({ force: true });
    cy.get("ion-action-sheet", { timeout: 10000 }).should("be.visible");
    cy.get("ion-action-sheet")
      .find("button")
      .contains("Reservar")
      .click({ force: true });
  });
});

describe("View reserve", () => {
  it("should view the reserve info", () => {
    const token ="";
    cy.setLocalStorage("token", JSON.stringify(token));
    cy.visit("http://localhost:4200/home/reserves/");
    cy.get("ion-card").contains("Polideportivo").closest("ion-card").click();
    cy.get("ion-modal").should("be.visible");
  });
});

describe("Update reserve", () => {
  it("should update the reserve info", () => {
    const token ="";
    cy.setLocalStorage("token", JSON.stringify(token));
    cy.visit("http://localhost:4200/home/reserves/");
    cy.get("ion-card").contains("Polideportivo").closest("ion-card").click();
    cy.get("ion-modal").should("be.visible");
    cy.contains("Actualizar").click();
    cy.url().should("include", "/update-reserve");
    cy.get('input[placeholder="Apellidos"]').type("Doe", { force: true });
    cy.contains("Actualizar").click();
    cy.get("ion-action-sheet").should("be.visible");
    cy.get("ion-action-sheet")
      .find("button")
      .contains("Actualizar")
      .click({ force: true });
  });
});

describe("Delete reserve", () => {
  it("should delete a reserve", () => {
    const token ="";
    cy.setLocalStorage("token", JSON.stringify(token));
    cy.visit("http://localhost:4200/home/reserves/");
    cy.get("ion-card").contains("Polideportivo").closest("ion-card").click();
    cy.get("ion-modal").should("be.visible");
    cy.contains("Borrar").click();
    cy.get("ion-alert").find(".alert-button-role-confirm").click();
  });
});

describe("Delete centre", () => {
  it("should delete a centre", () => {
    const token ="";
    cy.setLocalStorage("token", JSON.stringify(token));
    cy.visit("http://localhost:4200/home/centres/");
    cy.get("ion-card").contains("Pidal").closest("ion-card").click();
    cy.get("ion-fab-button").first().click();
    cy.get("ion-fab-list ion-fab-button").eq(1).click();
    cy.get("ion-alert").find(".alert-button-role-confirm").click();
  });
});

describe("Go to profile page", () => {
  it("should go to profile page", () => {
    const token = "";
    cy.setLocalStorage("token", JSON.stringify(token));
    cy.visit("http://localhost:4200/home/profile");
  });
});
