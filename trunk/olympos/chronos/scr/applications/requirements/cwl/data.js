var idSeq = 0;

// initial data set
var data = {
    id: "c0",
    name: "condition0",
    data: {type:"condition"},
    children: []
};

// templates
var condTpl = {
    id: "c",
    name: "???",
    data: {type:"condition"},
    children: []
};

var andTpl = {
    id: "and",
    name: "AND",
    data: {type:"operator"},
    children: [{
      id: "c",
      name: "???",
      data: {type:"condition"},
      children: []
    }]
};

var orTpl = {
    id: "or",
    name: "OR",
    data: {type:"operator"},
    children: [{
      id: "c",
      name: "???",
      data: {type:"condition"},
      children: []
    }]
};

function addAnd() {
  var result = clone(andTpl);
  result.id += getNextId();
  result.children[0].id += getNextId();
  result.children[0].name = "condition"+getNextId();
  result.children.unshift(clone(data));
  data = clone(result);
  return result;
}

function addOr() {
  var result = clone(orTpl);
  result.id += getNextId();
  result.children[0].id += getNextId();
  result.children[0].name = "condition"+getNextId();
  result.children.unshift(clone(data));
  data = clone(result);
  return result;
}

function clone(obj) {
  if (obj == null || typeof(obj) != 'object')
    return obj;

  var temp = new obj.constructor(); // changed (twice)
  for(var key in obj)
    temp[key] = clone(obj[key]);
  return temp;
}

function getNextId() {
  return ++idSeq;
}