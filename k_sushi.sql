-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2026. Jan 20. 14:20
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `k_sushi`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `etlap`
--

CREATE TABLE `etlap` (
  `etel_id` int(11) NOT NULL,
  `etel_neve` varchar(150) NOT NULL,
  `etel_ara` int(11) NOT NULL,
  `etel_kepek_url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `etlap`
--

INSERT INTO `etlap` (`etel_id`, `etel_neve`, `etel_ara`, `etel_kepek_url`) VALUES
(1, 'Lazac nigiri', 1490, 'img/lazac nigiri2.jpg'),
(2, 'Csípős tonhal sushi', 1690, 'img/csipos tonhal sushi.jpg'),
(3, 'Crunchy sushi', 1790, 'img/cruchy sushi.jpg'),
(4, 'Garnéla sushi', 1650, 'img/garnéla sushi.jpg'),
(5, 'Vegán sushi', 1590, 'img/vegán sushi.jpg'),
(6, 'Thai zöldségleves fafülgombával', 1290, 'img/Thai zöldségleves fafülgombával.jpg'),
(7, 'Ramen leves csirkével', 1690, 'img/Ramen leves csirkével.jpg'),
(8, 'Tom Yum leves garnélával és feketekagylóval', 1890, 'img/Tom Yum leves garnélával és feketekagylóval.jpg'),
(9, 'Ramen leves garnélával', 1790, 'img/Ramen leves garnélával.jpg'),
(10, 'Miso leves tofuval', 1190, 'img/Miso leves tofuval.jpg'),
(11, 'Pirított Ramen tofuval', 1690, 'img/Pirított Ramen tofuval.jpg'),
(12, 'Pirított Ramen csirkével', 1790, 'img/Pirított Ramen csirkével.jpg'),
(13, 'Pirított Ramen feketekagylóval', 1990, 'img/Pirított Ramen feketekagylóval.jpg'),
(14, 'Pirított Ramen baby polippal', 2190, 'img/Pirított Ramen baby polippal.jpg'),
(15, 'Gourmet Sushi Mix', 4990, 'img/Gourmet Sushi Mix.jpg'),
(16, 'Party Boksz', 7990, 'img/Party Boksz.jpg'),
(17, 'Extra Sushi Boksz', 9990, 'img/Extra Sushi Boksz.jpg'),
(18, 'Nigiri–Sashimi Sushi Mix', 5990, 'img/Nigiri-Sashimi Sushi Mix.jpg'),
(19, 'Vegán Válogatás', 4590, 'img/Vegán Válogatás.jpg'),
(20, 'Mochi választható ízekben, málnaöntettel', 990, 'img/Mochi választható ízekben, málnaöntettel.jpg'),
(21, 'Sushi palacsinta banánnal, öntettel', 1290, 'img/Sushi palacsinta banánnal, öntettel.jpg'),
(22, 'Japán pufi palacsinta', 1290, 'img/Japán pufi palacsinta.jpg'),
(23, 'Epres piskótszendvics', 990, 'img/Epres piskótszendvics.jpg'),
(24, 'Szerencse süti', 490, 'img/Szerencse süti.jpg');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `rendeles`
--

CREATE TABLE `rendeles` (
  `id` int(11) NOT NULL,
  `vasarlo_id` int(11) DEFAULT NULL,
  `etel_id` int(11) DEFAULT NULL,
  `vasarlo_neve` varchar(200) NOT NULL,
  `etel_neve` varchar(150) NOT NULL,
  `etel_ar` int(11) NOT NULL,
  `vasarlo_cime` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `rendeles`
--

INSERT INTO `rendeles` (`id`, `vasarlo_id`, `etel_id`, `vasarlo_neve`, `etel_neve`, `etel_ar`, `vasarlo_cime`) VALUES
(13, 1, NULL, 'Kiss Szabolcs', 'Lazac nigiri', 1490, 'Vasút ut 45'),
(14, 1, NULL, 'Kiss Szabolcs', 'Lazac nigiri', 1490, 'Vasút ut 45');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `vasarlo`
--

CREATE TABLE `vasarlo` (
  `id` int(11) NOT NULL,
  `kereszt_nev` varchar(100) NOT NULL,
  `vezetek_nev` varchar(100) NOT NULL,
  `email_cim` varchar(150) NOT NULL,
  `telefonszam` varchar(30) DEFAULT NULL,
  `vasarlo_cime` varchar(255) DEFAULT NULL,
  `jelszo` tinytext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `vasarlo`
--

INSERT INTO `vasarlo` (`id`, `kereszt_nev`, `vezetek_nev`, `email_cim`, `telefonszam`, `vasarlo_cime`, `jelszo`) VALUES
(1, 'Szabolcs', 'Kiss', 'szabolcsfakksmite@gmail.com', '06303071931', 'Vasút ut 45', '$2b$10$ChBp07MPhvTLq/0vWfGRiOJwERfKO6IP/61G.f3UA6WWSXo33U.OS'),
(2, 'asdasda', 'asd', 'szabolcska@gmail.com', '06306214578', 'budapest fo ut 6', '$2b$10$BFBxeEts4doA.wVucIak1.osytaeMS5qu9GTnxkl3G9pXyBw08pk.');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `etlap`
--
ALTER TABLE `etlap`
  ADD PRIMARY KEY (`etel_id`);

--
-- A tábla indexei `rendeles`
--
ALTER TABLE `rendeles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_rendeles_vasarlo` (`vasarlo_id`),
  ADD KEY `fk_rendeles_etlap` (`etel_id`);

--
-- A tábla indexei `vasarlo`
--
ALTER TABLE `vasarlo`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email_cim` (`email_cim`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `etlap`
--
ALTER TABLE `etlap`
  MODIFY `etel_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT a táblához `rendeles`
--
ALTER TABLE `rendeles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT a táblához `vasarlo`
--
ALTER TABLE `vasarlo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `rendeles`
--
ALTER TABLE `rendeles`
  ADD CONSTRAINT `fk_rendeles_etlap` FOREIGN KEY (`etel_id`) REFERENCES `etlap` (`etel_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_rendeles_vasarlo` FOREIGN KEY (`vasarlo_id`) REFERENCES `vasarlo` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
