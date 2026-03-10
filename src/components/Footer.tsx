import { Link } from "react-router-dom"
import { Shield, Phone } from "lucide-react"

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-slate-900 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="mb-4 flex items-center gap-2">
              <div className="rounded-lg bg-primary p-2">
                <Shield className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-semibold text-white">
                AccidentConnect
              </span>
            </div>
            <p className="mb-4 max-w-md text-slate-400">
              Your trusted partner in navigating the aftermath of a car accident.
              Get immediate guidance and connect with verified local
              professionals.
            </p>
            <div className="flex items-center gap-2 text-slate-400">
              <Phone className="h-4 w-4" />
              <span>24/7 Support: 1-800-ACCIDENT</span>
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/checklist"
                  className="transition-colors hover:text-white"
                >
                  Accident Checklist
                </Link>
              </li>
              <li>
                <Link
                  to="/find-providers"
                  className="transition-colors hover:text-white"
                >
                  Find Providers
                </Link>
              </li>
              <li>
                <Link
                  to="/state-guidance"
                  className="transition-colors hover:text-white"
                >
                  State Guidance
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-white">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="transition-colors hover:text-white">
                  Safety Tips
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-white">
                  Insurance Guide
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-white">
                  Legal Rights
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-white">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-slate-800 pt-8 md:flex-row">
          <p className="text-sm text-slate-500">
            © 2026 AccidentConnect. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="transition-colors hover:text-white">
              Privacy Policy
            </a>
            <a href="#" className="transition-colors hover:text-white">
              Terms of Service
            </a>
            <a href="#" className="transition-colors hover:text-white">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
