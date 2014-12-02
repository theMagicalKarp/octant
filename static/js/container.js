var renderLogs = function(logs) {
  $('#container .logs').html([
    '<div class="collection with-header">',
      '<div class="collection-header">',
        '<a class="log-refresh blue-grey secondary-content waves-effect waves-light btn-floating">',
          '<i class="mdi-navigation-refresh"></i>',
        '</a>',
        '<h4>Logs</h4>',
      '</div>',
      '<pre class="collection-item">',
        logs,
      '</pre>',
    '</div>'
  ].join(''));

  // hack to get waves on buttons to display w/ dynamicly generated html
  Waves.displayEffect();
};

var renderContainer = function(container) {
  console.log(container);

  var keys = [
    'Name', 'Id', 'Created', 'Volumes', 'Path'
  ];
  var info = _.map(keys, function(key) {
    var data = container[key];
    if (_.isUndefined(data)) {
      return '';
    } else if (_.isObject(data)) {
      data = _.map(data, function(attribute) {
        return [
          '<span class="mute">',
            attribute, ': ', data[attribute],
          '</span><br>'
        ].join('');
      }).join('');
    }

    return [
      '<div class="collection-item">',
        '<strong>', key, '</strong><br>',
        '<span class="mute">', data, '</span>',
      '</div>'
    ].join('');
  });

  info = [
    '<div class="collection with-header">',
      '<div class="collection-header"><h4>Info</h4></div>',
      info.join(''),
    '</div>'
  ].join('');


  var config = _.map(container.Config, function(configValue, configLabel) {
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


  $('#container .info').html([
    info, config
  ].join(''));
};

var renderContainers = function(containers) {
  var rows = _.map(containers, function(container) {
    return [
      '<a class="collection-item" href="#" docker-id="', container.Id, '">',
        container.Names.join(''),
      '</a>'
    ].join('');
  });

  
  if (rows.length === 0) {
    rows = ['<div class="collection-item">No containers...</div>'];
  }
  $('#containers').html([
    '<div class="collection with-header">',
      '<div class="collection-header blue-grey lighten-5"><h4>Containers</h4></div>',
      rows.join(''),
    '</div>'
  ].join(''));

};
