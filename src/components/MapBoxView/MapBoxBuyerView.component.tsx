/* eslint-disable react/no-unescaped-entities */
import 'mapbox-gl/dist/mapbox-gl.css';

import type { FeatureCollection } from 'geojson';
import { max, min } from 'lodash';
import mapboxgl from 'mapbox-gl';
import { useEffect, useRef } from 'react';

import styles from './MapBoxView.module.scss';

mapboxgl.accessToken = `${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`;

type MapBoxBuyerViewProps = {
  mapId: string;
  mapData: FeatureCollection;
  height: string;
  callback?: (value: string) => void;
};

const MapBoxBuyerView = (props: MapBoxBuyerViewProps) => {
  const mapContainer = useRef<any>(null);
  const map = useRef<any>(null);

  const addLayer = () => {
    if (map.current.getSource(props.mapId)) {
      return;
    }
    map.current.addSource(props?.mapId, {
      type: 'geojson',
      data: props?.mapData,
    });
    map.current?.setPaintProperty('water', 'fill-color', '#dae3f5');
  };

  useEffect(() => {
    if (map.current) {
      const computedStyle = window.getComputedStyle(mapContainer.current);
      const borderRadius = computedStyle.getPropertyValue('border-radius');

      map.current.getCanvas().style.borderRadius = borderRadius;
      map.current.resize();
    }
  }, []);

  useEffect(() => {
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v10',
      center: [-100.0, 40.0],
      zoom: 1,
    });

    const markers =
      props?.mapData?.features?.map((el: any) =>
        new mapboxgl.Marker({ color: 'red' })
          .setLngLat(el.geometry.coordinates)
          .addTo(map.current)
      ) ?? [];

    props?.mapData?.features?.forEach((el: any, index) => {
      const marker = markers[index]!;

      marker.getElement().addEventListener('click', () => {
        if (props?.callback) {
          props?.callback(el.index);
        }
      });

      marker.getElement().addEventListener('mouseenter', () => {
        map.current.getCanvas().style.cursor = 'pointer';
      });

      marker.getElement().addEventListener('mouseleave', () => {
        map.current.getCanvas().style.cursor = '';
      });
    });

    if (markers.length > 0) {
      const latitudes = markers.map((m) => m.getLngLat().lat);
      const longitudes = markers.map((m) => m.getLngLat().lng);

      map.current.fitBounds(
        [
          [min(longitudes), min(latitudes)],
          [max(longitudes), max(latitudes)],
        ],
        {
          padding: {
            top: 60,
            bottom: 20,
            left: 20,
            right: 20,
          },
        }
      );
    }

    map.current.on('style.load', () => {
      addLayer();
    });
  }, [props?.mapData]);

  const zoomIn = () => {
    map.current.easeTo({
      center: map.current.getCenter(),
      zoom: Number(map.current.getZoom()) + 1,
    });
  };
  const zoomOut = () => {
    map.current.easeTo({
      center: map.current.getCenter(),
      zoom: Number(map.current.getZoom()) - 1,
    });
  };

  return (
    <div
      ref={mapContainer}
      className={`${styles.MapBoxContainer} ${props?.height} relative rounded-3xl`}
    >
      <div className='absolute bottom-8 right-4 z-10'>
        <div className={styles.Button + ' mb-2'}>
          <img src='/assets/images/listBuilder/map-btn-1.svg' alt='map-btn-1' />
        </div>
        <div
          className={styles.Button + ' !rounded-b-none border-b-2'}
          onClick={() => zoomIn()}
        >
          <img src='/assets/images/listBuilder/map-zoom-in.svg' alt='zoom-in' />
        </div>
        <div
          className={styles.Button + ' !rounded-t-none'}
          onClick={() => zoomOut()}
        >
          <img
            src='/assets/images/listBuilder/map-zoom-out.svg'
            alt='zoom-in'
          />
        </div>
      </div>

      <div className='absolute bottom-8 left-4 z-10'>
        <div className={`${styles.Button} mb-2`}>
          <img src='/assets/images/listBuilder/map-btn-2.svg' alt='map-btn-1' />
        </div>
        <div className={styles.Button}>
          <img src='/assets/images/listBuilder/map-btn-3.svg' alt='zoom-in' />
        </div>
      </div>
    </div>
  );
};

export default MapBoxBuyerView;
