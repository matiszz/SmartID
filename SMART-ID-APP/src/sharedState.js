let id = null;
export default ({
  get: () => { return id},
  set: newId => id = parseInt(newId,10),
}) ;