<?php

namespace UnitTestingWorkshop;

use Brain\Monkey;

/**
 * Test the functions found at /php/team-page-template-tags.php.
 *
 * The exercise is completed when all the tests pass. :)
 *
 * NOTE: when tests run, WordPress is NOT loaded, but the file with functions has been required.
 *
 * Potentially helpful documentation:
 * - https://phpunit.de/manual/5.7/en/appendixes.index.html
 * - https://brain-wp.github.io/BrainMonkey/
 * - http://docs.mockery.io/en/latest/
 */
class Exercise4Test extends TestCase {

	/**
	 * Test that get_team_page() returns `null` when `TEAM_PAGE_OPTION` is not set.
	 */
	public function test_get_team_page_return_null_if_option_is_not_set() {

	}

	/**
	 * Test that get_team_page() returns `null` when post for team page ID stored in option is not found.
	 */
	public function test_get_team_page_return_null_if_post_not_found() {

	}

	/**
	 * Test that get_team_page() returns team page post correctly when option is stored and valid.
	 */
	public function test_get_team_page_return_post() {

	}

	/**
	 * Test that get_team_member_pages() returns empty array if there's no team page.
	 */
	public function test_get_team_member_pages_return_empty_if_no_team_page() {

	}

	/**
	 * Test that get_team_member_pages() returns pages who are children of team page post.
	 */
	public function test_get_team_member_pages_team_page_children_pages() {

	}

	/**
	 * Test that get_user_team_member_page() returns null if no user is found for the provided user id.
	 */
	public function test_get_user_team_member_page_return_null_if_no_user_found() {

	}

	/**
	 * Test that get_user_team_member_page() returns null if no page is found using provided user slug.
	 */
	public function test_get_user_team_member_page_return_null_if_no_page_found_for_user() {

	}

	/**
	 * Test that get_user_team_member_page() returns a page using the given user nice name.
	 */
	public function test_get_user_team_member_page_return_page_for_user() {

	}

	/**
	 * Test that is_team_page() returns false if no post is provided but no current post is there.
	 */
	public function test_is_team_page_is_false_if_no_post_given_and_no_current_post() {

	}

	/**
	 * Test that is_team_page() returns false if no team page post is found.
	 */
	public function test_is_team_page_is_false_if_there_is_no_team_page() {

	}

	/**
	 * Test that is_team_page() returns true if no post is provided and current post is team page post.
	 */
	public function test_is_team_page_is_true_if_current_post_is_team_page() {

	}

	/**
	 * Test that is_team_page() returns true if given post is is team page post.
	 */
	public function test_is_team_page_is_true_if_given_post_is_team_page() {

	}

	/**
	 * Test that is_team_member_page() returns false if no post is provided but no current post is there.
	 */
	public function test_is_team_member_page_is_false_if_no_post_given_and_no_current_post() {

	}

	/**
	 * Test that is_team_member_page() returns false if no team page post is found.
	 */
	public function test_is_team_member_page_is_false_if_there_is_no_team_page() {

	}

	/**
	 * Test that is_team_member_page() returns true if no post is provided and current post is team page post.
	 */
	public function test_is_team_member_page_is_true_if_current_post_is_team_member_page() {

	}

	/**
	 * Test that is_team_member_page() returns true if given post is is team page post.
	 */
	public function test_is_team_member_page_is_true_if_given_post_is_team_member_page() {

	}
}
