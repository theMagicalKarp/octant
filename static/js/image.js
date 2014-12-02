var renderImageHistory = function(history) {
  var rows = _.map(history, function(item) {
    if (_.isUndefined(item.CreatedBy)) {
      return '';
    }

    return [
      '[', formatTime(item.Created),'] ', item.CreatedBy, '\n'
    ].join('');
  });

  $('#image .history').html([
    '<div class="collection with-header">',
      '<div class="collection-header"><h4>Histroy</h4></div>',
      '<pre class="collection-item">',
        rows.join(''),
      '</pre>',
    '</div>'
  ].join(''));
};

var renderImage = function(image) {
  console.log(image);

  var keys = ['Id', 'Architecture', 'Created', 'DockerVersion', 'Author'];
  var info = _.map(keys, function(key) {
    if (_.isUndefined(image[key])) {
      return '';
    }

    return [
      '<div class="collection-item">',
        '<strong>', key, '</strong><br>',
        '<span class="mute">', image[key], '</span>',
      '</div>'
    ].join('');
  });

  info = [
    '<div class="collection with-header">',
      '<div class="collection-header"><h4>Info</h4></div>',
      info.join(''),
    '</div>'
  ].join('');


  var config = _.map(image.Config, function(configValue, configLabel) {
    if (configLabel === 'Cmd') {
      configValue = configValue.join(' ');
    } else if (_.isArray(configValue)) {
      configValue = configValue.join('</span><span class="mute"><br>');
    } else if (_.isObject(configValue)) {
      // todo handle the Exposed Port Stuff
      return '';
    }

    return [
      '<div class="collection-item">',
        '<strong>', configLabel, '</strong><br>',
        '<span class="mute">', configValue, '</span>',
      '</div>'
    ].join('');
  });


  config = [
    '<div class="collection with-header">',
      '<div class="collection-header"><h4>Config</h4></div>',
      config.join(''),
    '</div>'
  ].join('');

  $('#image .info').html([
    info, config
  ].join(''));
};


var renderImages = function(images) {
  var rows = _.map(images, function(image) {
    var tags = image.RepoTags.join(', ');
    return [
      '<a class="collection-item" href="#" docker-id="', image.Id, '">',
        _.escape(tags),
      '</a>'
    ].join('');
  });

  if (rows.length === 0) {
    rows = ['<div class="collection-item">No images...</div>'];
  }

  $('#images').html([
    '<div class="collection with-header">',
      '<div class="collection-header"><h4>Images</h4></div>',
      rows.join(''),
    '</div>'
  ].join(''));
};
