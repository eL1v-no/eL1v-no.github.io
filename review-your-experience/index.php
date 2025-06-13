<?php

session_start();

try {
    //connection wht the database 'rewatchable'
    $db = new PDO("mysql:host=localhost; dbname=rewatchable",
        "root", "");

    $query = $db->prepare("SELECT * FROM category");
    $query->execute();

    $result = $query->fetchAll(PDO::FETCH_ASSOC);

} catch (PDOException $e) {
    die("ERROR!: " . $e->getMessage());
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
    <link href="https://fonts.googleapis.com/css2?family=Orbitron&display=swap" rel="stylesheet">
</head>
<body>
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
<main>
    <div class="container">
        <?php foreach ($result as $data): ?> <!-- Loop through each product in the $result array -->
            <a href="product.php?id=<?= $data['id'] ?>" class="home-card"> <!-- Create a link to the product page, passing the product ID in the URL -->
                <div class="home-title"> <!-- Start of the card, displaying the product name and image -->
                    <?= $data['name'] ?> <!-- Display the name of the product -->
                    <img src="img/<?= $data['img'] ?>" alt="<?= $data['name'] ?> Image"> <!-- Display the product image -->
                </div>
            </a>
        <?php endforeach; ?> <!-- End of the loop, repeat for each product -->
    </div>
</main>
<footer>
    &copy; Elif Kaya & Hayrunnisa Budak, alle rechten aanvaard.
</footer>

</body>
</html>