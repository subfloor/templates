import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Layout from "../components/Layout";

export const Landing = () => {
  const user = useContext(AuthContext);
  return (
    <>
      <Layout>
        <div>
          <h2>Landing</h2>
          {user.Authenticated && <div>welcome {user.Email}</div>}
          {!user.Authenticated && <div>please login</div>}
        </div>
      </Layout>
    </>
  );
};
