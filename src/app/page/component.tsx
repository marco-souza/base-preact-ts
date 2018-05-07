import { h, Component } from "preact";
import { sample } from "lodash";

interface Props {
  names: Array<string>,
  sheet: {
    classes: { title: string }
  }
}
class Pages extends Component<Props, {}> {
  render({ names, sheet: { classes } }: Props) {
    return (
      <div class={`uk-label`}>
        Hi {sample(names)}

        <span uk-icon="icon: check"></span>
        <a href="" uk-icon="icon: heart"></a>
      </div>
    )
  };

}

export default Pages;