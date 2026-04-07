import { useEffect } from "react"
import { Outlet, useLocation } from "react-router-dom"
import { Navigation } from "./Navigation"
import { Footer } from "./Footer"
import { RecommendationPanel } from "./RecommendationPanel"
import { useUserContext } from "@/context/UserContext"

export function Root() {
  const location = useLocation()
  const { addVisitedPage } = useUserContext()

  useEffect(() => {
    addVisitedPage(location.pathname)
  }, [location.pathname])

  return (
    <div className="flex min-h-screen flex-col bg-muted/30">
      <Navigation />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <RecommendationPanel />
    </div>
  )
}
