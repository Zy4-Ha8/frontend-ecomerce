import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Mousewheel } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {
  ArrowBigRight,
  ArrowLeft,
  ArrowRight,
  MoveLeft,
  MoveRight,
  Star,
} from "lucide-react";

const HappyCustomers = () => {
  const swiperRef = useRef(null);

  const testimonials = [
    {
      id: 1,
      name: "Sarah M.",
      rating: 5,
      review:
        "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.",
      verified: true,
    },
    {
      id: 2,
      name: "Alex K.",
      rating: 5,
      review:
        "Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions.",
      verified: true,
    },
    {
      id: 3,
      name: "James L.",
      rating: 5,
      review:
        "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends.",
      verified: true,
    },
    {
      id: 4,
      name: "Monika P.",
      rating: 5,
      review:
        "Shop.co has completely transformed my wardrobe. The quality is outstanding and the customer service is exceptional. I couldn't be happier with my purchases!",
      verified: true,
    },
    {
      id: 5,
      name: "Emily R.",
      rating: 5,
      review:
        "The attention to detail and craftsmanship is evident in every piece. Shop.co has become my go-to destination for quality fashion that never disappoints.",
      verified: true,
    },
    {
      id: 6,
      name: "Michael B.",
      rating: 5,
      review:
        "I was skeptical about online shopping, but Shop.co changed my mind completely. Fast shipping, great prices, and incredible quality. Highly recommended!",
      verified: true,
    },
  ];

  return (
    <div className=" bg-white  w-full py-16  px-6 ">
      <div className="max-w-6xl mx-auto">
        {/* Header with Navigation */}
        <div className="flex   items-center justify-between mb-6 sm:mb-12 flex-wrap gap-4">
          <h2 className="text-xl w-full sm:w-auto text-center sm:text-start   sm:text-4xl md:text-5xl font-black text-black uppercase tracking-tight">
            OUR HAPPY CUSTOMERS
          </h2>

          {/* Custom Navigation Arrows */}
          <div className="flex justify-between w-full sm:w-auto sm:justify-start gap-3">
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft />
            </button>
            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="w-8 h-8  sm:w-10 sm:h-10  rounded-full border-2 border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <ArrowRight />
            </button>
          </div>
        </div>

        {/* Swiper Carousel */}
        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          modules={[Navigation, Pagination, Mousewheel]}
          spaceBetween={16}
          slidesPerView={1}
          grabCursor={true}
          mousewheel={{
            forceToAxis: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 24,
            },
          }}
          className="testimonials-swiper"
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <div className="border-2 border-gray-200 rounded-2xl  p-6 sm:p-7 hover:shadow-lg transition-shadow duration-300 h-full">
                {/* Star Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, index) => (
                    <Star color="white" className="bg-yellow-300 rounded" />
                  ))}
                </div>

                {/* Name and Verified Badge */}
                <div className="flex items-center gap-2 mb-3">
                  <h3 className="text-lg font-bold text-black">
                    {testimonial.name}
                  </h3>
                  {testimonial.verified && <div></div>}
                </div>

                {/* Review Text */}
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  "{testimonial.review}"
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Swiper Styles */}
        <style>{`
          .testimonials-swiper {
            padding: 10px 0;
          }
          
          .testimonials-swiper .swiper-slide {
            height: auto;
          }
        `}</style>
      </div>
    </div>
  );
};

export default HappyCustomers;
