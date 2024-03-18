const PlayerContainer = () => {
  return (
    <svg
      viewBox="0 0 156 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-[130px] h-[50px] xl:w-[156px] xl:h-[72px]"
    >
      <g filter="url(#filter0_dd_137_8)">
        <path
          d="M4.72715 11.3692C3.84474 7.60423 6.7019 4 10.5688 4H145.431C149.298 4 152.155 7.60423 151.273 11.3691L139.085 63.3691C138.45 66.0819 136.03 68 133.244 68H22.7563C19.9701 68 17.5504 66.0819 16.9146 63.3691L4.72715 11.3692Z"
          fill="#161616"
        />
        <path
          d="M10.5688 4.5H145.431C148.976 4.5 151.595 7.80387 150.786 11.2551L138.599 63.2551C138.016 65.7417 135.798 67.5 133.244 67.5H22.7563C20.2023 67.5 17.9843 65.7417 17.4015 63.2551L5.21395 11.2551C4.40508 7.80388 7.02414 4.5 10.5688 4.5Z"
          stroke="white"
          stroke-opacity="0.1"
        />
      </g>
      <line x1="10" y1="35.5" x2="146" y2="35.5" stroke="#9D9D9D" />
      <defs>
        <filter
          id="filter0_dd_137_8"
          x="0.566162"
          y="0"
          width="154.868"
          height="72"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_137_8"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="2" />
          <feGaussianBlur stdDeviation="1" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="effect1_dropShadow_137_8"
            result="effect2_dropShadow_137_8"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect2_dropShadow_137_8"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default PlayerContainer;
