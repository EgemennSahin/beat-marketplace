import { getBeatData } from "@/helpers/database";

export default async function BeatInCheckout({ beatId }: { beatId: number }) {
  const beatData = await getBeatData(beatId);

  console.log(beatData);

  return <pre>{beatData.id}</pre>;
}
