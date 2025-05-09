"use client";
import Image from "next/image";
import Link from "next/link";
import logo from "../public/images/logo/logo.png";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { useCartStore } from "@/store/cart-store";
import { CircleX, Menu, ShoppingCart } from "lucide-react";

export const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const { items } = useCartStore();
  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <nav className="sticky top-0 z-50 bg-white shadow">
      <div className=" container max-auto flex items-center justify-between px-3 py-3 ">
        <Link href="/" className="flex">
          {" "}
          <Image src={logo} alt="This is logo" width={40} height={5} />
          <h1 className="hover:text-green-700 p-1 text-lg font-mono font-bold animate-pulse">
            {" "}
            Natural Beauty
          </h1>
        </Link>
        <div className=" hidden md:flex space-x-6">
          <Link
            href="/"
            className="hover:text-green-700 text  p-1 text-lg font-mono font-bold"
          >
            Home
          </Link>
          <Link
            href="/products"
            className="hover:text-green-700  p-1 text-lg font-mono font-bold"
          >
            Products
          </Link>
          <Link
            href="/checkout"
            className="hover:text-green-700  p-1 text-lg font-mono font-bold"
          >
            Checkout
          </Link>
        </div>
        <Link href="/checkout" className="relative">
          <ShoppingCart className="h-6 w-6" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
              {cartCount}
            </span>
          )}
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          className="md:hidden"
          onClick={() => setMobileOpen((prev) => !prev)}
        >
          {mobileOpen ? (
            <CircleX className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>
      </div>

      {mobileOpen && (
        <nav className="md:hidden bg-white shadow-md">
          <ul className="flex flex-col p-4 space-y-2">
            <li>
              <Link href="/" className="block hover:text-blue-600">
                Home
              </Link>
            </li>
            <li>
              <Link href="/products" className="block hover:text-blue-600">
                Products
              </Link>
            </li>
            <li>
              <Link href="/checkout" className="block hover:text-blue-600">
                Checkout
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </nav>
  );
};
