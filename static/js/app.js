var formatTime = function(unixEpoch) {
  var record = new Date(unixEpoch * 1000);
  var year = record.getFullYear();
  var month = record.getMonth();
  var date = record.getDate();
  var hour = record.getHours();
  var min = record.getMinutes();
  var sec = record.getSeconds();
  return [
    month, '/', date, '/', year, ' ', hour, ':', min, ':', sec
  ].join('');
};

var getDockerId = function() {
  return window.history.state.split(':')[1];
};

var renderDockerInfo = function(info) {
  var rows = _.map(info, function(value, key) {
    return [
      '<div class="collection-item">',
        '<strong>', key, '</strong><br>',
        '<span class="mute">', value, '</span>',
      '</div>'
    ].join('');
  });


  $('#home .info').html([
    '<div class="collection with-header">',
      '<div class="collection-header"><h4>Info</h4></div>',
      rows.join(''),
    '</div>'
  ].join(''));
};


$(document).ready(function() {
  $(window).on('popstate', function(e) {
    route(window.history.state);
  });
  route(window.history.state);

  $(document).on('click', '#container .log-refresh', function(e) {
    var dockerId = getDockerId();
    $.ajax({
      'url': ['/container', dockerId, 'logs'].join('/'),
      'type': 'GET',
      'success': renderLogs
    });
  });

  $(document).on('click', '#containers a', function(e) {
    var dockerId = $(this).attr("docker-id");
    var state = ['container', dockerId].join(':');

    window.history.pushState(state, null, './#' + state);
    route(window.history.state);

    e.preventDefault();
  });

  $(document).on('click', '#images a', function(e) {
    var dockerId = $(this).attr("docker-id");
    var state = ['image', dockerId].join(':');

    window.history.pushState(state, null, './#' + state);
    route(window.history.state);

    e.preventDefault();
  });

});