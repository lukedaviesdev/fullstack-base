import type { Route } from "./+types/dashboard";


export function meta({}: Route.MetaArgs) {
  return [
    { title: "Dashboard" },
    { name: "description", content: "Your application dashboard." },
  ];
}

export default function Dashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-foreground mb-4">Dashboard</h1>
      <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
        Welcome to your dashboard. Start building something amazing!
      </p>
    </div>
  );
}
