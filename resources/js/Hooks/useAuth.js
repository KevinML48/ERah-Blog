// resources/js/Hooks/useAuth.js
import { usePage, router } from '@inertiajs/react';

export default function useAuth() {
    const { auth } = usePage().props;
    const user = auth?.user; // Pour éviter les erreurs si auth ou user est null
    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

    const logout = async () => {
        try {
            // Vérifiez que le token CSRF est disponible
            if (!csrfToken) {
                console.error('CSRF token not found. Make sure it\'s included in your layout.');
                return;
            }

            // Envoie une requête POST à la route de déconnexion avec le token CSRF
            router.post(route('logout'), {
                _token: csrfToken, // Ajoute le token CSRF aux données de la requête
            }, {
                preserveState: false,
                preserveScroll: false,
                onBefore: () => {
                    if (!confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
                        return false; // Annule la déconnexion si l'utilisateur clique sur "Annuler"
                    }
                },
                onSuccess: () => {
                    // Optionnel : Fais quelque chose après la déconnexion réussie (par exemple, afficher un message)
                    console.log('Déconnexion réussie.');
                },
                onError: (errors) => {
                    // Optionnel : Gère les erreurs de déconnexion (par exemple, affiche un message d'erreur)
                    console.error('Erreur lors de la déconnexion:', errors);
                    alert('Une erreur s\'est produite lors de la déconnexion. Veuillez réessayer.');
                },
            });
        } catch (error) {
            console.error('Erreur inattendue lors de la déconnexion:', error);
            alert('Une erreur inattendue s\'est produite. Veuillez réessayer.');
        }
    };

    const checkRole = (role) => {
        return user && user.roles && user.roles.includes(role);
    };

    return {
        user,
        logout,
        checkRole, // Ajout de la fonction checkRole
        isAuthenticated: !!user, // Retourne true si l'utilisateur est authentifié, false sinon
    };
}
