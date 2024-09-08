<?php

namespace Tests\Unit\Services;

use Tests\TestCase;
use App\Services\UserService;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

/**
 * Unit tests for the UserService class.
 */
class UserServiceTest extends TestCase
{
    use RefreshDatabase;

    /**
     * The UserService instance being tested.
     *
     * @var UserService
     */
    protected UserService $userService;

    /**
     * Set up the test environment.
     *
     * @return void
     */
    protected function setUp(): void
    {
        parent::setUp();
        $this->userService = new UserService();
    }

    /**
     * Test retrieving all users.
     *
     * @return void
     */
    public function test_get_all_users(): void
    {
        User::factory()->count(3)->create();

        $users = $this->userService->getAllUsers();

        $this->assertCount(3, $users);
    }

    /**
     * Test creating a new user.
     *
     * @return void
     */
    public function test_create_user(): void
    {
        $userData = User::factory()->make()->toArray();

        $user = $this->userService->createUser($userData);

        $this->assertInstanceOf(User::class, $user);
        $this->assertDatabaseHas('users', $userData);
    }

    /**
     * Test updating an existing user.
     *
     * @return void
     */
    public function test_update_user(): void
    {
        $user = User::factory()->create();
        $newData = ['name' => 'New Name'];

        $updatedUser = $this->userService->updateUser($user, $newData);

        $this->assertEquals('New Name', $updatedUser->name);
        $this->assertDatabaseHas('users', [
            'id' => $user->id,
            'name' => 'New Name'
        ]);
    }

    /**
     * Test soft deleting a user.
     *
     * @return void
     */
    public function test_delete_user(): void
    {
        $user = User::factory()->create();

        $this->userService->deleteUser($user);

        $this->assertEquals('inactive', $user->fresh()->status);
    }
}
