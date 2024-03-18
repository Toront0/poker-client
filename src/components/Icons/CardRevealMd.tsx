interface ICardRevealMd {
  animate: boolean;
}

const CardRevealMd = ({ animate }: ICardRevealMd) => {
  return (
    <svg
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={` ${animate ? "block test-2 " : "hidden"}  `}
    >
      <mask
        id="mask0_185_2"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="19"
        height="60"
      >
        <path
          d="M0 0H11.5562C16.2558 0 19.6203 4.53918 18.2536 9.03568L3.56671 57.3563C3.08942 58.9266 1.64125 60 0 60V60V0Z"
          fill="#D9D9D9"
        />
      </mask>
      <g mask="url(#mask0_185_2)">
        <path
          d="M0 0H11.5562C16.2558 0 19.6203 4.53918 18.2536 9.03568L3.56671 57.3563C3.08942 58.9266 1.64125 60 0 60V60V0Z"
          fill="#8D8D8D"
        />
        <path
          d="M0 -0.239746H1.65789V60.3107H0V-0.239746Z"
          fill="url(#paint0_linear_185_2)"
        />
        <path
          d="M1.65796 -0.239746H9.3948L8.10533 61.1833L1.65796 62.1092V-0.239746Z"
          fill="url(#paint1_linear_185_2)"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_185_2"
          x1="1.65789"
          y1="28.8365"
          x2="-1.26803e-07"
          y2="28.8365"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#6D6D6D" />
          <stop offset="1" stopColor="#BBB8B8" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_185_2"
          x1="1.65796"
          y1="32.478"
          x2="8.96498"
          y2="32.478"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#656565" />
          <stop offset="1" stopColor="#8D8D8D" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default CardRevealMd;
