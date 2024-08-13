import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

// Function to generate unique keys for categories
const generateKey = (id, title) => `${id}-${title}`;

function Categories() {
  // List of categories
  const categoryList = [
    {
      id: 1,
      image: "/Cardiologist.png",
      title: "Cardiologist",
      path: "/cardiologist",
    },
    {
      id: 2,
      image: "/Dentist.png",
      title: "Dentist",
      path: "/dentist",
    },
    {
      id: 3,
      image: "/neurology.png",
      title: "Neurology",
      path: "/neurology",
    },
    {
      id: 4,
      image: "/orthopedic.png",
      title: "Orthopedic",
      path: "/orthopedic",
    },
    {
      id: 5,
      image: "/Cardiologist.png",
      title: "Cardiologist",
      path: "/cardiologist",
    },
    {
      id: 6,
      image: "/Dentist.png",
      title: "Dentist",
      path: "/dentist",
    },
    {
      id: 7,
      image: "/neurology.png",
      title: "Neurology",
      path: "/neurology",
    },
    {
      id: 8,
      image: "/orthopedic.png",
      title: "Orthopedic",
      path: "/orthopedic",
    },
  ];

  return (
    <div className="py-12 px-4 md:px-10 flex flex-col space-y-4">
      <p className="text-center text-2xl font-semibold dark:text-white">
        Clinic and Specialities
      </p>
      <p className="text-center text-lg text-gray-600 dark:text-dark-muted">
        Explore a variety of clinics and specialities tailored to your healthcare needs. Whether you're seeking a cardiologist or a dentist, our curated list helps you find the best medical professionals.
      </p>
      <div className="mx-4 md:mx-12">
        <Swiper
          spaceBetween={30}
          slidesPerView={4}
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            360: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 6,
              spaceBetween: 30,
            },
          }}
        >
          {categoryList.map((categoryItem) => (
            <SwiperSlide key={generateKey(categoryItem.id, categoryItem.title)}>
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="p-6 shadow-lg rounded-full bg-white dark:bg-dark-card dark:border dark:border-dark-input-border">
                  <div className="relative w-24 h-24">
                    <img
                      src={categoryItem.image}
                      alt={categoryItem.title}
                      className="object-cover w-full h-full rounded-full"
                    />
                  </div>
                </div>
                <span className="text-lg font-medium dark:text-dark-muted">
                  {categoryItem.title}
                </span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default Categories;
