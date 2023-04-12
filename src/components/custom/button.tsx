import { Button as NatureButton, forwardRef } from "@nature-ui/core";

const Button = forwardRef((props, ref) => (
  <NatureButton
    ref={ref}
    {...props}
    className={`text-white ${props.className}`}
  />
));

export default Button;
