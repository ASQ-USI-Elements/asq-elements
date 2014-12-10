
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
  }

}