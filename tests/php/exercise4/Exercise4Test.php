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

		$a_post = $this->mockPosts( 1 )[0];

		Monkey\Functions\expect( 'get_option' )
			->with( TEAM_PAGE_OPTION, 0 )
			->andReturn( 1 );

		Monkey\Functions\expect( 'get_post' )
			->with( 1 )
			->andReturn( $a_post );

		static::assertSame( $a_post, get_team_page() );
	}

	/**
	 * Test that get_team_member_pages() returns empty array if there's no team page.
	 */
	public function test_get_team_member_pages_return_empty_if_no_team_page() {

		Monkey\Functions\when( 'UnitTestingWorkshop\get_team_page' )->justReturn();

		static::assertSame( [], get_team_member_pages() );
	}

	/**
	 * Test that get_team_member_pages() returns pages who are children of team page post.
	 */
	public function test_get_team_member_pages_team_page_children_pages() {

		$a_post     = $this->mockPosts( 1 )[0];
		$a_post->ID = 123;
		Monkey\Functions\when( 'UnitTestingWorkshop\get_team_page' )->justReturn( $a_post );

		$fivePosts = $this->mockPosts( 5 );

		Monkey\Functions\expect( 'get_posts' )
			->withArgs( function ( $args ) {
				static::assertSame( 123, $args['post_parent'] );
				static::assertSame( 'page', $args['post_type'] );

				return true;
			} )
			->andReturn( $fivePosts );

		static::assertSame( $fivePosts, get_team_member_pages() );
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
		$user->shouldReceive( 'exists' )->andReturn( true );
		$user->shouldReceive( 'get' )->with( 'user_nicename' )->andReturn( 'john-doe' );

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

		$a_post = $this->mockPosts( 1 )[0];

		$user = \Mockery::mock( \WP_User::class );
		$user->shouldReceive( 'exists' )->andReturn( true );
		$user->shouldReceive( 'get' )->with( 'user_nicename' )->andReturn( 'john-doe' );

		Monkey\Functions\expect( 'get_userdata' )
			->with( 123 )
			->andReturn( $user );

		Monkey\Functions\expect( 'get_page_by_path' )
			->with( TEAM_PAGE_SLUG . '/john-doe' )
			->andReturn( $a_post );

		static::assertSame( $a_post, get_user_team_member_page( 123 ) );
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

		$a_post = $this->mockPosts( 1 )[0];

		Monkey\Functions\expect( 'get_post' )
			->with( $a_post )
			->andReturn( false );

		static::assertFalse( is_team_page() );
	}

	/**
	 * Test that is_team_page() returns true if no post is provided and current post is team page post.
	 */
	public function test_is_team_page_is_true_if_current_post_is_team_page() {

		$a_post = $this->mockPosts( 1 )[0];

		Monkey\Functions\expect( 'get_post' )
			->with( null )
			->andReturn( $a_post );

		Monkey\Functions\expect( 'UnitTestingWorkshop\get_team_page' )
			->withNoArgs()
			->andReturn( clone $a_post );

		static::assertTrue( is_team_page() );
	}

	/**
	 * Test that is_team_page() returns true if given post is is team page post.
	 */
	public function test_is_team_page_is_true_if_given_post_is_team_page() {

		$a_post = $this->mockPosts( 1 )[0];

		Monkey\Functions\expect( 'get_post' )
			->with( $a_post )
			->andReturn( $a_post );

		Monkey\Functions\expect( 'UnitTestingWorkshop\get_team_page' )
			->withNoArgs()
			->andReturn( clone $a_post );

		static::assertTrue( is_team_page( $a_post ) );
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
			->andReturn( $this->mockPosts( 1 )[0] );

		Monkey\Functions\when( 'UnitTestingWorkshop\get_team_page' )->justReturn();

		static::assertFalse( is_team_member_page() );
	}

	/**
	 * Test that is_team_member_page() returns true if no post is provided and current post is team page post.
	 */
	public function test_is_team_member_page_is_true_if_current_post_is_team_member_page() {

		$team_page     = $this->mockPosts( 1 )[0];
		$team_page->ID = 123;

		$current_post              = $this->mockPosts( 1 )[0];
		$current_post->ID          = 456;
		$current_post->post_parent = 123;

		Monkey\Functions\expect( 'get_post' )
			->with( null )
			->andReturn( $current_post );

		Monkey\Functions\when( 'UnitTestingWorkshop\get_team_page' )->justReturn( $team_page );

		static::assertTrue( is_team_member_page() );
	}

	/**
	 * Test that is_team_member_page() returns true if given post is is team page post.
	 */
	public function test_is_team_member_page_is_true_if_given_post_is_team_member_page() {

		$team_page     = $this->mockPosts( 1 )[0];
		$team_page->ID = 123;

		$a_post              = $this->mockPosts( 1 )[0];
		$a_post->ID          = 456;
		$a_post->post_parent = 123;

		Monkey\Functions\expect( 'get_post' )
			->with( $a_post )
			->andReturn( $a_post );

		Monkey\Functions\when( 'UnitTestingWorkshop\get_team_page' )->justReturn( $team_page );

		static::assertTrue( is_team_member_page( $a_post ) );
	}

	/**
	 * Helper method to get an array of given size of mocked post objects.
	 *
	 * @param int $how_many
	 *
	 * @return \WP_Post[]|\Mockery\MockInterface[]
	 */
	private function mockPosts( $how_many = 1 ) {
		return array_map(
			function ( $i ) {
				/** @var \WP_Post $post */
				$post     = \Mockery::mock( \WP_Post::class );
				$post->ID = $i;

				return $post;
			},
			range( 1, $how_many )
		);
	}
}
