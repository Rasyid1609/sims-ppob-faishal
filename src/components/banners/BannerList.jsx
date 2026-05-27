import React from 'react'
import BannerCard from "./BannerCard";
import banner1 from "../../assets/banners/banner-1.png";
import banner2 from "../../assets/banners/banner-2.png";
import banner3 from "../../assets/banners/banner-3.png";
import banner4 from "../../assets/banners/banner-4.png";
import banner5 from "../../assets/banners/banner-5.png";

export default function BannerList() {
    const banners = [
        banner1,
        banner2,
        banner3,
        banner4,
        banner5,
    ];
  return (
    <section className="mt-12">
      <h2 className="font-semibold text-lg mb-4">
        Temukan promo menarik
      </h2>

      <div
        className="
          flex
          gap-4
          overflow-x-auto
          hide-scrollbar
        "
      >
        {banners.map((banner, index) => (
          <BannerCard
            key={index}
            image={banner}
          />
        ))}
      </div>
    </section>
  );
}
