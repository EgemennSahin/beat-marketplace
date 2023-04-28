import { BeatData } from "@/interfaces/BeatData";

export default async function BeatInCheckout({ beatId }: { beatId: number }) {
  const beatData = (await fetch("/api/get_beat?id=" + beatId).then((res) =>
    res.json()
  )) as BeatData;

  console.log(beatData);

  return <pre>{beatData.id}</pre>;
}
