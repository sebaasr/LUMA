interface LumaLogoProps {
  size?: "sm" | "md" | "lg";
  variant?: "dark" | "light" | "color";
}

export function LumaLogo({ size = "md", variant = "dark" }: LumaLogoProps) {
  const sizes = { sm: 32, md: 44, lg: 64 };
  const textSizes = { sm: "text-xl", md: "text-3xl", lg: "text-5xl" };
  const subSizes = { sm: "text-[8px]", md: "text-[11px]", lg: "text-sm" };
  const s = sizes[size];

  const sunColor = variant === "light" ? "#FEFAF4" : "#FFCC00";
  const textColor = variant === "light" ? "#FEFAF4" : "#2C2416";

  return (
    <div className="flex items-center gap-2 select-none">
      <svg width={s} height={s} viewBox="0 0 64 64" fill="none">
        {/* Sun circle */}
        <circle cx="32" cy="32" r="28" fill={sunColor} />
        {/* 5 orbiting dots representing the grandchildren */}
        {[0, 72, 144, 216, 288].map((deg, i) => {
          const rad = (deg * Math.PI) / 180;
          const cx = 32 + 22 * Math.cos(rad);
          const cy = 32 + 22 * Math.sin(rad);
          const colors = ["#F5834A", "#4ABFB5", "#E05A3A", "#8DC63F", "#E8A0B0"];
          return <circle key={i} cx={cx} cy={cy} r="4.5" fill={colors[i]} />;
        })}
        {/* Inner sun */}
        <circle cx="32" cy="32" r="13" fill={variant === "light" ? "rgba(255,255,255,0.25)" : "#FFB800"} />
        {/* LU text hint */}
        <text x="32" y="37" textAnchor="middle" fontSize="11" fontWeight="700"
          fontFamily="Fredoka, sans-serif" fill={variant === "light" ? "#FEFAF4" : "#2C2416"}>
          LU
        </text>
      </svg>
      <div className="leading-none">
        <div className={`font-display font-semibold tracking-wide ${textSizes[size]}`}
          style={{ color: textColor, fontFamily: "'Fredoka', sans-serif" }}>
          LUMA
        </div>
        <div className={`${subSizes[size]} tracking-widest uppercase`}
          style={{ color: variant === "light" ? "rgba(254,250,244,0.75)" : "#6B6358", fontFamily: "'Open Sans', sans-serif", fontWeight: 500 }}>
          Coffee & Play
        </div>
      </div>
    </div>
  );
}
