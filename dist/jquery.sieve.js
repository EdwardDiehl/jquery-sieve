/*!
 * jQuery Sieve v0.2.5 (2013-02-28)
 * http://rmm5t.github.com/jquery-sieve/
 * Copyright (c) 2013 Ryan McGeary; Licensed MIT
 */
(function() {
  var $;

  $ = jQuery;

  $.fn.sieve = function(options) {
    var compact;
    compact = function(array) {
      var item, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = array.length; _i < _len; _i++) {
        item = array[_i];
        if (item) {
          _results.push(item);
        }
      }
      return _results;
    };
    return this.each(function() {
      var container, searchBar, settings;
      container = $(this);
      settings = $.extend({
        searchInput: null,
        searchTemplate: "<div><label>Search: <input type='text'></label></div>",
        itemSelector: "tbody tr",
        textSelector: null
      }, options);
      if (!settings.searchInput) {
        searchBar = $(settings.searchTemplate);
        settings.searchInput = searchBar.find("input");
        container.before(searchBar);
      }
      return settings.searchInput.on("keyup.sieve change.sieve", function() {
        var query, rows;
        query = compact($(this).val().toLowerCase().split(/\s+/));
        rows = container.find(settings.itemSelector);
        return rows.each(function() {
          var cells, matches, q, row, text, _i, _len;
          row = $(this);
          if (settings.textSelector) {
            cells = row.find(settings.textSelector);
            text = cells.text().toLowerCase();
          } else {
            text = row.text().toLowerCase();
          }
          matches = true;
          for (_i = 0, _len = query.length; _i < _len; _i++) {
            q = query[_i];
            matches && (matches = text.indexOf(q) >= 0);
          }
          return row.toggle(matches);
        });
      });
    });
  };

}).call(this);
