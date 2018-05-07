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
      <div class={classes.title}>Hi {sample(names)}</div>
    )
  };

}

export default Pages;