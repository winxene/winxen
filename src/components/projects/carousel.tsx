import React, { FC } from "react";
import Image from "next/image";

interface CarouselProps {
  images: string[];
  current: number;
}

const Carousel: FC<CarouselProps> = ({ images, current }) => {
  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className="mb-6 relative w-full h-48 sm:h-56 md:h-72 lg:h-[480px] overflow-hidden rounded-lg">
      {images.map((img, idx) => (
        <Image
          key={img}
          src={img}
          fill
          alt={`Project Image ${idx + 1}`}
          priority={idx === current}
          className={`object-cover transition-transform duration-700 ease-in-out ${
            idx === current
              ? "translate-x-0 opacity-100 z-10"
              : idx < current
                ? "-translate-x-full opacity-0 z-0"
                : "translate-x-full opacity-0 z-0"
          }`}
          style={{ pointerEvents: idx === current ? "auto" : "none" }}
        />
      ))}
    </div>
  );
};

export default Carousel;
