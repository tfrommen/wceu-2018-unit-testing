<?php

namespace UnitTestingWorkshop;

use Brain\Monkey;

abstract class TestCase extends \PHPUnit\Framework\TestCase {

	protected function setUp() {

		parent::setUp();
		Monkey\setUp();

		// Require the files to be tested
		require_once dirname( dirname( __DIR__ ) ) . '/unit-testing-workshop.php';
	}

	protected function tearDown() {

		Monkey\tearDown();
		parent::tearDown();
	}
}
