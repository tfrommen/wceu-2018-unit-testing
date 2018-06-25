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
	 * @var int
	 */
	private $running_post_id = 1;

	/**
	 * Test that get_team_page() returns `null` when `TEAM_PAGE_OPTION` is not set.
	 */
	public function test_get_team_page_return_null_if_option_is_not_set() {

		Monkey\Functions\expect( 'get_option' )
			->with( TEAM_PAGE_OPTION, 0 )
			->andReturn( false );

		static::assertNull( get_team_page() );
	}

	/**
	 * Test that get_team_page() returns `null` when post for team page ID stored in option is not found.
	 */
	public function test_get_team_page_return_null_if_post_not_found() {

		Monkey\Functions\expect( 'get_option' )
			->with( TEAM_PAGE_OPTION, 0 )
			->andReturn( 1 );

		Monkey\Functions\expect( 'get_post' )
			->with( 1 )
			->andReturn( false );

		static::assertNull( get_team_page() );
	}

	/**
	 * Test that get_team_page() returns team page post correctly when option is stored and valid.
	 */
	public function test_get_team_page_return_post() {

		$post = $this->mock_post();

		Monkey\Functions\expect( 'get_option' )
			->with( TEAM_PAGE_OPTION, 0 )
			->andReturn( 1 );

		Monkey\Functions\expect( 'get_post' )
			->with( 1 )
			->andReturn( $post );

		static::assertSame( $post, get_team_page() );
	}

	/**
	 * Test that get_team_member_pages() returns empty array if there's no team page.
	 */
	public function test_get_team_member_pages_return_empty_if_no_team_page() {

		Monkey\Functions\when( 'UnitTestingWorkshop\get_team_page' )
			->justReturn();

		static::assertSame( [], get_team_member_pages() );
	}

	/**
	 * Test that get_team_member_pages() returns pages who are children of team page post.
	 */
	public function test_get_team_member_pages_team_page_children_pages() {

		$post = $this->mock_post();

		Monkey\Functions\when( 'UnitTestingWorkshop\get_team_page' )
			->justReturn( $post );

		$posts = $this->mock_posts( 5 );

		Monkey\Functions\expect( 'get_posts' )
			->withArgs( function ( $args ) use ( $post ) {

				static::assertSame( $post->ID, $args['post_parent'] );
				static::assertSame( 'page', $args['post_type'] );

				return true;
			} )
			->andReturn( $posts );

		static::assertSame( $posts, get_team_member_pages() );
	}

	/**
	 * Test that get_user_team_member_page() returns null if no user is found for the provided user id.
	 */
	public function test_get_user_team_member_page_return_null_if_no_user_found() {

		Monkey\Functions\expect( 'get_userdata' )
			->with( 123 )
			->andReturn( false );

		static::assertNull( get_user_team_member_page( 123 ) );
	}

	/**
	 * Test that get_user_team_member_page() returns null if no page is found using provided user slug.
	 */
	public function test_get_user_team_member_page_return_null_if_no_page_found_for_user() {

		$user = \Mockery::mock( \WP_User::class );
		$user
			->shouldReceive( 'exists' )
			->andReturn( true );
		$user
			->shouldReceive( 'get' )
			->with( 'user_nicename' )
			->andReturn( 'john-doe' );

		Monkey\Functions\expect( 'get_userdata' )
			->with( 123 )
			->andReturn( $user );

		Monkey\Functions\expect( 'get_page_by_path' )
			->with( TEAM_PAGE_SLUG . '/john-doe' )
			->andReturn( false );

		static::assertNull( get_user_team_member_page( 123 ) );
	}

	/**
	 * Test that get_user_team_member_page() returns a page using the given user nice name.
	 */
	public function test_get_user_team_member_page_return_page_for_user() {

		$post = $this->mock_post();

		$user = \Mockery::mock( \WP_User::class );
		$user
			->shouldReceive( 'exists' )
			->andReturn( true );
		$user
			->shouldReceive( 'get' )
			->with( 'user_nicename' )
			->andReturn( 'john-doe' );

		Monkey\Functions\expect( 'get_userdata' )
			->with( 123 )
			->andReturn( $user );

		Monkey\Functions\expect( 'get_page_by_path' )
			->with( TEAM_PAGE_SLUG . '/john-doe' )
			->andReturn( $post );

		static::assertSame( $post, get_user_team_member_page( 123 ) );
	}

	/**
	 * Test that is_team_page() returns false if no post is provided but no current post is there.
	 */
	public function test_is_team_page_is_false_if_no_post_given_and_no_current_post() {

		Monkey\Functions\expect( 'get_post' )
			->with( null )
			->andReturn( false );

		static::assertFalse( is_team_page() );
	}

	/**
	 * Test that is_team_page() returns false if no team page post is found.
	 */
	public function test_is_team_page_is_false_if_there_is_no_team_page() {

		$post = $this->mock_post();

		Monkey\Functions\expect( 'get_post' )
			->with( $post )
			->andReturn( false );

		static::assertFalse( is_team_page() );
	}

	/**
	 * Test that is_team_page() returns true if no post is provided and current post is team page post.
	 */
	public function test_is_team_page_is_true_if_current_post_is_team_page() {

		$post = $this->mock_post();

		Monkey\Functions\expect( 'get_post' )
			->with( null )
			->andReturn( $post );

		Monkey\Functions\expect( 'UnitTestingWorkshop\get_team_page' )
			->withNoArgs()
			->andReturn( clone $post );

		static::assertTrue( is_team_page() );
	}

	/**
	 * Test that is_team_page() returns true if given post is is team page post.
	 */
	public function test_is_team_page_is_true_if_given_post_is_team_page() {

		$post = $this->mock_post();

		Monkey\Functions\expect( 'get_post' )
			->with( $post )
			->andReturn( $post );

		Monkey\Functions\expect( 'UnitTestingWorkshop\get_team_page' )
			->withNoArgs()
			->andReturn( clone $post );

		static::assertTrue( is_team_page( $post ) );
	}

	/**
	 * Test that is_team_member_page() returns false if no post is provided but no current post is there.
	 */
	public function test_is_team_member_page_is_false_if_no_post_given_and_no_current_post() {

		Monkey\Functions\expect( 'get_post' )
			->with( null )
			->andReturn( false );

		static::assertFalse( is_team_member_page() );
	}

	/**
	 * Test that is_team_member_page() returns false if no team page post is found.
	 */
	public function test_is_team_member_page_is_false_if_there_is_no_team_page() {

		Monkey\Functions\expect( 'get_post' )
			->with( null )
			->andReturn( $this->mock_post() );

		Monkey\Functions\when( 'UnitTestingWorkshop\get_team_page' )
			->justReturn();

		static::assertFalse( is_team_member_page() );
	}

	/**
	 * Test that is_team_member_page() returns true if no post is provided and current post is team page post.
	 */
	public function test_is_team_member_page_is_true_if_current_post_is_team_member_page() {

		$team_page = $this->mock_post();

		$post              = $this->mock_post();
		$post->post_parent = $team_page->ID;

		Monkey\Functions\expect( 'get_post' )
			->with( null )
			->andReturn( $post );

		Monkey\Functions\when( 'UnitTestingWorkshop\get_team_page' )
			->justReturn( $team_page );

		static::assertTrue( is_team_member_page() );
	}

	/**
	 * Test that is_team_member_page() returns true if given post is is team page post.
	 */
	public function test_is_team_member_page_is_true_if_given_post_is_team_member_page() {

		$team_page = $this->mock_post();

		$post              = $this->mock_post();
		$post->post_parent = $team_page->ID;

		Monkey\Functions\expect( 'get_post' )
			->with( $post )
			->andReturn( $post );

		Monkey\Functions\when( 'UnitTestingWorkshop\get_team_page' )
			->justReturn( $team_page );

		static::assertTrue( is_team_member_page( $post ) );
	}

	/**
	 * Helper method to a mocked post object.
	 *
	 * @return \WP_Post|\Mockery\MockInterface
	 */
	private function mock_post() {

		/** @var \WP_Post $post */
		$post = \Mockery::mock( \WP_Post::class );

		$post->ID = $this->running_post_id++;

		return $post;
	}

	/**
	 * Helper method to get an array of given size of mocked post objects.
	 *
	 * @param int $number_of_posts
	 *
	 * @return \WP_Post[]|\Mockery\MockInterface[]
	 */
	private function mock_posts( $number_of_posts = 1 ) {

		return array_map( [ $this, 'mock_post' ], range( 1, $number_of_posts ) );
	}
}
