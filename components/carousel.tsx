"use client";

import Stripe from "stripe";
import { Card, CardContent, CardTitle } from "./ui/card";
import { useEffect, useState } from "react";
import Image from "next/image";

interface Props {
  products: Stripe.Product[];
}

export const Carousel = ({ products }: Props) => {
  const [current, setCurrent] = useState<number>(0);

  // Rotate through the carousel every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 3) % products.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [products.length]);

  // Get the next 3 products for display
  const getDisplayProducts = () => {
    const slice = products.slice(current, current + 3);
    // If reaching end of list, wrap around
    return slice.length === 3
      ? slice
      : [...slice, ...products.slice(0, 3 - slice.length)];
  };

  const displayProducts = getDisplayProducts();

  return (
    <Card className="overflow-hidden rounded-lg shadow-md border border-gray-300 p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {displayProducts.map((product) => {
          const price = product.default_price as Stripe.Price;

          return (
            <div
              key={product.id}
              className="flex flex-col items-center text-center"
            >
              {product.images?.[0] && (
                <div className="relative h-60 w-full">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="rounded object-cover"
                  />
                </div>
              )}
              <CardContent className="mt-4">
                <CardTitle className="text-lg font-semibold">
                  {product.name}
                </CardTitle>
                {price?.unit_amount && (
                  <p className="text-gray-700 text-sm">
                    ${(price.unit_amount / 100).toFixed(2)}
                  </p>
                )}
              </CardContent>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
