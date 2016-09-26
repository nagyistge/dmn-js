'use strict';

var DRDTreeWalker = require('./DRDTreeWalker');


/**
 * Import the definitions into a diagram.
 *
 * Errors and warnings are reported through the specified callback.
 *
 * @param  {Canvas} canvas
 * @param  {ModdleElement} definitions
 * @param  {Function} done the callback, invoked with (err, [ warning ]) once the import is done
 */
function importDRD(canvas, definitions, done) {

  var importer = canvas.get('drdImporter'),
      eventBus = canvas.get('eventBus');

  var error,
      warnings = [];

  function render(definitions) {

    var visitor = {
      create: function(type, parent, clause, rule) {
        console.log('creating', arguments);
        // return importer.create(type, parent, clause, rule);
      },

      table: function(element) {
        console.log('table', arguments);
        // return importer.add(element);
      },

      element: function(element, parentShape, definitions) {
        console.log('element', arguments);
        return importer.add(element, parentShape, definitions);
      },

      error: function(message, context) {
        warnings.push({ message: message, context: context });
      }
    };

    var walker = new DRDTreeWalker(visitor, { canAddMissingEntries: false });

    // import
    walker.handleDefinitions(definitions);
  }

  eventBus.fire('import.render.start', { definitions: definitions });

  try {
    render(definitions);
  } catch (e) {
    error = e;
  }

  eventBus.fire('import.render.complete', {
    error: error,
    warnings: warnings
  });


  done(error, warnings);
}

module.exports.importDRD = importDRD;
