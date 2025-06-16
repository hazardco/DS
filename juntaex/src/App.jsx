import { router } from "@/router"
import { RouterProvider } from "react-router-dom"
import { Toaster } from "jex-ds"

function App() {

  return (
    <>
      <Toaster/>
      <RouterProvider router={router} />
    </>
  )
}

export default App
