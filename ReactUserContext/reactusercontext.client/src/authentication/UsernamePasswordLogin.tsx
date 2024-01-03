import { Button, Card } from "antd";
import "./Login.css";
import { LoginProvider } from "./types";

export default function UsernamePasswordLogin() {
  // TODO: Available login providers will be determined by the project
  const loginProviders: LoginProvider[] = [
    { node: "Username & Password", href: "/bff/login", type: "default" },
  ];

  return (
    <div className="Login-container">
      <Card className="Login-card">
        <h1>Login</h1>
        <p>Choose an identity provider to sign in with</p>

        <section className="Login-buttons">
          {loginProviders.map((provider) => {
            if (provider.type === "component") {
              return <provider.node key={provider.href} href={provider.href} />;
            } else {
              return (
                <Button
                  key={provider.href}
                  type={provider.type}
                  href={provider.href}
                >
                  {provider.node}
                </Button>
              );
            }
          })}
        </section>
      </Card>
    </div>
  );
}
