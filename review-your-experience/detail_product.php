<?php
session_start();

// Databaseverbinding
try {
    $db = new PDO("mysql:host=localhost; dbname=rewatchable", "root", "");
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("FOUT!: " . $e->getMessage());
}

// Review toevoegen
if (isset($_POST['VERZENDEN']) && isset($_SESSION['user_id'])) {
    $content = $_POST['content'];
    $user_id = $_SESSION['user_id'];

    $sth = $db->prepare('INSERT INTO review (product_id, user_id, name, content) 
                         VALUES(:product_id, :user_id, :name, :review)');
    $sth->bindParam(':product_id', $_GET['id']);
    $sth->bindParam(':user_id', $user_id);
    $sth->bindParam(':name', $_SESSION['username']);
    $sth->bindParam(':review', $content);
    $sth->execute();

    header("Location: ".$_SERVER['PHP_SELF']."?id=".$_GET['id']);
    exit();
}
?>

<!doctype html>
<html lang="nl">
<head>
    <meta charset="UTF-8">
    <title>Productdetails - Rewatchable</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
<header>
    <div class="upper-bar">
        <h1 class="title">Rewatchable</h1>
    </div>
    <nav class="nav-bar">
        <a href="index.php">Home</a>
        <a href="about-us.php">About Us</a>
        <a href="contact.php">Contact</a>
        <?php if(isset($_SESSION['user_id'])): ?>
            <a href="profile.php">My Profile</a>
            <a href="logout.php">Log Out</a>
        <?php else: ?>
            <a href="login.php">Log In</a>
        <?php endif; ?>
    </nav>
</header>

<div class="back-button-container">
    <a href="javascript:history.back()" class="back-button">Terug</a>
</div>

<main class="product-detail-container">
    <?php
    $query = $db->prepare("SELECT * FROM products WHERE id = :id");
    $query->execute(['id' => $_GET['id']]);
    $result = $query->fetchAll(PDO::FETCH_ASSOC);

    foreach ($result as $data) {
        echo '<div class="product-card">';
        echo '<h2 class="product-title">' . htmlspecialchars($data['Titel']) . '</h2>';
        echo '<div class="product-image-wrapper">';
        echo '<img class="product-image" src="img/' . htmlspecialchars($data['img']) . '" alt="' . htmlspecialchars($data['Titel']) . '">';
        echo '</div>';
        echo '<div class="product-meta">';
        echo '<p><span class="meta-label">Jaar:</span> ' . htmlspecialchars($data['releasedatum']) . '</p>';
        echo '<p><span class="meta-label">Seizoen:</span> ' . htmlspecialchars($data['seizoen']) . '</p>';
        echo '</div>';
        echo '<div class="product-description">';
        echo '<h3>Beschrijving:</h3>';
        echo '<p>' . htmlspecialchars($data['Beschrijving']) . '</p>';
        echo '</div>';
        echo '</div>';
    }
    ?>

    <div class="review-section">
        <h3 class="section-title">Reviews</h3>

        <?php if(isset($_SESSION['user_id'])): ?>
            <form method="POST" class="review-form">
                <div class="form-group">
                    <label for="content">Jouw review</label>
                    <textarea id="content" name="content" rows="5" required></textarea>
                </div>
                <div class="form-group">
                    <input type="submit" name="VERZENDEN" value="Verzenden" class="button">
                </div>
            </form>
        <?php else: ?>
            <p>Log in om een review te plaatsen.</p>
        <?php endif; ?>

        <?php
        $query = $db->prepare('SELECT r.*, u.username 
                              FROM review r 
                              LEFT JOIN users u ON r.user_id = u.id 
                              WHERE r.product_id = :product_id 
                              ORDER BY r.time DESC');
        $query->execute(['product_id' => $_GET['id']]);
        $reviews = $query->fetchAll(PDO::FETCH_ASSOC);

        foreach ($reviews as $review) {
            echo '<div class="review-comment">';
            echo '<strong>' . htmlspecialchars($review['username'] ?? $review['name']) . '</strong><br>';
            echo '<p>' . htmlspecialchars($review['content']) . '</p><br>';
            echo '<div class="review-time">' . date("d M Y, H:i", strtotime($review['time'])) . '</div>';

            // Aantal likes ophalen
            $sth = $db->prepare("SELECT COUNT(*) FROM review_likes WHERE review_id = ?");
            $sth->execute([$review['id']]);
            $like_count = $sth->fetchColumn();

            // Check of gebruiker al geliket heeft
            $userLiked = false;
            if (isset($_SESSION['user_id'])) {
                $sth = $db->prepare("SELECT 1 FROM review_likes WHERE review_id = ? AND user_id = ?");
                $sth->execute([$review['id'], $_SESSION['user_id']]);
                $userLiked = $sth->fetch() ? true : false;
            }

            echo "<div class='review-likes'>❤️ {$like_count} likes</div>";

            if (isset($_SESSION['user_id']) && !$userLiked) {
                echo '<form method="POST" action="like_review.php" style="display:inline;">';
                echo '<input type="hidden" name="review_id" value="' . $review['id'] . '">';
                echo '<button type="submit" class="like-button">Like</button>';
                echo '</form>';
            } elseif ($userLiked) {
                echo "<p class='already-liked'>Je hebt dit al geliket 👍</p>";
            }

            if (isset($_SESSION['user_id']) && ($review['user_id'] == $_SESSION['user_id'])) {
                echo '<form method="POST" action="delete_review.php" style="display:inline;">';
                echo '<input type="hidden" name="review_id" value="' . $review['id'] . '">';
                echo '<input type="hidden" name="product_id" value="' . $_GET['id'] . '">';
                echo '<button type="submit" class="delete-button" onclick="return confirm(\'Weet u zeker dat u deze review wilt verwijderen?\')">Verwijderen</button>';
                echo '</form>';
            }
            echo '</div>';
        }
        ?>
    </div>
</main>

<footer>
    &copy; Elif Kaya & Hayrunnisa Budak, alle rechten aanvaard.
</footer>
</body>
</html>