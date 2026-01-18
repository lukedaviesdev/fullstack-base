import {
    type RouteConfig,
    route,
    index,
    layout,
    prefix,
  } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("login", "./routes/auth/login.tsx"),
    route("register", "./routes/auth/register.tsx"),
    layout("./layouts/protected.tsx", [
      route("dashboard", "./routes/dashboard.tsx"),
    ]),
] satisfies RouteConfig;
