<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\ModelNotFoundException;

/**
 * Service class for handling User-related business logic.
 */
class UserService
{
    /**
     * Retrieve all active users.
     *
     * @return Collection
     */
    public function getAllUsers(): Collection
    {
        return User::active()->get();
    }

    /**
     * Create a new user.
     *
     * @param array $data
     * @return User
     */
    public function createUser(array $data): User
    {
        return User::create($data);
    }

    /**
     * Display the specified user.
     *
     * @param User $user
     * @return User
     */
    public function showUser(User $user): User
    {
        if ($user->status === 'inactive') {
            throw new ModelNotFoundException();
        }
        return $user;
    }

    /**
     * Update an existing user.
     *
     * @param User $user
     * @param array $data
     * @return User
     */
    public function updateUser(User $user, array $data): User
    {
        if ($user->status === 'inactive') {
            throw new ModelNotFoundException();
        }
        $user->fill($data)->save();
        return $user;
    }

    /**
     * Deactivate a user.
     *
     * @param User $user
     * @return void
     */
    public function deleteUser(User $user): void
    {

        if ($user->status === 'inactive') {
            throw new ModelNotFoundException();
        }
        $user->status = 'inactive';
        $user->save();
    }
}
