import ProductSection from '@/components/ProductSection';
import { getProducts } from '@/lib/products';
import Videobanner from '@/components/Videobanner';

const Page = async () => {
  const product = await getProducts();

  const men = product.filter(p => p.category === 'men');
  const women = product.filter(p => p.category === 'women');
  const kids = product.filter(p => p.category === 'kids');
  const decor = product.filter(p => p.category === 'decor');
  const electronics = product.filter(p => p.category === 'electronics');

  const videos = [
    { id: 1, src: '/kids.mp4', title: 'Summer Collection', subtitle: 'Up to 50% off' },
    { id: 2, src: '/men.mp4', title: 'New Arrivals', subtitle: 'Limited time offer' },
    { id: 3, src: '/mshoes.mp4', title: 'Premium Selection', subtitle: 'Exclusive deals' },
    { id: 4, src: '/waccess.mp4', title: 'Clearance Sale', subtitle: 'Prices slashed' }
  ];

  return (
    <div className="pb-20">
      <Videobanner videos={videos} />
      <div className="backdrop-blur">
        <ProductSection
          title="Men's Collection"
          products={men}
          backgroundImage="https://images.pexels.com/photos/3568518/pexels-photo-3568518.jpeg?auto=compress&cs=tinysrgb&w=600"
          categoryValue="men"
          product={product}
        />
        <ProductSection
          title="Women's Collection"
          products={women}
          backgroundImage="https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=600"
          categoryValue="women"
          product={product}
        />
        <ProductSection
          title="Kids' Collection"
          products={kids}
          backgroundImage="https://images.pexels.com/photos/8435789/pexels-photo-8435789.jpeg?auto=compress&cs=tinysrgb&w=600"
          categoryValue="kids"
          product={product}
        />
        <ProductSection
          title="Home Decor"
          products={decor}
          backgroundImage="https://images.pexels.com/photos/6801924/pexels-photo-6801924.jpeg?auto=compress&cs=tinysrgb&w=600"
          categoryValue="decor"
          product={product}
        />
        <ProductSection
          title="Electronics"
          products={electronics}
          backgroundImage="https://images.pexels.com/photos/682933/pexels-photo-682933.jpeg?auto=compress&cs=tinysrgb&w=600"
          categoryValue="electronics"
          product={product}
        />
      </div>
    </div>
  );
};

export default Page;
