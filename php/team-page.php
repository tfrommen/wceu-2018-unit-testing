<?php

namespace UnitTestingWorkshop;

const TEAM_PAGE_SLUG            = 'team';
const TEAM_PAGE_OPTION          = 'team_page_id';
const TEAM_PAGE_TEMPLATE        = 'team.php';
const TEAM_MEMBER_PAGE_TEMPLATE = 'team-member.php';

/**
 * Requires files containing helpers and template tags then initialize all the plugin hooks.
 *
 * @wp-hook after_setup_theme
 */
function init_plugin() {

	add_filter( 'theme_page_templates', 'UnitTestingWorkshop\init_team_templates' );
	add_action( 'init', 'UnitTestingWorkshop\create_team_page' );
	add_action( 'current_screen', 'UnitTestingWorkshop\create_team_member_pages' );
	add_action( 'user_register', 'UnitTestingWorkshop\create_new_team_member_page' );
	add_action( 'delete_user', 'UnitTestingWorkshop\delete_member_page' );
	add_filter( 'pre_delete_post', 'UnitTestingWorkshop\prevent_team_page_delete', 10, 2 );
	add_action( 'loop_end', 'UnitTestingWorkshop\print_team_members_on_team_page' );
	add_action( 'wp_loaded', 'UnitTestingWorkshop\add_team_shortcode' );
}

add_action( 'after_setup_theme', 'UnitTestingWorkshop\init_plugin' );

/**
 * Add custom page templates to be used for "Team" and "Team Member" member pages.
 *
 * @param array $templates
 *
 * @return array
 *
 * @wp-hook theme_page_templates
 */
function init_team_templates( $templates ) {

	$templates                              = (array) $templates;
	$templates[ TEAM_PAGE_TEMPLATE ]        = __( 'Team Page', 'unit-testing-workshop' );
	$templates[ TEAM_MEMBER_PAGE_TEMPLATE ] = __( 'Team Member Page', 'unit-testing-workshop' );

	return $templates;
}

/**
 * Creates a team page if it doesn't exist yet.
 *
 * @return bool
 *
 * @wp-hook init
 */
function create_team_page() {

	$team_page = get_page_by_path( TEAM_PAGE_SLUG );
	if ( $team_page ) {
		return true;
	}

	$team_page_id = wp_insert_post(
		[
			'post_type'   => 'page',
			'post_status' => 'publish',
			'post_name'   => TEAM_PAGE_SLUG,
			'post_title'  => 'Team',
		]
	);

	if ( ! is_numeric( $team_page_id ) || ! $team_page_id ) {
		do_action( 'create_team_page_failed', 'Failed creating team page.' );

		return false;
	}

	if ( ! update_option( TEAM_PAGE_OPTION, $team_page_id ) ) {
		do_action( 'create_team_page_failed', 'Failed saving option for to team page.' );

		return false;
	}

	if ( ! update_post_meta( $team_page_id, '_wp_page_template', TEAM_PAGE_TEMPLATE ) ) {
		do_action( 'create_team_page_failed', 'Failed assigning page template to team page.' );

		return false;
	}

	return true;
}

/**
 * Creates team member pages for all users who can create posts first time an admin visit the dashboard.
 *
 * @param \WP_Screen $current_screen
 *
 * @return bool
 *
 * @wp-hook current_screen
 */
function create_team_member_pages( \WP_Screen $current_screen ) {

	if (
		'dashboard' !== $current_screen->id
		|| ! current_user_can( 'activate_plugins' )
		|| did_action( 'create_team_page_failed' )
	) {
		return false;
	}

	$team_page = get_team_page();
	if ( ! $team_page ) {
		return false;
	}

	$members_user_query = apply_filters( 'team_members_user_query', [ 'who' => 'authors' ] );
	$users              = get_users( (array) $members_user_query );
	if ( ! $users ) {
		return false;
	}

	/** @var \WP_User $user */
	foreach ( $users as $user ) {
		create_team_member_page( $user, $team_page );
	}

	return true;
}

