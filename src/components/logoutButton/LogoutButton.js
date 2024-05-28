import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mui/material";

export default function LogoutButton() {
  const { logout } = useAuth0();

  return (
    <Button sx={{ color: "#9ab" }}
      onClick={() =>
        logout({ logoutParams: { returnTo: "https://movietrack3r.netlify.app" } })
      }
    >
      Log Out
    </Button>
  );
}
