import React, { FC } from "react";
import Image from "next/image";

interface CarouselProps {
  images: string[];
  current: number;
}

const Carousel: FC<CarouselProps> = ({ images, current }) => (
  <div className="mb-6 relative w-[300px] h-[300px] overflow-hidden">
    {images.map((img, idx) => (
      <Image
        key={img}
        src={img}
        alt={`Construction Logo ${idx + 1}`}
        width={300}
        height={300}
        priority={idx === current}
        className={`absolute top-0 left-0 transition-transform duration-700 ease-in-out ${
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

export default Carousel;
