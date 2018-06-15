<?php

namespace UnitTestingWorkshop;

/**
 * Print all team members avatars linked to their page.
 *
 * @param array $args
 */
function print_team_members( array $args = [] ) {

	$member_pages = get_team_member_pages();
	if ( ! $member_pages ) {
		return;
	}

	$args = wp_parse_args(
		$args,
		[
			'container_classes' => [],
			'container_tag'     => 'section',
			'item_tag'          => 'div',
			'name_tag'          => 'p',
			'classes'           => [],
		]
	);

	if ( ! in_array( $args['container_tag'], [ 'section', 'div', 'ul', 'ol' ], true ) ) {
		$args['container_tag'] = 'section';
	}
	if ( ! in_array( $args['item_tag'], [ 'div', 'li' ], true ) ) {
		$args['item_tag'] = 'div';
	}
	if ( ! in_array( $args['name_tag'], [ 'p', 'span' ], true ) ) {
		$args['name_tag'] = 'p';
	}

	$container_classes   = apply_filters( 'team_members_container_classes', $args['container_classes'] );
	$container_classes[] = 'team';
	$container_classes   = array_map( 'sanitize_html_class', array_unique( $container_classes ) );

	global $post;
	do_action( 'before_team_members', $member_pages );
	printf( '<%s class="%s">', $args['container_tag'], implode( ' ', $container_classes ) );
	foreach ( $member_pages as $post ) : ?>
		<?php
		$user = get_user_by( 'slug', $post->post_name );
		if ( ! $user ) {
			continue;
		}

		setup_postdata( $post );

		$post_classes = apply_filters( 'team_member_classes', $args['classes'], $post, $user );
		$post_classes = array_merge( (array) $post_classes, [ 'h-card', 'vcard', 'team-member' ] );
		$post_classes = array_unique( $post_classes );

		do_action( 'before_team_member', $post, $user );
		printf( '<%s class="%s" id="team-member-%d">', $args['item_tag'], get_post_class( $post_classes ), $post->ID );
		do_action( 'before_team_member_link', $post, $user );
		?>
		<a class="url" href="<?php the_permalink() ?>">
			<?php
			do_action( 'before_team_member_avatar', $post, $user );
			echo get_avatar(
				$user,
				apply_filters( 'team_member_avatar_size', get_option( 'medium_size_w', 300 ) ),
				'',
				$user->get( 'display_name' ),
				[
					'force_display' => true,
					'class'         => [ 'u-photo', 'photo' ],
				]
			);
			do_action( 'after_team_member_avatar', $post, $user );
			printf( '<%s class="p-name fn">', $args['name_tag'] );
			$name = $user->get( 'display_name' );
			echo esc_html( apply_filters( 'before_team_member_name', $name, $post, $user ) );
			printf( '</%s>', $args['name_tag'] );
			?>
		</a>
		<?php
		do_action( 'after_team_member_link', $post, $user );
		printf( '</%s>', $args['item_tag'] );
		do_action( 'after_team_member', $post, $user );
		?>
	<?php
	endforeach;
	printf( '</%s>', $args['container_tag'] );
	?>
	<?php
	wp_reset_postdata();
	do_action( 'after_team_members', $member_pages );
}
