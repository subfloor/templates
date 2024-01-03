import { useContext } from "react";
import Layout from "../components/Layout";
import { AuthContext } from "../context/AuthContext";

const Claims = () => {
  const user = useContext(AuthContext);

  return (
    <Layout>
      <div>
        <div>
          <h1>User Claims</h1>
          <table
            border={1}
            cellPadding={5}
            style={{ borderCollapse: "collapse" }}
          >
            <thead>
              <tr>
                <th>type</th>
                <th>value</th>
                <th>notes</th>
              </tr>
            </thead>
            <tbody>
              {user?.Claims.map((claim) => {
                return (
                  <tr key={claim.type}>
                    <td>{claim?.type}</td>
                    <td>{claim?.value}</td>
                    <td>
                      {claim?.type === "sub"
                        ? "global user id"
                        : claim?.type === "name"
                        ? "global user email"
                        : claim?.type === "bff:logout_url"
                        ? "logout url"
                        : ""}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};
export default Claims;
