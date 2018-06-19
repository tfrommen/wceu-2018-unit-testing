<?php

namespace UnitTestingWorkshop;

/**
 * Add missing assertions to the tests of the functions found at /php/workshop-functions.php.
 *
 * The exercise is completed when you've added the missing assertions in each test. :)
 *
 * Potentially helpful documentation:
 * - https://phpunit.de/manual/5.7/en/appendixes.assertions.html
 */
class Exercise2Test extends TestCase {

	/**
	 * Test that the `filter_cron_schedules` function adds the "every_day" schedule with all the correct values.
	 *
	 * TODO: Add the 2 missing assertions for this test
	 */
	public function test_filter_cron_schedules_added_every_day_schedule() {

		$schedules = filter_cron_schedules( [] );

		static::assertArrayHasKey(
			'every_day',
			$schedules,
			'Added "every_day" cron schedule.'
		);

		static::assertArrayHasKey(
			'display',
			$schedules['every_day'],
			'Added "display" to "every_day" cron schedule.'
		);

		static::assertSame(
			'Every day',
			$schedules['every_day']['display'],
			'"every_day" cron schedule displays as "Every day".'
		);

		// Add missing assertions here
		static::assertArrayHasKey(
			'interval',
			$schedules['every_day'],
			'Added "interval" to "every_day" cron schedule.'
		);

		static::assertSame(
			86400,
			$schedules['every_day']['interval'],
			'"every_day" cron schedule is set to the correct interval.'
		);
	}

	/**
	 * Test that the `filter_disable_plugin_updates` function removes the "update_plugins" capability.
	 *
	 * TODO: Add the 1 missing assertions for this test
	 */
	public function test_disable_plugin_updates_removes_update_plugins_cap() {

		$caps = [
			'update_plugins' => true,
		];

		$caps = filter_disable_plugin_updates( $caps );

		// Add missing assertion here
		static::assertArrayNotHasKey( 'update_plugins', $caps,
			'The "caps" array should not contain the "update_plugins" key.' );
	}

	/**
	 * Test that the `count_words` function works with a string with one word in it.
	 *
	 * TODO: Add the 1 missing assertions for this test
	 */
	public function test_count_words_with_one_word() {

		// Add missing assertion here
		static::assertSame( 1, count_words( 'Test!' ), 'A one-word sentence is processed correctly.' );
	}

	/**
	 * Test that the `count_words` function works with a string that has more than one word.
	 *
	 * TODO: Add the 1 missing assertions for this test
	 */
	public function test_count_words_with_more_than_one_word() {

		// Add missing assertion here
		static::assertSame( 4, count_words( 'This is a test!' ), 'A multi-word sentence is processed correctly.' );
	}
}
