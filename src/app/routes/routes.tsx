import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  Outlet,
  createRoutesFromElements,
  Route
} from 'react-router-dom'
import { ROUTE_PATHS } from './paths'
import { MainPage } from '@/pages/MainPage'
import { AuthPage } from '@/pages/AuthPage'
import { useMainStore } from '@/entities/max/model/store'


const RequireAuth = () => {
  const isLoggedIn = useMainStore((state) => state.authData?.idInstance)

  if (!isLoggedIn) {
    return (
      <Navigate
        to={ROUTE_PATHS.AUTH}
      />
    )
  }

  return <Outlet />
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      element={
        <Outlet />
      }
    >
    <Route path={ROUTE_PATHS.AUTH} element={<AuthPage />} />
      <Route element={<RequireAuth />}>
        <Route path={ROUTE_PATHS.MAIN} element={<MainPage />} />
      </Route>
    </Route>
  )
)

export const AppRoutes = () => <RouterProvider router={router} />
