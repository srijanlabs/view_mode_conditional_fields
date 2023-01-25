/**
 * @file
 * Defines the Drupal behaviors needed for the Image Widget Crop module.
 */

(function ($, Drupal) {
  'use strict';

  /**
   * Drupal behavior for the Image Widget Crop module.
   *
   * @type {Drupal~behavior}
   *
   * @prop {Drupal~behaviorAttach} attach
   *   Attaches the behavior and creates Cropper instances.
   * @prop {Drupal~behaviorAttach} detach
   *   Detaches the behavior and destroys Cropper instances.
   */
  Drupal.behaviors.disableFieldByViewMode = {
    attach: function (context) {
      this.createInstances(context);
    },

    /**
     * Creates necessary instances of Drupal.ImageWidgetCrop.
     *
     * @param {HTMLElement|jQuery} [context=document]
     *   The context which to find elements in.
     */
    createInstances: function (context) {
      let viewDisplayMode = $("#edit-view-mode-selection").find(":selected").val();
      viewDisplayMode = (viewDisplayMode == '_none') ? 'block_content.default' : viewDisplayMode;
      $(".field-visibility-identifier").once().each(function() {
        if ($(this).hasClass( viewDisplayMode ) != true) {
          $(this).hide();
        }
        else {
          $(this).show();
        }
      });

      $("#edit-view-mode-selection, select[name^='settings']").on('change', function() {
        let viewMode = this.value;
        if (viewMode === '_none') {
          viewMode = 'block_content.default';
        }

        $(".field-visibility-identifier").each(function() {
          if ($(this).hasClass( viewMode ) != true) {
            $(this).hide();
          }
          else {
            $(this).show();
          }
        });
      });
    },
  };
}(jQuery, Drupal));
