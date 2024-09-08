<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Rules\CpfValidator;
use Illuminate\Validation\Rule;

/**
 * Form request for validating user data.
 */
class UserRequest extends FormRequest
{

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules(): array
    {
        return match ($this->method()) {
            'POST'  => $this->createRules(),
            'PATCH' => $this->patchRules(),
            'PUT'   => $this->putRules(),
            default => [],
        };
    }

    /**
     * Get the validation rules that apply to the create request.
     *
     * @return array
     */
    private function createRules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'cpf' => ['required', 'string', 'size:11', 'unique:users', new CpfValidator],
            'birth_date' => ['required', 'regex:/^\d{4}-\d{2}-\d{2}$/', 'date'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'phone' => ['required', 'string', 'regex:/^\d{10,11}$/'],
            'zip_code' => ['required', 'string', 'size:8'],
            'state' => ['required', 'string', 'size:2'],
            'city' => ['required', 'string', 'max:100'],
            'district' => ['required', 'string', 'max:100'],
            'address' => ['required', 'string', 'max:255'],
        ];
    }

    /**
     * Get the validation rules that apply to the patch request.
     *
     * @return array
     */
    private function patchRules(): array
    {
        return [
            'name' => ['sometimes', 'string', 'max:255'],
            'cpf' => ['sometimes', 'string', 'size:11', Rule::unique('users')->ignore($this->user), new CpfValidator],
            'birth_date' => ['sometimes', 'regex:/^\d{4}-\d{2}-\d{2}$/', 'date'],
            'email' => ['sometimes', 'string', 'email', 'max:255', Rule::unique('users')->ignore($this->user)],
            'phone' => ['sometimes', 'string', 'regex:/^\d{10,11}$/'],
            'zip_code' => ['sometimes', 'string', 'size:8'],
            'state' => ['sometimes', 'string', 'size:2'],
            'city' => ['sometimes', 'string', 'max:100'],
            'district' => ['sometimes', 'string', 'max:100'],
            'address' => ['sometimes', 'string', 'max:255'],
        ];
    }

    /**
     * Get the validation rules that apply to the put request.
     *
     * @return array
     */
    private function putRules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'cpf' => ['required', 'string', 'size:11', Rule::unique('users')->ignore($this->user), new CpfValidator],
            'birth_date' => ['required', 'regex:/^\d{4}-\d{2}-\d{2}$/', 'date'],
            'email' => ['required', 'string', 'email', 'max:255', Rule::unique('users')->ignore($this->user)],
            'phone' => ['required', 'string', 'regex:/^\d{10,11}$/'],
            'zip_code' => ['required', 'string', 'size:8'],
            'state' => ['required', 'string', 'size:2'],
            'city' => ['required', 'string', 'max:100'],
            'district' => ['required', 'string', 'max:100'],
            'address' => ['required', 'string', 'max:255'],
        ];
    }
}
