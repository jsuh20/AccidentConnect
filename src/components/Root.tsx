import { Outlet } from "react-router-dom"
import { Navigation } from "./Navigation"
import { Footer } from "./Footer"

export function Root() {
  return (
    <div className="flex min-h-screen flex-col bg-muted/30">
      <Navigation />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
