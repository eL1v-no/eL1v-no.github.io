<?php
// Start de sessie
session_start();

// Controleer of gebruiker is ingelogd, anders doorsturen naar login pagina
if (!isset($_SESSION['user_id'])) {
    header("Location: login.php");
    exit();
}

// Probeer verbinding te maken met de database
try {
    $db = new PDO("mysql:host=localhost;dbname=rewatchable", "root", "");
    // Zet error mode naar exceptions
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    // Toon foutmelding als verbinding mislukt
    die("Database error: " . $e->getMessage());
}

// Verwerk POST-verzoek voor het verwijderen van een review
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['review_id'])) {
    // Bereid query voor om review te controleren
    $stmt = $db->prepare("SELECT product_id FROM review WHERE id = :id AND user_id = :user_id");
    $stmt->bindParam(':id', $_POST['review_id'], PDO::PARAM_INT);
    $stmt->bindParam(':user_id', $_SESSION['user_id'], PDO::PARAM_INT);
    $stmt->execute();

    // Haal review gegevens op
    $review = $stmt->fetch(PDO::FETCH_ASSOC);

    // Controleer of review bestaat en van de gebruiker is
    if ($review) {
        // Bereid query voor om review te verwijderen
        $delete = $db->prepare("DELETE FROM review WHERE id = :id AND user_id = :user_id");
        $delete->bindParam(':id', $_POST['review_id'], PDO::PARAM_INT);
        $delete->bindParam(':user_id', $_SESSION['user_id'], PDO::PARAM_INT);

        // Voer verwijdering uit
        if ($delete->execute()) {
            // Succesmelding en doorsturen naar productpagina
            $_SESSION['success'] = "Review succesvol verwijderd!";
            header("Location: detail_product.php?id=".$review['product_id']);
            exit();
        } else {
            // Foutmelding als verwijderen mislukt
            $_SESSION['error'] = "Fout bij het verwijderen van de review.";
        }
    } else {
        // Foutmelding als review niet gevonden is of niet van gebruiker is
        $_SESSION['error'] = "Review niet gevonden of geen toestemming.";
    }
}
?>