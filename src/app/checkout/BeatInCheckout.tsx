import { BeatData } from "@/interfaces/BeatData";

export default async function BeatInCheckout({ beatId }: { beatId: number }) {
  const beatData = (await fetch("/api/get_beat?id=" + beatId).then((res) =>
    res.json()
  )) as BeatData;

  return <pre>{beatData.id}</pre>;
}
