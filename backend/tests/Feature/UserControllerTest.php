<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;

/**
 * Test class for UserController.
 *
 * This class contains tests for all CRUD operations and validations related to User management.
 */
class UserControllerTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    /**
     * Test user creation with valid data.
     *
     * @return void
     */
    public function test_can_create_user(): void
    {
        $userData = User::factory()->make()->toArray();

        $response = $this->postJson('/api/users', $userData);

        $response->assertStatus(201)
                 ->assertJsonStructure([
                     'id',
                     'name',
                     'cpf',
                     'birth_date',
                     'email',
                     'phone',
                     'zip_code',
                     'state',
                     'city',
                     'district',
                     'address',
                     'status',
                 ]);

        $this->assertDatabaseHas('users', $userData);
    }

    /**
     * Test user creation with invalid CPF.
     *
     * @return void
     */
    public function test_cannot_create_user_with_invalid_cpf(): void
    {

        $userData = User::factory()->make([
            'cpf'    => '88888888888'
        ])->toArray();

        $response = $this->postJson('/api/users', $userData);

        $response->assertStatus(422)
                 ->assertJsonValidationErrors(['cpf']);
    }

    /**
     * Test user creation with invalid email.
     *
     * @return void
     */
    public function test_cannot_create_user_with_invalid_email(): void
    {

        $userData = User::factory()->make([
            'email'  => 'invalid-email'
        ])->toArray();

        $response = $this->postJson('/api/users', $userData);

        $response->assertStatus(422)
                 ->assertJsonValidationErrors(['email']);
    }

   /**
     * Test user creation with invalid birth_date.
     *
     * @return void
     */
    public function test_cannot_create_user_with_invalid_birth_date(): void
    {

        $userData = User::factory()->make()->toArray();

        $userData['birth_date'] = '1999-07';

        $response = $this->postJson('/api/users', $userData);

        $response->assertStatus(422)
                 ->assertJsonValidationErrors(['birth_date']);
    }

     /**
     * Test user creation with invalid phone.
     *
     * @return void
     */
    public function test_cannot_create_user_with_invalid_phone(): void
    {

        $userData = User::factory()->make([
            'phone'  => '419888877'
        ])->toArray();

        $response = $this->postJson('/api/users', $userData);

        $response->assertStatus(422)
                 ->assertJsonValidationErrors(['phone']);
    }


    /**
     * Test user put with valid data.
     *
     * @return void
     */
    public function test_can_put_user(): void
    {
        $user = User::factory()->create();

        $userUpdateData = User::factory()->make()->toArray();

        $response = $this->putJson("/api/users/{$user->id}", $userUpdateData);

        $response->assertStatus(200)
                 ->assertJsonFragment($userUpdateData);

        $this->assertDatabaseHas('users', array_merge([
            'id' => $user->id
        ], $userUpdateData));
    }    
    
    /**
     * Test user patch with valid data.
     * @return void
     */
    public function test_can_patch_user(): void
    {
        $user = User::factory()->create();

        $userUpdateData = [
            'name' => $this->faker->name
        ];

        $response = $this->patchJson("/api/users/{$user->id}", $userUpdateData);

        $response->assertStatus(200)
                 ->assertJsonFragment($userUpdateData);

        $this->assertDatabaseHas('users', array_merge([
            'id' => $user->id
        ], $userUpdateData));
    }

    /**
     * Test viewing a specific user.
     *
     * @return void
     */
    public function test_can_view_user(): void
    {
        $user = User::factory()->create();

        $response = $this->getJson("/api/users/{$user->id}");

        $response->assertStatus(200)
                 ->assertJson($user->toArray());
    }

    /**
     * Test listing all users.
     *
     * @return void
     */
    public function test_can_list_users(): void
    {
        $users = User::factory()->count(3)->create();

        $response = $this->getJson("/api/users");

        $response->assertStatus(200)
                 ->assertJsonCount(3, 'data')
                 ->assertJsonStructure([
                     'data' => [
                         '*' => [
                             'id',
                             'name',
                             'cpf',
                             'email',
                             'phone',
                             'birth_date',
                             'city',
                             'state',
                             'district',
                             'address',
                             'status',
                             'created_at',
                             'updated_at'
                         ]
                     ]
                 ]);
    }

    /**
     * Test soft deleting a user.
     *
     * @return void
     */
    public function test_can_soft_delete_user(): void
    {
        $user = User::factory()->create();

        $response = $this->deleteJson("/api/users/{$user->id}");

        $response->assertStatus(204);

        $this->assertDatabaseHas('users', [
            'id' => $user->id,
            'status' => 'inactive'
        ]);
    }

    /**
     * Test that a soft deleted user cannot be viewed.
     *
     * @return void
     */
    public function test_cannot_view_soft_deleted_user(): void
    {
        $user = User::factory()->create(['status' => 'inactive']);

        $response = $this->getJson("/api/users/{$user->id}");

        $response->assertStatus(404);
    }

}
