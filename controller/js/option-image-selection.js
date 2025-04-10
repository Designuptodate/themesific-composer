;(function( $, window, document, undefined ){
  "use strict";
  $(document).ready(function () {
      var currentSelectElement = null; // Keep track of the active select element
    
      // Function to initialize the modal for a given select element
      function initializeSelectBox($selectElement, modalId, modalOptions, layoutStyle) {
        $selectElement.on('mousedown', function (event) {
          event.preventDefault(); // Prevent native dropdown behavior
          $selectElement.blur(); // Remove focus to prevent dropdown from opening
    
          // Update the current select element reference
          currentSelectElement = $selectElement;
    
          // Check if the modal already exists
          var $modal = $(`#${modalId}`);
          if ($modal.length === 0) {
            var optionsHtml = modalOptions.map(option => `
              <div class="mobile-layout-options" data-value="${option.value}" style="cursor: pointer;">
                <img src="${option.image}" alt="${option.label}" style="border: 1px solid #ccc; border-radius: 4px;" />
                <p>${option.label}</p>
              </div>
            `).join('');
    
            $modal = $(`
              <div id="${modalId}" class="mobile-modal-overlay" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.5); display: flex; justify-content: center; align-items: center;">
                <div class="mobile-layout-modal-content" style="background: white; padding: 20px; border-radius: 8px; text-align: center; max-height: 80vh; overflow-y: auto;">
                  <h4>Select Layouts</h4>
                  <div class="mobile-image-options ${layoutStyle}" style="margin-top: 20px;">
                    ${optionsHtml}
                  </div>
                  <button class="closeModal" style="margin-top: 20px; padding: 10px 20px; background: #007BFF; color: white; border: none; border-radius: 4px; cursor: pointer;">Close</button>
                </div>
              </div>
            `);
    
            $('body').append($modal);
    
            // Close modal button
            $modal.find('.closeModal').on('click', function () {
              $modal.hide();
            });
    
            // Add click event to options
            $modal.find('.mobile-layout-options').on('click', function () {
              var value = $(this).data('value');
    
              // Update the value of the current select element
              if (currentSelectElement) {
                currentSelectElement.val(value).change();
              }
    
              // Close the modal
              $modal.hide();
            });

            // Close modal when clicking outside of the modal content
            $modal.on('click', function (e) {
              if ($(e.target).is($modal)) {
                $modal.hide();
              }
            });
          }
    
          // Show the modal
          $modal.show();
        });
      }
    
      // Define modal configurations
      var modalConfigs = [
        {
          selector: '.bk-module-option-wrap.mobile_display .bk-field',
          modalId: 'mobileDisplayModal',
          options: [
            { value: 'on', image: `${carbonData.templateUri}/images/admin_panel/mobile-layouts/mobile-responsive.png`, label: 'Responsive Layout' },
            { value: 'mobile-1', image: `${carbonData.templateUri}/images/admin_panel/mobile-layouts/mobile-1.png`, label: 'Mobile Layout 1' },
            { value: 'mobile-2', image: `${carbonData.templateUri}/images/admin_panel/mobile-layouts/mobile-2.png`, label: 'Mobile Layout 2' },
            { value: 'mobile-3', image: `${carbonData.templateUri}/images/admin_panel/mobile-layouts/mobile-3.png`, label: 'Mobile Layout 3' },
            { value: 'mobile-4', image: `${carbonData.templateUri}/images/admin_panel/mobile-layouts/mobile-4.png`, label: 'Mobile Layout 4' },
            { value: 'mobile-5', image: `${carbonData.templateUri}/images/admin_panel/mobile-layouts/mobile-5.png`, label: 'Mobile Layout 5' },
            { value: 'mobile-6', image: `${carbonData.templateUri}/images/admin_panel/mobile-layouts/mobile-6.png`, label: 'Mobile Layout 6' },
            { value: 'mobile-7', image: `${carbonData.templateUri}/images/admin_panel/mobile-layouts/mobile-7.png`, label: 'Mobile Layout 7' },
            { value: 'mobile-8', image: `${carbonData.templateUri}/images/admin_panel/mobile-layouts/mobile-8.png`, label: 'Mobile Layout 8' },
            { value: 'mobile-9', image: `${carbonData.templateUri}/images/admin_panel/mobile-layouts/mobile-9.png`, label: 'Mobile Layout 9' },
            { value: 'mobile-10', image: `${carbonData.templateUri}/images/admin_panel/mobile-layouts/mobile-10.png`, label: 'Mobile Layout 10' },
            { value: 'off', image: `${carbonData.templateUri}/images/admin_panel/mobile-layouts/mobile-off.png`, label: 'Off' }
          ],
          layoutStyle: 'mobile-grid'
        },
        {
          selector: '.bk-module-option-wrap.heading_style .bk-field',
          modalId: 'headingStyleModal',
          options: [
            { value: 'default', image: `${carbonData.templateUri}/images/admin_panel/module-headings/default.png`, label: 'Default' },
            { value: 'heading-style-1', image: `${carbonData.templateUri}/images/admin_panel/module-headings/heading-1.png`, label: 'Heading 1' },
            { value: 'heading-style-2', image: `${carbonData.templateUri}/images/admin_panel/module-headings/heading-2.png`, label: 'Heading 2' },
            { value: 'heading-style-3', image: `${carbonData.templateUri}/images/admin_panel/module-headings/heading-3.png`, label: 'Heading 3' },
            { value: 'heading-style-3-center', image: `${carbonData.templateUri}/images/admin_panel/module-headings/heading-3-center.png`, label: 'Heading 3 Center' },
            { value: 'heading-style-4', image: `${carbonData.templateUri}/images/admin_panel/module-headings/heading-4.png`, label: 'Heading 4' },
            { value: 'heading-style-5', image: `${carbonData.templateUri}/images/admin_panel/module-headings/heading-5.png`, label: 'Heading 5' },
            { value: 'heading-style-6', image: `${carbonData.templateUri}/images/admin_panel/module-headings/heading-6.png`, label: 'Heading 6' },
            { value: 'heading-style-7', image: `${carbonData.templateUri}/images/admin_panel/module-headings/heading-7.png`, label: 'Heading 7' },
            { value: 'heading-style-8', image: `${carbonData.templateUri}/images/admin_panel/module-headings/heading-8.png`, label: 'Heading 8' },
            { value: 'heading-style-9', image: `${carbonData.templateUri}/images/admin_panel/module-headings/heading-9.png`, label: 'Heading 9' },
            { value: 'heading-style-10', image: `${carbonData.templateUri}/images/admin_panel/module-headings/heading-10.png`, label: 'Heading 10' }
          ],
          layoutStyle: 'vertical-list'
        }
      ];
    
      // Initialize modals for existing select boxes
      modalConfigs.forEach(config => {
        $(config.selector).each(function () {
          initializeSelectBox($(this), config.modalId, config.options, config.layoutStyle);
        });
      });
    
      // Observe DOM for dynamically added elements
      var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
          $(mutation.addedNodes).each(function () {
            modalConfigs.forEach(config => {
              if ($(this).is(config.selector)) {
                initializeSelectBox($(this), config.modalId, config.options, config.layoutStyle);
              } else {
                var $nestedSelects = $(this).find(config.selector);
                if ($nestedSelects.length > 0) {
                  $nestedSelects.each(function () {
                    initializeSelectBox($(this), config.modalId, config.options, config.layoutStyle);
                  });
                }
              }
            });
          });
        });
      });
    
      observer.observe(document.body, { childList: true, subtree: true });
    });
})( jQuery, window , document );
