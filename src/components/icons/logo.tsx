import Link from 'next/link';

export const SvgLogo = () => {
	return (
		<svg
			width='53'
			height='53'
			viewBox='0 0 252 252'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<g filter='url(#filter0_i)'>
				<circle cx='126' cy='126' r='126' fill='#8E48FF' />
			</g>
			<path
				fillRule='evenodd'
				clipRule='evenodd'
				d='M93.7551 182.86L105.264 158.179L116.695 182.693C120.168 190.14 126.155 195.611 133.174 198.567C148.951 205.473 167.439 198.553 174.757 182.86L215.098 96.3484C222.524 80.4222 215.634 61.491 199.708 54.0644C183.781 46.6379 164.85 53.5283 157.424 69.4546L145.765 94.4566L134.029 69.2882C126.602 53.3619 107.671 46.4715 91.7447 53.898C83.7437 57.6289 78.0233 64.2634 75.2528 71.9617L36.081 155.966C28.6544 171.892 35.5449 190.823 51.4711 198.25C67.3974 205.677 86.3286 198.786 93.7551 182.86ZM105.121 158.483L93.7542 182.86C86.3276 198.786 67.3964 205.676 51.4701 198.25C50.5271 197.81 49.6157 197.33 48.7371 196.812C41.7993 190.417 37.4532 181.252 37.4532 171.072C37.4532 151.742 53.1233 136.072 72.4532 136.072C87.3456 136.072 100.066 145.373 105.121 158.483ZM202.43 55.4957C209.372 61.8915 213.721 71.0589 213.721 81.2419C213.721 100.572 198.051 116.242 178.721 116.242C163.83 116.242 151.111 106.943 146.054 93.8344L157.423 69.4543C164.849 53.528 183.781 46.6376 199.707 54.0641C200.646 54.5023 201.555 54.9805 202.43 55.4957Z'
				fill='white'
			/>
			<defs>
				<filter
					id='filter0_i'
					x='0'
					y='0'
					width='252'
					height='252'
					filterUnits='userSpaceOnUse'
					colorInterpolationFilters='sRGB'
				>
					<feFlood floodOpacity='0' result='BackgroundImageFix' />
					<feBlend
						mode='normal'
						in='SourceGraphic'
						in2='BackgroundImageFix'
						result='shape'
					/>
					<feColorMatrix
						in='SourceAlpha'
						type='matrix'
						values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
						result='hardAlpha'
					/>
					<feMorphology
						radius='45'
						operator='erode'
						in='SourceAlpha'
						result='effect1_innerShadow'
					/>
					<feOffset />
					<feGaussianBlur stdDeviation='15' />
					<feComposite in2='hardAlpha' operator='arithmetic' k2='-1' k3='1' />
					<feColorMatrix
						type='matrix'
						values='0 0 0 0 0.478431 0 0 0 0 0.156863 0 0 0 0 1 0 0 0 1 0'
					/>
					<feBlend mode='normal' in2='shape' result='effect1_innerShadow' />
				</filter>
			</defs>
		</svg>
	);
};

export const Logo = () => {
	return (
		<Link href='/'>
			<div className='flex items-center mr-8'>
				<SvgLogo />
				<h2 className='text-xl font-bold text-gray-1000 w-full ml-3'>
					Nature UI
				</h2>
			</div>
		</Link>
	);
};
