<?php
// Start de sessie
session_start();

// Controleer of gebruiker is ingelogd, anders doorsturen naar login pagina
if (!isset($_SESSION['user_id'])) {
    header("Location: login.php");
    exit();
}

// Maak verbinding met de database
$db = new PDO("mysql:host=localhost;dbname=rewatchable", "root", "");

// Haal gebruiker gegevens op
$userQuery = $db->prepare("SELECT * FROM users WHERE id = ?");
$userQuery->execute([$_SESSION['user_id']]);
$user = $userQuery->fetch();

// Haal alle reviews van de gebruiker op
$reviewsQuery = $db->prepare("SELECT r.*, p.Titel 
                             FROM review r 
                             JOIN products p ON r.product_id = p.id 
                             WHERE r.user_id = ? 
                             ORDER BY r.time DESC");
$reviewsQuery->execute([$_SESSION['user_id']]);
$reviews = $reviewsQuery->fetchAll();
?>

<!doctype html>
<html lang="nl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mijn Profiel - Rewatchable</title>
    <link rel="stylesheet" href="css/style.css">
    <link href="https://fonts.googleapis.com/css2?family=Orbitron&display=swap" rel="stylesheet">
</head>
<body>
<header>
    <div class="upper-bar">
        <h1 class="title">
            Rewatchable
        </h1>
    </div>
    <!-- Navigatie menu -->
    <nav class="nav-bar">
        <a href="index.php">Home</a>
        <a href="about-us.php">About Us</a>
        <a href="contact.php">Contact</a>
        <?php if(isset($_SESSION['user_id'])): ?>
            <!-- Toon deze links als gebruiker is ingelogd -->
            <a href="profile.php">My Profile</a>
            <a href="logout.php">Log Out</a>
        <?php else: ?>
            <!-- Toon deze link als gebruiker niet is ingelogd -->
            <a href="login.php">log In</a>
        <?php endif; ?>
    </nav>
</header>
<main class="profile-container">
    <h2>Mijn Profiel</h2>

    <!-- Toon foutmelding als die er is -->
    <?php if (!empty($error)): ?>
        <div class="error-message"><?php echo $error; ?></div>
    <?php endif; ?>

    <!-- Toon succesmelding als die er is -->
    <?php if (!empty($success)): ?>
        <div class="success-message"><?php echo $success; ?></div>
    <?php endif; ?>

    <!-- Sectie voor accountgegevens -->
    <div class="profile-section">
        <h3>Accountgegevens</h3>
        <form method="POST">
            <div class="form-group">
                <label for="username">Gebruikersnaam</label>
                <input type="text" id="username" name="username" value="<?php echo htmlspecialchars($user['username']); ?>" required>
            </div>
            <div class="form-group">
                <label for="email">Emailadres</label>
                <input type="email" id="email" name="email" value="<?php echo htmlspecialchars($user['email']); ?>" required>
            </div>
            <div class="form-group">
                <input type="submit" name="update_profile" value="Gegevens bijwerken" class="button">
            </div>
        </form>
    </div>

    <!-- Sectie voor wachtwoord wijzigen -->
    <div class="profile-section">
        <h3>Wachtwoord wijzigen</h3>
        <form method="POST">
            <div class="form-group">
                <label for="current_password">Huidig wachtwoord</label>
                <input type="password" id="current_password" name="current_password" required>
            </div>
            <div class="form-group">
                <label for="new_password">Nieuw wachtwoord</label>
                <input type="password" id="new_password" name="new_password" required>
            </div>
            <div class="form-group">
                <label for="confirm_password">Bevestig nieuw wachtwoord</label>
                <input type="password" id="confirm_password" name="confirm_password" required>
            </div>
            <div class="form-group">
                <input type="submit" name="change_password" value="Wachtwoord wijzigen" class="button">
            </div>
        </form>
    </div>
</main>
<footer>
    <!-- Copyright informatie -->
    &copy; Elif Kaya & Hayrunnisa Budak, alle rechten aanvaard.
</footer>
</body>
</html>