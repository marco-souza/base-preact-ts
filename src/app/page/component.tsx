import React, { Component } from "react";
import { sample } from "lodash";

interface Props {
  names: Array<string>,
  sheet: {
    classes: { title: string }
  }
}
class Pages extends React.Component<Props> {
  render() {
    const { names } = this.props;

    return (
      <div className={`uk-label`}>
        hi {sample(names)}

        <span uk-icon="icon: check"></span>
        <a href="" uk-icon="icon: heart"></a>
      </div>
    )
  };

}

export default Pages;