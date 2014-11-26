var renderImage = function(image) {
  // console.log(image);
  // var env = _.map(images.Env, function(env) {
  //   return [
  //     '<li class="collection-item">',
  //       env,
  //     '</li>'
  //   ].join('');
  // });
  // env = [
  //   '<ul class="collection with-header">',
  //     '<li class="collection-header"><h4>Enviroment Variables</h4></li>',
  //     env.join(''),
  //   '</ul>'
  // ].join('');


  // $('#image').html([
  //   env
  // ].join(''));
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

  $('#images').html([
    '<div class="collection with-header">',
      '<div class="collection-header"><h4>Images</h4></div>',
      rows.join(''),
    '</div>'
  ].join(''));
};
