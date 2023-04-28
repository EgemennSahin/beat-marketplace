import { getBeatData } from "@/helpers/database";

export default async function BeatInCheckout({ beatId }: { beatId: string }) {
  const beatData = await getBeatData(beatId);

  console.log(beatData);

  return <pre>{beatData.id}</pre>;
}
