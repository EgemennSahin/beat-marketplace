import { Beat } from "@/components/beat/Beat";
import AddToCartButton from "@/components/cart/AddToCartButton";
import { getBeatData } from "@/helpers/database";

export const revalidate = 0;

export default async function Page({
  params,
}: {
  params: { user: string; beat: string };
}) {
  // The parameters are in the url
  const { user, beat } = params;

  const beatData = await getBeatData(beat);

  if (!beatData) return <div>Beat not found</div>;

  return (
    <main className="mx-auto mt-16 flex w-fit p-12 gap-8 rounded-md bg-base-300 flex-col">
      <Beat beatData={beatData} />
      <AddToCartButton beatData={beatData} />
    </main>
  );
}
