import './style.css';
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import VectorLayer from 'ol/layer/Vector.js';
import VectorSource from 'ol/source/Vector.js';
import GeoJSON from 'ol/format/GeoJSON.js';
import {fromLonLat} from 'ol/proj.js';

function makeWfsLayer(typeName) {
  return new VectorLayer({
    source: new VectorSource({
      format: new GeoJSON(),
      url: function () {
        return '/ows/?' +
          'MAP=/io/data/qgis_project.qgz&' +
          'SERVICE=WFS&' +
          'VERSION=1.1.0&' +
          'REQUEST=GetFeature&' +
          'TYPENAME=' + typeName + '&' +
          'OUTPUTFORMAT=application/vnd.geo+json&' +
          'SRSNAME=EPSG:3857';
      }
    })
  });
}

const sapporoLayer = makeWfsLayer('sapporo_clipped_utm');
const roadsLayer = makeWfsLayer('roads_clipped_utm');
const railsLayer = makeWfsLayer('rails_clipped_utm');

const map = new Map({
  target: 'map',
  layers: [sapporoLayer, roadsLayer, railsLayer],
  view: new View({
    center: fromLonLat([141.3, 43.05]),
    zoom: 11
  })
});
