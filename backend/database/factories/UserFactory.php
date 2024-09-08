<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * Factory class for the User model.
 *
 * This class is responsible for generating fake data for testing and database seeding.
 */
class UserFactory extends Factory
{
    /**
     * The model associated with this factory.
     *
     * @var string
     */
    protected $model = User::class;

    /**
     * Define the default state of the model.
     *
     * @return array
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->name,
            'cpf' => $this->faker->cpf(false),
            'birth_date' => $this->faker->date('Y-m-d'),
            'email' => $this->faker->unique()->safeEmail,
            'phone' => $this->faker->cellphoneNumber(false),
            'zip_code' => str_replace('-', '', $this->faker->postcode),
            'state' => $this->faker->stateAbbr,
            'city' => $this->faker->city,
            'district' => $this->faker->word,
            'address' => $this->faker->streetAddress
        ];
    }
}
