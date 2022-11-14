import { IconButton, useDisclosure, useUpdateEffect } from '@nature-ui/core';
import Link from 'next/link';
import React from 'react';

import siteConfig from 'configs/site-config';

import { DiscordIcon, GithubIcon, Logo } from './icons';
import { MobileNavButton, MobileNaveContent } from './mobile-nav';
import VersionSwitcher from './version-switcher';

const HeaderContent = () => {
	const mobileNavBtnRef = React.useRef<HTMLButtonElement>();

	const mobileNav = useDisclosure();

	useUpdateEffect(() => {
		mobileNavBtnRef.current?.focus();
	}, [mobileNav.isOpen]);
	return (
		<header className='sticky top-0 left-0 w-full bg-white z-10 border-b backdrop-blur flex-none'>
			<div className='w-full bg-primary-500 h-1 absolute top-0 left-0' />

			<nav className='w-full max-w-screen-lg px-4 md:px-0 md:mx-auto py-3'>
				<div className='flex items-center justify-between'>
					<Logo />
					<div className='hidden md:w-4/6 md:flex items-center justify-end'>
						<VersionSwitcher />
						<Link
							aria-label='Go to Nature UI GitHub page'
							href={siteConfig.repo.url}
							target='_blank' // TODO: fix this
						>
							<IconButton
								className='mr-5 text-gray-500 hover:text-gray-75 transition-colors duration-150'
								size='xs'
								icon={<GithubIcon />}
							/>
						</Link>
						<Link
							aria-label='Go to Nature UI Discord page'
							href={siteConfig.discord.url}
							target='_blank'
						>
							<IconButton
								className='text-gray-500 hover:text-gray-75 transition-colors duration-150'
								size='xs'
								icon={<DiscordIcon />}
							/>
						</Link>
					</div>
					<MobileNavButton
						ref={mobileNavBtnRef}
						aria-label='Open Menu'
						onClick={mobileNav.onOpen}
					/>
				</div>
			</nav>

			<MobileNaveContent
				isOpen={mobileNav.isOpen}
				onClose={mobileNav.onClose}
			/>
		</header>
	);
};

const Header = () => {
	return <HeaderContent />;
};

export default Header;
