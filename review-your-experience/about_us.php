<?php
session_start();
?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
<link href="https://fonts.googleapis.com/css2?family=Orbitron&display=swap" rel="stylesheet">
<header>
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
        <div class="overons-container">
            <div class="overons">
                <br>
                <div class="overons-header">Elif</div>
                <img src="img/foto-elif.jpg">
                <div class="overons-body">
                    <p>Elif Kaya is een Backend Developer die zich heeft gefocust op de technische aspecten van dit project.
                        Ze heeft gewerkt met PHP en databases om de backend te bouwen, waarbij ze zorgde voor een efficiënte en veilige dataverbinding via PDO.
                        Haar focus op het ontwikkelen van de juiste database-structuren en het optimaliseren van SQL-query’s heeft ervoor gezorgd dat het project betrouwbaar en goed geconfigureerd is.
                        Elif’s diepgaande kennis van backend-ontwikkeling heeft de technische basis van het project sterk en stabiel gemaakt.</p>
                    <br>
                </div>
            </div>
            <div class="overons">
                <br>
                <div class="overons-header">Hayrunnisa</div>
                <img src="img/foto-hayrunissa.jpg">
                <div class="overons-body">
                    <p>Hayrunnisa Budak is een getalenteerde Front-End Developer die verantwoordelijk was voor de visuele en gebruikersgerichte kant van het project.
                        Ze heeft gewerkt met HTML, CSS en PHP om gebruiksvriendelijke en visueel aantrekkelijke webpagina’s te ontwikkelen. Nisa heeft ervoor gezorgd dat de interface niet alleen mooi is,
                        maar ook goed presteert op verschillende apparaten.
                        Haar aandacht voor design en gebruikerservaring heeft het project een sterke en intuïtieve uitstraling gegeven, waardoor de applicatie zowel functioneel als visueel aantrekkelijk is.</p>
                    <br>
                </div>
    </main>
    <!---footer-->
    <footer> &copy Elif Kaya & Hayrunnisa Budak, alle rechten aanvaard.</footer>

</body>
</html>