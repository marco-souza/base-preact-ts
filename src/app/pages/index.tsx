import { h, Component } from "preact";
import { sample } from "lodash";

interface Props {
  names: Array<string>
}
class Pages extends Component<Props, {}> {
  render({ names }: Props) {
    return (
      <div>Hi {sample(names)}</div>
    )
  };

}

export default Pages;