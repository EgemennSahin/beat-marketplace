export default function UserPage({ params }: { params: { user: string } }) {
  const { user } = params;

  return (
    <main className="bg-base-100">
      <div className="flex flex-col items-center min-w-96">user</div>
    </main>
  );
}
