declare namespace BubbleChart {
  interface Props {
    width: number;
    height: number;
    margin?: Margin;
    data: Datum[];
  }

  type Datum = {
    x: number;
    y: number;
    z: number;
  }
}