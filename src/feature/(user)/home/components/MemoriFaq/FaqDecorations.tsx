import type React from "react";

const QuestionMarkSVG = ({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) => (
  <svg
    viewBox="0 0 186 206"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
  >
    <title>Question Mark Decoration</title>
    <g clipPath="url(#clip0_3304_4540)">
      <path
        d="M131.471 135.59L146.081 163.456C146.73 164.694 146.834 166.022 146.392
167.437C145.95 168.853 145.11 169.886 143.872 170.535L116.005 185.145C114.767 185.795
113.44 185.899 112.024 185.457C110.608 185.015 109.575 184.175 108.926
182.936L94.3157 155.07C93.6664 153.831 93.5626 152.504 94.0045 151.088C94.4464
149.672 95.2865 148.64 96.525 147.99L124.391 133.38C125.63 132.731 126.957 132.627
128.373 133.069C129.789 133.511 130.821 134.351 131.471 135.59ZM131.636
46.6873C133.827 50.8672 135.277 55.0908 135.984 59.3579C136.692 63.625 136.89 67.296
136.578 70.3709C136.265 73.4458 135.344 76.8647 133.814 80.6276C132.283 84.3905
130.941 87.2409 129.785 89.1787C128.63 91.1165 126.99 93.7283 124.864 97.014C122.624
100.458 121.292 104.364 120.867 108.731C120.443 113.098 120.738 116.249 121.753
118.185C122.443 119.5 122.638 121.002 122.338 122.689C122.038 124.375 121.269 125.543
120.031 126.193L92.1645 140.803C91.0034 141.412 89.6411 141.213 88.0775
140.207C86.514 139.201 85.3466 137.963 84.5756 136.492L81.8361 131.268C78.4677
124.843 77.8077 117.467 79.8561 109.139C81.9046 100.812 85.2375 93.7111 89.8547
87.8364C93.3259 83.352 95.4406 79.4801 96.1988 76.2207C96.9571 72.9613 96.3824
69.5126 94.475 65.8745C92.7705 62.6234 89.4692 60.703 84.5711 60.1131C79.673 59.5233
74.8631 60.4662 70.1413 62.9418C65.1099 65.5798 61.5185 68.8937 59.3669
72.8836C57.6723 76.2392 55.8647 82.8613 53.944 92.7499C53.5871 94.516 52.7119 95.7643
51.3186 96.4948C50.3898 96.9818 49.2598 97.1795 47.9289 97.0878L21.2775
92.5578C19.8654 92.3113 18.7582 91.6583 17.9559 90.5986C17.1536 89.539 16.7983
88.3437 16.89 87.0128C18.4796 59.9293 31.0402 40.2188 54.5716 27.8813C60.7641 24.6346
67.6244 22.5674 75.1524 21.6797C82.6804 20.7919 90.0153 21.0417 97.157
22.4288C104.299 23.816 110.989 26.5997 117.226 30.7799C123.464 34.9601 128.267
40.2626 131.636 46.6873Z"
        fill="#F3EFE8"
        fillOpacity="0.3"
      />
    </g>
    <defs>
      <clipPath id="clip0_3304_4540">
        <rect
          width="121.661"
          height="167.808"
          fill="white"
          transform="translate(0 56.4929) rotate(-27.668)"
        />
      </clipPath>
    </defs>
  </svg>
);

export const FaqDecorations = () => {
  return (
    <>
      <div className="absolute top-0 left-0 rotate-60 pointer-events-none select-none text-white/30">
        <QuestionMarkSVG
          className="w-[30vw] lg:w-[8vw] aspect-square animate-rotate-idle"
          style={{ animationDelay: "0s" }}
        />
      </div>
      <div className="absolute bottom-[14%] right-[9%] rotate-50 pointer-events-none select-none text-white/30">
        <QuestionMarkSVG
          className="w-[8vw] lg:w-[4vw] aspect-square animate-rotate-idle"
          style={{ animationDelay: "1.2s" }}
        />
      </div>
      <div className="absolute bottom-[-10%] left-[2%] -rotate-12 pointer-events-none select-none text-white/30">
        <QuestionMarkSVG
          className="w-[25vw] lg:w-[12vw] aspect-square animate-rotate-idle"
          style={{ animationDelay: "2.4s" }}
        />
      </div>
      <div className="absolute -top-10 right-10 rotate-12 pointer-events-none select-none text-white/30">
        <QuestionMarkSVG
          className="w-[35vw] lg:w-[18vw] aspect-square animate-rotate-idle"
          style={{ animationDelay: "3.6s" }}
        />
      </div>
    </>
  );
};
