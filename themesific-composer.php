<?php
    /*
    Plugin Name: Themesific Composer
    Plugin URI: https://themesific.com
    Description: Powerful Drag and Drop Pagebuilder for WordPress Themes -- By BKNinja
    Author: BKNinja
    Author URI: http://themesific.com
    Version: 1.0
    Tags: right-sidebar, left-sidebar, two-columns, three-columns, drag drop modules, drag drop sections, full width section, has sidebar section
    Requires at least: 6.0
    Tested up to: 6.6
    Requires PHP: 7.4
    Copyright: © 2024 BKNinja. All rights reserved.
    */
?>
<?php
if (!defined('THEMESIFIC_COMPOSER_VERSION')) {
    define('THEMESIFIC_COMPOSER_VERSION', '1.0');
}

if (!defined('THEMESIFIC_COMPOSER_URL')) {
    define('THEMESIFIC_COMPOSER_URL', plugin_dir_url( __FILE__ ) );
}
if (!defined('THEMESIFIC_COMPOSER_DIR')) {
    define('THEMESIFIC_COMPOSER_DIR', plugin_dir_path( __FILE__ ) );
}
if (!defined('THEMESIFIC_COMPOSER_CONTROLLER')) {
    define('THEMESIFIC_COMPOSER_CONTROLLER', THEMESIFIC_COMPOSER_DIR.'controller/');
}

if (!defined('THEMESIFIC_COMPOSER_CSS_DIR')) {
    define('THEMESIFIC_COMPOSER_CSS_DIR', plugin_dir_url(__FILE__) . 'css');
}

require_once (THEMESIFIC_COMPOSER_CONTROLLER.'bk_pd_template.php');
require_once (THEMESIFIC_COMPOSER_CONTROLLER.'bk_pd_save.php');
require_once (THEMESIFIC_COMPOSER_CONTROLLER.'bk_pd_del.php');

if( is_admin() && is_multisite() )
{
    add_action(
        'plugins_loaded',
        'bkcomposer_init'
    );
}else {
    bkcomposer_init();
}

