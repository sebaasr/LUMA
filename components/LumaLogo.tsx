import Image from "next/image";

interface LumaLogoProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

const widths: Record<string, number> = {
  xs:  90,
  sm:  130,
  md:  190,
  lg:  270,
  xl:  380,
};

export function LumaLogo({ size = "md" }: LumaLogoProps) {
  const w = widths[size];
  const h = Math.round(w * 0.56);
  return (
    <Image
      src="/brand/LumaLogo.png"
      alt="LUMA Coffee and Play"
      width={w}
      height={h}
      priority={size === "xl" || size === "lg"}
      style={{ objectFit: "contain" }}
    />
  );
}
