import Add from '@/components/Add'
import CustomizeProduct from '@/components/CustomizeProduct'
import ProductImages from '@/components/ProductImages'
import { notFound } from 'next/navigation'
import { getProducts } from '@/lib/products'

export async function generateStaticParams() {
  // Fetch all products to generate static params for each product page
  const products = await getProducts()
  return products.map((product) => ({
    slug: product.slug
  }))
}

export default async function ProductPage({ params }) {
  // Fetch all products to find the selected product based on the slug
  const products = await getProducts()
  const product = products.find((p) => p.slug === params.slug)

  // If the product doesn't exist, return a 404 page
  if (!product) {
    notFound()
  }

  return (
    <div className='flex flex-col lg:flex-row gap-8 md:gap-16 px-4 md:px-8 lg:px-16 py-8'>
      {/* Product Images Section */}
      <div className='lg:w-1/2 lg:sticky lg:top-20 h-max'>
        <ProductImages images={product.images} />
      </div>

      {/* Product Information Section */}
      <div className='lg:w-1/2 flex flex-col gap-6'>
        {/* Product Title */}
        <h1 className='text-3xl md:text-4xl font-medium'>{product.name}</h1>
        
        {/* Product Description */}
        <p className='text-lg text-gray-500'>{product.desc}</p>

        <div className='bg-gray-200 h-[1px] w-full' />

        {/* Product Price & Discount */}
        <div className='flex items-center gap-4'>
          {product.oldPrice && (
            <h3 className='text-xl line-through text-gray-500'>₹{product.oldPrice}</h3>
          )}
          <h2 className='text-2xl font-medium'>₹{product.price}</h2>
          {product.oldPrice > product.price && (
            <span className="bg-green-100 text-green-800 text-sm px-2 py-1 rounded">
              {Math.round((1 - product.price / product.oldPrice) * 100)}% OFF
            </span>
          )}
        </div>

        <div className='bg-gray-200 h-[1px] w-full' />

        {/* Customize Product Section */}
        <CustomizeProduct />

        {/* Add to Cart Section */}
        <Add product={product} />

        <div className='bg-gray-200 h-[1px] w-full' />

        {/* Product Details Section */}
        <div className="space-y-4">
          <details className="group" open>
            <summary className="flex justify-between items-center font-medium text-xl cursor-pointer list-none">
              <span>Description</span>
              <span className="transition group-open:rotate-180">▼</span>
            </summary>
            <p className="text-gray-600 mt-2">{product.desc}</p>
          </details>

          <details className="group">
            <summary className="flex justify-between items-center font-medium text-xl cursor-pointer list-none">
              <span>Shipping & Returns</span>
              <span className="transition group-open:rotate-180">▼</span>
            </summary>
            <p className="text-gray-600 mt-2">
              Free shipping on all orders over $50. Returns accepted within 30 days.
            </p>
          </details>
        </div>
      </div>
    </div>
  )
}
