<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        // Réinitialiser le cache des permissions
        app()->make(\Spatie\Permission\PermissionRegistrar::class)->forgetCachedPermissions();

        // Créer les permissions nécessaires
        $permissions = [
            'create blogs',
            'edit blogs',
            'delete blogs',
            'read blogs',
            'manage comments',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        // Créer les rôles
        $adminRole = Role::firstOrCreate(['name' => 'admin']);
        $userRole = Role::firstOrCreate(['name' => 'user']);

        // Assigner les permissions aux rôles
        $adminRole->syncPermissions($permissions); // L'admin a toutes les permissions
        $userRole->syncPermissions(['read blogs']); // L'utilisateur normal peut seulement lire les blogs

        // Créer l'utilisateur Admin
        $admin = User::firstOrCreate(
            ['email' => 'admin@example.com'],
            [
                'name' => 'Admin User',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ]
        );
        $admin->assignRole($adminRole);

        // Créer l'utilisateur normal
        $user = User::firstOrCreate(
            ['email' => 'user@example.com'],
            [
                'name' => 'Regular User',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ]
        );
        $user->assignRole($userRole);

        // Afficher un message dans la console
        $this->command->info('Les utilisateurs Admin et User ont été créés avec succès !');
    }
}
