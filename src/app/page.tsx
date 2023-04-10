import Beats from "./Beats";

export default function Home() {
  return (
    <main className="flex flex-col bg-base-100">
      <div className="bg-[url('/beat.jpg')] flex h-96 p-36 justify-items-center">
        <div className="flex flex-col items-center justify-center gap-8">
          <h1 className="font-medium text-5xl">
            Beatlerini <br /> herkese goster
          </h1>
          <button className="btn btn-primary normal-case w-full">
            Hemen başla
          </button>
        </div>
      </div>
      <Beats />
    </main>
  );
}
