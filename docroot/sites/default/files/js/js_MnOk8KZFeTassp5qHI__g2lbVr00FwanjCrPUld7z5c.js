/**
 * @file
 * Attaches behavior for the Filter module.
 */

(function ($) {
  'use strict';

  function updateFilterHelpLink () {
    var $link = $(this).parents('.filter-wrapper').find('.filter-help > a');
    var originalLink = $link.data('originalLink');
    if (!originalLink) {
      originalLink = $link.attr('href');
      $link.data('originalLink', originalLink);
    }
    $link.attr('href', originalLink + '/' + $(this).find(':selected').val());
  }

  $(document).on('change', '.filter-wrapper select.filter-list', updateFilterHelpLink);

  /**
   * Displays the guidelines of the selected text format automatically.
   *
   * @type {Drupal~behavior}
   *
   * @prop {Drupal~behaviorAttach} attach
   *   Attaches behavior for updating filter guidelines.
   */
  Drupal.behaviors.filterGuidelines = {
    attach: function (context) {
      $(context).find('.filter-wrapper select.filter-list').once('filter-list').each(updateFilterHelpLink);
    }
  };

})(jQuery);
;
/**
 * @file
 * Text behaviors.
 */

(function ($) {

  'use strict';

  /**
   * Auto-hide summary textarea if empty and show hide and unhide links.
   *
   * @type {Drupal~behavior}
   *
   * @prop {Drupal~behaviorAttach} attach
   *   Attaches auto-hide behavior on `text-summary` events.
   */
  Drupal.behaviors.textSummary = {
    attach: function (context, settings) {
      $(context).find('.js-text-summary').once('text-summary').each(function () {
        var $widget = $(this).closest('.js-text-format-wrapper');

        var $summary = $widget.find('.js-text-summary-wrapper');
        var $summaryLabel = $summary.find('label').eq(0);
        var $full = $widget.find('.js-text-full').closest('.js-form-item');
        var $fullLabel = $full.find('label').eq(0);

        // Create a placeholder label when the field cardinality is greater
        // than 1.
        if ($fullLabel.length === 0) {
          $fullLabel = $('<label></label>').prependTo($full);
        }

        // Set up the edit/hide summary link.
        var $link = $('<span class="field-edit-link"><button type="button" class="link link-edit-summary btn btn-default btn-xs pull-right" data-toggle="button" aria-pressed="false" autocomplete="off">' + Drupal.t('Hide summary') + '</button></span>');
        var $button = $link.find('button');
        var toggleClick = true;
        $link.on('click', function (e) {
          if (toggleClick) {
            $summary.hide();
            $button.html(Drupal.t('Edit summary'));
            $fullLabel.before($link);
          }
          else {
            $summary.show();
            $button.html(Drupal.t('Hide summary'));
            $summaryLabel.before($link);
          }
          e.preventDefault();
          toggleClick = !toggleClick;
        });
        $summaryLabel.before($link);

        // If no summary is set, hide the summary field.
        if ($widget.find('.js-text-summary').val() === '') {
          $link.trigger('click');
        }
        else {
          $link.addClass('active');
        }
      });
    }
  };

})(jQuery);
;
