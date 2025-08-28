import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-24 text-center">
      <h2 className="text-2xl font-semibold tracking-tight mb-2">Page not found</h2>
      <p className="text-muted-foreground mb-6">
        The page you are looking for does not exist. Check the URL and try again.
      </p>
      <Link className="underline" href="/">
        Go back home
      </Link>
    </div>
  );
}
