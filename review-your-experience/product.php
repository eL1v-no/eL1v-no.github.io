<?php

session_start();

try {
    //connection to the database rewatchable
    $db = new PDO("mysql:host=localhost; dbname=rewatchable",
        "root", "");

    //selects the category_id
    $query = $db->prepare("SELECT * FROM products WHERE category_id = :category_id");
    $query->execute(['category_id' => $_GET['id']]);
    $result = $query->fetchAll(PDO::FETCH_ASSOC);

} catch (PDOException $e) {
    die("ERROR! : " . $e->getMessage());
}
?>

<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Home</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
<link href="https://fonts.googleapis.com/css2?family=Orbitron&display=swap" rel="stylesheet">
<header>
    <div class="upper-bar">
        <h1 class="title">
            Rewatchable
        </h1>
    </div>
    <!---navigation to the other pages-->
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
<br><br>
<div class="back-button-container">
    <a href="javascript:history.back()" class="back-button">Terug</a>
</div>
<main>
    <div class=" product-container">
        <?php foreach ($result as $data): ?>
            <div class="card">
                <a href="detail_product.php?id=<?php echo $data['id']; ?>">
                    <?php
                    echo "<br>";
                    echo "<br>";
                    echo '<img src="img/' . $data['img'] . '" alt="Afbeelding"> <br>'; ?><!---shows the img--->
                    <div class="card-title">
                        <?php echo $data ['Titel']; ?> <!---shows the title--->
                    </div>
                </a>
            </div>
        <?php endforeach; ?>
    </div>
</main>
<!-- Footer -->
<footer> &copy; Elif Kaya & Hayrunnisa Budak, alle rechten aanvaard.</footer>
</body>
</html>