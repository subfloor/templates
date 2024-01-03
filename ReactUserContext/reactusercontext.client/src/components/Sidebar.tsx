import { Link } from "react-router-dom";
import { CSSProperties } from "react";

interface INavLink {
  name: string;
  url: string;
}

const navLinks: INavLink[] = [
  {
    name: "Landing",
    url: "/",
  },
  {
    name: "Home",
    url: "/home",
  },
  {
    name: "Claims",
    url: "/claims",
  },
  {
    name: "About",
    url: "/about",
  },
];

const linkItemStyle: CSSProperties = {
  width: 150,
  padding: 15,
  border: "1px solid #eee",
};

const linkStyle: CSSProperties = {
  textDecoration: "none",
  color: "blue",
};

export const Sidebar: React.FunctionComponent = () => {
  return (
    <div>
      {navLinks.map((navLink) => {
        return (
          <div key={navLink.name} style={linkItemStyle}>
            <Link style={linkStyle} to={navLink.url}>
              {navLink.name}
            </Link>
          </div>
        );
      })}
    </div>
  );
};
// export default function Sidebar() {
//   return (
//     <div className={styles.sidebar}>
//       <div className={styles.aContainer}>
//         <NavLink to="/">Home</NavLink>
//       </div>
//       <div className={styles.aContainer}>
//         <NavLink to="/erc/eventinfo">Event Info</NavLink>
//       </div>

//     </div>
//   );
// }
