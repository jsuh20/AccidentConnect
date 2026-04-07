import { createContext, useContext, useState, type ReactNode } from "react"

interface UserContextValue {
  checkedItems: Set<string>
  hasInjuries: boolean | null
  selectedProviderType: string
  selectedState: string
  visitedPages: Set<string>
  checklistProgress: number
  toggleChecklistItem: (id: string, checked: boolean) => void
  setHasInjuries: (value: boolean | null) => void
  setSelectedProviderType: (type: string) => void
  setSelectedState: (state: string) => void
  addVisitedPage: (page: string) => void
  setChecklistProgress: (progress: number) => void
}

const UserContext = createContext<UserContextValue | null>(null)

export function UserContextProvider({ children }: { children: ReactNode }) {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set())
  const [hasInjuries, setHasInjuries] = useState<boolean | null>(null)
  const [selectedProviderType, setSelectedProviderType] = useState("")
  const [selectedState, setSelectedState] = useState("")
  const [visitedPages, setVisitedPages] = useState<Set<string>>(new Set())
  const [checklistProgress, setChecklistProgress] = useState(0)

  function toggleChecklistItem(id: string, checked: boolean) {
    setCheckedItems((prev) => {
      const next = new Set(prev)
      if (checked) next.add(id)
      else next.delete(id)
      return next
    })
  }

  function addVisitedPage(page: string) {
    setVisitedPages((prev) => {
      if (prev.has(page)) return prev
      const next = new Set(prev)
      next.add(page)
      return next
    })
  }

  return (
    <UserContext.Provider
      value={{
        checkedItems,
        hasInjuries,
        selectedProviderType,
        selectedState,
        visitedPages,
        checklistProgress,
        toggleChecklistItem,
        setHasInjuries,
        setSelectedProviderType,
        setSelectedState,
        addVisitedPage,
        setChecklistProgress,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export function useUserContext() {
  const ctx = useContext(UserContext)
  if (!ctx) throw new Error("useUserContext must be used within UserContextProvider")
  return ctx
}
