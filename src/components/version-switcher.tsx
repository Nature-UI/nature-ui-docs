import { useState } from "react";

const versions = [
  {
    version: "1.x",
    url: "https://v1.nature-ui.com",
  },
  {
    version: "2.x",
    url: "https://nature-ui.com",
  },
];

const VersionSwitcher = () => {
  const [activeVersion, setVersion] = useState(versions[1]);
  return (
    <select
      value={activeVersion.url}
      aria-label={`Select the Nature UI UI Docs version. You're currently viewing the version ${activeVersion.version} docs`}
      className="bg-transparent focus:outline-none border-none p-2 mr-3 text-gray-75 rounded focus:ring"
      onChange={(event) => {
        console.log({ event }); // TODO: Remove this
        const value = versions.find((item) => item.url === event.target.value);
        setVersion(value);
      }}
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
