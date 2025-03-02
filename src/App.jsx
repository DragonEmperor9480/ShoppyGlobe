import { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'

const ProductList = lazy(() => import('./components/ProductList'))
const ProductDetail = lazy(() => import('./components/ProductDetail'))
const Cart = lazy(() => import('./components/Cart'))
const NotFound = lazy(() => import('./components/NotFound'))

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-[#2e1065] via-[#4c1d95] to-[#6d28d9]">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Suspense fallback={
            <div className="flex justify-center items-center min-h-[60vh]">
              <div className="loading loading-spinner loading-lg text-primary"></div>
            </div>
          }>
            <Routes>
              <Route path="/" element={<ProductList />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  )
}

export default App
