import test from "../../../public/test.webp";
import { DiscordPresence } from "react-discord-presence";

function DiscordPorfile() {
  return (
    <DiscordPresence
      args={{ developerId: "741020084113244180" }}
      data={{
        memberSince: new Date("8/6/2020"),
      }}
      formatBannerImageSrc={() => test}
    />
  );
}

export default DiscordPorfile;
