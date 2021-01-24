/** @jsx jsx */
import { Link } from "gatsby";
import { jsx, Image } from "theme-ui";
import useSiteMetadata from "../hooks/use-site-metadata";

const HeaderTitle = () => {
  const { siteTitle } = useSiteMetadata();

  return (
    <Link
      to={`/`}
      aria-label={`${siteTitle} - Back to home`}
      sx={{ color: `#eae6fe`, lineHeight: `100%` }}
    >
      <Image
        src="images/logo/logo.png"
        alt="ZellyPish"
        sx={{ width: `10rem` }}
      />
    </Link>
  );
};

export default HeaderTitle;
