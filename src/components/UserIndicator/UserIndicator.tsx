// this is really messy and i really don't wanna fix it. so whatever.

import Box from "../Box/Box";
import ProfilePopupContent from "../ProfilePopup/ProfilePopupContent";
import type { AuthorizedAccountFromAPI } from "@/db/schema";
import UserIndicatorClient from "./UserIndicatorClient";
import UserIndicatorContentClient from "./UserIndicatorContentClient";
import UserIndicatorSmall from "./UserIndicatorSmall";

const UserIndicator = (props: Record<string, any> & AuthorizedAccountFromAPI & {
  avatar: string,
  canEdit: boolean,
  splash?: string
}) => {
  return (
    <Box className="absolute bottom-1 left-1 rounded-2xl overflow-hidden w-20">
      <div className="overflow-hidden" style={{
        transition: "height 0.25s"
      }}>
        <UserIndicatorContentClient>
          <ProfilePopupContent {...props} />
        </UserIndicatorContentClient>
      </div>
      <UserIndicatorClient>
        <UserIndicatorSmall {...props} />
      </UserIndicatorClient>
    </Box>
  );
};

export default UserIndicator;
