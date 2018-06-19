<?php

namespace UnitTestingWorkshop;

/**
 * Fix the failing tests of the broken (!) functions found at /php/workshop-functions.php.
 *
 * The exercise is completed when all the tests pass. :)
 *
 * Potentially helpful documentation:
 * - https://phpunit.de/manual/5.7/en/writing-tests-for-phpunit.html#writing-tests-for-phpunit.error-output
 */
class Exercise1Test extends TestCase {

	/**
	 * Test that the `filter_add_error_code` function adds the "workshop" error code.
	 */
	public function test_filter_add_error_codes() {

		$error_codes = filter_add_error_code( [] );

		static::assertTrue( in_array( 'workshop', $error_codes ), 'Added "workshop" error code.' );
	}

	/**
	 * Test that the `filter_cron_schedules` function adds the "every_minute" schedule with all the correct values.
	 */
	public function test_filter_cron_schedules_added_every_minute_schedule() {

		$schedules = filter_cron_schedules( [] );

		static::assertArrayHasKey( 'every_minute', $schedules, 'Added "every_minute" cron schedule.' );
		static::assertArrayHasKey( 'display', $schedules['every_minute'],
			'Added "display" to "every_minute" cron schedule.' );
		static::assertSame( 'Every minute', $schedules['every_minute']['display'],
			'"every_minute" cron schedule displays as "Every minute".' );
		static::assertArrayHasKey( 'interval', $schedules['every_minute'],
			'Added "interval" to "every_minute" cron schedule.' );
		static::assertSame( 60, $schedules['every_minute']['interval'],
			'Added 60 second interval to "every_minute" cron schedule.' );
	}

	/**
	 * Test that the `filter_disable_plugin_updates` function removes the "install_plugins" capability.
	 */
	public function test_disable_plugin_updates_removes_install_plugins_cap() {

		$caps = [
			'install_plugins' => true,
		];

		$caps = filter_disable_plugin_updates( $caps );

		static::assertEmpty( $caps, 'The "caps" array should not contain the "install_plugins" key.' );
	}

	/**
	 * Test that the `filter_remove_endpoints` function removed all but the "workshop" endpoints.
	 */
	public function test_remove_endpoints() {

		$endpoints = [
			'/wp/v1'       => [],
			'/workshop/v1' => [],
		];

		$expected_endpoints = [
			'/workshop/v1' => [],
		];

		$endpoints = filter_remove_endpoints( $endpoints );

		static::assertSame( $expected_endpoints, $endpoints, 'Removed all but the "workshop" endpoints.' );
	}

	/**
	 * Test that the `filter_user_contact_methods` function added and removed specific contact methods.
	 */
	public function test_filter_user_contact_methods() {

		$contact_methods = [
			'aim' => 'wceu',
		];

		$contact_methods = filter_user_contact_methods( $contact_methods );

		static::assertArrayNotHasKey( 'aim', $contact_methods, 'Removed "aim" has a contact method.' );
		static::assertArrayHasKey( 'phone', $contact_methods, 'Added "phone" has a contact method.' );
		static::assertSame( 'Phone number', $contact_methods['phone'], 'Added the right "phone" contact method header.' );
		static::assertArrayHasKey( 'skype', $contact_methods, 'Added "skype" has a contact method.' );
		static::assertSame( 'Skype username', $contact_methods['skype'], 'Added the right "skype" contact method header.' );
	}

	/**
	 * Test that the `count_words` function works with an empty string.
	 */
	public function test_count_words_with_empty_string() {

		static::assertSame( 0, count_words( '' ) );
	}
}
