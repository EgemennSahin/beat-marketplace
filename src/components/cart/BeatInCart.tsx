import { BeatData } from "@/interfaces/BeatData";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useAppDispatch } from "@/store/store";
import { removeFromCart } from "@/store/features/cartSlice";
import Link from "next/link";

export default function BeatInCart({ beatData }: { beatData: BeatData }) {
  const dispatch = useAppDispatch();

  return (
    <div
      className="relative bg-cover bg-center bg-no-repeat rounded-md"
      style={{
        backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.5) 50%, rgba(0, 0, 0, 0.8)), url(${beatData.imageSrc})`,
      }}
    >
      <div className="p-2 flex justify-between items-center gap-4">
        <Link
          href={`/beat/${beatData.id}`}
          className="text-white truncate hover:underline"
        >
          {beatData.name} asdfkhasgfkhasdgfkjasdkjfkgjsd
        </Link>
        <div className="flex space-x-4 items-center">
          <span className="text-white whitespace-nowrap group-hover:hidden font-semibold">
            {beatData.price} TL
          </span>
          <button
            onClick={() => dispatch(removeFromCart(beatData.id))}
            className="btn btn-sm btn-error btn-outline btn-square p-1"
          >
            <TrashIcon className="h-full w-full " />
          </button>
        </div>
      </div>
    </div>
  );
}
