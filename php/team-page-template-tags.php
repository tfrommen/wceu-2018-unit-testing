<?php

namespace UnitTestingWorkshop;

/**
 * Template tag to get "Team" page object.
 *
 * @return \WP_Post|null
 */
function get_team_page() {

	$option = get_option( TEAM_PAGE_OPTION, 0 );
	if ( ! $option ) {
		return null;
	}

	$post = get_post( $option );
	if ( ! $post ) {
		return null;
	}

	return $post;
}

/**
 * Template tag to get all "Team member" page objects.
 *
 * @return array
 */
function get_team_member_pages() {

	$team_page = get_team_page();
	if ( ! $team_page ) {
		return [];
	}

	return get_posts(
		[
			'post_type'      => 'page',
			'posts_per_page' => - 1,
			'post_parent'    => $team_page->ID,
		]
	);
}

/**
 * Template tag to get "Team member" page object got given user.
 *
 * @param int $user_id
 *
 * @return \WP_Post|null
 */
function get_user_team_member_page( $user_id ) {

	$user = get_userdata( $user_id );
	if ( ! $user || ! $user->exists() ) {
		return null;
	}

	$member_page = get_page_by_path( TEAM_PAGE_SLUG . '/' . $user->get( 'user_nicename' ) );
	if ( ! $member_page ) {
		return null;
	}

	return $member_page;
}

/**
 * Template tag to check if current (or given) page is a "Team" page.
 *
 * @param \WP_Post|null $post
 *
 * @return bool
 */
function is_team_page( \WP_Post $post = null ) {

	$post = get_post( $post );
	if ( ! $post ) {
		return false;
	}

	$team_page = get_team_page();
	if ( ! $team_page ) {
		return false;
	}

	return (int) $post->ID === (int) $team_page->ID;
}

/**
 * Template tag to check if current (or given) page is a "Team Member" page.
 *
 * @param \WP_Post|null $post
 *
 * @return bool
 */
function is_team_member_page( \WP_Post $post = null ) {

	$post = get_post( $post );
	if ( ! $post ) {
		return false;
	}

	$team_page = get_team_page();
	if ( ! $team_page ) {
		return false;
	}

	return (int) $post->post_parent === (int) $team_page->ID;
}
