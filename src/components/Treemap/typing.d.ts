declare namespace Treemap {
  interface Props {
    margin?: Margin;
    width: number;
    height: number;
    data: Datum[];
  }

  type Datum = {
    id: string;
    parent: string | null;
    size: number | null;
}