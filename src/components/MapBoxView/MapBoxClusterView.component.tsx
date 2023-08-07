/* eslint-disable react/no-unescaped-entities */
import 'mapbox-gl/dist/mapbox-gl.css';

import { Skeleton } from '@mui/material';
import mapboxgl from 'mapbox-gl';
import Router from 'next/router';
import { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';

import Button from '@/components/Button/Button.component';
import { setMap, setMapPosition, setMapType } from '@/redux/slices/listBuilder';
import { dispatch, useSelector } from '@/redux/store';

import Dialog from '../Dialog/Dialog.component';
import AddToList from '../Pages/ListBuilder/Card/AddToList.component';
import AddToListFooter from '../Pages/ListBuilder/Card/AddToListFooter.component';
import styles from './MapBoxView.module.scss';

mapboxgl.accessToken = `${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`;

type MapBoxClusterViewProps = {
  mapId: string;
  mapData: any;
  height: string;
  isPopup?: boolean;
};

type PopupProps = {
  address: string;
  city: string;
  zip: string;
  url: string;
  setOpenAddToList: (value: boolean) => void;
  goPropertyPage: () => void;
};

const Popup = (props: PopupProps) => {
  const [imgUrl, setImageUrl] = useState('');

  useEffect(() => {
    fetch(props?.url ?? '')
      .then((response) => {
        return response.blob();
      })
      .then((data) => {
        setImageUrl(URL.createObjectURL(data));
      });
  }, [props?.url]);

  return (
    <div className='space-y-2 px-1.5 font-inter'>
      <div className='text-ms font-normal'>{props?.address}</div>
      <div className='text-xs font-light'>
        {props?.city}, {props?.zip}
      </div>
      <div className='!my-3 '>
        {imgUrl === '' ? (
          <Skeleton
            variant='rounded'
            style={{ borderRadius: '1rem' }}
            width={'280px'}
            height={'180px'}
          />
        ) : (
          <img
            className='h-[180px] w-[280px] rounded-2xl'
            src={imgUrl || '/assets/images/listBuilder/addToList.svg'}
            alt='property image'
          />
        )}
      </div>

      <div className='flex items-center justify-end space-x-2'>
        <Button
          text='Add To List'
          classes='w-28 h-7 rounded-3xl hover:!bg-white hover:text-sfra-blue-100 hover:border-2 hover:border-sfra-blue-50'
          onClick={() => {
            props?.setOpenAddToList(true);
          }}
        />

        <Button
          text='View Details'
          classes='w-28 h-7 rounded-3xl hover:!bg-white hover:text-sfra-blue-100 hover:border-2 hover:border-sfra-blue-50'
          onClick={() => {
            props?.goPropertyPage();
          }}
        />
      </div>
    </div>
  );
};

const MapBoxClusterView = (props: MapBoxClusterViewProps) => {
  const mapContainer = useRef<any>(null);
  const map = useRef<any>(null);
  const { toggleFilters, mapType, viewType } = useSelector(
    (state: any) => state.listBuilder
  );

  const [openAddToList, setOpenAddToList] = useState(false);
  const [featuresData, setFeatures] = useState([] as any);

  const { mapZoom, longitude, latitude } = useSelector(
    (state: any) => state.listBuilder
  );

  const addLayer = () => {
    if (map.current.getSource(props.mapId)) return;
    map.current.addSource(props?.mapId, {
      type: 'geojson',
      data: props?.mapData,
      cluster: true,
      clusterMaxZoom: 16,
      clusterRadius: 100,
      clusterProperties: {
        sum: ['+', ['get', 'count']],
      },
    });
    map.current.addLayer({
      id: 'clusters',
      type: 'circle',
      source: props.mapId,
      filter: ['has', 'point_count'],
      paint: {
        'circle-color': [
          'step',
          ['get', 'sum'],
          'rgba(50, 99, 201, 0.6)',
          200,
          '#f1f075',
          1000,
          '#f28cb1',
        ],
        'circle-radius': ['step', ['get', 'sum'], 20, 200, 30, 1000, 40],
      },
    });

    map.current.addLayer({
      id: 'cluster-count',
      type: 'symbol',
      source: props.mapId,
      filter: ['has', 'point_count'],
      layout: {
        'text-field': [
          'case',
          ['all', ['>=', ['abs', ['get', 'sum']], 1.0e9]],
          [
            'concat',
            [
              'to-string',
              [
                'round',
                ['/', ['number', ['get', 'sum']], ['number', 1000000000]],
              ],
            ],
            'B',
          ],
          ['all', ['>=', ['abs', ['get', 'sum']], 1.0e6]],
          [
            'concat',
            [
              'to-string',
              ['round', ['/', ['number', ['get', 'sum']], ['number', 1000000]]],
            ],
            'M',
          ],
          ['all', ['>=', ['abs', ['get', 'sum']], 1.0e3]],
          [
            'concat',
            [
              'to-string',
              [
                'number-format',
                [
                  'number',
                  ['/', ['number', ['get', 'sum']], ['number', 1.0e3]],
                ],
                { 'max-fraction-digits': 2 },
              ],
            ],
            'K',
          ],
          ['get', 'sum'],
        ],
        'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
        'text-size': 20,
      },
      paint: {
        'text-color': '#ffffff',
      },
    });

    map.current.addLayer({
      id: 'unclustered-point',
      type: 'symbol',
      source: props?.mapId,
      filter: ['!', ['has', 'point_count']],
      layout: {
        'icon-image': ['get', 'image'],
        'icon-size': 1,
        'icon-allow-overlap': true,
        'icon-offset': [0, 0],
      },
    });

    map.current.addLayer({
      id: 'same-position',
      type: 'symbol',
      source: props?.mapId,
      layout: {
        'text-field': ['get', 'count'],
        'text-allow-overlap': true,
        'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
        'text-size': 12,
        'text-offset': [1, -1.2],
      },
      paint: {
        'text-color': '#D96BC1',
        'text-halo-color': '#FFFFFF',
        'text-halo-width': 1,
      },
    });
  };

  const goPropertyPage = (id: number) => {
    if (map.current !== null) {
      const data: any = {
        zoom: map.current.getZoom(),
        longitude: map.current.getCenter().lng,
        latitude: map.current.getCenter().lat,
      };
      dispatch(setMapPosition(data));
    }
    Router.push(`/property/${id}`);
  };

  useEffect(() => {
    if (map.current) {
      const computedStyle = window.getComputedStyle(mapContainer.current);
      const borderRadius = computedStyle.getPropertyValue('border-radius');

      map.current.getCanvas().style.borderRadius = borderRadius;
      map.current.resize();
    }
  });

  let mapSwitchStyleTime = 0;
  const drawing = () => {
    mapSwitchStyleTime = 0;
    const mapSwitchStyleInterval = setInterval(() => {
      map.current.getSource(props.mapId)?.setData(props?.mapData);
      if (mapSwitchStyleTime >= 2000) {
        if (!mapType)
          map.current?.setPaintProperty('water', 'fill-color', '#dae3f5');
        clearInterval(mapSwitchStyleInterval);
      }
      mapSwitchStyleTime += 500;
    }, 500);
  };

  const setStyle = () => {
    map.current?.setStyle(
      !mapType
        ? 'mapbox://styles/mapbox/light-v10'
        : 'mapbox://styles/mapbox/satellite-v9'
    );
    drawing();
  };

  useEffect(() => {
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v10',
      center: [-100.0, 40.0],
      zoom: 4,
    });
    dispatch(setMap(map.current));

    map.current.on('load', () => {
      map.current.on('click', 'clusters', (e: any) => {
        const features = map.current.queryRenderedFeatures(e.point, {
          layers: ['clusters'],
        });
        const clusterId = features[0].properties.cluster_id;
        map.current
          .getSource(props.mapId)
          .getClusterExpansionZoom(clusterId, (err: any, zoom: number) => {
            if (err) return;
            map.current.easeTo({
              center: features[0].geometry.coordinates,
              zoom,
            });
          });
      });

      map.current.on('click', 'unclustered-point', (e: any) => {
        const mapHeight = mapContainer.current.offsetHeight;
        const popupHeight = 330;
        const point = map.current.project(e.lngLat);
        const center = map.current.getCenter();
        const zoom = map.current.getZoom();
        if (point.y + popupHeight > mapHeight && point.y - popupHeight < 0) {
          let y = 0;
          if (point.y < mapHeight / 2) {
            y = mapHeight - popupHeight;
          } else {
            y = popupHeight;
          }
          const p = [point.x, y];
          const c = map.current.unproject(p);
          const delta = c.lat - e.lngLat.lat;
          const lat = center.lat - delta;
          setTimeout(() => {
            map.current.easeTo({
              center: { lng: center.lng, lat },
              zoom,
            });
          }, 100);
        }
        const features = map.current.queryRenderedFeatures(point);

        if (!props?.isPopup) return;

        const coordinates = features[0].geometry.coordinates.slice();
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        setFeatures(features[0]);
        const popupMaxWidth = '380px';

        const propertyid = features[0].properties.id;
        const popupNode = document.createElement('div');
        ReactDOM.render(
          <Popup
            address={features[0].properties.address}
            city={features[0].properties.city}
            zip={features[0].properties.zip}
            url={`${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_URL}/streetview?size=800x400&location=${coordinates[1]},${coordinates[0]}&fov=90&pitch=10&key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}&source=outdoor`}
            setOpenAddToList={setOpenAddToList}
            goPropertyPage={() => goPropertyPage(propertyid)}
          />,
          popupNode
        );

        new mapboxgl.Popup({ closeButton: false })
          .setLngLat(coordinates)
          .setDOMContent(popupNode)
          .setMaxWidth(popupMaxWidth)
          .addTo(map.current);
      });

      map.current.on('mouseenter', 'clusters', () => {
        map.current.getCanvas().style.cursor = 'pointer';
      });

      map.current.on('mouseleave', 'clusters', () => {
        map.current.getCanvas().style.cursor = '';
      });
    });

    map.current.on('style.load', () => {
      Promise.all(
        [1, 2, 3, 4].map((index) => {
          return new Promise((resolve) => {
            map.current.loadImage(
              `../../assets/images/mapbox/property${index}.png`,
              (error: any, image: any) => {
                if (error) throw error;
                map.current.addImage(`img${index}`, image);
                resolve(`loaded-${index}`);
              }
            );
          });
        })
      ).then(() => {
        setTimeout(() => {
          addLayer();
        }, 500);
      });
    });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      map.current.easeTo({
        center: { lng: longitude, lat: latitude },
        zoom: mapZoom,
      });
    }, 1500);
  }, [viewType]);

  useEffect(() => {
    setStyle();
  }, [mapType]);

  useEffect(() => {
    drawing();
  }, [props?.mapData]);

  let mapResizeTime = 0;
  useEffect(() => {
    mapResizeTime = 0;
    const mapResizeInterval = setInterval(() => {
      const width = mapContainer.current.clientWidth;
      map.current.getCanvas().style.width = `${width}px`;
      map.current.resize();

      if (mapResizeTime >= 500) clearInterval(mapResizeInterval);
      mapResizeTime += 10;
    }, 10);
  }, [toggleFilters]);

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
      <div className='absolute right-4 bottom-8 z-10'>
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

      <div className='absolute left-4 bottom-8 z-10'>
        <div
          className={`${styles.Button} mb-2 ${
            !mapType ? '' : '!bg-sfra-blue-100'
          }`}
          onClick={() => {
            dispatch(setMapType(!mapType as any));
          }}
        >
          <img
            src='/assets/images/listBuilder/map-btn-4.svg'
            className={`${!mapType ? '' : 'default-white-svg'}`}
            alt='map-btn-4'
          />
        </div>
        <div className={`${styles.Button} mb-2`}>
          <img src='/assets/images/listBuilder/map-btn-2.svg' alt='map-btn-1' />
        </div>
        <div className={styles.Button}>
          <img src='/assets/images/listBuilder/map-btn-3.svg' alt='zoom-in' />
        </div>
      </div>

      <Dialog
        icon='/assets/images/listBuilder/noteAddList.svg'
        iconClasses='default-white-svg'
        title={'Add to list'}
        classes='!bg-sfra-blue-300 !text-white'
        closeDialog={() => setOpenAddToList(false)}
        body={
          <AddToList
            url={`${
              process.env.NEXT_PUBLIC_GOOGLE_MAP_API_URL
            }/streetview?size=800x400&location=${
              featuresData?.geometry?.coordinates?.slice()[1]
            },${
              featuresData?.geometry?.coordinates?.slice()[0]
            }&fov=90&pitch=10&key=${
              process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY
            }&source=outdoor`}
            id={featuresData?.properties?.id}
            long={featuresData?.geometry?.coordinates?.slice()[1]}
            lat={featuresData?.geometry?.coordinates?.slice()[0]}
            street={featuresData?.properties?.address}
            name={featuresData?.properties?.name}
          />
        }
        footer={
          <AddToListFooter
            setOpenAddToList={setOpenAddToList}
            id={featuresData?.properties?.id}
          />
        }
        open={openAddToList}
      />
    </div>
  );
};

export default MapBoxClusterView;
