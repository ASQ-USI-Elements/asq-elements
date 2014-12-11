
ASQ.Role = {

  // use a simple enum object
  Roles: Object.freeze({
    VIEWER: "viewer",
    PRESENTER: "presenter",
    TA: "ta"
  }),

  mixinPublish: {
    // default role is 'viewer'
    role: {value: "viewer", reflect: true},
  },

  /**
  * If the role of `outside` element is 
  * changed, then `inside` elements' role
  * are also changed.
  *
  */
  roleChanged: function(old, newRole) {
    this.childNodes.array().filter(function(el) {
      return el.isASQElement;
    }).forEach(function(x) {
      x.role = newRole;
    });
  }


}