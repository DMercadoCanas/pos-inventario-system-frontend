import { useEffect, useState } from "react"
import { AlertCircle, MoreVertical } from "lucide-react"

function LowStockProducts() {
  const [lowStockProducts, setLowStockProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Reemplaza la URL con la de tu API real
    fetch("/api/low-stock-products")
      .then((res) => {
        if (!res.ok) throw new Error("Error al cargar productos")
        return res.json()
      })
      .then((data) => {
        setLowStockProducts(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  const handleViewAll = () => {
    // Aquí puedes navegar a la página de inventario o mostrar un modal
    alert("Funcionalidad de 'Ver todos' pendiente de implementar")
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-[#5c4b44]">Productos con Bajo Stock</h3>
          <button
            className="text-sm text-[#5c4b44] hover:underline cursor-pointer"
            onClick={handleViewAll}
          >
            Ver todos
          </button>
        </div>
      </div>
      <div className="p-6">
        {loading ? (
          <p className="text-gray-500">Cargando...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : lowStockProducts.length === 0 ? (
          <p className="text-gray-500">No hay productos con bajo stock.</p>
        ) : (
          <div className="space-y-4">
            {lowStockProducts.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between p-3 hover:bg-[#f8f5f2] rounded-md transition-colors cursor-pointer"
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-[#f8f5f2] flex items-center justify-center">
                    <AlertCircle className="h-5 w-5 text-[#5c4b44]" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-800">{product.name}</p>
                    <p className="text-xs text-gray-500">SKU: {product.sku}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="text-right mr-4">
                    <p className="text-sm font-medium text-gray-800">{product.stock} unidades</p>
                    <p className="text-xs text-red-500">Stock bajo</p>
                  </div>
                  <button className="p-1 rounded-md hover:bg-gray-100">
                    <MoreVertical className="h-4 w-4 text-gray-400" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default LowStockProducts
