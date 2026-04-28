import { useEffect, useMemo, useRef } from "react"

type Variant = string

export type ABTestConfig<TVariants extends readonly Variant[]> = {
  variants: TVariants
  weights?: readonly number[]
  /**
   * URL override: `?ab_<testName>=B`
   * Example: `?ab_home_hero_v1=B`
   */
  queryParamPrefix?: string
  storage?: "localStorage" | "sessionStorage"
}

function pickWeighted<T extends string>(values: readonly T[], weights?: readonly number[]): T {
  if (!weights || weights.length !== values.length) {
    return values[Math.floor(Math.random() * values.length)]!
  }

  const total = weights.reduce((sum, w) => sum + w, 0)
  if (total <= 0) return values[0]!

  const r = Math.random() * total
  let acc = 0
  for (let i = 0; i < values.length; i++) {
    acc += weights[i]!
    if (r < acc) return values[i]!
  }
  return values[values.length - 1]!
}

function getStorage(kind: "localStorage" | "sessionStorage") {
  try {
    return window[kind]
  } catch {
    return null
  }
}

function storageKey(testName: string) {
  return `ab:${testName}:variant`
}

function getQueryOverride(testName: string, prefix: string) {
  try {
    const params = new URLSearchParams(window.location.search)
    const raw = params.get(`${prefix}${testName}`)
    return raw ?? null
  } catch {
    return null
  }
}

export function getOrAssignVariant<TVariants extends readonly Variant[]>(
  testName: string,
  config: ABTestConfig<TVariants>,
): TVariants[number] {
  const { variants, weights, storage = "localStorage", queryParamPrefix = "ab_" } = config

  const override = getQueryOverride(testName, queryParamPrefix)
  if (override && (variants as readonly string[]).includes(override)) {
    const store = getStorage(storage)
    store?.setItem(storageKey(testName), override)
    return override as TVariants[number]
  }

  const store = getStorage(storage)
  const existing = store?.getItem(storageKey(testName))
  if (existing && (variants as readonly string[]).includes(existing)) {
    return existing as TVariants[number]
  }

  const chosen = pickWeighted(variants as readonly TVariants[number][], weights)
  store?.setItem(storageKey(testName), chosen)
  return chosen
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

export function trackABExposure(testName: string, variant: string) {
  window.gtag?.("event", "ab_exposure", {
    ab_test: testName,
    ab_variant: variant,
  })
}

export function trackABConversion(testName: string, variant: string, conversion: string) {
  window.gtag?.("event", "ab_conversion", {
    ab_test: testName,
    ab_variant: variant,
    ab_conversion: conversion,
  })
}

export function useABTest<TVariants extends readonly Variant[]>(
  testName: string,
  config: ABTestConfig<TVariants>,
): {
  variant: TVariants[number]
  trackConversion: (conversion: string) => void
} {
  const variant = useMemo(() => getOrAssignVariant(testName, config), [testName])

  const exposedRef = useRef(false)
  useEffect(() => {
    if (exposedRef.current) return
    exposedRef.current = true
    trackABExposure(testName, String(variant))
  }, [testName, variant])

  const trackConversion = useMemo(() => {
    return (conversion: string) => trackABConversion(testName, String(variant), conversion)
  }, [testName, variant])

  return { variant, trackConversion }
}

