import React from "react";
import { UncontrolledAlert } from "reactstrap";

interface Props {
  visible: boolean;
  message: string;
  type?: string;
  style?: any;
}

const Alert: React.FC<Props> = ({ visible, message, type, style }) => {
  if (!visible) return null;
  return (
    <UncontrolledAlert
      color={type ?? "danger"}
      className="align-items-center w-50 position-absolute mr-auto ml-auto"
      style={{
        bottom: 0,
        zIndex: 1200,
        left: 0,
        right: 0,
        ...style,
      }}>
      {message}
    </UncontrolledAlert>
  );
};

export default Alert;
