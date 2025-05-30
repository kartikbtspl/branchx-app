import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ads = [
  {
    id: 1,
    title: "Tasty. Flavorful. Treat",
    duration: "1.5 min",
    image: "/images/carousel/frame1.svg",
  },
  {
    id: 2,
    title: "So Smooth, You'll Fall For It.",
    duration: "1.5 min",
    image: "/images/carousel/frame2.svg", 
  },
  {
    id: 3,
    title: "Chatpati khabar ke saath kuch Chatpata to banta hai!",
    duration: "1.5 min",
    image: "/images/carousel/frame3.svg", 
  },
];

const VideoAdsCarousel = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="w-full mx-auto py-6">
      <h2 className="text-xl font-bold mb-4 px-4">Ongoing Video Ad(s)</h2>
      <Slider {...settings}>
        {ads.map((ad) => (
          <div
            key={ad.id}
            className="flex justify-center items-center px-4"
          >
            <div className="relative w-full max-w-md rounded-xl overflow-hidden shadow-lg">
              <img
                src={ad.image}
                alt={ad.title}
                className="w-full h-auto object-cover"
              />
              <span className="absolute bottom-2 left-2 bg-white text-black text-sm px-2 py-1 rounded-md">
                ● {ad.duration}
              </span>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default VideoAdsCarousel;
