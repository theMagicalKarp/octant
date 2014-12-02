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
    'Id', 'Created',
  ];
  var info = _.map(keys, function(key) {
    return [
      '<li class="collection-item">',
        '<strong>', key, '</strong><br>',
        '<span class="mute">', container[key], '</span>',
      '</li>'
    ].join('');
  });

  info = [
    '<ul class="collection with-header">',
      '<li class="collection-header"><h4>Info</h4></li>',
      info.join(''),
    '</ul>'
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
      '<li class="collection-item">',
        '<strong>', configLabel, '</strong><br>',
        '<span class="mute">', configValue, '</span>',
      '</li>'
    ].join('');
  });

  config = [
    '<ul class="collection with-header">',
      '<li class="collection-header"><h4>Config</h4></li>',
      config.join(''),
    '</ul>'
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
