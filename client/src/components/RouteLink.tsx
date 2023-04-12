import { Link } from "react-router-dom";

type RouteLinkProps = {
  name: string;
  path: string;
};

export const RouteLink = ({ path, name }: RouteLinkProps) => {
  // const handler = () => {
  //   dispatch({ type: GlobalTypes.MSG, payload: { msg: "", error: "" } });
  // };

  return (
    <Link to={path} className="hover:underline">
      {name}
    </Link>
  );
};
