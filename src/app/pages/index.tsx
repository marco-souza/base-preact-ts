import { h } from "preact";
import { sample } from "lodash";

interface Props {
  names: Array<string>
}

const Pages = ({ names }: Props) => (
  <div>Hi {sample(names)}</div>
);

export default Pages;