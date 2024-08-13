import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Image from "next/image"; // Import the Image component from next/image
import DoctorCard from "./DoctorCard";

function BookDoctor() {
  // Define the structure of a doctor object
  const doctorList = [
    {
      id: 1,
      name: "Deborah Angel",
      category: "MBBS, MD - General Medicine, DNB - Cardiology",
      image: "https://doccure.dreamguystech.com/react/template/9109ec39a7b4d06af126b0d5cec32273.jpg",
      address: "Georgia, USA",
      slotTime: "Available on Fri, 22 Mar",
      chargeStart: 100,
      chargeEnd: 300,
    },
    {
      id: 2,
      name: "Sofia Brient",
      category: "MBBS, MS - General Surgery, MCh - Urology",
      image: "https://doccure.dreamguystech.com/react/template/7058680646be673ef70f79e43f408408.jpg",
      address: "Louisiana, USA",
      slotTime: "Available on Fri, 22 Mar",
      chargeStart: 200,
      chargeEnd: 400,
    },
    {
      id: 3,
      name: "Ruby Perrin",
      category: "MDS - Periodontology and Oral Implantology, BDS",
      image: "https://doccure.dreamguystech.com/react/template/82a70aca5403c6ff499b0ac2a729e670.jpg",
      address: "Florida, USA",
      slotTime: "Available on Fri, 22 Mar",
      chargeStart: 300,
      chargeEnd: 1000,
    },
    {
      id: 4,
      name: "Darren Elder",
      category: "BDS, MDS - Oral & Maxillofacial Surgery",
      image: "https://doccure.dreamguystech.com/react/template/4c4edf4d3fc07e7acd8f249becdbcc04.jpg",
      address: "New York, USA",
      slotTime: "Available on Fri, 22 Mar",
      chargeStart: 50,
      chargeEnd: 300,
    },
  ];

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-y-6 px-6 md:px-12 py-12 md:py-24 bg-[#f9f9f9] dark:bg-[#030B29] rounded-lg shadow-md">
      <div className="flex flex-col space-y-4">
        <h3 className="text-3xl font-bold text-[#272b41] dark:text-primary-yellow">
          Book Our Doctor
        </h3>
        <p className="text-lg text-[#272b41] dark:text-white">
          Our goal is to provide patients with high-quality medical care that is
          easily accessible and affordable. We strive to connect you with the
          best medical professionals to meet your healthcare needs.
        </p>
        <p className="text-[#272b41] dark:text-dark-muted">
          Welcome to our Doctor Online Consultation service on the Web3
          platform. Our service offers patients the convenience of connecting
          with licensed physicians from the comfort of their own home. No
          physical visit to a doctor's office is required.
        </p>
        <p className="text-[#272b41] dark:text-dark-muted">
          Our platform utilizes the latest Web3 technology to ensure a secure
          and decentralized environment for patients and doctors to communicate.
          This means that your personal data remains confidential and secure
          with no risk of third-party interference.
        </p>
        <button className="bg-primary-blue text-white px-4 py-2 rounded-md dark:bg-primary-yellow dark:text-black">
          Read More...
        </button>
      </div>
      <div className="px-0 md:px-4">
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={20}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            360: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
        >
          {doctorList.map((doctorItem) => (
            <SwiperSlide key={doctorItem.id}>
              <DoctorCard
                id={doctorItem.id}
                name={doctorItem.name}
                category={doctorItem.category}
                image={
                  <Image
                    src={doctorItem.image}
                    alt={doctorItem.name}
                    width={500} // Provide appropriate width
                    height={300} // Provide appropriate height
                    layout="responsive" // Adjust layout as needed
                  />
                }
                address={doctorItem.address}
                slotTime={doctorItem.slotTime}
                chargeStart={doctorItem.chargeStart}
                chargeEnd={doctorItem.chargeEnd}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

export default BookDoctor;
