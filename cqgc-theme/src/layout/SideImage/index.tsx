import { ReactElement } from "react";
import cx from "classnames";
import { Row } from "antd";

import "./index.scss";

interface OwnProps {
  sideImgSrc?: string;
  alignCenter?: boolean;
  theme?: "light" | "dark";
  children: ReactElement;
  className?: string;
}

const SideImageLayout = ({
  sideImgSrc,
  alignCenter = true,
  theme = "dark",
  children,
  className = " ",
}: OwnProps) => (
  <div className={cx("sideImagePageContainer", className)}>
    <Row className={"contentWrapper"}>
      <div
        className={"sideImageContainer"}
        style={{
          backgroundImage: `url(${sideImgSrc})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      />
      <Row
        className={cx(
          "pageContent",
          alignCenter && "alignCenter",
          theme === "light" ? "light" : "dark"
        )}
      >
        {children}
      </Row>
    </Row>
  </div>
);

export default SideImageLayout;
