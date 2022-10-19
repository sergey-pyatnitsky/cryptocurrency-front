import { ReactNode } from "react"
import MainPage from "../page/MainPage"

interface IRoutes {
  path: string,
  element: ReactNode,
  exact: boolean
}

export const privateRoutes: IRoutes[] = [
  { path: "/", element: <MainPage />, exact: true },
]

export default function getDefaultRoleRoute(role: string): string {
  switch (role) {
    case 'ADMIN': return '/profile'
    case 'USER': return '/profile'
    default: return "/";
  }
}