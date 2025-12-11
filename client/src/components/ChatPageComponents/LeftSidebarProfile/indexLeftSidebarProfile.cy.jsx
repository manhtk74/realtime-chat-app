import React from "react";
import LeftSidebarProfile from "./index";
import "./LeftSidebarProfile.css";
import { MemoryRouter } from "react-router-dom";
import { useAppStore } from "../../../store";

describe("<LeftSidebarProfile />", () => {

  beforeEach(() => {
    useAppStore.setState({
      activeIcon: "profile",
      setActiveIcon: () => {},
      userInfo: {
        id: "1",
        email: "test@gmail.com",
        firstName: "John",
        lastName: "Doe",
        image: "",
        color: 0,
        profileSetup: true,
      },
      setUserInfo: () => {},
      closeChat: () => {},
      uploadProgress: 0,
      setUploadProgress: () => {},
      uploadTargetId: "",
      setUploadTargetId: () => {},
      uploadFileName: "",
      setUploadFileName: () => {},
    });

    cy.intercept("POST", "/api/auth/update-profile", {
      statusCode: 200,
      body: {
        id: "1",
        email: "test@gmail.com",
        firstName: "John",
        lastName: "Doe",
        image: "",
        color: 0,
      },
    }).as("updateProfile");

    cy.intercept("POST", "/api/auth/logout", {
      statusCode: 200,
      body: { success: true },
    }).as("logout");
  });

  it("render component", () => {
    cy.mount(
      <MemoryRouter>
        <LeftSidebarProfile />
      </MemoryRouter>
    );

    cy.contains("h1", "Profile").should("exist");
    cy.get('input[placeholder="First Name"]').should("have.value", "John");
    cy.get('input[placeholder="Last Name"]').should("have.value", "Doe");
  });

  it("hiển thị thông tin người dùng", () => {
    cy.mount(
      <MemoryRouter>
        <LeftSidebarProfile />
      </MemoryRouter>
    );

    cy.get('input[placeholder="Email"]')
      .should("have.value", "test@gmail.com");

    cy.get('input[placeholder="First Name"]')
      .should("have.value", "John");

    cy.get('input[placeholder="Last Name"]')
      .should("have.value", "Doe");
  });

  it("update profile", () => {
    cy.mount(
      <MemoryRouter>
        <LeftSidebarProfile />
      </MemoryRouter>
    );

    cy.contains("Save Changes").click();

    cy.wait("@updateProfile");
  });

  it("logout", () => {
    cy.mount(
      <MemoryRouter>
        <LeftSidebarProfile />
      </MemoryRouter>
    );

    cy.contains("Logout").click();

    cy.wait("@logout");
  });

  it("upload avatar", () => {
    cy.mount(
      <MemoryRouter>
        <LeftSidebarProfile />
      </MemoryRouter>
    );

    cy.get('input[type="file"]').selectFile(
      {
        contents: "cypress/fixtures/example.json",
        fileName: "example.json",
        mimeType: "application/json",
      },
      { force: true }
    );

    cy.get(".profile-image").should("exist");
  });

  it("hiển thị avatar khi có", () => {
    useAppStore.setState({
      userInfo: {
        id: "1",
        email: "test@gmail.com",
        firstName: "John",
        lastName: "Doe",
        image: "https://www.pixelstalk.net/wp-content/uploads/2016/10/Desktop-nature-photo-hd-download-free.jpg",
        color: 0,
        profileSetup: true,
      },
    });

    cy.mount(
      <MemoryRouter>
        <LeftSidebarProfile />
      </MemoryRouter>
    );

    cy.get("img").should("have.attr", "src", "https://www.pixelstalk.net/wp-content/uploads/2016/10/Desktop-nature-photo-hd-download-free.jpg");
  });
});
