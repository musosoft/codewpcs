<?php
// This is good - use of PHPDoc Blocks...

/**
 * Coding standard tests.
 *
 * @copyright 2014 The Open University.
 * @author Nick Freear, 24 January 2014.
 * @link https://gist.github.com/nfreear/8596069
 */


/*
 * 1. Run PHP_CodeSniffer - get list of installed standards:
 *
 *     C:\project> phpcs -i
 * The installed coding standards are ..
 * .. MySource, PEAR, PHPCS, PSR1, PSR2, Squiz and Zend
 *
 * 2. Run CodeSniffer with the PEAR standard:
 *
 *     C:\project> phpcs --standard=PEAR --extensions=php,inc .
 *
 * 3. Run PHP-Lint (with E_STRICT etc.):
 *
 *     C:\project> php -d error_reporting=-1 -l -d short_open_tag=0 CodeStandardTest.php
 *
Parse error: syntax error, unexpected end of file in .\CodeStandardTest.php on line 64
Errors parsing .\CodeStandardTest.php
 *
 * 4. Recursive PHP-lint (using Cygwin):
 *
 *     ndf@ /cygdrive/c/project$ find . -name "*.php" -exec /cygdrive/c/php/php.exe -l {} \; | grep -v "No syntax"
 *
 *
 * Standards:
 *
 * @link http://framework.zend.com/manual/1.12/en/coding-standard.coding-style.html Zend
 * @link http://pear.php.net/manual/en/standards.php PEAR
 * @link http://apptree.net/sourcestd.htm MySource
 * @link http://symfony.com/doc/current/contributing/code/standards.html Symfony2
 * @link http://www.php-fig.org/psr/psr-2/ PSR-2
 * @link http://codex.wordpress.org/WordPress_Coding_Standards Wordpress
 * @link http://phpdoc.org/docs/latest/for-users/phpdoc-reference.html PHPDoc Blocks
 *
 * Tools:
 *
 * @link http://jason.pureconcepts.net/2012/11/php-coding-standards/
 * @link https://github.com/fabpot/PHP-CS-Fixer
 * @link http://pear.php.net/PHP_CodeSniffer
 * @link https://github.com/squizlabs/PHP_CodeSniffer
 * @link https://github.com/opensky/Symfony2-coding-standard Symfony2
 */

define('CS_LENGTH', 10);


/**
 * Sample class with good and bad stuff.
 */
class CodeStandardTest {

  // This is good - capitals for class constants.
  const VERSION = '1.0';

  // This is BAD - 'var' keyword is not self-documenting.
  var $var_var = 1;

  // This is good - self-documenting (use 'public', private and protected).
  protected $protect_var = 0;


  // This is BAD - no public, private or protected keyword.
  function MyMethod() {

    ?>

    <?
    // This is BAD - don't use short opening PHP tag, use "<?php ..." (Error: "syntax error, unexpected end of file")
  }

  /**
   * This function returns filtered paths.
   *
   * @param array An array of Wordpress paths.
   * @return array|null A filtered array of Wordpress paths.
   */
  // This is good - self-documenting - public, private, protected keyword, and cammel-case.
  // Note use of type-hinting - "(array $input...)"
  public function myMethod2(array $input_array) {
    $output = array();

    for ($idx = 0; $idx < CS_LENGTH; $idx++) {
    }

    return $output;
  }

  /**
   * Output some embedded Javascript.
   * @return void Side-effects.
   */
  protected function inlineJavascript($flag = TRUE) {

    // This is good - for long control structures, use alternative syntax (Eg. endif; endfor; )
    // {@link http://php.net/manual/en/control-structures.alternative-syntax.php Alternative syntax}
    if ($flag):

    // There should be minimal inline Javascript.
    ?>
<script>
// Optionally, declare a global variable.
var juxtalearn = juxtalearn || {};

// Use anonymous functions with inline-calls to prevent global namespace pollution.
(function () {

  'use strict';

  // Private JS function.
  function myFunc() {
  }

  // Public JS function.
  juxtalearn._Callback( = function () {
  }

})();


// Or, use jQuery-ready syntax or similar.
$(function () {

  //...

});
</script>
<?php
    endif;

  } // End of function inlineJavascript.


} // End of class.


// This is good - no closing ?\> at end of file.
