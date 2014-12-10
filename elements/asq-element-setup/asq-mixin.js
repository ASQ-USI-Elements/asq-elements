ASQ = {}

ASQ.mixin = function (prototype, mixin) {

  /**
   * If there are conflics between prototype and mixin,
   * keep the one defined in the prototype.
   *
   * 
   */
  var conflicts = {};

  Object.keys(prototype).forEach(function(pe) {
    if ( mixin.hasOwnProperty(pe) ) {
      conflicts[pe] = prototype[pe];
      // console.log("conflict", pe, prototype[pe]);
    }
  });

  // TODO: use ASQ.mixin??
  if (mixin.mixinPublish) {
    prototype.publish = prototype.publish || {};
    Polymer.mixin(prototype.publish, mixin.mixinPublish);
  }

  Polymer.mixin(prototype, mixin);
  Polymer.mixin(prototype, conflicts);

  return prototype;
}