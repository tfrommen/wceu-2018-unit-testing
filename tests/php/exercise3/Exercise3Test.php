<?php

namespace UnitTestingWorkshop;

use Brain\Monkey;

/**
 * Test the functions found at /php/team-page.php.
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
class Exercise3Test extends TestCase {

	/**
	 * Test that when the plugin is loaded, the function `init_plugin` has been added
	 * to `'init'` hook.
	 *
	 * TODO: If WordPress is not loaded, how come that is possible "has_action" works?
	 */
	public function test_plugin_is_initialized() {

		static::assertTrue( has_action( 'init', 'init_plugin' ) );
	}

	/**
	 * Tests that when `init_plugin` function is executed all the plugins hooks are added.
	 *
	 * TODO: complete the tests checking all the hooks
	 */
	public function test_init_plugin_adds_all_the_hooks() {

		Monkey\Filters\expectAdded( 'theme_page_templates' )
			->once()
			->with( 'UnitTestingWorkshop\init_team_templates' );

		Monkey\Actions\expectAdded( 'init' )
			->once()
			->with( 'UnitTestingWorkshop\create_team_page' );

		init_plugin();
	}

	/**
	 * Tests that `create_team_page` function do nothing and just return true
	 * when `get_page_by_path` return a page.
	 *
	 * TODO: What does `Monkey\Functions\when` do?
	 * TODO: What does `Mockery::mock` do? Why do we use it?
	 */
	public function test_create_team_page_do_nothing_if_page_exists() {

		Monkey\Functions\when( 'get_page_by_path' )->justReturn( \Mockery::mock( 'WP_Post' ) );

		static::assertTrue( create_team_page() );
	}

	/**
	 * Tests that `delete_member_page` function returns the expected value for
	 * a user without team member page.
	 *
	 * TODO: Complete the test by adding a function mock for get_user_team_member_page().
	 */
	public function test_delete_member_page_for_no_user_team_member_page() {

		Monkey\Functions\when( 'get_userdata' )->justReturn( true );

		static::assertSame( 1, delete_member_page( 42 ) );
	}

	/**
	 * Tests that when there's no team page yet, the plugin attempts to create it, but fails if the call to
	 * `wp_insert_post` fail.
	 *
	 * TODO: This test fail. Why? How can we make it pass?
	 */
	public function test_create_team_page_fail_if_wp_insert_post_fails() {

		Monkey\Functions\when( 'get_page_by_path' )->justReturn( null );

		Monkey\Functions\expect( 'wp_insert_post' )
			->once()
			->with( [
				'post_type'   => 'page',
				'post_status' => 'publish',
				'post_name'   => TEAM_PAGE_SLUG,
				'post_title'  => 'Team',
			] )
			->andReturn( 0 );

		Monkey\Actions\expectDone( 'create_team_page_failed' )
			->never();

		static::assertFalse( create_team_page() );
	}

	/**
	 * Tests that when there's no team page yet, the plugin attempts to create it, but fails if the call to
	 * `update_post_meta` fail.
	 *
	 * TODO: This test fail. Why? How can we make it pass?
	 */
	public function test_create_team_page_fail_if_update_post_meta_fails() {

		Monkey\Functions\stubs( [
			'get_page_by_path' => false,
			'wp_insert_post'   => 123,
			'update_option'    => true,
		] );

		Monkey\Functions\expect( 'update_post_meta' )
			->once()
			->with( 123, '_wp_page_template', TEAM_PAGE_TEMPLATE )
			->andReturn( 123 );

		Monkey\Actions\expectDone( 'create_team_page_failed' )->once();

		static::assertFalse( create_team_page() );
	}

	/**
	 * Tests that `create_team_member_pages` function works as expected.
	 *
	 * TODO: This test fail. Why? How can we make it pass?
	 */
	public function test_create_team_member_pages() {

		Monkey\Functions\stubs( [
			'current_user_can'                            => true,
			'UnitTestingWorkshop\get_team_page'           => \Mockery::mock( 'WP_Post' ),
			'UnitTestingWorkshop\create_team_member_page' => true,
		] );

		Monkey\Filters\expectApplied( 'team_members_user_query' )
			->once()
			->andReturn( [] );

		Monkey\Functions\expect( 'get_users' )
			->once()
			->with( [ 'who' => 'authors' ] )
			->andReturn( [ \Mockery::mock( 'WP_User' ), \Mockery::mock( 'WP_User' ) ] );

		Monkey\Functions\expect( 'create_team_member_page' )
			->once()
			->with( \Mockery::type( 'WP_User' ), \Mockery::type( 'WP_Post' ) )
			->andReturn( true );

		/** @var \WP_Screen $screen */
		$screen     = \Mockery::mock( 'WP_Screen' );
		$screen->id = 'dashboard';

		static::assertTrue( create_team_member_pages( $screen ) );
	}

	/**
	 * Tests that `print_team_members_on_team_page` call `print_team_members` if necessary.
	 *
	 * TODO: This test fail. Why? How can we make it pass?
	 */
	public function test_print_team_members_on_team_page() {

		/** @var \WP_Post|\Mockery\MockInterface $post */
		$post               = \Mockery::mock( 'WP_Post' );
		$post->post_content = '';

		Monkey\Functions\stubs( [
			'doing_action'                      => true,
			'UnitTestingWorkshop\is_team_page'  => true,
			'UnitTestingWorkshop\get_team_page' => $post,
			'has_shortcode'                     => true,
		] );

		Monkey\Functions\expect( 'print_team_members' )->once();

		/** @var \WP_Query|\Mockery\MockInterface $query */
		$query = \Mockery::mock( 'WP_Query' );

		print_team_members_on_team_page( $query );
	}

	/**
	 * Tests that `create_team_member_page` creates a team member page as expected (happy path)
	 * if it does not exist yet.
	 *
	 * TODO: Can you complete the test and make it pass?
	 */
	public function test_create_team_member_page_create_page() {

		/** @var \WP_User|\Mockery\MockInterface $user */
		$user = \Mockery::mock( 'WP_User' );

		/** @var \WP_Post|\Mockery\MockInterface $team_page */
		$team_page     = \Mockery::mock( 'WP_Post' );
		$team_page->ID = 123;

		Monkey\Functions\stubs(
			[
				'user_can'                                      => true,
				'UnitTestingWorkshop\get_user_team_member_page' => false,
			]
		);

		Monkey\Functions\expect( 'wp_insert_post' )
			->once()
			->with( [
				'post_type'   => 'page',
				'post_status' => 'publish',
				'post_parent' => $team_page->ID,
			] )
			->andReturn( 456 );

		Monkey\Functions\expect( 'update_post_meta' )
			->once()
			->with( 456, '_wp_page_template', TEAM_MEMBER_PAGE_TEMPLATE );

		static::assertTrue( create_team_member_page( $user, $team_page ) );
	}

	/**
	 * Tests that `init_team_templates` adds the expected page templates.
	 *
	 * TODO: Can you complete the test and make it pass?
	 */
	public function test_init_team_templates() {

		$templates = init_team_templates( [] );

		static::assertSame( 'Team Page', $templates[ TEAM_PAGE_TEMPLATE ] );
		static::assertSame( 'Team Member Page', $templates[ TEAM_MEMBER_PAGE_TEMPLATE ] );
	}
}
