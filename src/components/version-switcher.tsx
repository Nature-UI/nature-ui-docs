const versions = [
	{
		version: '1.x',
		url: 'https://v1.nature-ui.com',
	},
	{
		version: '2.x',
		url: 'https://nature-ui.com',
	},
];

const currentVersion = versions[1];

const VersionSwitcher = () => {
	return (
		<select
			value={currentVersion.url}
			aria-label={`Select the Nature UI UI Docs version. You're currently viewing the version ${currentVersion.version} docs`}
			className='bg-transparent focus:outline-none border-none p-2 mr-3 text-gray-75 rounded focus:ring'
		>
			{versions.map(({ version, url }) => (
				<option key={url} value={url}>
					v{version}
				</option>
			))}
		</select>
	);
};

export default VersionSwitcher;
