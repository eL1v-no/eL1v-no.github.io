<?php
// Start de sessie - nodig voor inloggen
session_start();

// Maak verbinding met de database
try {
    $db = new PDO("mysql:host=localhost; dbname=rewatchable", "root", "");
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("FOUT!: " . $e->getMessage()); // Toon foutmelding
}

$error = '';    // Voor foutmeldingen
$success = '';  // Voor succesmeldingen

// INLOGGEN - wanneer formulier verzonden
if (isset($_POST['login'])) {
    $username = trim($_POST['gebruikersnaam']); // Gebruikersnaam opschonen
    $password = trim($_POST['wachtwoord']);     // Wachtwoord opschonen

    // Zoek gebruiker in database
    $query = $db->prepare("SELECT * FROM users WHERE username = :username");
    $query->bindParam(':username', $username);
    $query->execute();

    // Controleer of gebruiker bestaat
    if ($query->rowCount() == 1) {
        $user = $query->fetch(PDO::FETCH_ASSOC);

        // Controleer wachtwoord
        if (password_verify($password, $user['password'])) {
            // Sla gebruikersgegevens op in sessie
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['username'] = $user['username'];
            $_SESSION['email'] = $user['email'];
            header("Location: profile.php"); // Ga naar profielpagina
            exit();
        } else {
            $error = "Wachtwoord is incorrect!";
        }
    } else {
        $error = "Gebruiker niet gevonden!";
    }
}

// REGISTREREN - wanneer formulier verzonden
if (isset($_POST['register'])) {
    $username = trim($_POST['new_username']);
    $email = trim($_POST['email']);
    $password = trim($_POST['new_password']);
    $confirm_password = trim($_POST['confirm_password']);

    // Controleer of wachtwoorden gelijk zijn
    if ($password !== $confirm_password) {
        $error = "Wachtwoorden komen niet overeen!";
    } else {
        // Controleer of gebruikersnaam of email al bestaat
        $check = $db->prepare("SELECT id FROM users WHERE username = :username OR email = :email");
        $check->bindParam(':username', $username);
        $check->bindParam(':email', $email);
        $check->execute();

        if ($check->rowCount() > 0) {
            $error = "Gebruikersnaam of email is al in gebruik!";
        } else {
            // Maak veilig wachtwoord
            $hashed_password = password_hash($password, PASSWORD_DEFAULT);

            // Sla nieuwe gebruiker op
            $insert = $db->prepare("INSERT INTO users (username, email, password) VALUES (:username, :email, :password)");
            $insert->bindParam(':username', $username);
            $insert->bindParam(':email', $email);
            $insert->bindParam(':password', $hashed_password);

            if ($insert->execute()) {
                // Log in na registratie
                $user_id = $db->lastInsertId();
                $_SESSION['user_id'] = $user_id;
                $_SESSION['username'] = $username;
                $_SESSION['email'] = $email;
                header("Location: profile.php"); // Ga naar profiel
                exit();
            } else {
                $error = "Er is een fout opgetreden bij de registratie!";
            }
        }
    }
}
?>

<!doctype html>
<html lang="nl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Inloggen/Registreren</title>
    <link rel="stylesheet" href="css/style.css">
    <link href="https://fonts.googleapis.com/css2?family=Orbitron&display=swap" rel="stylesheet"> <!-- Lettertype -->
</head>
<body>
<header>
    <div class="upper-bar">
        <h1 class="title">Rewatchable</h1>
    </div>

    <!-- Navigatiemenu -->
    <nav class="nav-bar">
        <a href="index.php">Home</a>
        <a href="about-us.php">About Us</a>
        <a href="contact.php">Contact</a>
        <?php if(isset($_SESSION['user_id'])): ?>
            <a href="profile.php">My Profile</a>
            <a href="logout.php">Log Out</a>
        <?php else: ?>
            <a href="login.php">log In</a>
        <?php endif; ?>
    </nav>
</header>

<main>
    <!-- Toon foutmeldingen -->
    <?php if (!empty($error)): ?>
        <div class="error-message"><?php echo $error; ?></div>
    <?php endif; ?>

    <!-- Toon succesmeldingen -->
    <?php if (!empty($success)): ?>
        <div class="success-message"><?php echo $success; ?></div>
    <?php endif; ?>

    <!-- Inlog- en registratiesectie -->
    <div class="auth-container">
        <!-- Inlogformulier -->
        <div class="auth-section">
            <h3 class="section-title">Inloggen</h3>
            <form method="POST" class="auth-form">
                <div class="form-group">
                    <label for="gebruikersnaam">Gebruikersnaam</label>
                    <input type="text" id="gebruikersnaam" name="gebruikersnaam" required>
                </div>
                <div class="form-group">
                    <label for="wachtwoord">Wachtwoord</label>
                    <input type="password" id="wachtwoord" name="wachtwoord" required>
                </div>
                <div class="form-group">
                    <input type="submit" name="login" value="Inloggen" class="button">
                </div>
            </form>
        </div>

        <!-- Registratieformulier -->
        <div class="auth-section">
            <h3 class="section-title">Registreren</h3>
            <form method="POST" class="auth-form">
                <div class="form-group">
                    <label for="new_username">Gebruikersnaam</label>
                    <input type="text" id="new_username" name="new_username" required>
                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" name="email" required>
                </div>
                <div class="form-group">
                    <label for="new_password">Wachtwoord</label>
                    <input type="password" id="new_password" name="new_password" required>
                </div>
                <div class="form-group">
                    <label for="confirm_password">Wachtwoord bevestigen</label>
                    <input type="password" id="confirm_password" name="confirm_password" required>
                </div>
                <div class="form-group">
                    <input type="submit" name="register" value="Registreren" class="button">
                </div>
            </form>
        </div>
    </div>
</main>

<footer>
    &copy; Elif Kaya & Hayrunnisa Budak, alle rechten aanvaard.
</footer>
</body>
</html>