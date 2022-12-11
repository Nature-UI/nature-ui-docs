import { Button as NatureButton } from '@nature-ui/core';

const Button = (props) => (
	<NatureButton
		{...props}
		className={`bg-primary-500 text-white ${props.className}`}
	/>
);

export default Button;
