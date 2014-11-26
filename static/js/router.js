var route = function(state) {
  if (state === null) {
    $('#container').hide();
    $('#image').hide();
    $('#home').show();

    $.ajax({
      'url': '/images',
      'type': 'GET',
      'dataType': 'json',
      'success': renderImages
    });

    $.ajax({
      'url': '/containers',
      'type': 'GET',
      'dataType': 'json',
      'success': renderContainers
    });

    return;
  }

  var state = state.split(':');

  if (state[0] === 'image') {
    $('#container').hide();
    $('#image').show();
    $('#home').hide();

    $.ajax({
      'url': ['/image/', state[1]].join(''),
      'type': 'GET',
      'dataType': 'json',
      'success': renderImage
    });

  } else if (state[0] === 'container') {
    $('#container').show();
    $('#image').hide();
    $('#home').hide();

    $.ajax({
      'url': ['/container/', state[1]].join(''),
      'type': 'GET',
      'dataType': 'json',
      'success': renderContainer
    });
  }
};