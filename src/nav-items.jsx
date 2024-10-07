import { HomeIcon, BeakerIcon, TagIcon, LayersIcon, MailIcon } from "lucide-react";
import Index from "./pages/Index.jsx";
import ProductListing from "./pages/ProductListing.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import Categories from "./pages/Categories.jsx";
import ContactUs from "./pages/ContactUs.jsx";

export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: <HomeIcon className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "Products",
    to: "/products",
    icon: <BeakerIcon className="h-4 w-4" />,
    page: <ProductListing />,
  },
  {
    title: "Categories",
    to: "/categories",
    icon: <LayersIcon className="h-4 w-4" />,
    page: <Categories />,
  },
  {
    title: "Product Detail",
    to: "/products/:id",
    icon: <TagIcon className="h-4 w-4" />,
    page: <ProductDetail />,
  },
  {
    title: "Contact Us",
    to: "/contact",
    icon: <MailIcon className="h-4 w-4" />,
    page: <ContactUs />,
  },
];
