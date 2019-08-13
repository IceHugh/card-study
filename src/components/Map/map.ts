import {
  MapOptions,
  MarkerOptions,
  MarkerClick,
  IconOption,
  GeoIconOption,
  CircleMarkerOptions,
  LngLatPosition,
} from './map_types';

declare const AMap: any;
class Map {
  public mapInstance: any;
  private MarkerDefaultOptions: MarkerOptions = {
    icon:
      '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png',
    position: [116.406315, 39.908775],
    offset: new AMap.Pixel(-13, -30),
  };
  private markerLoctions: any[] = [];
  private markers: any[] = [];
  private clickHandles: any[] = [];
  private geoIcon: any | null = null;
  private centerPosition: any;
  public constructor(
    dom: string,
    options: MapOptions = {
      zoom: 6,
      mapStyle: 'amap://styles/blue',
      resizeEnable: true,
    }
  ) {
    this.mapInstance = new AMap.Map(dom, options);
    console.log(this.mapInstance);
  }
  public setGeocationIcon(options: GeoIconOption) {
    const content = `<img src="${options.image}" style="width:${options.imageSize[0]}px;height:${options.imageSize[1]}px"/>`;
    const offsetLeft = options.offset[0] || 0;
    const offsetRight = options.offset[1] || 0;
    this.geoIcon = {
      offset: new AMap.Pixel(offsetLeft, offsetRight),
      content,
    };
  }
  private setIcon(option: IconOption) {
    const icon = new AMap.Icon({
      size: new AMap.Size(option.size[0], option.size[1]),
      image: option.image,
      imageSize: new AMap.Size(option.imageSize[0], option.imageSize[1]),
      imageOffset: new AMap.Pixel(option.imageOffset[0], option.imageOffset[1]),
    });
    return icon;
  }
  public setMarkerDefaultIcon(option: IconOption) {
    const markerIcon = this.setIcon(option);
    this.MarkerDefaultOptions.icon = markerIcon;
  }
  public setCircleMarker(option: CircleMarkerOptions) {
    option.center = new AMap.LngLat(option.center[0], option.center[1]);
    const _option = Object.assign(
      {
        radius: 600,
        fillColor: '#1791fc',
        fillOpacity: 0.2,
        strokeColor: '#1791fc',
        strokeWeight: 2,
      },
      option
    );
    const circleMarker = new AMap.CircleMarker(_option);
    this.markerClickAdd(circleMarker);
    this.mapInstance.add(circleMarker);
  }
  /**
   * 精准获取当前位置
   * @returns Promise
   * @memberof Map
   */
  public getGeo() {
    return new Promise((resolve, reject) => {
      AMap.plugin('AMap.Geolocation', () => {
        let geolocationOptions = {
          enableHighAccuracy: true,
          timeout: 10000,
          buttonPosition: 'RB',
          buttonOffset: new AMap.Pixel(10, 20),
          zoomToAccuracy: true,
        };
        if (this.geoIcon) {
          geolocationOptions = Object.assign(geolocationOptions, {
            markerOptions: this.geoIcon,
          });
        }
        console.log(geolocationOptions);
        const geolocation = new AMap.Geolocation(geolocationOptions);
        this.mapInstance.addControl(geolocation);
        geolocation.getCurrentPosition((status: string, result: any) => {
          if (status === 'complete') {
            this.centerPosition = result.position;
            resolve(result);
          } else {
            reject(result);
          }
        });
      });
    });
  }
  public addClick(handle: (e: any) => void) {
    this.clickHandles.push(handle);
    this.mapInstance.on('click', handle);
  }
  private markerClickAdd(marker: any) {
    this.clickHandles.forEach(handle => {
      marker && marker.on('click', handle);
    });
  }
  public removeClick(handle: (e: any) => void) {
    this.mapInstance.off('click', handle);
  }
  private setMarker(options: MarkerOptions, iconOption?: IconOption) {
    const _option = Object.assign(this.MarkerDefaultOptions, options);
    if (iconOption) {
      const markerIcon = this.setIcon(iconOption);
      _option.icon = markerIcon;
    }
    this.markerLoctions.push(_option.position);
    const marker = new AMap.Marker(_option);
    marker.setMap(this.mapInstance);
    this.markers.push(marker);
  }

  public getMarkerLocations() {
    return this.markerLoctions;
  }
  public cleanMarker() {
    this.mapInstance.remove(this.markers);
    this.markers = [];
  }
  public setMarkerByClick(option: MarkerClick = { only: false }) {
    this.addClick((e: any) => {
      console.log(e);
      const { lnglat } = e;
      const { lng, lat } = lnglat;
      if (option.only) this.cleanMarker();
      let distance = 0;
      const oDis = option.distance;
      if (oDis && oDis > 0 && this.centerPosition) {
        const p1 = lnglat;
        const p2 = this.centerPosition;
        distance = Math.round(p1.distance(p2));
        console.log(distance);
        if (distance > oDis && option.outClear) {
          console.log('超出距离');
          return;
        }
      }
      this.setMarker({
        position: [lng, lat],
      });
    });
  }
}
export default Map;
