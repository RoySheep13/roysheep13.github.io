(function () {
  var KEY = 'roy-site-visible';
  var boxes = Array.prototype.slice.call(document.querySelectorAll('input[data-filter]'));
  var items = Array.prototype.slice.call(document.querySelectorAll('[data-work]'));
  var status = document.getElementById('status');
  var empty = document.getElementById('empty');

  function load() {
    try {
      var raw = localStorage.getItem(KEY);
      if (!raw) return null;
      var list = JSON.parse(raw);
      return Array.isArray(list) ? list : null;
    } catch (e) {
      return null;
    }
  }

  function save(list) {
    try {
      localStorage.setItem(KEY, JSON.stringify(list));
    } catch (e) {}
  }

  function apply() {
    var shown = boxes
      .filter(function (b) { return b.checked; })
      .map(function (b) { return b.getAttribute('data-filter'); });

    items.forEach(function (li) {
      li.hidden = shown.indexOf(li.getAttribute('data-work')) === -1;
    });

    status.textContent = '顯示 ' + shown.length + ' / ' + boxes.length + ' 項';
    empty.hidden = shown.length !== 0;
    return shown;
  }

  var saved = load();
  if (saved) {
    boxes.forEach(function (b) {
      b.checked = saved.indexOf(b.getAttribute('data-filter')) !== -1;
    });
  }
  apply();

  boxes.forEach(function (b) {
    b.addEventListener('change', function () {
      save(apply());
    });
  });
})();