/**
 * Creates a team member page for a newly created user.
 *
 * @param int $user_id
 *
 * @return bool
 *
 * @wp-hook user_register
 */
function create_new_team_member_page( $user_id ) {

	$user = get_userdata( $user_id );
	if ( ! $user ) {
		return false;
	}

	$team_page = get_team_page();
	if ( ! $team_page ) {
		return false;
	}

	return create_team_member_page( $user, $team_page );
}

/**
 * Delete user's page when the user is deleted.
 *
 * @param int $user_id The user being deleted
 *
 * @return int         A value < 0 means failure.
 *                     A value >= 0 means success (page deleted or nothing to delete).
 *                     A value > 1 means page was actually deleted.
 *
 * @wp-hook delete_user
 */
function delete_member_page( $user_id ) {

	$user = get_userdata( $user_id );
	if ( ! $user ) {
		return 0;
	}

	$user_page = get_user_team_member_page( $user_id );
	if ( ! $user_page ) {
		return 1;
	}

	if ( ! wp_delete_post( $user_page->ID ) ) {
		return - 1;
	}

	return 2;
}

/**
 * Run on pre_delete_post hook and prevents deleting "Team" page if there is any member page.
 *
 * @param null|mixed $prevent
 * @param \WP_Post   $post
 *
 * @return bool
 *
 * @wp-hook pre_delete_post
 */
function prevent_team_page_delete( $prevent, $post ) {

	if (
		$post instanceof \WP_Post
		&& 'page' === $post->post_type
		&& is_team_member_page( $post )
		&& get_team_member_pages()
	) {
		return true;
	}

	return $prevent;
}

/**
 * Print all team members avatars linked to their page at the end of "Team" page loop
 * if the "Team" page does not contain the [team] shortcode.
 *
 * @param \WP_Query $query
 *
 * @wp-hook loop_end
 */
function print_team_members_on_team_page( \WP_Query $query ) {

	if (
		doing_action( 'loop_end' )
		&& $query->is_main_query()
		&& is_team_page()
		&& apply_filters( 'team_members_auto_print', true )
		&& ! has_shortcode( get_team_page()->post_content, 'team' )
	) {
		print_team_members();
	}
}

/**
 * Adds a shortcode that prints team members avatars linked to their page.
 *
 * @wp-hook wp_loaded
 */
function add_team_shortcode() {

	add_shortcode( 'team', 'UnitTestingWorkshop\print_team_members' );
}

/**
 * Creates a team member page for given user with given team page as parent (if does not exist yet).
 *
 * @param \WP_User $user
 * @param \WP_Post $team_page
 *
 * @return bool
 * @see create_team_member_pages()
 */
function create_team_member_page( \WP_User $user, \WP_Post $team_page ) {

	$member_capability = apply_filters( 'team_member_capability', 'publish_posts', $user, $team_page );
	if ( ! user_can( $user, $member_capability ) ) {
		return false;
	}

	$member_page = get_user_team_member_page( $user->get( 'ID' ) );
	if ( $member_page ) {
		return false;
	}

	$user_slug = $user->get( 'user_nicename' );

	$member_page_id = wp_insert_post(
		[
			'post_type'    => 'page',
			'post_status'  => 'publish',
			'post_parent'  => $team_page->ID,
			'post_name'    => $user_slug,
			'post_title'   => $user->get( 'display_name' ) ?: $user_slug,
			'post_content' => $user->get( 'description' ),
			'post_author'  => $user->get( 'ID' ),
		]
	);

	if ( ! is_numeric( $member_page_id ) || ! $member_page_id ) {
		return false;
	}

	return (bool) update_post_meta( $member_page_id, '_wp_page_template', TEAM_MEMBER_PAGE_TEMPLATE );
}
