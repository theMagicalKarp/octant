var renderLogs = function(logs) {
  console.log('foobar');
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

  // Waves.displayEffect();
};

var renderContainer = function(container) {
  // $('#container').html(JSON.stringify(container, null, 4));

  $.ajax({
    'url': ['/container', container.Id, 'logs'].join('/'),
    'type': 'GET',
    'success': renderLogs
  });

  var env = _.map(container.Config.Env, function(env) {
    return [
      '<li class="collection-item">',
        env,
      '</li>'
    ].join('');
  });
  env = [
    '<ul class="collection with-header">',
      '<li class="collection-header"><h4>Enviroment Variables</h4></li>',
      env.join(''),
    '</ul>'
  ].join('');


  var keys = [
    'Id', 'Created', 'Driver', 'Path'
  ];
  var info = _.map(keys, function(key) {
    return [
      '<li class="collection-item">',
        '<p><strong>', key, '</strong></p>',
        '<p>', container[key], '</p>',
      '</li>'
    ].join('');
  });
  info = [
    '<ul class="collection with-header">',
      '<li class="collection-header"><h4>Info</h4></li>',
      info.join(''),
    '</ul>'
  ].join('');



  $('#container .info').html([
    info, env
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

  
  $('#containers').html([
    '<div class="collection with-header">',
      '<div class="collection-header blue-grey lighten-5"><h4>Containers</h4></div>',
      rows.join(''),
    '</div>'
  ].join(''));

};
