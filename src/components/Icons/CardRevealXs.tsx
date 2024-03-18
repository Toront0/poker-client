interface ICardRevealXs {
  animate: boolean;
}

const CardRevealXs = ({ animate }: ICardRevealXs) => {
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
        height="51"
      >
        <path
          d="M0 0H11.0628C15.9047 0 19.2844 4.79777 17.6541 9.35694L3.69353 48.3982C3.13555 49.9586 1.65717 51 0 51V51V0Z"
          fill="#D9D9D9"
        />
      </mask>
      <g mask="url(#mask0_185_2)">
        <path
          d="M0 0H11.0628C15.9047 0 19.2844 4.79777 17.6541 9.35694L3.69353 48.3982C3.13555 49.9586 1.65717 51 0 51V51V0Z"
          fill="#8D8D8D"
        />
        <path
          d="M0 -0.203781H1.65789V51.2641H0V-0.203781Z"
          fill="url(#paint0_linear_185_2)"
        />
        <path
          d="M1.65796 -0.203781H9.3948L8.10533 52.0058L1.65796 52.7929V-0.203781Z"
          fill="url(#paint1_linear_185_2)"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_185_2"
          x1="1.65789"
          y1="24.511"
          x2="-1.26803e-07"
          y2="24.511"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#6D6D6D" />
          <stop offset="1" stopColor="#BBB8B8" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_185_2"
          x1="1.65796"
          y1="27.6063"
          x2="8.96498"
          y2="27.6063"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#656565" />
          <stop offset="1" stopColor="#8D8D8D" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default CardRevealXs;
