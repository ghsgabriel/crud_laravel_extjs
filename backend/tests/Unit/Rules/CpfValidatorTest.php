<?php

namespace Tests\Unit\Rules;

use Tests\TestCase;
use App\Rules\CpfValidator;

/**
 * Unit tests for the CpfValidator class.
 */
class CpfValidatorTest extends TestCase
{
    /**
     * The CpfValidator instance being tested.
     *
     * @var CpfValidator
     */
    protected CpfValidator $cpfValidator;

    /**
     * Set up the test environment.
     *
     * @return void
     */
    protected function setUp(): void
    {
        parent::setUp();
        $this->cpfValidator = new CpfValidator();
    }

    /**
     * Test validation of a valid CPF.
     *
     * @return void
     */
    public function test_valid_cpf(): void
    {
        $failCalled = false;
        $fail = function() use (&$failCalled) {
            $failCalled = true;
        };

        $this->cpfValidator->validate('cpf', '52998224725', $fail);
        $this->assertFalse($failCalled);
    }

    /**
     * Test validation of an invalid CPF.
     *
     * @return void
     */
    public function test_invalid_cpf(): void
    {
        $failCalled = false;
        $fail = function() use (&$failCalled) {
            $failCalled = true;
        };

        $this->cpfValidator->validate('cpf', '12345678900', $fail);
        $this->assertTrue($failCalled);
    }

    /**
     * Test validation of a CPF with incorrect length.
     *
     * @return void
     */
    public function test_cpf_with_incorrect_length(): void
    {
        $failCalled = false;
        $fail = function() use (&$failCalled) {
            $failCalled = true;
        };

        $this->cpfValidator->validate('cpf', '123456789', $fail);
        $this->assertTrue($failCalled);
    }

    /**
     * Test the error message for invalid CPF.
     *
     * @return void
     */
    public function test_error_message(): void
    {
        $errorMessage = '';
        $fail = function($message) use (&$errorMessage) {
            $errorMessage = $message;
        };

        $this->cpfValidator->validate('cpf', '12345678900', $fail);
        $this->assertEquals('The :attribute is not a valid CPF.', $errorMessage);
    }
}
