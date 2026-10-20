import { AppRoutes } from './app/routes/routes'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './app/api/query-client'

function App() {
  return (
    <QueryClientProvider client={queryClient}>
     <AppRoutes />
    </QueryClientProvider>
  )
}

export default App