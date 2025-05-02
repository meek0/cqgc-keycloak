import { ISVGProps } from './types';

const MicrosoftIcon = ({ className = '' }: ISVGProps) => (
  <svg
    width="32"
    height="33"
    viewBox="0 0 24 23"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path fill="#f3f3f3" d="M0 0h23v23H0z" />
    <path fill="#f35325" d="M1 1h10v10H1z" />
    <path fill="#81bc06" d="M12 1h10v10H12z" />
    <path fill="#05a6f0" d="M1 12h10v10H1z" />
    <path fill="#ffba08" d="M12 12h10v10H12z" />
  </svg>
);

export default MicrosoftIcon;
