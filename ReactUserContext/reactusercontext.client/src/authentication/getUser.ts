import { User, UserSessionClaim } from "./types";

export async function userClaims() {
  const response = await fetch("/bff/user", {
    method: "GET",
    headers: { "X-CSRF": "1" },
  });

  if (response.ok) {
    const json = await response.json();
    const claims: UserSessionClaim[] = json;
    return claims;
  } else {
    return [] as UserSessionClaim[];
  }
}

export default async function getUser() {
  const claims = await userClaims();
  if (claims.length > 0) {
    const userId = claims.find((claim) => claim.type === "sub")?.value ?? "";
    const user = <User>{
      Authenticated: true,
      UserId: userId,
      Email: claims.find((claim) => claim.type === "name")?.value,
      Logouturl: claims.find((claim) => claim.type === "bff:logout_url")?.value,
      Claims: claims,
    };
    return user;
  } else {
    return <User>{
      Authenticated: false,
      UserId: "00000000-0000-0000-0000-000000000000",
      Email: "",
      Logouturl: "",
      Claims: [],
    };
  }
}
