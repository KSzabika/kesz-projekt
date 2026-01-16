-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2026. Jan 16. 06:28
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

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `rendeles`
--
ALTER TABLE `rendeles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_rendeles_vasarlo` (`vasarlo_id`),
  ADD KEY `fk_rendeles_etlap` (`etel_id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `rendeles`
--
ALTER TABLE `rendeles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

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
