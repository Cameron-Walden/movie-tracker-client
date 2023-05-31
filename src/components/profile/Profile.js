import { useState, useEffect, useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { FilmContext } from "../../context/FilmContext";
import Header from "../Header";
import Films from "../films/Films";
import { Container } from "@mui/material";

export default function Profile() {
  const { hasUserSearched } = useContext(FilmContext);
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <>
      <Header />
      {isAuthenticated ? (
        <Container className="user-container">
          <img src={user.picture} alt={user.name} />
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </Container>
      ) : null}
      {hasUserSearched ? <Films /> : null}
    </>
  );
}