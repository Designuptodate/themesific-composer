/* -----------------------------------------------------------------------------
 * Page Template Meta-box
 * -------------------------------------------------------------------------- */
;(function( $, window, document, undefined ){
	"use strict";
	
	$( document ).ready( function () {
        var rangeSliders = $(".atbs-range-slider");
        
        rangeSliders.each(function(){
            var output = $(this).siblings();
            output.html(this.value+'px'); // Display the default slider value
            
            // Update the current slider value (each time you drag the slider handle)
            this.oninput = function() {
                output = $(this).siblings();
                output.html(this.value+'px');
            } 
        });
        
        var checkExist = setInterval(function() {
            if ($('#editor').length) {
                bk_page_composer_init();
                $('.edit-post-layout').bind("DOMSubtreeModified",$.debounce(200, function(){
                    if ($('.editor-page-attributes__template').length) {
                        bk_composer_template_change_rebind();
                    }
                }));
                clearInterval(checkExist);
           }
        }, 100); // check every 100ms
        
        function bk_page_composer_init() {
            var container = $('#bk-container');  
            if(container.length) {  
                container.addClass('bk-gutenberg-detected');
                container.insertAfter(".block-editor-block-list__layout");
                if($( '.components-select-control__input' ).length > 1) {
                    $( '.components-select-control__input' ).each(function(){
                        var template = $(this).val(); 
                        console.log(template);
                        if ( 'page_builder.php' == template ) {
                            container.show();
                        }
                    });
                }
            }
            bk_composer_template_change();

            wp.data.subscribe(function() {
                bk_gutenberg_save_composer();
            });
        }
        
        function bk_composer_template_change(){
            $('.components-select-control__input').unbind('change');
            $( '.components-select-control__input' ).change( function() {  
                var template = $(this).val();      
                console.log(template);      
                // Page Composer Template
                if ( 'page_builder.php' == template ) {
                	$('#editor').addClass('bk-composer-active');
                	$.page_builder( 'show' );
                	$( '.block-editor-block-list__layout' ).hide();
                    $( '#pagenav_pagebuilder').show();
                    
                    $('.bk-module-options').find('.all-option-tab').hide();
                    $('.bk-module-options').find('.all-option-tab-1').show();
                    
                    $('#bk_page_description_section').hide();
                    $('#bk_page_settings_section').hide();
                
                } else {
                    $('#editor').removeClass('bk-composer-active');
                	$.page_builder( 'hide' );
                	$( '.block-editor-block-list__layout' ).show();
                    $('#pagenav_pagebuilder').hide();
                    $('#bk_page_description_section').show();
                    if ( 'blog.php' == template ) {
                        $('#bk_page_settings_section').hide();
                    }else {
                        $('#bk_page_settings_section').show();
                    }
                }
                var rangeSliders = $(".atbs-range-slider");
        
                rangeSliders.each(function(){
                    var output = $(this).siblings();
                    output.html(this.value+'px'); // Display the default slider value
                    
                    // Update the current slider value (each time you drag the slider handle)
                    this.oninput = function() {
                        output = $(this).siblings();
                        output.html(this.value+'px');
                    } 
                });
            } ).triggerHandler( 'change' );       
        }
        
        function bk_composer_template_change_rebind(){
            $('.components-select-control__input').unbind('change');
            $( '.components-select-control__input' ).change( function() {
                var template = $(this).val();     
                // Page Composer Template
                if ( 'page_builder.php' == template ) {
                	$('#editor').addClass('bk-composer-active');
                	$.page_builder( 'show' );
                	$( '.block-editor-block-list__layout' ).hide();
                    $( '#pagenav_pagebuilder').show();
                    
                    $('#bk_page_description_section').hide();
                    $('#bk_page_settings_section').hide();
                
                } else {
                    $('#editor').removeClass('bk-composer-active');
                	$.page_builder( 'hide' );
                	$( '.block-editor-block-list__layout' ).show();
                    $('#pagenav_pagebuilder').hide();
                    $('#bk_page_description_section').show();
                    if ( 'blog.php' == template ) {
                        $('#bk_page_settings_section').hide();
                    }else {
                        $('#bk_page_settings_section').show();
                    }
                }
                
                var rangeSliders = $(".atbs-range-slider");
        
                rangeSliders.each(function(){
                    var output = $(this).siblings();
                    output.html(this.value+'px'); // Display the default slider value
                    
                    // Update the current slider value (each time you drag the slider handle)
                    this.oninput = function() {
                        output = $(this).siblings();
                        output.html(this.value+'px');
                    } 
                });
            } ).triggerHandler( 'change' );       
        }
        
        function bk_gutenberg_save_composer() {
            if (!wp.data.select("core/editor").isAutosavingPost() && wp.data.select("core/editor").isSavingPost()) {
                var currentPage = wp.data.select("core/editor").getCurrentPost();
                if (!currentPage.id || !currentPage.type || !currentPage.status) return;
                var dataTransfer = "action=bk_gutenberg_save_page";
                dataTransfer += "&post_ID=" + currentPage.id, dataTransfer += "&post_type=" + currentPage.type;
                $('#bk-container').find(".bk-section-order, .bk-section-type, .bk-sidebar-order, .bk-sidebarpos-order, .bk-module-type, .bk-field, .bk_module_order").each(function() {
                    dataTransfer += "&" + $(this).serialize()
                }), $.ajax({
                    type: 'POST',
                    async: !0,
                    dataType: 'json',
                    url: ajaxurl,
                    data: dataTransfer,
                    success: function(respond) {}
                    
                });                              
            }
        }
	} );
})( jQuery, window , document );
