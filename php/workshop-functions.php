<?php

namespace UnitTestingWorkshop;

/**
 * Filter that removes the capability to install or update plugins.
 *
 * @param array $allcaps
 *
 * @return array
 */
function filter_disable_plugin_updates( array $allcaps ) {

	unset( $allcaps['install_plugins'] );
	unset( $allcaps['update_plugins'] );

	return $allcaps;
}

add_filter( 'user_has_cap', 'filter_disable_plugin_updates' );

/**
 * Filter user profile contact methods to remove unwanted services and add new ones.
 *
 * @param array $contact_methods
 *
 * @return array
 */
function filter_user_contact_methods( array $contact_methods ) {

	// Remove unwanted contact methods
	unset( $contact_methods['aim'] );

	// Add new contact methods
	$contact_methods['phone'] = 'Phone number';
	$contact_methods['skype'] = 'Skype username';

	return $contact_methods;
}

add_filter( 'user_contactmethods', 'filter_user_contact_methods' );

/**
 * Insert custom cron schedules
 *
 * @param array $schedules
 *
 * @return array
 */
function filter_cron_schedules( array $schedules ) {

	return array_merge( $schedules, [
		'every_minute' => [
			'interval' => 60,
			'display'  => 'Every minute',
		],
		'every_day'    => [
			'interval' => 86400,
			'display'  => 'Every day',
		],
	] );
}

add_filter( 'cron_schedules', 'filter_cron_schedules' );

/**
 * Remove unused WordPress REST API endpoints for security purposes.
 *
 * @param array $endpoints
 *
 * @return array
 */
function filter_remove_endpoints( array $endpoints ) {

	return array_filter( $endpoints, function ( $route ) {

		return 1 === preg_match( "%/workshop/%", $route );
	}, ARRAY_FILTER_USE_KEY );
}

add_filter( 'rest_endpoints', 'filter_remove_endpoints' );

/**
 * Add our error code to the handled login error codes.
 *
 * @param array $error_codes
 *
 * @return array
 */
function filter_add_error_code( array $error_codes ) {

	$error_codes[] = 'workshop';

	return $error_codes;
}

add_filter( 'shake_error_codes', 'filter_add_error_codes' );

/**
 * Count the number of words in the given text.
 *
 * @param string $text
 *
 * @return int
 */
function count_words( $text ) {

	if ( trim( $text ) === '' ) {
		return 0;
	}

	return count( explode( ' ', $text ) );
}
