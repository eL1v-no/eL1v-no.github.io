<?php
session_start();
try {
    $db = new PDO("mysql:host=localhost;dbname=rewatchable", "root", "");
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Fout: " . $e->getMessage());
}

if (!isset($_SESSION['user_id']) || !isset($_POST['review_id'])) {
    die("Ongeldige aanvraag.");
}

$user_id = $_SESSION['user_id'];
$review_id = $_POST['review_id'];

// Insert like als deze nog niet bestaat
$stmt = $db->prepare("INSERT IGNORE INTO review_likes (user_id, review_id) VALUES (?, ?)");
$stmt->execute([$user_id, $review_id]);

header("Location: " . $_SERVER['HTTP_REFERER']);
exit;
?>