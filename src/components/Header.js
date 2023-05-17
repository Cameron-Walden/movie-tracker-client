import { useAuth0 } from "@auth0/auth0-react";
import LoggedOutNav from "./loggedOutNav/LoggedOutNav";
import LoggedInNav from "./loggedInNav/LoggedInNav";

export default function Header() {
  const { isAuthenticated } = useAuth0();

  return <>{isAuthenticated ? <LoggedInNav /> : <LoggedOutNav />}</>;
}
