import type { StaticImageData } from "next/image";

export interface Service {
  title: string;
  desc: string;
  image: string | StaticImageData;
  fullDesc: string;
  details: string[];
}
