const filterIdFromLink = (input) => {
  let playlistId = input;

  // let get id from url
  if (playlistId.includes("list=")) {
    playlistId = playlistId.split("list=")[1];
  }
  if (playlistId.includes("&")) {
    playlistId = playlistId.split("&")[0];
  }

  return playlistId;
};

export default filterIdFromLink;
