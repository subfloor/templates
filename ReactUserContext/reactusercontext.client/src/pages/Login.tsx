import UsernamePasswordLogin from "../authentication/UsernamePasswordLogin";
import LayoutUnauthorized from "../components/LayoutUnauthorized";

export const Login = () => {
  return (
    <>
      <LayoutUnauthorized>
        <div>
          <div>
            <UsernamePasswordLogin />
          </div>
        </div>
      </LayoutUnauthorized>
    </>
  );
};
