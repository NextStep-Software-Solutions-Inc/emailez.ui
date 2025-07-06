import { type RouteConfig, index, route, layout } from "@react-router/dev/routes";

export default [
    layout("routes/public.layout.tsx", [
        index("routes/public/home.tsx"),
        route("features", "routes/public/features.tsx"),
        route("pricing", "routes/public/pricing.tsx"),
        route("docs", "routes/public/docs.tsx"),
        route("support", "routes/public/support.tsx"),
    ]),
    layout("routes/dashboard.layout.tsx", [
        route("dashboard", "routes/dashboard/index.tsx"),
        route("dashboard/compose", "routes/dashboard/compose.tsx"),
        route("dashboard/configurations", "routes/dashboard/configurations.tsx"),
        route("dashboard/analytics", "routes/dashboard/analytics.tsx"),
        route("dashboard/activity", "routes/dashboard/activity.tsx"),
        route("dashboard/settings", "routes/dashboard/settings.tsx"),
    ])

] satisfies RouteConfig;
