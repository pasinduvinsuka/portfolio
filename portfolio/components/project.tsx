"use client";

import { projectsData } from "@/lib/data";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import React, { useRef } from "react";
type ProjectProps = (typeof projectsData)[number];

export default function Project({
  title,
  description,
  tags,
  imageUrl,
}: ProjectProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref, // we need to provide a ref here to our target which is section element what we need to animate at this moment.
    offset: ["0 1", "1.33 1"], //note : when the bottom of the view port crosses the top of the target(which is the project that's where the animation should start.this one is identified by the "0 1 " in the first element of the offset array. When should the animation should be ended is determined by the second element in the above offset array.Which means bottom of the viewport has gone 33% beyond the end of the project .)
  });

  const scaleProgress = useTransform(scrollYProgress,[0,1],[0.8,1])
  const opacityProgress = useTransform(scrollYProgress,[0,1],[0.6,1])

  return (
    <motion.div
      className=" group mb-3 sm:mb-8 last:mb-0 "
      ref={ref}
      style={{ scale: scaleProgress, opacity: opacityProgress }}
    >
      <section className=" bg-gray-100 max-w-[42rem] border border-black/5 
      rounded-lg
      overflow-hidden sm:pr-8 relative sm:h-[20rem] group-even:pl-8  hover:bg-gray-200 transition">
        <div className="pt-4 pb-7 px-5 sm:pl-10 sm:pr-2 sm:pt-10 sm:max-w-[50%] flex flex-col h-full group-even:ml-[18rem] ">
          <h3 className="text-2xl font-semibold">{title}</h3>
          <p className="mt-2 leading-relaxed text-gray-700">{description}</p>
          <ul className="flex flex-wrap mt-4 gap-2 sm:mt-auto">
            {tags.map((tag, index) => (
              <li
                className="bg-black/[0.7] px-3 py-1 text-[0.7rem] uppercase tracking-wider text-white rounded-full"
                key={index}
              >
                {tag}
              </li>
            ))}
          </ul>
          <Image
            src={imageUrl}
            alt="Projects pasindu vinsuka has worked on"
            quality={95}
            className="absolute top-8 -right-40 w-[28.25rem] rounded-t-lg shadow-2xl group-even:right-[initial] group-even:-left-40
          group-hover:scale-[1.04]
          group-even:group-hover:translate-x-3
          group-even:group-hover:translate-y-3
          group-even:group-hover:rotate-2

        group-hover:-translate-x-3
          group-hover:-translate-y-3
          group-hover:-rotate-2

          transition
          
          "
          />
        </div>
      </section>
    </motion.div>
  );
}
