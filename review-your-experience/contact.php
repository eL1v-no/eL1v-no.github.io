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
</div>
<main>
    <div class="contact-container">
        <br><br>
        <h2>Wil je contact met ons opnemen of feedback geven om onze website te verbeteren? Vul het onderstaande
            formulier in om je bericht eenvoudig naar ons te sturen, we horen graag van je!
            <br> Indien dit niet mogelijk, dan kan je ons via onze locatie berijken.</h2>

        <!-- Contact form -->
        <br><br>
        <form id="contact-form" method="POST">
            <div class="form-group">
                <label for="name">Naam</label>
                <input type="text" id="name" name="name" required>
            </div>
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" name="email" required>
            </div>
            <div class="form-group">
                <label for="message">Bericht</label>
                <textarea id="message" name="message" required></textarea>
            </div>
            <div class="form-group">
                <button type="submit">Verzenden</button>
            </div>
        </form>
        <br><br>
        <br><br>

        <!---cars with information of the developers--->
        <h2>Meest gestelde vragen</h2>

        <details>
            <summary>Klik hier om onze locatie te zien.</summary>
            <div class="help-container">
                <br><br>
                <h2>Heb je je bericht niet kunnen verzenden? Maak je geen zorgen, we laten je niet in de steek! Hieronder vind
                    je onze contactgegevens. Vergeet niet dat we doordeweeks van 09:00 tot 17:00 uur bereikbaar zijn. Als je
                    buiten deze uren contact opneemt, ontvang je uiterlijk de volgende werkdag een reactie van ons.</h2>
                <br><br>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4910.171581954115!2d4.347268377199582!3d52.023534771935275!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c5b5d776440205%3A0xe5bfa517b4fd0e71!2sBrasserskade%201%2C%202612%20CA%20Delft!5e0!3m2!1snl!2snl!4v1742295066428!5m2!1snl!2snl"
                        width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"
                        referrerpolicy="no-referrer-when-downgrade"></iframe>
                <br><br>
                <!---location of the company--->
                <h3>
                    <ul>Adres: Brasserskade 1, 2612 CA Delft</ul>
                    <ul>Email: rewatchable@gmail.com</ul>
                    <ul>Telefoon: 070 123 4567</ul>
                </h3>
            </div>
        </details>
        <details>
            <summary>Waarvoor wordt een dashboard gebruikt?</summary>
            <br>
            <p>Een dashboard voor films/series wordt gebruikt om je favoriete films en series op een duidelijke en visuele manier weer te geven.
                Het zorgt ervoor dat je snel inzicht krijgt in welke films of series je hebt gekeken, welke je nog wilt bekijken
                en welke prestaties je hebt behaald (zoals hoeveel afleveringen je hebt gezien). Het maakt het makkelijker om in één oogopslag te zien welke films/series je leuk vindt en je kijkervaring beter te organiseren!
            </p
        </details>
    </div>
</main>
<br>
<br>
<!---footer-->
<footer> &copy Elif Kaya & Hayrunnisa Budak, alle rechten aanvaard.</footer>
</body>
</html>