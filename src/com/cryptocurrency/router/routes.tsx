import { ReactNode } from "react"
import AdminPage from "../page/AdminPage"
import MainPage from "../page/MainPage"
import UserPage from "../page/UserPage"

interface IRoutes {
  path: string,
  element: ReactNode,
  exact: boolean
}

export const privateRoutes: IRoutes[] = [
  { path: "/", element: <MainPage />, exact: true },
  { path: "/user", element: <UserPage />, exact: true },
  { path: "/admin", element: <AdminPage />, exact: true }
]

export default function getDefaultRoleRoute(role: string): string {
  switch (role) {
    case 'ADMIN': return '/admin'
    case 'USER': return '/user'
    default: return "/";
  }
}