import React from "react";
import Link from "next/link";
import Image from "next/image";
import hero from "../../public/hero.jpg";

const HERO = hero;

export default function Hero() {
  return (
    <div className="h-auto bg-blue-100 dark:bg-[#121212]">
      <div className="max-w-[90rem] w-full mx-auto flex flex-col md:flex-row">
        {/*small bp, image over text */}
        <div className="md:hidden w-full flex justify-center ">
          <div className="overflow-hidden ">
            <Image
              src={HERO}
              alt="meeting"
              height={300}
              width={800}
              className="object-cover"
            />
          </div>
        </div>
        {/* Text */}
        <div className="flex flex-col justify-between w-full md:w-[50%] py-6 lg:py-10 w-[90rem]:px-0 px-4 md:pr-10">
          <h3 className="font-semibold text-[24px] pb-4">
            Where Your Financial Goals Take Flight
          </h3>
          <div className="leading-5 flex flex-col gap-6 pb-6">
            <p>
              At Chas Bank, we're dedicated to providing personalized banking
              solutions tailored to your needs. Whether you're saving for the
              future, planning for a major purchase, or managing your day-to-day
              finances, our team of experts is here to help you every step of
              the way.
            </p>
            <p>
              With a commitment to innovation, security, and exceptional
              customer service, we strive to make banking simpler, smarter, and
              more rewarding for you. Explore our range of products and services
              designed to empower your financial journey and unlock new
              possibilities.
            </p>
            <p>Join us at Chas Bank and experience the difference today.</p>
          </div>
          <div>
            <Link href="/create" className="px-6 py-2 hover:font-semibold hover:text-[18px] rounded-[8px] text-white bg-[#005fa5] dark:bg-[#414142]">
              Create account
            </Link>
          </div>
        </div>
        {/*bigger bp, image to the right of text */}
        <div className="hidden md:flex h-auto items-center md:w-[50%]">
          <div className="p-0 md:flex md:justify-end">
            <div className="md:rounded-l-[22%] md:inset-0 overflow-hidden xl:max-h-[450px]">
              <Image
                src={HERO}
                alt="meeting"
                height={300}
                width={800}
                className="md:object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
