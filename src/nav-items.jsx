import { HomeIcon, BeakerIcon, TagIcon } from "lucide-react";
import Index from "./pages/Index.jsx";
import ProductListing from "./pages/ProductListing.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";

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
    title: "Product Detail",
    to: "/products/:id",
    icon: <TagIcon className="h-4 w-4" />,
    page: <ProductDetail />,
  },
];