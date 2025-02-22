import banner from "../../../public/banner.png";
import { DiscordPresence } from "react-discord-presence";

function DiscordProfile() {
  return (
    <DiscordPresence
      args={{ developerId: "741020084113244180" }}
      data={{
        memberSince: new Date("8/6/2020"),
      }}
      formatBannerImageSrc={() => banner}
    />
  );
}

export default DiscordProfile;
