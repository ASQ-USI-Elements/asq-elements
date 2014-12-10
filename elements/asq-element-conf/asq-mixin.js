ASQ = {
}

ASQ.mixin = function () {

  var prototype = arguments[0];
  for (var i = 1; i < arguments.length; i++) {
    prototype = mix(prototype, arguments[i]);
  }
  
  /**
   * If there are conflics between prototype and mixin,
   * keep the one defined in the prototype.
   *
   * 
   */
  function mix(prototype, mixin) {
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
    // To overwrite the conflicts.
    Polymer.mixin(prototype, conflicts);

    return prototype;
  }
}

