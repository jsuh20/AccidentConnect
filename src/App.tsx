import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Root } from "./components/Root"
import { Home } from "./pages/Home"
import { Checklist } from "./pages/Checklist"
import { FindProviders } from "./pages/FindProviders"
import { StateGuidance } from "./pages/StateGuidance"
import { NotFound } from "./pages/NotFound"

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "checklist", Component: Checklist },
      { path: "find-providers", Component: FindProviders },
      { path: "state-guidance", Component: StateGuidance },
      { path: "*", Component: NotFound },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
