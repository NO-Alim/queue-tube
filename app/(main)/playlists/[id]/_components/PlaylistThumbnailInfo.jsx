import Image from "next/image";

const PlaylistThumbnailInfo = ({ playlistDetails }) => {
  const { title, description, thumbnails } = playlistDetails || {};
  return (
    <div className="md:col-span-1 space-y-4">
      <div className="relative w-full aspect-video rounded-md overflow-hidden">
        <Image
          src={thumbnails?.high?.url || "/default-thumbnail.jpg"}
          alt={title}
          className="object-cover"
          fill
        />
      </div>
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">{title}</h1>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

export default PlaylistThumbnailInfo;
