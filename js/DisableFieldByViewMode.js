/**
 * @file
 * Defines the Drupal behaviors needed for the Disable field view mode.
 */

(function ($, Drupal) {
  'use strict';

  /**
   * Drupal behavior for the Disable field view mode.
   *
   * @type {Drupal~behavior}
   *
   * @prop {Drupal~behaviorAttach} attach
   *   Attaches the behavior and creates instances.
   * @prop {Drupal~behaviorAttach} detach
   *   Detaches the behavior and destroys instances.
   */
  Drupal.behaviors.disableFieldByViewMode = {
    attach: function (context) {
      this.createInstances(context);
    },
    /**
     * Creates necessary instances of Disable field view mode.
     *
     * @param {HTMLElement|jQuery} [context=document]
     *   The context which to find elements in.
     */
    createInstances: function (context) {
      let viewDisplayModeId = ($("select[id*='view-mode']") && $("select[id*='view-mode']").length != 0) ? "select[id*='view-mode']" : '#edit-view-mode-selection';
      let viewDisplayMode = extractViewMode($(viewDisplayModeId).find(":selected").val());
      viewDisplayMode = (viewDisplayMode == '_none') ? 'default' : viewDisplayMode;
      getViewModeVisibility(viewDisplayMode);
      $(`${viewDisplayModeId} , select[name^='settings']`).on('change', function () {
        let viewMode = extractViewMode(this.value);
        viewMode = (viewMode == '_none') ? 'default' : viewMode;
        getViewModeVisibility(viewMode);
      });

      function getViewModeVisibility(viewMode) {
        $(".field-visibility-identifier").each(function () {
          if (($(this).hasClass(viewMode)) != true) {
            $(this).hide();
          }
          else {
            $(this).show();
          }
        });
      }

      function extractViewMode(viewDisplayMode) {
        if(viewDisplayMode !== undefined){
        return viewDisplayMode.split(".").pop();
        }
      }

    },
  };
}(jQuery, Drupal));
