# Unit Testing Workshop

Code for the workshop "An Introduction to Unit Testing (for WordPress)" at WordCamp Europe 2018.


## Requirements

To be able to do the exercises in this workshop, you need to meet some requirements.

### PHP Requirements

In order to run the PHP tests, you need to have installed the following:

* PHP 5.6 or higher (available via command line)
* [Composer](https://getcomposer.org/)

### JavaScript Requirements

In order to run the JavaScript tests, you need to have installed the following:

* [Node](https://nodejs.org/) v6.0.0 or higher (available via command line)
* [Yarn](https://yarnpkg.com/) (optional)


## Installation

Here are the steps to install and set up your environment for the workshop:

1. Clone (or download) this repository to your computer.
2. In your terminal, go to the root directory of this repository.
3. Install the dependencies:
    * For **PHP**, run `composer install`.
    * For **JavaScript**, run `yarn` (or `npm i`).

You can test if everything is working by attempting to run one of the exercises as described in the next section.


## Running the Tests

Each exercise has its own test suite/file.
To run a specific exercise, perform the according command from the root directory of the repository, as explained below.

### Running PHP Tests

For each PHP exercise, there is a dedicated _test suite_, named `exercise1` to `exercise3`.
The generic command to run a specific test suite is as follows:

```console
./vendor/bin/phpunit --testsuite exerciseX
```

Replace the "X" in `exerciseX` with the exercise number.
So, for example, running the test suite for exercise 1 would be this:

```console
./vendor/bin/phpunit --testsuite exercise1
```

### Running JavaScript Tests

For each JavaScript exercise, there are one or more dedicated _test files_, named `exercise1/SOMETHING.test.js` etc.
The generic command to run a specific test suite is as follows:

```console
./node_modules/.bin/jest exerciseX
```

Replace the "X" in `exerciseX` with the exercise number.
So, for example, running the test suite for exercise 1 would be this:

```console
./node_modules/.bin/jest exercise1
```


## Documentation

Throughout the workshop, you might want to refer to the official documentation of the tools you are using.

### PHP-specific Documentation

* [PHPUnit](https://phpunit.de/manual/5.7/en/index.html)
    * [Writing Tests for PHPUnit](https://phpunit.de/manual/5.7/en/writing-tests-for-phpunit.html)
    * [Assertions](https://phpunit.de/manual/5.7/en/appendixes.assertions.html)
* [Brain Monkey](https://brain-wp.github.io/BrainMonkey/)
    * [Patching with `when()`](https://brain-wp.github.io/BrainMonkey/docs/functions-when.html)
    * [Testing with `expect()`](https://brain-wp.github.io/BrainMonkey/docs/functions-expect.html)
    * [Testing Added Hooks](https://brain-wp.github.io/BrainMonkey/docs/wordpress-hooks-added.html)
    * [Testing Fired Hooks](https://brain-wp.github.io/BrainMonkey/docs/wordpress-hooks-done.html)
* [Mockery](http://docs.mockery.io/en/latest/)
    * [Creating Test Doubles](http://docs.mockery.io/en/latest/reference/creating_test_doubles.html)
    * [Expectation Declarations](http://docs.mockery.io/en/latest/reference/expectations.html)
    * [Validating Types and Resources](http://docs.mockery.io/en/latest/reference/argument_validation.html#validating-types-and-resources)

### JavaScript-specific Documentation

* [Jest](https://facebook.github.io/jest/docs/en/getting-started.html)
    * [Using Matchers](https://facebook.github.io/jest/docs/en/using-matchers.html)
    * [Expect](https://facebook.github.io/jest/docs/en/expect.html)
    * [Mock Functions](https://facebook.github.io/jest/docs/en/mock-function-api.html)
* [Enzyme](http://airbnb.io/enzyme/)
    * [Shallow Rendering](http://airbnb.io/enzyme/docs/api/shallow.html)
    * [Selectors](http://airbnb.io/enzyme/docs/api/selector.html)
* [`babel-plugin-rewire`](https://github.com/speedskater/babel-plugin-rewire/blob/master/README.md)
    * [Named and Top-level Function Rewiring](https://github.com/speedskater/babel-plugin-rewire/blob/master/README.md#named-and-top-level-function-rewiring)
    * [Resetting All](https://github.com/speedskater/babel-plugin-rewire/blob/master/README.md#resetting-all)


## Have Fun!

Thorsten, Carl, and Giuseppe
