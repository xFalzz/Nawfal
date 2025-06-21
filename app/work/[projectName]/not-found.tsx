import Link from "next/link";

const NotFoundPage = () => {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-semibold mb-6 mt-4">
        Looks like I haven&apos;t made that project yet 😆
      </h1>
      <Link
        href="/"
        className="inline-block text-lg text-primary font-bold hover:underline"
      >
        Go back home
      </Link>
    </main>
  );
};

export default NotFoundPage;
