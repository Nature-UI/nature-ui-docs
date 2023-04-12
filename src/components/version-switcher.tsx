import { useRouter } from "next/router";
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
  const router = useRouter();
  return (
    <select
      value={activeVersion.url}
      aria-label={`Select the Nature UI UI Docs version. You're currently viewing the version ${activeVersion.version} docs`}
      className="bg-transparent focus:outline-none border-none p-2 mr-3 text-gray-75 rounded focus:ring"
      onChange={(e) => {
        router.push(e.target.value);
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
