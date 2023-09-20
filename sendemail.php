<?php
header('Content-Type: text/html; charset=utf-8');

// Si le formulaire est soumis
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Clé secrète
    $recaptchaSecret = 'votre clées API';
    $recaptchaResponse = $_POST['g-recaptcha-response'];

    // Appel à l'API reCAPTCHA
    $response = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=$recaptchaSecret&response=$recaptchaResponse");
    $responseKeys = json_decode($response, true);

    // Vérification de la réponse reCAPTCHA et du score
    if (intval($responseKeys["success"]) !== 1 || $responseKeys['score'] < 0.5) {
        echo "Erreur de CAPTCHA.";
        exit;
    } else {
        // Nettoyer les entrées du formulaire
        $prenom = clean_input($_POST["prenom"]);
        $nom = clean_input($_POST["nom"]);
        $email = clean_input($_POST["email"]);
        $message = clean_input($_POST["message"]);

        // Vérification des champs requis
        if (empty($nom) || empty($prenom) || empty($email) || empty($message)) {
            echo "Tous les champs sont requis.";
            exit;
        }

        // Validation de l'email
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            echo "L'adresse e-mail n'est pas valide.";
            exit;
        }

        // Informations sur le destinataire
        $to = 'contact@jeanphilippevert.com';
        $subject = 'Nouveau message en provenance de votre portfolio';

        // Construire le corps de l'e-mail
        $email_content = "Prénom: $prenom\n";
        $email_content .= "Nom: $nom\n";
        $email_content .= "Email: $email\n\n";
        $email_content .= "Message:\n$message\n";

        // Construire les en-têtes de l'e-mail en UTF-8
        $email_headers = "Content-Type: text/plain; charset=utf-8\r\n";
        $email_headers .= "From: $prenom $nom <$email>";

        // Envoi de l'e-mail
        if (mail($to, $subject, $email_content, $email_headers)) {
            echo "Message envoyé avec succès.";
        } else {
            echo "Erreur lors de l'envoi du message.";
        }
    }
}

// Fonction pour nettoyer les données du formulaire
function clean_input($data)
{
    $data = trim($data);
    $data = stripslashes($data);
    return htmlspecialchars($data, ENT_QUOTES, 'UTF-8');
}
