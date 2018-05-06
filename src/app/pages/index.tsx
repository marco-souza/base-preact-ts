import { h } from "preact";
// import { hot } from "react-hot-loader";


const pages = (
  {name}: { name: string }
) => (
  <div>Hi man {name}</div>
);

export default pages;
// export default hot(global)(pages);