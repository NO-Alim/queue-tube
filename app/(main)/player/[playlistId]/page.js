import { CustomError } from "@/components/Error";

const PlayerMainPage = () => {
  // when there is playlistId and no videoId

  return <CustomError message="Video Id missing in URL" />;
};

export default PlayerMainPage;
