import Link from 'next/link';
import Image from 'next/image';

export default function ProductCard({ product }) {
  return (
    <Link href={`/${product.slug}`} className="h-full">
      <div className="flex flex-col h-full border p-4 rounded hover:shadow-lg transition">
        <div className="w-full h-64 relative">
          <Image
            src={product.image}
            alt={product.name}
            layout="fill"
            objectFit="contain"
            className="rounded"
          />
        </div>

        <h3 className="mt-4 text-lg font-semibold">{product.name}</h3>
        <div className="mt-auto text-sm text-gray-500">₹{product.price}</div>
      </div>
    </Link>
  );
}
