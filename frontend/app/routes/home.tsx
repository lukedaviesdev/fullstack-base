import type { Route } from "./+types/home";


export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Welcome to Fullstack Base
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          A production-ready fullstack starter with React Router, Express, Prisma, and authentication built-in.
        </p>
      </div>
    </div>
  );
}
