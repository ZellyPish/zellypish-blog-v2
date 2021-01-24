/** @jsx jsx */
import { Link } from "gatsby";
import { jsx, Image } from "theme-ui";
import useSiteMetadata from "../hooks/use-site-metadata";
import Logo from "./Logo";

const HeaderTitle = () => {
  const { siteTitle } = useSiteMetadata();

  return (
    <Link to={`/`} aria-label={`${siteTitle} - Back to home`}>
      <Logo />
    </Link>
  );
};

export default HeaderTitle;
