import { Button as NatureButton } from "@nature-ui/core";

const Button = (props) => (
  <NatureButton {...props} className={`text-white ${props.className}`} />
);

export default Button;
