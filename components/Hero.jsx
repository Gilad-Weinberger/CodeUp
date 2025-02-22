"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const Hero = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="-mt-1.5 flex max-w-[50%] flex-col items-center justify-center">
        <p className="w-40 rounded-full bg-[#1B2431] py-2 text-center text-[14px] text-color-main">
          10,000+ Developers
        </p>
        <p className="mt-6 text-center text-[60px] font-medium leading-[65px]">
          Learn to <span className="text-color-main-light">Code</span> with
          Interactive Examples
        </p>
        <p className="mt-4 max-w-[80%] text-center text-[15px] text-color-gray">
          A modern coding education platform with real-time AI example
          interactive playgrounds, and comprehensive documentation for beginners
          and experts.
        </p>
        <div className="mt-8 flex items-center justify-center gap-7">
          <Link
            className="flex items-center gap-2 rounded bg-color-main-light px-6 py-2.5 font-medium"
            href={"/signup"}
          >
            Get Started
            <div className="invert filter">
              <Image
                src={"/arrow-right.svg"}
                alt="arrow right"
                width={25}
                height={25}
              />
            </div>
          </Link>
          <Link
            className="flex h-[45px] items-center gap-1 rounded bg-[#2A2A2A] px-6 font-medium"
            href={""}
          >
            <Image
              src={"/github.png"}
              alt="github icon"
              width={25}
              height={25}
              className="h-6 w-auto"
            />
            Star on Github
          </Link>
        </div>
        <div className="mt-12 flex items-center justify-center gap-14">
          <div>
            <p className="text-center text-[22px] font-medium text-color-main">
              300+
            </p>
            <p className="-mt-0.5 text-center text-[14px] text-color-gray">
              Code Examples
            </p>
          </div>
          <div>
            <p className="text-center text-[22px] font-medium text-color-main">
              50+
            </p>
            <p className="-mt-0.5 text-center text-[14px] text-color-gray">
              Interactive Lessons
            </p>
          </div>
          <div>
            <p className="text-center text-[22px] font-medium text-color-main">
              24/7
            </p>
            <p className="-mt-0.5 text-center text-[14px] text-color-gray">
              Community Support
            </p>
          </div>
          <div>
            <p className="text-center text-[22px] font-medium text-color-main">
              100%
            </p>
            <p className="-mt-0.5 text-center text-[14px] text-color-gray">
              Free To Start
            </p>
          </div>
        </div>
      </div>
      <div className="xs:bottom-5 absolute bottom-10 flex w-full items-center justify-center">
        <a href="#about">
          <div className="flex h-[64px] w-[35px] items-start justify-center rounded-3xl border-4 border-white p-2">
            <motion.div
              animate={{ y: [0, 24, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="mb-1 h-3 w-3 rounded-full bg-white"
            />
          </div>
        </a>
      </div>
    </div>
  );
};

export default Hero;
