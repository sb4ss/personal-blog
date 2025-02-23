import banner from "../../../public/banner.png";
import { DiscordPresence } from "react-discord-presence";
import "./discord.css";

function DiscordProfile() {
  return (
    <div className="discord-presence">
      <DiscordPresence
        args={{ developerId: "741020084113244180" }}
        data={{
          memberSince: new Date("8/6/2020"),
        }}
        formatBannerImageSrc={() => banner}
      />
    </div>
  );
}

export default DiscordProfile;
