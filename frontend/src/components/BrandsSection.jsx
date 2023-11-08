import React from "react";
import { brands } from "../constants";

export default function BrandsSection() {
  return (
    <section className="p-6 tablet:px-[50px] pt-[50px] tablet:pt-[70px] flex gap-10 items-start justify-center flex-wrap">
      {brands.map((brand) => (
        <img
          key={brand.name}
          src={brand.logo}
          className="fill-[#9c9bc5] h-8 w-auto"
          alt="image"
        />
      ))}
    </section>
  );
}
