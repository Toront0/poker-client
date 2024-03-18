interface ICardReveal {
  animate: boolean;
}

const CardReveal = ({ animate }: ICardReveal) => {
  return (
    <svg
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={` ${animate ? "block test-2 " : "hidden"}  `}
    >
      <mask
        id="mask0_181_24"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="36"
        height="106"
      >
        <path
          d="M0 0H28.4894C33.2087 0 36.5758 4.57473 35.173 9.08074L6.0939 102.486C5.44325 104.576 3.50881 106 1.3199 106H0V0Z"
          fill="#D9D9D9"
        />
      </mask>
      <g mask="url(#mask0_181_24)">
        <path
          d="M0 0H28.4894C33.2087 0 36.5758 4.57473 35.173 9.08074L6.0939 102.486C5.44325 104.576 3.50881 106 1.3199 106H0V0Z"
          fill="#8D8D8D"
        />
        <path
          d="M0 -0.423553H3V106.549H0V-0.423553Z"
          fill="url(#paint0_linear_181_24)"
        />
        <path
          d="M3 -0.423553H17L14.6667 108.09L3 109.726V-0.423553Z"
          fill="url(#paint1_linear_181_24)"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_181_24"
          x1="3"
          y1="50.9444"
          x2="-2.29453e-07"
          y2="50.9444"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#6D6D6D" />
          <stop offset="1" stopColor="#BBB8B8" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_181_24"
          x1="3"
          y1="57.3779"
          x2="16.2222"
          y2="57.3779"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#656565" />
          <stop offset="1" stopColor="#8D8D8D" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default CardReveal;
