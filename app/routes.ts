import { type RouteConfig, index, route, layout } from "@react-router/dev/routes";

export default [
    layout("routes/public.layout.tsx", [
        index("routes/public/home.tsx"),
        route("features", "routes/public/features.tsx"),
        route("pricing", "routes/public/pricing.tsx"),
        route("docs", "routes/public/docs.tsx"),
        route("support", "routes/public/support.tsx"),
    ]),
    // Legacy dashboard route - redirects to workspace-specific URL
    route("dashboard", "routes/dashboard-redirect.tsx"),
    // Workspace-specific dashboard routes
    layout("routes/dashboard.layout.tsx", [
        // Onboarding route for new users
        route("onboarding", "routes/onboarding.tsx"),
        route("workspace/:workspaceId", "routes/dashboard/index.tsx"),
        route("workspace/:workspaceId/compose", "routes/dashboard/compose.tsx"),
        route("workspace/:workspaceId/configurations", "routes/dashboard/configurations.tsx"),
        route("workspace/:workspaceId/analytics", "routes/dashboard/analytics.tsx"),
        route("workspace/:workspaceId/activity", "routes/dashboard/activity.tsx"),
        route("workspace/:workspaceId/settings", "routes/dashboard/settings.tsx"),
    ])

] satisfies RouteConfig;
