import { Button } from "@/components/ui/button";
import { stripe } from "@/lib/stripe";
import Image from "next/image";
import Link from "next/link";

import { Carousel } from "@/components/carousel";

export default async function Home() {
  const products = await stripe.products.list({
    expand: ["data.default_price"],
    limit: 100,
  });
  console.log(products);

  return (
    <div>
      <section className="rounded bg-neutral-100 py-8 sm:py-12">
        <div className="flex items-center flex-col md:flex-row justify-between gap-8 px-8 sm:px-16">
          <div className="max-w-md space-y-4">
            <h2 className="relative z-10 text-lg  bg-clip-text text-transparent bg-gradient-to-b from-lime-100 to-lime-600  text-center font-sans  lg:text-4xl font-bold tracking-tight md:text-2xl">
              Welcome to Natural Beauty Product World
            </h2>
            <p className="text-neutral-600 font-semibold">
              Explore our latest collection of cruelty-free, natural
              products—carefully curated for quality and offered at the best
              prices.
            </p>
            <Button
              asChild
              variant="default"
              className="inline-flex items-center text-base justify-center rounded-full px-6 py-6 bg-green-700 hover:bg-black text-white"
            >
              <Link
                href="/products"
                className="inline-flex items-center justify-center rounded-full px-6 py-3"
              >
                {" "}
                Brows All Products
              </Link>
            </Button>
          </div>
          <Image
            alt="Banner Image"
            src={products.data[0].images[0]}
            width={450}
            height={450}
            className="rounded"
          />
        </div>
      </section>
      <section className="py-8">
        <Carousel products={products.data} />
      </section>
    </div>
  );
}
