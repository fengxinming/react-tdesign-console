import { LogoGithubIcon } from 'tdesign-icons-react';
import IconButton from './IconButton';

export default function GithubLink() {
  return (
    <a
      href="https://github.com/fengxinming/react-tdesign-console"
      target="_blank"
      rel="noopener noreferrer"
    >
      <IconButton icon={<LogoGithubIcon />} tooltip="GitHub" />
    </a>
  );
}
