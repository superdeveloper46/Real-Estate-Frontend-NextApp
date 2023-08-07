import React, { useMemo } from 'react';

import MapBoxClusterView from '@/components/MapBoxView/MapBoxClusterView.component';

const MapBoxPanel = (props: { data: any }) => {
  const propertyListsMap = props.data;

  const getMapViewData = useMemo(() => {
    const mapViewData: { type: string; features: any } = {
      type: 'FeatureCollection',
      features: [],
    };

    propertyListsMap?.forEach((dataPoint: any) => {
      const existingFeature: any = mapViewData.features.find((feature: any) => {
        return (
          feature.geometry.coordinates[0] === dataPoint.situslongitude &&
          feature.geometry.coordinates[1] === dataPoint.situslatitude
        );
      });

      if (existingFeature) {
        existingFeature.properties.count =
          Number(existingFeature.properties.count) + 1;
      } else {
        const newFeature = {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [dataPoint.situslongitude, dataPoint.situslatitude],
          },
          properties: {
            id: dataPoint.propertyid,
            address: dataPoint.situsfullstreetaddress,
            city: dataPoint.situscity,
            zip: dataPoint.situszip5,
            name: dataPoint.ownername1full,
            image:
              dataPoint?.property_type !== undefined &&
              dataPoint?.property_type !== null
                ? dataPoint?.property_type.search(' Residential') !== -1
                  ? 'img1'
                  : dataPoint?.property_type.search('Commercial') !== -1
                  ? 'img2'
                  : dataPoint?.property_type.search('Land') !== -1
                  ? 'img4'
                  : 'img3'
                : 'img2',
            count: 1,
          },
        };
        mapViewData.features.push(newFeature);
      }
    });

    return mapViewData;
  }, [propertyListsMap]);

  return (
    <div className='p-3'>
      <MapBoxClusterView
        mapId={'myListMap'}
        mapData={getMapViewData}
        height={'!h-[300px]'}
        isPopup={true}
      />
    </div>
  );
};

export default MapBoxPanel;
