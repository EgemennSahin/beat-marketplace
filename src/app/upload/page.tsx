export default function UploadPage() {
  return (
    <main className="bg-base-100">
      <div className="flex flex-col items-center min-w-96">
        <input
          type="text"
          placeholder="Beat adı"
          className="input input-bordered w-full max-w-xs"
        />

        <input type="file" className="file-input w-full max-w-xs" />
      </div>
    </main>
  );
}
