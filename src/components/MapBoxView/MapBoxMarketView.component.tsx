/* eslint-disable react/no-unescaped-entities */
import 'mapbox-gl/dist/mapbox-gl.css';

import mapboxgl from 'mapbox-gl';
import { useEffect, useRef } from 'react';

import { setMap } from '@/redux/slices/listBuilder';
import { dispatch } from '@/redux/store';

mapboxgl.accessToken = `${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`;

type MapBoxMarketViewProps = {
  className: string;
};

const MapBoxMarketView = (props?: MapBoxMarketViewProps) => {
  const mapContainer = useRef<any>(null);
  const map = useRef<any>(null);

  useEffect(() => {
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v10',
      center: [-100.0, 40.0],
      zoom: 4,
    });
    dispatch(setMap(map.current));

    map.current.on('load', () => {
      map.current.on('mouseenter', 'clusters', () => {
        map.current.getCanvas().style.cursor = 'pointer';
      });

      map.current.on('mouseleave', 'clusters', () => {
        map.current.getCanvas().style.cursor = '';
      });
    });
    const nav = new mapboxgl.NavigationControl();
    map.current.addControl(nav, 'bottom-right');
  }, []);

  return <div ref={mapContainer} className={props?.className}></div>;
};

export default MapBoxMarketView;
