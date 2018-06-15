<?php
$plugin_dir = dirname( dirname( __DIR__ ) );

if ( ! file_exists( $plugin_dir . '/vendor/autoload.php' ) ) {
	echo 'Please install via Composer before running tests.';
	exit( 1 );
}

// Patchwork and Composer autoload
require_once $plugin_dir . '/vendor/brain/monkey/inc/patchwork-loader.php';
require_once $plugin_dir . '/vendor/autoload.php';

// The base test case class
require_once $plugin_dir . '/tests/php/TestCase.php';

unset( $plugin_dir );
