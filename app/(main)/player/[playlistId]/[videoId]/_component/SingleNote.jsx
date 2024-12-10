import { formatTimestamp } from "@/utils/timeConverter";
import { Clock4, Tally1 } from "lucide-react";

const SingleNote = ({ note }) => {
  const { noteId, text, timestamp } = note || {};
  return (
    <div className=" flex p-5 border rounded gap-5 items-center">
      <div className=" flex gap-3 items-center ">
        <Clock4 />
        <p>{timestamp ? formatTimestamp(timestamp) : "00:00:00"}</p>
      </div>
      <div>
        <Tally1 />
      </div>
      <div>
        <p>{text || "No content available for this note."}</p>
      </div>
    </div>
  );
};

export default SingleNote;
