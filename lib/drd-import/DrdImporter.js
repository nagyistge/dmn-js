function DrdImporter(eventBus, canvas) {
  this._eventBus = eventBus;
  this._canvas = canvas;

  // this._elementFactory = elementFactory;
  // this._elementRegistry = elementRegistry;
}

DrdImporter.$inject = [ 'eventBus', 'canvas' ];

module.exports = DrdImporter;


/**
 * Add drd element (semantic) to the canvas onto the
 * specified parent shape.
 */
DrdImporter.prototype.add = function(semantic, parentElement) {

  console.log('what');

  var di = semantic.extensionElements,
      element;

  var bounds = di.bounds;

  // SHAPE
  if (bounds) {

    element = this._elementFactory.createShape(elementData(semantic, {
      collapsed: collapsed,
      hidden: hidden,
      x: Math.round(bounds.x),
      y: Math.round(bounds.y),
      width: Math.round(bounds.width),
      height: Math.round(bounds.height)
    }));

    this._canvas.addShape(element, parentElement);
  } else {
    throw new Error('unknown di for element ' + semantic.id);
    // throw new Error('unknown di ' + elementToString(di) + ' for element ' + elementToString(semantic));
  }

  this._eventBus.fire('drdElement.added', { element: element });

  return element;
};
