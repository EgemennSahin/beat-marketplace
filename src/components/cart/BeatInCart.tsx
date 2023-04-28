import { BeatData } from "@/interfaces/BeatData";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useAppDispatch } from "@/store/store";
import { removeFromCart } from "@/store/features/cartSlice";
import Link from "next/link";

export default function BeatInCart({
  beatData,
  showTrashIcon = true,
}: {
  beatData: BeatData;
  showTrashIcon?: boolean;
}) {
  const dispatch = useAppDispatch();

  return (
    <div
      className={`relative bg-cover bg-center bg-no-repeat rounded-md ${
        showTrashIcon && "group"
      }`}
      style={{
        backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.8)), url(${beatData.imageSrc})`,
      }}
    >
      <div className="p-2">
        <div className="flex justify-between items-center gap-4">
          <span className="text-white truncate group-hover:underline">
            {beatData.name}
          </span>
          <span className="text-white whitespace-nowrap group-hover:hidden">
            {beatData.price} TL
          </span>
          {showTrashIcon && (
            <button
              onClick={() => dispatch(removeFromCart(beatData.id))}
              className="z-20 h-full w-auto absolute rounded-r-md top-0 right-0 p-2 bg-red-500 text-white opacity-0 group-hover:opacity-100 group-hover:bg-opacity-100 transition-all duration-200"
            >
              <TrashIcon className="h-full w-full " />
            </button>
          )}
        </div>
      </div>

      <Link
        href={`/beat/${beatData.userId}/${beatData.id}`}
        className="absolute inset-0 rounded-md bg-black opacity-0 group-hover:opacity-25 transition-opacity duration-200"
      />
    </div>
  );
}