function bkcomposer_init(){
global $pagenow;

if ( $pagenow == 'widgets.php' ) {
    return '';
}

if (( $pagenow != 'post-new.php' ) && ( $pagenow != 'post.php' )) {
    return '';
}

if( $pagenow == 'post-new.php' ) {
    $postType = isset($_GET['post_type']) ? $_GET['post_type'] : '';
    if(isset($postType) && ($postType != 'page')) {
        return '';
    }
}

if( $pagenow == 'post.php' ) {
    $postAction = isset($_GET['action']) ? $_GET['action'] : '';
    if($postAction == 'edit') {
        $postID = isset($_GET['post']) ? $_GET['post'] : '';
        if($postID == '') {
            return '';
        }else {
            $adminEditPostType = get_post_type($postID);
            if($adminEditPostType != 'page'){
                return '';
            }
        }
    }
}

function bk_scripts_method() {
    wp_enqueue_style('composer_style', THEMESIFIC_COMPOSER_CSS_DIR.'/composer_style.css',false,THEMESIFIC_COMPOSER_VERSION);
}
add_action('admin_enqueue_scripts', 'bk_scripts_method');

/**-------------------------------------------------------------------------------------------------------------------------
 * Enqueue Pagebuilder Scripts
 */
if ( ! function_exists( 'bk_composer_script' ) ) {
    function bk_composer_script($hook) {
        if( $hook == 'post.php' || $hook == 'post-new.php' ) {
            wp_enqueue_script( 'bootstrap-admin', THEMESIFIC_COMPOSER_URL.'bootstrap-admin/bootstrap.js', array(), '', true );
            wp_enqueue_style( 'bootstrap-admin', THEMESIFIC_COMPOSER_URL.'bootstrap-admin/bootstrap.css', array(), '' );
            wp_enqueue_script( 'bk-composer-script', THEMESIFIC_COMPOSER_URL.'controller/js/page-builder.js', array( 'jquery' ), null, true );
            wp_localize_script( 'bk-composer-script', 'bkpb_ajax', array( 'ajaxurl' => admin_url( 'admin-ajax.php' ) ) );
    	}
        wp_enqueue_script('throttle-debounce', THEMESIFIC_COMPOSER_URL . '/js/throttle-debounce.min.js', array('jquery'),false, true);
        wp_enqueue_script( 'bootstrap-datepicker', THEMESIFIC_COMPOSER_URL.'/js/bootstrap-datepicker.min.js', array(), '', true );
        wp_enqueue_script( 'bootstrap-colorpicker', THEMESIFIC_COMPOSER_URL.'/js/bootstrap-colorpicker.min.js', array(), '', true );
    }
}
add_action('admin_enqueue_scripts', 'bk_composer_script', 9);

//pagebuilder_classic_editor
function pagebuilder_classic_editor() {
    wp_enqueue_script( 'atbs-pagebuilder-classic-init', THEMESIFIC_COMPOSER_URL.'controller/js/pagebuilder-classic-init.js', array('jquery-ui-sortable'), '', true );
}

//pagebuilder_gutenberg_editor
function pagebuilder_gutenberg_editor() {
	wp_enqueue_script( 'atbs-pagebuilder-gutenberg-init', THEMESIFIC_COMPOSER_URL.'controller/js/pagebuilder-gutenberg-init.js', array('jquery-ui-sortable'), '', true );
}

//pagebuilder_gutenberg_editor
function pagebuilder_gutenberg_editor_5_4() {
	wp_enqueue_script( 'atbs-pagebuilder-gutenberg-init-5-4', THEMESIFIC_COMPOSER_URL.'controller/js/pagebuilder-gutenberg-init-5-4.js', array('jquery-ui-sortable'), '', true );
}

//pagebuilder_gutenberg_editor
function pagebuilder_gutenberg_editor_5_8() {
	wp_enqueue_script( 'atbs-pagebuilder-gutenberg-init-5-8', THEMESIFIC_COMPOSER_URL.'controller/js/pagebuilder-gutenberg-init-5-8.js', array('jquery-ui-sortable'), '', true );
}

//pagebuilder_gutenberg_editor
function pagebuilder_gutenberg_editor_6_1_1() {
    wp_enqueue_script( 'atbs-pagebuilder-gutenberg-init-6-1-1', THEMESIFIC_COMPOSER_URL.'controller/js/pagebuilder-gutenberg-init-6-1-1.js', array('jquery-ui-sortable'), '', true );
}

//pagebuilder_gutenberg_editor
function pagebuilder_gutenberg_editor_6_6() {
    wp_enqueue_script( 'atbs-pagebuilder-gutenberg-init-6-6', THEMESIFIC_COMPOSER_URL.'controller/js/pagebuilder-gutenberg-init-6-6.js', array('jquery-ui-sortable'), '', true );
}
add_action( 'after_setup_theme', 'bk_setup_page_builder' );
function bk_setup_page_builder() {
    global $wp_version;
    if ( function_exists( 'atbs_init_sections' ) ) {
	   add_action( 'admin_enqueue_scripts', 'atbs_init_sections' );
    }
    
    if(is_admin()) {
        if ( version_compare( $wp_version, '5.0', '>=' ) ) {
            if ( !class_exists( 'Classic_Editor' ) ) {
                add_action( 'admin_enqueue_scripts', 'bk_page_builder_temp' );
                if ( version_compare( $wp_version, '5.4', '>=' ) ) {
                    if ( version_compare( $wp_version, '6.6', '>=' ) ) {
                        add_action('admin_enqueue_scripts', 'pagebuilder_gutenberg_editor_6_6');
                    }else if ( version_compare( $wp_version, '6.1.1', '>=' ) ) {
                        add_action('admin_enqueue_scripts', 'pagebuilder_gutenberg_editor_6_1_1');
                    }else if ( version_compare( $wp_version, '5.8', '>=' ) ) {
                        add_action('admin_enqueue_scripts', 'pagebuilder_gutenberg_editor_5_8');
                    }else {
                        add_action('admin_enqueue_scripts', 'pagebuilder_gutenberg_editor_5_4');
                    }
                }else { 
                    add_action('admin_enqueue_scripts', 'pagebuilder_gutenberg_editor');
                } 
            }else {
                add_action( 'edit_form_after_title', 'bk_page_builder_temp' );    
                add_action('admin_enqueue_scripts', 'pagebuilder_classic_editor');
                add_action( 'save_post', 'bk_classic_save_page' );
            }
        }else {
            if(!function_exists('gutenberg_pre_init')) {
                add_action( 'edit_form_after_title', 'bk_page_builder_temp' );    
                add_action('admin_enqueue_scripts', 'pagebuilder_classic_editor');
                add_action( 'save_post', 'bk_classic_save_page' );
            }else {
                add_action( 'enqueue_block_assets', 'bk_page_builder_temp' );
                if ( version_compare( $wp_version, '5.4', '>=' ) ) {
                    if ( version_compare( $wp_version, '6.6', '>=' ) ) {
                        add_action('admin_enqueue_scripts', 'pagebuilder_gutenberg_editor_6_6');
                    }elseif ( version_compare( $wp_version, '6.1.1', '>=' ) ) {
                        add_action('admin_enqueue_scripts', 'pagebuilder_gutenberg_editor_6_1_1');
                    }elseif ( version_compare( $wp_version, '5.8', '>=' ) ) {
                        add_action('admin_enqueue_scripts', 'pagebuilder_gutenberg_editor_5_8');
                    }else {
                        add_action('admin_enqueue_scripts', 'pagebuilder_gutenberg_editor_5_4');
                    }
                }else { 
                    add_action('admin_enqueue_scripts', 'pagebuilder_gutenberg_editor');
                } 
            }
        }
    }
}
	
}