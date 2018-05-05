import { h } from 'preact';

export interface Props {
  value?: string,
  optionalValue?: string
}

const SomeFunctionalComponent = ({ value, optionalValue }: Props) =>(
  <div>
    hello {value} {optionalValue}
  </div>
);

export default SomeFunctionalComponent;