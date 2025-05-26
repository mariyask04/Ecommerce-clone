//lib/products.js:

export const getProducts = () => {
    return [
    {
        id: '1',
        name: 'Classic Black Shirt',
        slug: 'classic-black-shirt',
        image: '/shirt.jpg',
        price: 1909,
        oldPrice: 2905,
        desc: 'A timeless black shirt for all occasions.',
        category: 'men',
        images:["/shirt.jpg","/shirt2.jpg","/shirt3.jpg","/shirt4.jpg"]
    },
    {
        id: '2',
        name: 'Women Shoes',
        slug: 'women-shoes',
        image: '/shoes2.jpg',
        price: 2656,
        oldPrice: 3984,
        desc: 'Bow ballet flat shoes.',
        category: 'women',
        images:["/shoes.jpg","/shoes2.jpg","/shoes3.jpg","/shoes4.jpg"]
    },
    {
        id: '3',
        name: 'Toy Construction Truck',
        slug: 'toy-construction-truck',
        image: '/truck4.jpg',
        price: 1411,
        oldPrice: 2490,
        desc: 'Yellow toy construction truck.',
        category: 'kids',
        images:["/truck.jpg","/truck2.jpg","/truck3.jpg","/truck4.jpg"]
    },
    {
        id: '4',
        name: 'Comfort Cross Shoes',
        slug: 'comfort-cross-shoes',
        image: '/mshoes.jpg',
        price: 4150,
        oldPrice: 5810,
        desc: "New Balance Men's 608 V5 Casual Comfort Cross Trainer.",
        category: 'men',
        images:["/mshoes.jpg","/mshoes2.jpg","/mshoes3.jpg","/mshoes4.jpg"]
    },
    {
        id: '5',
        name: 'FLOWER Plant Terrarium',
        slug: 'flower-plant-terrarium',
        image: '/hdecor.jpg',
        price: 913,
        oldPrice: '',
        desc: 'FLOWER Plant Terrarium with Wooden Stand, Air Planter Bulb Glass Vase...',
        category: 'decor',
        images:["/hdecor.jpg","/hdecor2.jpg","/hdecor3.jpg","/hdecor4.jpg"]
    },
    {
        id: '6',
        name: 'Fabric Large Lazy Chair',
        slug: 'fabric-large-lazy-chair',
        image: '/chair3.jpg',
        price: 8300,
        oldPrice: '',
        desc: 'HollyHOME Fabric Large Lazy Chair for Living Room Accent Reading Chair...',
        category: 'decor',
        images:["/chair.jpg","/chair2.jpg","/chair3.jpg","/chair4.jpg"]
    },
    {
        id: '7',
        name: 'Kids Shoes',
        slug: 'kids-shoes',
        image: '/kshoes.jpg',
        price: 830,
        oldPrice: '',
        desc: 'Daclay Kids Shoes Running Girls Boys Sports Sneakers.',
        category: 'kids',
        images:["/kshoes.jpg","/kshoes1.jpg","/kshoes2.jpg","/kshoes3.jpg"]
    },
    {
        id: '8',
        name: 'Kids Accessories',
        slug: 'kids-accessories',
        image: '/kaccess2.jpg',
        price: 830,
        oldPrice: '',
        desc: 'mibasies Purse for Little Girls Dress Up Jewelry Pretend Play...',
        category: 'kids',
        images:["/kaccess.jpg","/kaccess2.jpg","/kaccess3.jpg","/kaccess4.jpg"]
    },
    {
        id: '9',
        name: "Men's Sweatshirt",
        slug: "men-sweatshirt",
        image: '/msweatshirt.jpg',
        price: 1079,
        oldPrice: '',
        desc: "Hanes Men's EcoSmart Sweatshirt.",
        category: 'men',
        images:["/msweatshirt.jpg","/msweatshirt2.jpg","/msweatshirt3.jpg","/msweatshirt4.jpg"]
    },
    {
        id: '10',
        name: 'Leather Belt',
        slug: 'leather-belt',
        image: '/belt.jpg',
        price: 3320,
        oldPrice: '',
        desc: 'CHAOREN Leather Ratchet Belt Men 2 Pack...',
        category: 'men',
        images:["/belt.jpg","/belt2.jpg","/belt3.jpg","/belt4.jpg"]
    },
    {
        id: '11',
        name: 'Floral Bodycon',
        slug: 'floral-bodycon',
        image: '/dress.jpg',
        price: 3984,
        oldPrice: '',
        desc: "GORGLITTER Women's Floral Ruched Bodycon Midi Dress...",
        category: 'women',
        images:["/dress.jpg","/dress2.jpg","/dress3.jpg","/dress4.jpg"]
    },
    {
        id: '12',
        name: 'Gold Bracelets',
        slug: 'gold-bracelets',
        image: '/waccess.jpg',
        price: 1411,
        oldPrice: '',
        desc: 'DEARMAY Gold Bracelets for Women Waterproof, 14K Real Gold Jewelry...',
        category: 'women',
        images:["/waccess.jpg","/waccess2.jpg","/waccess3.jpg","/waccess4.jpg"]
    },
    {
        id: '13',
        name: 'Girls Pajamas',
        slug: 'girls-pajamas',
        image: '/ksuit.jpg',
        price: 1494,
        oldPrice: '',
        desc: 'Topgal Satin Pajamas for Girls Coat Style Unicorn & Cat...',
        category: 'kids',
        images:["/ksuit.jpg","/ksuit2.jpg","/ksuit3.jpg","/ksuit4.jpg"]
    },
    {
        id: '14',
        name: 'Tabletop Water Fountain',
        slug: 'tabletop-water-fountain',
        image: '/homedecor.jpg',
        price: 3237,
        oldPrice: '',
        desc: 'Homedics Tabletop Water Fountain, Home Décor Soothing Sound Machine...',
        category: 'decor',
        images:["/homedecor.jpg","/homedecor2.jpg","/homedecor3.jpg","/homedecor4.jpg"]
    },
    {
        id: '15',
        name: 'Blackout Curtains',
        slug: 'blackout-curtains',
        image: '/curtain.jpg',
        price: 6972,
        oldPrice: '',
        desc: 'Lazzzy Curtain Panels Beige Thermal Insulated Rod Pocket...',
        category: 'decor',
        images:["/curtain.jpg","/curtain2.jpg","/curtain3.jpg","/curtain4.jpg"]
    },
    {
        id: '16',
        name: 'Noise Concelling Headphones',
        slug: 'noise-cancelling-headphones',
        image: '/headphone.jpg',
        price: 2996,
        oldPrice: '',
        desc: 'BERIBES Upgraded Hybrid Active Noise Cancelling Headphones with Transparent Modes,70H Playtime Bluetooth Headphones Wireless Bluetooth with Mic, Deep Bass,3.5MM Cable,Soft-Earpads,Fast Charging-Black',
        category: 'electronics',
        images:["/headphone.jpg","/headphone2.jpg","/headphone3.jpg","/headphone4.jpg"]
    },
    {
        id: '17',
        name: 'Smart Watch',
        slug: 'smart-watch',
        image: '/smartwatch.jpg',
        price: 2482,
        oldPrice: '',
        desc: 'Smart Watch, 1.85" Smartwatch for Men Women(Answer/Make Call), 2025 Fitness Watch with 115+ Sports Modes/Heart Rate/SpO2/Pedometer/Sleep Monitor, IP68 Waterproof Activity Tracker for Android iOS',
        category: 'electronics',
        images:["/smartwatch.jpg","/smartwatch2.jpg","/smartwatch3.jpg","/smartwatch4.jpg"]
    },
    {
        id: '18',
        name: 'Airdopes 311',
        slug: 'airdopes-311',
        image: '/airdopes.jpg',
        price: 2140,
        oldPrice: '',
        desc: 'Airdopes 311 Pro Truly Wireless in Ear Earbuds, Up to 50 Hrs Playtime, Dual Mics, Low-Latency Mode, ASAP Charging, IPX4, IWP Tech, BT v5.3 (Lavender Rush)',
        category: 'electronics',
        images:["/airdopes.jpg","/airdopes2.jpg","/airdopes3.jpg","/airdopes4.jpg"]
    }
];
}