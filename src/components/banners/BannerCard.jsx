import React from 'react'

export default function BannerCard({image}) {

  return (
    <div className="min-w-[270px] flex-shrink-0">
      <img
        src={image}
        alt="banner"
        className="
          w-full
          rounded-xl
          object-cover
          scrollbar-hide
        "
      />
    </div>
  );
}
