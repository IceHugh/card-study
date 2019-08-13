export interface LngLatPosition {
  P: number;
  Q: number;
  lng: number;
  lat: number;
}
export interface IconOption {
  size: number[];
  image: string;
  imageSize: number[];
  imageOffset: number[];
}
export interface GeoIconOption {
  offset: number[];
  image: string;
  imageSize: any[];
}
export interface MapOptions {
  zoom: number;
  mapStyle: string;
  resizeEnable: boolean;
}
export interface MarkerOptions {
  position: any[];
  icon?: string | any;
  offset?: any;
  draggable?: boolean;
  cursor?: string;
  raiseOnDrag?: boolean;
}
export interface CircleMarkerOptions {
  position: LngLatPosition[];
  icon?: string | any;
  offset?: any;
  draggable?: boolean;
  cursor?: string;
  raiseOnDrag?: boolean;
}
export interface CircleMarkerOptions {
  center: LngLatPosition[];
  radius?: number;
  fillColor?: string; // 圆形填充颜色
  strokeColor?: string; // 描边颜色
  strokeWeight?: number; // 描边宽度
  borderWeight?: number;
  strokeOpacity?: number;
  fillOpacity?: number;
  strokeStyle?: string;
  strokeDasharray?: number[];
  zIndex?: number;
}
export interface MarkerClick {
  only?: boolean;
  distance?: number;
  outClear?: boolean;
}
