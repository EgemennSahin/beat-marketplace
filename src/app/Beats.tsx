import { Beat } from "./Beat";
import Image from "next/image";
import Link from "next/link";

function getBeatData(beatId: string) {
  // Get beat data from firebase
  return {
    id: 1,
    name: "Long beat name asdfsdfasdf",
    src: "https://firebasestorage.googleapis.com/v0/b/beat-marketplace.appspot.com/o/11_30_22%20130%20BPM%20Fm.mp3?alt=media&token=bc8e2ea3-df58-43c9-ac31-e2e526934881",
    price: 3500,
    image: "/beat.jpg",
    userId: 1,
    userName: "username",
  };
}

export default function Beats() {
  const beatData = getBeatData("beat");

  return (
    <div className="p-8 flex bg-base-200 gap-8 overflow-hidden">
      <Beat beatData={beatData} />
      <Beat beatData={beatData} />
      <Beat beatData={beatData} />
      <Beat beatData={beatData} />
      <Beat beatData={beatData} />
      <Beat beatData={beatData} />
    </div>
  );
}
