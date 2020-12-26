const builder = require("electron-builder");
const path = require("path");

const Platform = builder.Platform;

const APP_NAME = "netview";

async function main() {
  const res = await builder.build({
    targets: Platform.WINDOWS.createTarget("dir"),
    config: {
      appId: `com.electron.${APP_NAME}`,
      directories: {
        app: path.join(__dirname, "../app"),
        buildResources: path.join(__dirname, "../resources"),
      },
      extraResources: [
        {
          from: "resources",
          to: "../resources",
          filter: ["**/*"],
        },
      ],
      files: ["**/*"],
    },
  });
  console.log(res);
}

main().catch((e) => console.log(e));
