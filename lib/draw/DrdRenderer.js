'use strict';

var inherits = require('inherits'),
    isArray = require('lodash/lang/isArray'),
    isObject = require('lodash/lang/isObject'),
    assign = require('lodash/object/assign');

var BaseRenderer = require('diagram-js/lib/draw/BaseRenderer'),
    TextUtil = require('diagram-js/lib/util/Text'),
    ModelUtil = require('../util/ModelUtil');

var createLine = require('diagram-js/lib/util/RenderUtil').createLine;

function DrdRenderer(eventBus) {

  BaseRenderer.call(this, eventBus);

  console.log('registering canvas init event');
  // hook onto canvas init event to initialize
  // connection start/end markers on svg
  eventBus.on('canvas.init', function(event) {
    console.log('hooked into the canvas init event');
    // initMarkers(event.svg);
  });

}

inherits(DrdRenderer, BaseRenderer);

DrdRenderer.$inject = [ 'eventBus' ];

module.exports = DrdRenderer;
