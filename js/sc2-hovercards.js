/**
 * @description SC2 Hovercards
 * @version 0.1a
 * @author Kai Mallea <kai@mallea.net>
 */
(function () {
    var elements = document.querySelectorAll('*[rel]') ||
//                 document.evaluate("//*[@rel]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null) ||
                   oXmlDom.documentElement.selectNodes("[@rel]");

    if (!elements) { throw new Error("sc2-hovercards: couldn't find any matching DOM elements"); }
    
    var i = 0,
        hovercard_customized = false,
        hovercard_sprites = {
            img: "img/sc2icons.png",
            Protoss: "background-position: 0px -248px",
            Terran: "background-position: 0px -283px",
            Zerg: "background-position: 0px -318px",
            mineral: "background-position: 0px -72px",
            build_time: {
                Protoss: "background-position: 0px 0px",
                Terran: "background-position: 0px -24px",
                Zerg: "background-position: 0px -48px"
            },
            supply: {
                Protoss: "background-position: 0px -97px",
                Terran: "background-position: 0px -123px",
                Zerg: "background-position: 0px -148px"
            },
            vespene: {
                Protoss: "background-position: 0px -174px",
                Terran: "background-position: 0px -198px",
                Zerg: "background-position: 0px -224px"
            }
        },
        hovercard_style = "#sc2-hovercard { height: 120px; width: 225px; color: #fff; font-family: Verdana; font-size: 0.8em; padding: 5px; background-color: #000; border: solid 2px #ccc; -webkit-border-radius: 5px; -moz-border-radius: 5px; -moz-opacity: 0.9; opacity:.9; -moz-box-shadow: 3px 3px 10px #000; -webkit-box-shadow: 3px 3px 10px #000; box-shadow: 3px 3px 10px #000; } #sc2-hovercard p { margin: 0; } #sc2-hovercard table { margin: 0 0 7px 0; padding: 0; width: 225px; border-bottom: solid 1px #fff; } .sc2-resource { display: inline; float: left; height: 15px; width: 55px; background-repeat: no-repeat; }.sc2hc-requires { color: #ff6600; }",
        hovercard = document.createElement("div"),
        sc2objects = {
            /**
             * Protoss Units
             */
            "Probe": {
                "build_from": "Nexus",
                "race": "Protoss",
                "health": "20",
                "mineral": "50",
                "supply": "1",
                "armor": "0",
                "energy": "20",
                "build_time": "17",
                "vespene": "0"
            },
            "Zealot": {
                "build_from": "Gateway",
                "race": "Protoss",
                "health": "100",
                "mineral": "100",
                "supply": "2",
                "armor": "0",
                "energy": "50",
                "build_time": "38",
                "vespene": "0"
            },
            "Stalker": {
                "build_from": "Gateway",
                "race": "Protoss",
                "health": "80",
                "mineral": "125",
                "supply": "2",
                "armor": "0",
                "energy": "80",
                "build_time": "42",
                "requires": "Cybernetics Core",
                "vespene": "50"
            },
            "Sentry": {
                "build_from": "Gateway",
                "race": "Protoss",
                "health": "40",
                "mineral": "50",
                "supply": "2",
                "armor": "200",
                "energy": "40",
                "build_time": "42",
                "requires": "Cybernetics Core",
                "vespene": "100"
            },
            "Observer": {
                "build_from": "Robotics Facility",
                "race": "Protoss",
                "health": "40",
                "mineral": "50",
                "supply": "1",
                "armor": "0",
                "energy": "20",
                "build_time": "40",
                "vespene": "100"
            },
            "Immortal": {
                "build_from": "Robotics Facility",
                "race": "Protoss",
                "health": "200",
                "mineral": "250",
                "supply": "4",
                "armor": "0",
                "energy": "100",
                "build_time": "55",
                "vespene": "100"
            },
            "Warp Prism": {
                "build_from": "Robotics Facility",
                "race": "Protoss",
                "health": "100",
                "mineral": "200",
                "supply": "2",
                "armor": "0",
                "energy": "40",
                "build_time": "50",
                "vespene": "0"
            },
            "Colossus": {
                "build_from": "Robotics Facility",
                "race": "Protoss",
                "health": "200",
                "mineral": "300",
                "supply": "6",
                "armor": "0",
                "energy": "150",
                "build_time": "75",
                "requires": "Robotics Bay",
                "vespene": "200"
            },
            "Phoenix": {
                "build_from": "Stargate",
                "race": "Protoss",
                "health": "120",
                "mineral": "150",
                "supply": "2",
                "armor": "200",
                "energy": "60",
                "build_time": "45",
                "vespene": "100"
            },
            "Void Ray": {
                "build_from": "Stargate",
                "race": "Protoss",
                "health": "150",
                "mineral": "250",
                "supply": "3",
                "armor": "0",
                "energy": "100",
                "build_time": "60",
                "vespene": "150"
            },
            "High Templar": {
                "build_from": "Gateway",
                "race": "Protoss",
                "health": "40",
                "mineral": "50",
                "supply": "2",
                "armor": "200",
                "energy": "40",
                "build_time": "55",
                "requires": "Templar Archives",
                "vespene": "150"
            },
            "Dark Templar": {
                "build_from": "Gateway",
                "race": "Protoss",
                "health": "40",
                "mineral": "125",
                "supply": "2",
                "armor": "0",
                "energy": "80",
                "build_time": "55",
                "requires": "Dark Shrine",
                "vespene": "125"
            },
            "Archon": {
                "build_from": "High Templar",
                "race": "Protoss",
                "health": "10",
                "mineral": "0",
                "supply": "0",
                "armor": "0",
                "energy": "350",
                "build_time": "12",
                "vespene": "0"
            },
            "Carrier": {
                "build_from": "Stargate",
                "race": "Protoss",
                "health": "300",
                "mineral": "350",
                "supply": "6",
                "armor": "0",
                "energy": "150",
                "build_time": "120",
                "requires": "Fleet Beacon",
                "vespene": "250"
            },
            "Inteceptors": {
                "build_from": "Carrier",
                "race": "Protoss",
                "health": "40",
                "mineral": "25",
                "supply": "0",
                "armor": "0",
                "energy": "40",
                "build_time": "8",
                "vespene": "250"
            },
            "Mothership": {
                "build_from": "Nexus",
                "race": "Protoss",
                "health": "350",
                "mineral": "400",
                "supply": "8",
                "armor": "200",
                "energy": "350",
                "build_time": "160",
                "requires": "Fleet Beacon",
                "vespene": "400"
            },
            /**
             * Protoss Structures
             */
            "Assimilator": {
                "race": "Protoss",
                "mineral": "75",
                "vespene": "0",
                "build_time": "30",
                "requires": ""
            },
            "Cybernetics Core": {
                "race": "Protoss",
                "mineral": "150",
                "vespene": "0",
                "build_time": "50",
                "requires": "Gateway"
            },
            "Dark Shrine": {
                "race": "Protoss",
                "mineral": "100",
                "vespene": "250",
                "build_time": "100",
                "requires": "Twilight Council"
            },
            "Fleet Beacon": {
                "race": "Protoss",
                "mineral": "300",
                "vespene": "200",
                "build_time": "60",
                "requires": "Stargate"
            },
            "Forge": {
                "race": "Protoss",
                "mineral": "150",
                "vespene": "0",
                "build_time": "45",
                "requires": ""
            },
            "Gateway": {
                "race": "Protoss",
                "mineral": "150",
                "vespene": "0",
                "build_time": "65",
                "requires": "Nexus"
            },
            "Nexus": {
                "race": "Protoss",
                "mineral": "400",
                "vespene": "0",
                "build_time": "100",
                "requires": "",
                "supplier": true,
                "supply": "10"
            },
            "Photon Cannon": {
                "race": "Protoss",
                "mineral": "150",
                "vespene": "0",
                "build_time": "40",
                "requires": "Forge"
            },
            "Pylon": {
                "race": "Protoss",
                "mineral": "100",
                "vespene": "0",
                "build_time": "25",
                "requires": "",
                "supplier": true,
                "supply": "8"
            },
            "Robotics Bay": {
                "race": "Protoss",
                "mineral": "200",
                "vespene": "200",
                "build_time": "65",
                "requires": "Robotics Facility"
            },
            "Robotics Facility": {
                "race": "Protoss",
                "mineral": "200",
                "vespene": "100",
                "build_time": "65",
                "requires": "Cybernetics Core"
            },
            "Stargate": {
                "race": "Protoss",
                "mineral": "150",
                "vespene": "150",
                "build_time": "60",
                "requires": "Cybernetics Core"
            },
            "Templar Archives": {
                "race": "Protoss",
                "mineral": "150",
                "vespene": "200",
                "build_time": "50",
                "requires": "Twilight Council"
            },
            "Twilight Council": {
                "race": "Protoss",
                "mineral": "150",
                "vespene": "100",
                "build_time": "50",
                "requires": "Cybernetics Core"
            },
            /**
             * Protoss Upgrades
             */
            "Air Weapons Level 1": {
                "race": "Protoss",
                "mineral": "100",
                "vespene": "100",
                "build_time": "170",
                "requires": "Cybernetics Core"
            },
            "Air Weapons Level 2": {
                "race": "Protoss",
                "mineral": "175",
                "vespene": "175",
                "build_time": "170",
                "requires": "Air Weapons Level 1"
            },
            "Air Weapons Level 3": {
                "race": "Protoss",
                "mineral": "250",
                "vespene": "250",
                "build_time": "200",
                "requires": "Air Weapons Level 2"
            },
            "Air Armor Level 1": {
                "race": "Protoss",
                "mineral": "150",
                "vespene": "150",
                "build_time": "140",
                "requires": "Cybernetics Core"
            },
            "Air Armor Level 2": {
                "race": "Protoss",
                "mineral": "225",
                "vespene": "225",
                "build_time": "170",
                "requires": "Air Armor Level 1"
            },
            "Air Armor Level 3": {
                "race": "Protoss",
                "mineral": "300",
                "vespene": "300",
                "build_time": "200",
                "requires": "Air Armor Level 2"
            },
            "Warpgate": {
                "race": "Protoss",
                "mineral": "50",
                "vespene": "50",
                "build_time": "140",
                "requires": "Cybernetics Core"
            },
            "Hallucination": {
                "race": "Protoss",
                "mineral": "100",
                "vespene": "100",
                "build_time": "110",
                "requires": "Cybernetics Core"
            },
            "Shields Level 1": {
                "race": "Protoss",
                "mineral": "200",
                "vespene": "200",
                "build_time": "140",
                "requires": "Forge"
            },
            "Shields Level 2": {
                "race": "Protoss",
                "mineral": "300",
                "vespene": "300",
                "build_time": "170",
                "requires": ["Shields Level 1", "Twilight Council"]
            },
            "Shields Level 3": {
                "race": "Protoss",
                "mineral": "400",
                "vespene": "400",
                "build_time": "200",
                "requires": "Shields Level 2"
            },
            "Ground Weapons Level 1": {
                "race": "Protoss",
                "mineral": "100",
                "vespene": "100",
                "build_time": "140",
                "requires": "Forge"
            },
            "Ground Weapons Level 2": {
                "race": "Protoss",
                "mineral": "175",
                "vespene": "175",
                "build_time": "170",
                "requires": ["Ground Weapons Level 1", "Twilight Council"]
            },
            "Ground Weapons Level 3": {
                "race": "Protoss",
                "mineral": "250",
                "vespene": "250",
                "build_time": "200",
                "requires": "Ground Weapons Level 2"
            },
            "Ground Armor Level 1": {
                "race": "Protoss",
                "mineral": "100",
                "vespene": "100",
                "build_time": "140",
                "requires": "Forge"
            },
            "Ground Armor Level 2": {
                "race": "Protoss",
                "mineral": "175",
                "vespene": "175",
                "build_time": "170",
                "requires": ["Ground Armor Level 1", "Twilight Council"]
            },
            "Ground Armor Level 3": {
                "race": "Protoss",
                "mineral": "250",
                "vespene": "250",
                "build_time": "200",
                "requires": "Ground Armor Level 2"
            },
            "Charge": {
                "race": "Protoss",
                "mineral": "200",
                "vespene": "200",
                "build_time": "140",
                "requires": "Twilight Council"
            },
            "Blink": {
                "race": "Protoss",
                "mineral": "150",
                "vespene": "150",
                "build_time": "110",
                "requires": "Twilight Council"
            },
            "Psionic Storm": {
                "race": "Protoss",
                "mineral": "200",
                "vespene": "200",
                "build_time": "110",
                "requires": "Templar Archives"
            },
            "Khaydarin Amulet": {
                "race": "Protoss",
                "mineral": "150",
                "vespene": "150",
                "build_time": "110",
                "requires": "Templar Archives"
            },
            "Extended Thermal Lances": {
                "race": "Protoss",
                "mineral": "200",
                "vespene": "200",
                "build_time": "140",
                "requires": "Robotics Bay"
            },
            "Gravitic Booster": {
                "race": "Protoss",
                "mineral": "100",
                "vespene": "100",
                "build_time": "110",
                "requires": "Robotics Bay"
            },
            "Gravitic Drive": {
                "race": "Protoss",
                "mineral": "100",
                "vespene": "100",
                "build_time": "80",
                "requires": "Robotics Bay"
            },
            "Flux Vanes": {
                "race": "Protoss",
                "mineral": "150",
                "vespene": "150",
                "build_time": "80",
                "requires": "Fleet Beacon"
            },
            "Graviton Catapult": {
                "race": "Protoss",
                "mineral": "150",
                "vespene": "150",
                "build_time": "80",
                "requires": "Fleet Beacon"
            },
            /**
             * Terran Units
             */
            "SCV": {
                "build_from": "Command Center",
                "race": "Terran",
                "health": "45",
                "mineral": "50",
                "supply": "1",
                "armor": "0",
                "energy": "0",
                "build_time": "17",
                "vespene": "0"
            },
            "MULE": {
                "build_from": "Orbital Command",
                "race": "Terran",
                "health": "60",
                "mineral": "0",
                "supply": "0",
                "armor": "0",
                "energy": "0",
                "build_time": "0",
                "vespene": "0"
            },
            "Marine": {
                "build_from": "Barracks",
                "race": "Terran",
                "health": "45",
                "mineral": "50",
                "supply": "1",
                "armor": "0",
                "energy": "0",
                "build_time": "25",
                "vespene": "0"
            },
            "Marauder": {
                "build_from": "Barracks",
                "race": "Terran",
                "health": "125",
                "mineral": "100",
                "supply": "2",
                "armor": "1",
                "energy": "0",
                "build_time": "30",
                "requires": "Tech Lab",
                "vespene": "25"
            },
            "Reaper": {
                "build_from": "Barracks",
                "race": "Terran",
                "health": "50",
                "mineral": "50",
                "supply": "1",
                "armor": "0",
                "energy": "0",
                "build_time": "45",
                "requires": "Tech Lab",
                "vespene": "50"
            },
            "Ghost": {
                "build_from": "Barracks",
                "race": "Terran",
                "health": "100",
                "mineral": "150",
                "supply": "2",
                "armor": "0",
                "energy": "200",
                "build_time": "40",
                "requires": ["Ghost Academy", "Tech Lab"],
                "vespene": "150"
            },
            "Hellion": {
                "build_from": "Factory",
                "race": "Terran",
                "health": "90",
                "mineral": "100",
                "supply": "2",
                "armor": "0",
                "energy": "0",
                "build_time": "30",
                "vespene": "0"
            },
            "Siege Tank": {
                "build_from": "Factory",
                "race": "Terran",
                "health": "160",
                "mineral": "150",
                "supply": "3",
                "armor": "1",
                "energy": "0",
                "build_time": "45",
                "requires": "Tech Lab",
                "vespene": "125"
            },
            "Thor": {
                "build_from": "Factory",
                "race": "Terran",
                "health": "400",
                "mineral": "300",
                "supply": "6",
                "armor": "1",
                "energy": "200",
                "build_time": "60",
                "requires": ["Armory", "Tech Lab"],
                "vespene": "200"
            },
            "Viking": {
                "build_from": "Starport",
                "race": "Terran",
                "health": "125",
                "mineral": "150",
                "supply": "2",
                "armor": "0",
                "energy": "0",
                "build_time": "42",
                "vespene": "75"
            },
            "Medivac": {
                "build_from": "Starport",
                "race": "Terran",
                "health": "150",
                "mineral": "100",
                "supply": "2",
                "armor": "1",
                "energy": "200",
                "build_time": "42",
                "vespene": "100"
            },
            "Raven": {
                "build_from": "Starport",
                "race": "Terran",
                "health": "140",
                "mineral": "100",
                "supply": "2",
                "armor": "1",
                "energy": "200",
                "build_time": "60",
                "requires": "Tech Lab",
                "vespene": "200"
            },
            "Banshee": {
                "build_from": "Starport",
                "race": "Terran",
                "health": "140",
                "mineral": "150",
                "supply": "3",
                "armor": "0",
                "energy": "200",
                "build_time": "60",
                "requires": "Tech Lab",
                "vespene": "100"
            },
            "Battlecruiser": {
                "build_from": "Starport",
                "race": "Terran",
                "health": "550",
                "mineral": "400",
                "supply": "6",
                "armor": "3",
                "energy": "200",
                "build_time": "90",
                "requires": ["Fusion Core", "Tech Lab"],
                "vespene": "300",
                "uid": 70
            },
            /**
             * Terran Structures
             */
            "Command Center": {
                "race": "Terran",
                "mineral": "400",
                "vespene": "0",
                "build_time": "100",
                "requires": "",
                "supplier": true,
                "supply": "11"
            },
            "Supply Depot": {
                "race": "Terran",
                "mineral": "100",
                "vespene": "0",
                "build_time": "30",
                "requires": "",
                "supplier": true,
                "supply": "8"
            },
            "Refinery": {
                "race": "Terran",
                "mineral": "75",
                "vespene": "0",
                "build_time": "30",
                "requires": ""
            },
            "Barracks": {
                "race": "Terran",
                "mineral": "150",
                "vespene": "0",
                "build_time": "60",
                "requires": ""
            },
            "Engineering Bay": {
                "race": "Terran",
                "mineral": "125",
                "vespene": "0",
                "build_time": "35",
                "requires": ""
            },
            "Bunker": {
                "race": "Terran",
                "mineral": "100",
                "vespene": "0",
                "build_time": "35",
                "requires": "Barracks"
            },
            "Missile Turret": {
                "race": "Terran",
                "mineral": "100",
                "vespene": "0",
                "build_time": "25",
                "requires": "Engineering Bay"
            },
            "Sensor Tower": {
                "race": "Terran",
                "mineral": "125",
                "vespene": "100",
                "build_time": "25",
                "requires": "Engineering Bay"
            },
            "Factory": {
                "race": "Terran",
                "mineral": "150",
                "vespene": "100",
                "build_time": "60",
                "requires": "Barracks"
            },
            "Ghost Academy": {
                "race": "Terran",
                "mineral": "150",
                "vespene": "50",
                "build_time": "40",
                "requires": "Barracks"
            },
            "Armory": {
                "race": "Terran",
                "mineral": "150",
                "vespene": "100",
                "build_time": "65",
                "requires": "Factory"
            },
            "Starport": {
                "race": "Terran",
                "mineral": "150",
                "vespene": "100",
                "build_time": "50",
                "requires": "Factory"
            },
            "Fusion Core": {
                "race": "Terran",
                "mineral": "150",
                "vespene": "150",
                "build_time": "65",
                "requires": "Starport"
            },
            "Tech Lab": {
                "race": "Terran",
                "mineral": "50",
                "vespene": "25",
                "build_time": "25",
                "requires": "Barracks"
            },
            "Reactor": {
                "race": "Terran",
                "mineral": "50",
                "vespene": "50",
                "build_time": "50",
                "requires": "Barracks"
            },
            "Orbital Command": {
                "race": "Terran",
                "mineral": "150",
                "vespene": "0",
                "build_time": "35",
                "requires": "Barracks"
            },
            "Planetary Fortress": {
                "race": "Terran",
                "mineral": "150",
                "vespene": "150",
                "build_time": "50",
                "requires": "Engineering Bay"
            },
            /**
             * Terran Upgrades
             */
            "Infantry Weapons Level 1": {
                "race": "Terran",
                "mineral": "100",
                "vespene": "100",
                "build_time": "160",
                "requires": "Engineering Bay"
            },
            "Infantry Weapons Level 2": {
                "race": "Terran",
                "mineral": "175",
                "vespene": "175",
                "build_time": "190",
                "requires": ["Infantry Weapons Level 1", "Armory"]
            },
            "Infantry Weapons Level 3": {
                "race": "Terran",
                "mineral": "250",
                "vespene": "250",
                "build_time": "220",
                "requires": "Infantry Weapons Level 2"
            },
            "Infantry Armor Level 1": {
                "race": "Terran",
                "mineral": "100",
                "vespene": "100",
                "build_time": "160",
                "requires": "Engineering Bay"
            },
            "Infantry Armor Level 2": {
                "race": "Terran",
                "mineral": "175",
                "vespene": "175",
                "build_time": "190",
                "requires": ["Infantry Armor Level 1", "Armory"]
            },
            "Infantry Armor Level 3": {
                "race": "Terran",
                "mineral": "250",
                "vespene": "250",
                "build_time": "220",
                "requires": "Infantry Armor Level 2"
            },
            "Building Armor": {
                "race": "Terran",
                "mineral": "150",
                "vespene": "150",
                "build_time": "140",
                "requires": "Engineering Bay"
            },
            "Hi-Sec Auto Tracking": {
                "race": "Terran",
                "mineral": "100",
                "vespene": "100",
                "build_time": "80",
                "requires": "Engineering Bay"
            },
            "Neosteel Frames": {
                "race": "Terran",
                "mineral": "100",
                "vespene": "100",
                "build_time": "110",
                "requires": "Engineering Bay"
            },
            "Moebius Reactor": {
                "race": "Terran",
                "mineral": "100",
                "vespene": "100",
                "build_time": "80",
                "requires": "Ghost Academy"
            },
            "Personal Cloaking": {
                "race": "Terran",
                "mineral": "150",
                "vespene": "150",
                "build_time": "120",
                "requires": "Ghost Academy"
            },
            "Arm Silo with Nuke": {
                "race": "Terran",
                "mineral": "100",
                "vespene": "100",
                "build_time": "60",
                "requires": ["Ghost Academy", "Armory"]
            },
            "Vehicle Weapons Level 1": {
                "race": "Terran",
                "mineral": "100",
                "vespene": "100",
                "build_time": "160",
                "requires": "Armory"
            },
            "Vehicle Weapons Level 2": {
                "race": "Terran",
                "mineral": "175",
                "vespene": "175",
                "build_time": "190",
                "requires": "Vehicle Weapons Level 1"
            },
            "Vehicle Weapons Level 3": {
                "race": "Terran",
                "mineral": "250",
                "vespene": "250",
                "build_time": "220",
                "requires": "Vehicle Weapons Level 3"
            },
            "Vehicle Plating Level 1": {
                "race": "Terran",
                "mineral": "100",
                "vespene": "100",
                "build_time": "160",
                "requires": "Armory"
            },
            "Vehicle Plating Level 2": {
                "race": "Terran",
                "mineral": "175",
                "vespene": "175",
                "build_time": "190",
                "requires": "Vehicle Plating Level 1"
            },
            "Vehicle Plating Level 3": {
                "race": "Terran",
                "mineral": "250",
                "vespene": "250",
                "build_time": "220",
                "requires": "Vehicle Plating Level 2"
            },
            "Ship Weapons Level 1": {
                "race": "Terran",
                "mineral": "100",
                "vespene": "100",
                "build_time": "160",
                "requires": "Armory"
            },
            "Ship Weapons Level 2": {
                "race": "Terran",
                "mineral": "175",
                "vespene": "175",
                "build_time": "190",
                "requires": "Ship Weapons Level 1"
            },
            "Ship Weapons Level 3": {
                "race": "Terran",
                "mineral": "250",
                "vespene": "250",
                "build_time": "220",
                "requires": "Ship Weapons Level 2"
            },
            "Ship Plating Level 1": {
                "race": "Terran",
                "mineral": "150",
                "vespene": "150",
                "build_time": "160",
                "requires": "Armory"
            },
            "Ship Plating Level 2": {
                "race": "Terran",
                "mineral": "225",
                "vespene": "225",
                "build_time": "190",
                "requires": "Ship Plating Level 1"
            },
            "Ship Plating Level 3": {
                "race": "Terran",
                "mineral": "300",
                "vespene": "300",
                "build_time": "220",
                "requires": "Ship Plating Level 2"
            },
            "Behemoth Reactor": {
                "race": "Terran",
                "mineral": "150",
                "vespene": "150",
                "build_time": "80",
                "requires": "Fusion Core"
            },
            "Weapon Refit": {
                "race": "Terran",
                "mineral": "150",
                "vespene": "150",
                "build_time": "60",
                "requires": "Fusion Core"
            },
            "Stimpack": {
                "race": "Terran",
                "mineral": "100",
                "vespene": "100",
                "build_time": "140",
                "requires": ["Barracks", "Tech Lab"]
            },
            "Combat Shield": {
                "race": "Terran",
                "mineral": "100",
                "vespene": "100",
                "build_time": "110",
                "requires": ["Barracks", "Tech Lab"]
            },
            "Infernal Pre-Igniter": {
                "race": "Terran",
                "mineral": "150",
                "vespene": "150",
                "build_time": "110",
                "requires": ["Factory", "Tech Lab"]
            },
            "Siege Tech": {
                "race": "Terran",
                "mineral": "100",
                "vespene": "100",
                "build_time": "80",
                "requires": ["Factory", "Tech Lab"]
            },
            "Corvid Reactor": {
                "race": "Terran",
                "mineral": "150",
                "vespene": "150",
                "build_time": "110",
                "requires": ["Starport", "Tech Lab"]
            },
            "Caduceus Reactor": {
                "race": "Terran",
                "mineral": "100",
                "vespene": "100",
                "build_time": "80",
                "requires": ["Starport", "Tech Lab"]
            },
            "Seeker Missile": {
                "race": "Terran",
                "mineral": "150",
                "vespene": "150",
                "build_time": "110",
                "requires": ["Starport", "Tech Lab", "Fusion Core"]
            },
            "Durable Materials": {
                "race": "Terran",
                "mineral": "150",
                "vespene": "150",
                "build_time": "110",
                "requires": ["Starport", "Tech Lab"]
            },
            "Cloaking Field": {
                "race": "Terran",
                "mineral": "200",
                "vespene": "200",
                "build_time": "110",
                "requires": ["Starport", "Tech Lab", "Fusion Core"]
            },
            "Nitro Packs": {
                "race": "Terran",
                "mineral": "50",
                "vespene": "50",
                "build_time": "100",
                "requires": ["Barracks", "Tech Lab"]
            },
            "Concussive Shells": {
                "race": "Terran",
                "mineral": "50",
                "vespene": "50",
                "build_time": "60",
                "requires": ["Barracks", "Tech Lab"]
            },
            "250mm Strike Cannons": {
                "race": "Terran",
                "mineral": "150",
                "vespene": "150",
                "build_time": "110",
                "requires": ["Factory", "Tech Lab"]
            },
            /**
             * Zerg Units
             */
            "Larva": {
                "build_from": "",
                "race": "Zerg",
                "health": "25",
                "mineral": "-",
                "supply": "0",
                "armor": "10",
                "energy": "0",
                "build_time": "-",
                "vespene": "0"
            },
            "Drone": {
                "build_from": "Hatchery",
                "race": "Zerg",
                "health": "40",
                "mineral": "50",
                "supply": "1",
                "armor": "0",
                "energy": "0",
                "build_time": "17",
                "vespene": "0"
            },
            "Overlord": {
                "build_from": "Hatchery",
                "race": "Zerg",
                "health": "200",
                "mineral": "100",
                "supplier": true,
                "supply": "8",
                "armor": "0",
                "energy": "0",
                "build_time": "25",
                "vespene": "0"
            },
            "Zergling": {
                "build_from": "Spawning Pool",
                "race": "Zerg",
                "health": "35",
                "mineral": "50",
                "supply": "1",
                "armor": "0",
                "energy": "0",
                "build_time": "24",
                "vespene": "0"
            },
            "Queen": {
                "build_from": "Spawning Pool",
                "race": "Zerg",
                "health": "175",
                "mineral": "150",
                "supply": "2",
                "armor": "1",
                "energy": "200",
                "build_time": "50",
                "vespene": "0"
            },
            "Hydralisk": {
                "build_from": "Hydralisk Den",
                "race": "Zerg",
                "health": "80",
                "mineral": "100",
                "supply": "2",
                "armor": "0",
                "energy": "0",
                "build_time": "33",
                "vespene": "50"
            },
            "Baneling": {
                "build_from": "Zergling",
                "race": "Zerg",
                "health": "30",
                "mineral": "25",
                "supply": "0",
                "armor": "0",
                "energy": "0",
                "build_time": "20",
                "requires": "Baneling Nest",
                "vespene": "25"
            },
            "Overseer": {
                "build_from": "Overlord",
                "race": "Zerg",
                "health": "200",
                "mineral": "50",
                "supply": "0",
                "armor": "1",
                "energy": "200",
                "build_time": "17",
                "requires": "Lair",
                "vespene": "100"
            },
            "Roach": {
                "build_from": "Roach Warren",
                "race": "Zerg",
                "health": "145",
                "mineral": "75",
                "supply": "2",
                "armor": "1",
                "energy": "0",
                "build_time": "27",
                "vespene": "25"
            },
            "Infestor": {
                "build_from": "Infestation Pit",
                "race": "Zerg",
                "health": "90",
                "mineral": "100",
                "supply": "2",
                "armor": "0",
                "energy": "200",
                "build_time": "50",
                "vespene": "150"
            },
            "Mutalisk": {
                "build_from": "Spire",
                "race": "Zerg",
                "health": "120",
                "mineral": "100",
                "supply": "2",
                "armor": "0",
                "energy": "0",
                "build_time": "33",
                "vespene": "100"
            },
            "Corruptor": {
                "build_from": "Spire",
                "race": "Zerg",
                "health": "200",
                "mineral": "150",
                "supply": "2",
                "armor": "2",
                "energy": "200",
                "build_time": "40",
                "vespene": "100"
            },
            "Nydus Worm": {
                "build_from": "Nydus Network",
                "race": "Zerg",
                "health": "200",
                "mineral": "100",
                "supply": "0",
                "armor": "1",
                "energy": "0",
                "build_time": "20",
                "vespene": "100"
            },
            "Ultralisk": {
                "build_from": "Ultralisk Cavern",
                "race": "Zerg",
                "health": "500",
                "mineral": "300",
                "supply": "6",
                "armor": "1",
                "energy": "0",
                "build_time": "70",
                "vespene": "200"
            },
            "Brood Lord": {
                "build_from": "Corruptor",
                "race": "Zerg",
                "health": "225",
                "mineral": "150",
                "supply": "4",
                "armor": "1",
                "energy": "0",
                "build_time": "34",
                "requires": "Greater Spire",
                "vespene": "150"
            },
            /**
             * Zerg Structures
             */
            "Hatchery": {
                "race": "Zerg",
                "mineral": "300",
                "vespene": "0",
                "build_time": "100",
                "requires": "",
                "supplier": true,
                "supply": "2"
            },
            "Extractor": {
                "race": "Zerg",
                "mineral": "25",
                "vespene": "0",
                "build_time": "30",
                "requires": "",
                "supply": "-1"
            },
            "Spawning Pool": {
                "race": "Zerg",
                "mineral": "200",
                "vespene": "0",
                "build_time": "65",
                "requires": "",
                "supply": "-1"
            },
            "Evolution Chamber": {
                "race": "Zerg",
                "mineral": "75",
                "vespene": "0",
                "build_time": "35",
                "requires": "",
                "supply": "-1"
            },
            "Spine Crawler": {
                "race": "Zerg",
                "mineral": "100",
                "vespene": "0",
                "build_time": "50",
                "requires": "Spawning Pool",
                "supply": "-1"
            },
            "Spore Crawler": {
                "race": "Zerg",
                "mineral": "75",
                "vespene": "0",
                "build_time": "30",
                "requires": "Evolution Chamber",
                "supply": "-1"
            },
            "Hydralisk Den": {
                "race": "Zerg",
                "mineral": "100",
                "vespene": "100",
                "build_time": "40",
                "requires": "Lair"
            },
            "Baneling Nest": {
                "race": "Zerg",
                "mineral": "100",
                "vespene": "50",
                "build_time": "60",
                "requires": "Spawning Pool"
            },
            "Roach Warren": {
                "race": "Zerg",
                "mineral": "150",
                "vespene": "0",
                "build_time": "55",
                "requires": "Spawning Pool"
            },
            "Infestation Pit": {
                "race": "Zerg",
                "mineral": "100",
                "vespene": "100",
                "build_time": "50",
                "requires": "Lair"
            },
            "Spire": {
                "race": "Zerg",
                "mineral": "200",
                "vespene": "200",
                "build_time": "100",
                "requires": "Lair"
            },
            "Nydus Network": {
                "race": "Zerg",
                "mineral": "150",
                "vespene": "200",
                "build_time": "50",
                "requires": "Lair"
            },
            "Ultralisk Cavern": {
                "race": "Zerg",
                "mineral": "150",
                "vespene": "200",
                "build_time": "65",
                "requires": "Hive"
            },
            "Creep Tumor": {
                "race": "Zerg",
                "mineral": "0",
                "vespene": "0",
                "build_time": "15",
                "requires": "Queen"
            },
            "Lair": {
                "race": "Zerg",
                "mineral": "150",
                "vespene": "100",
                "build_time": "80",
                "requires": ["Hatchery", "Spawning Pool"]
            },
            "Hive": {
                "race": "Zerg",
                "mineral": "200",
                "vespene": "150",
                "build_time": "100",
                "requires": "Infestation Pit"
            },
            "Greater Spire": {
                "race": "Zerg",
                "mineral": "100",
                "vespene": "150",
                "build_time": "100",
                "requires": ["Spire", "Hive"]
            },
            /**
             * Zerg Upgrades
             */
            "Adrenal Glands": {
                "race": "Zerg",
                "mineral": "200",
                "vespene": "200",
                "build_time": "130",
                "requires": ["Spawning Pool", "Hive"]
            },
            "Metabolic Boost": {
                "race": "Zerg",
                "mineral": "100",
                "vespene": "100",
                "build_time": "110",
                "requires": "Spawning Pool"
            },
            "Melee Attacks Level 1": {
                "race": "Zerg",
                "mineral": "100",
                "vespene": "100",
                "build_time": "140",
                "requires": "Evolution Chamber"
            },
            "Melee Attacks Level 2": {
                "race": "Zerg",
                "mineral": "150",
                "vespene": "150",
                "build_time": "170",
                "requires": ["Melee Attacks Level 1", "Lair"]
            },
            "Melee Attacks Level 3": {
                "race": "Zerg",
                "mineral": "200",
                "vespene": "200",
                "build_time": "200",
                "requires": ["Melee Attacks Level 2", "Hive"]
            },
            "Ground Carapace Level 1": {
                "race": "Zerg",
                "mineral": "150",
                "vespene": "150",
                "build_time": "140",
                "requires": "Evolution Chamber"
            },
            "Ground Carapace Level 2": {
                "race": "Zerg",
                "mineral": "225",
                "vespene": "225",
                "build_time": "170",
                "requires": ["Ground Carapace Level 1", "Lair"]
            },
            "Ground Carapace Level 3": {
                "race": "Zerg",
                "mineral": "300",
                "vespene": "300",
                "build_time": "200",
                "requires": ["Ground Carapace Level 2", "Hive"]
            },
            "Missile Attacks Level 1": {
                "race": "Zerg",
                "mineral": "100",
                "vespene": "100",
                "build_time": "140",
                "requires": "Evolution Chamber"
            },
            "Missile Attacks Level 2": {
                "race": "Zerg",
                "mineral": "150",
                "vespene": "150",
                "build_time": "170",
                "requires": ["Missile Attacks Level 1", "Lair"]
            },
            "Missile Attacks Level 3": {
                "race": "Zerg",
                "mineral": "200",
                "vespene": "200",
                "build_time": "200",
                "requires": ["Missile Attacks Level 2", "Hive"]
            },
            "Grooved Spines": {
                "race": "Zerg",
                "mineral": "150",
                "vespene": "150",
                "build_time": "80",
                "requires": "Hydralisk Den"
            },
            "Centrifugal Hooks": {
                "race": "Zerg",
                "mineral": "150",
                "vespene": "150",
                "build_time": "110",
                "requires": "Baneling Nest"
            },
            "Pneumatized Carapace": {
                "race": "Zerg",
                "mineral": "100",
                "vespene": "100",
                "build_time": "60",
                "requires": "Lair"
            },
            "Ventral Sacs": {
                "race": "Zerg",
                "mineral": "200",
                "vespene": "200",
                "build_time": "130",
                "requires": "Lair"
            },
            "Gilal Reconstitution": {
                "race": "Zerg",
                "mineral": "100",
                "vespene": "100",
                "build_time": "110",
                "requires": "Roach Warren"
            },
            "Tunneling Claws": {
                "race": "Zerg",
                "mineral": "150",
                "vespene": "150",
                "build_time": "110",
                "requires": "Roach Warren"
            },
            "Pathogen Glands": {
                "race": "Zerg",
                "mineral": "150",
                "vespene": "150",
                "build_time": "80",
                "requires": "Infestation Pit"
            },
            "Neural Parasite": {
                "race": "Zerg",
                "mineral": "150",
                "vespene": "150",
                "build_time": "110",
                "requires": "Infestation Pit"
            },
            "Flyer Attack Level 1": {
                "race": "Zerg",
                "mineral": "100",
                "vespene": "100",
                "build_time": "140",
                "requires": "Spire"
            },
            "Flyer Attack Level 2": {
                "race": "Zerg",
                "mineral": "175",
                "vespene": "175",
                "build_time": "170",
                "requires": ["Flyer Attack Level 1", "Lair"]
            },
            "Flyer Attack Level 3": {
                "race": "Zerg",
                "mineral": "250",
                "vespene": "250",
                "build_time": "200",
                "requires": ["Flyer Attack Level 2", "Hive"]
            },
            "Flyer Carapace Level 1": {
                "race": "Zerg",
                "mineral": "150",
                "vespene": "150",
                "build_time": "140",
                "requires": "Spire"
            },
            "Flyer Carapace Level 2": {
                "race": "Zerg",
                "mineral": "225",
                "vespene": "225",
                "build_time": "170",
                "requires": ["Flyer Carapace Level 1", "Lair"]
            },
            "Flyer Carapace Level 3": {
                "race": "Zerg",
                "mineral": "300",
                "vespene": "300",
                "build_time": "200",
                "requires": ["Flyer Carapace Level 2", "Hive"]
            },
            "Chitinous Plating": {
                "race": "Zerg",
                "mineral": "150",
                "vespene": "150",
                "build_time": "110",
                "requires": "Ultralisk Cavern"
            }
        };
    
    /*
     * Generate a "regex" property whose value is a regular
     * expression matching any of the individual sc2objects
     */ 
    sc2objects.regex = (function () {
        var s, o;
        for (o in sc2objects) {
            s += o + "|";
        }
        return RegExp("\\b" + s.slice(0, -1) + "\\b", "i");
    })();
    
    /*
     * Title Caps
     *
     * Ported to JavaScript By John Resig - http://ejohn.org/ - 21 May 2008
     * Original by John Gruber - http://daringfireball.net/ - 10 May 2008
     * License: http://www.opensource.org/licenses/mit-license.php
     */
    function titleCaps (title) {
        var small = "(a|an|and|as|at|but|by|en|for|if|in|of|on|or|the|to|v[.]?|via|vs[.]?)",
            punct = "([!\"#$%&'()*+,./:;<=>?@[\\\\\\]^_`{|}~-]*)",
            parts = [], split = /[:.;?!] |(?: |^)["Ò]/g, index = 0;

        while (true) {
            var m = split.exec(title);

            parts.push( title.substring(index, m ? m.index : title.length)
                .replace(/\b([A-Za-z][a-z.'Õ]*)\b/g, function(all){
                    return (/[A-Za-z]\.[A-Za-z]/).test(all) ? all : upper(all);
                })
                .replace(RegExp("\\b" + small + "\\b", "ig"), lower)
                .replace(RegExp("^" + punct + small + "\\b", "ig"), function(all, punct, word){
                    return punct + upper(word);
                })
                .replace(RegExp("\\b" + small + punct + "$", "ig"), upper));

            index = split.lastIndex;

            if ( m ) {
                parts.push( m[0] );
            } else {
                break;
            }
        }

        return parts.join("").replace(/ V(s?)\. /ig, " v$1. ")
            .replace(/(['Õ])S\b/ig, "$1s")
            .replace(/\b(AT&T|Q&A)\b/ig, function(all){
                return all.toUpperCase();
            });
    }

    function lower(word){
        return word.toLowerCase();
    }

    function upper(word){
        return word.substr(0,1).toUpperCase() + word.substr(1);
    }

    function generateHTML (name, sc2obj) {
        var header = "<table><tr><th align='left'>{{name}}</th>" +
                     "<th style='background-image: url(\"{{sprite}}\"); background-repeat: no-repeat; {{race}};'" +
                     "height='25px' width='25px' align='right'>&nbsp;</th></tr></table>",
            
            resources = "<span class='sc2-resource' style='background-image: url(\"{{sprite}}\"); {{bg_supply}};'>&nbsp;&nbsp;&nbsp;&nbsp;{{supply}}</span>" +
                        "<span class='sc2-resource' style='background-image: url(\"{{sprite}}\"); {{bg_mineral}};'>&nbsp;&nbsp;&nbsp;&nbsp;{{mineral}}</span>" +
                        "<span class='sc2-resource' style='background-image: url(\"{{sprite}}\"); {{bg_vespene}};'>&nbsp;&nbsp;&nbsp;&nbsp;{{vespene}}</span>" +
                        "<span class='sc2-resource' style='background-image: url(\"{{sprite}}\"); {{bg_build_time}};'>&nbsp;&nbsp;&nbsp;&nbsp;{{build_time}}</span><div style='clear: both'></div><br />";
        
        
        // Inject object's name and image sprite path
        header = header.replace("{{name}}", name)
                       .replace("{{sprite}}", hovercard_sprites.img)
                       .replace("{{race}}", hovercard_sprites[sc2obj.race]);
                       
        resources = resources.replace(/{{sprite}}/g, hovercard_sprites.img);
        
        
        // Inject object's mineral count (or "0") and mineral sprite
        resources = resources.replace("{{mineral}}", (sc2obj.mineral ? sc2obj.mineral : "0"))
                             .replace("{{bg_mineral}}", hovercard_sprites.mineral);
                             
                             
        // Inject object's supply count (or "0") and supply sprite
        resources = resources.replace("{{supply}}", (sc2obj.supply ? sc2obj.supply : "0"))
                             .replace("{{bg_supply}}", hovercard_sprites.supply[sc2obj.race]);

                 
        // Inject object's vespene count (or "0") and vespene sprite
        resources = resources.replace("{{vespene}}", (sc2obj.vespene ? sc2obj.vespene : "0"))
                             .replace("{{bg_vespene}}", hovercard_sprites.vespene[sc2obj.race]);

        // Inject object's build time (or "0") and build time sprite
        resources = resources.replace("{{build_time}}", (sc2obj.build_time ? sc2obj.build_time : "0"))
                             .replace("{{bg_build_time}}", hovercard_sprites.build_time[sc2obj.race]);
                             
        // Build "Requires" list
        if (sc2obj.build_from) { 
            resources += "<p>Requires: <span class='sc2hc-requires'>" + sc2obj.build_from + "</span>";
            if (!sc2obj.requires) { resources += "</p>"; }
        }
        
        if (sc2obj.requires) {
            if (Object.prototype.toString.apply(sc2obj.requires) === '[object Array]') {
                if (!sc2obj.build_from) { resources += "<p>Requires: "; }
                for (var i = 0; i < sc2obj.requires.length; i += 1) {
                    resources += "<span class='sc2hc-requires'>" + sc2obj.requires[i] + "</span>";
                    if (i !== sc2obj.requires.length - 1) { resources += " > "; }
                }
                resources += "</p>";
            } else {
            
                resources += sc2obj.build_from ? " > " + "<span class='sc2hc-requires'>" + sc2obj.requires + "</span></p>" : "<p>Requires: <span class='sc2hc-requires'>" + sc2obj.requires + "</span></p>";
            }
        }
                
        return (header + resources);
    }
 
    function getMouseCoords (e) {
        var posx = 0,
            posy = 0;

        if (!e) { var e = window.event };
        
        if (e.pageX || e.pageY) {
            posx = e.pageX;
            posy = e.pageY;
        } else if (e.clientX || e.clientY) {
            posx = e.clientX + document.body.scrollLeft 
                + document.documentElement.scrollLeft;
            posy = e.clientY + document.body.scrollTop
                + document.documentElement.scrollTop;
        }
        
        return { x: posx, y: posy };
    }
    
    function showHovercard (that, coords) {
        var name = titleCaps(that.getAttribute("rel").toLowerCase());
        hovercard.innerHTML = generateHTML(name, sc2objects[name]);
        hovercard.style.left = (coords.x + 10) + "px";
        hovercard.style.top = (coords.y + 10) + "px";
        hovercard.style.display = "block";
    }
    
    function hideHovercard () {
        hovercard.style.display = "none";
    }
    
    function init () {
        hovercard.id = "sc2-hovercard";
        hovercard.style.zIndex = "999999";
        hovercard.style.position = "absolute";
        hovercard.style.display = "none";
        
        if (!hovercard_customized) {
            var e = document.createElement("style");
            if (e.styleSheet) {
                e.styleSheet.cssText = hovercard_style;
            } else {
                e.appendChild(document.createTextNode(hovercard_style));
            }
            document.getElementsByTagName("head")[0].appendChild(e);
        }

        document.body.appendChild(hovercard);
    }
    
    init();
    
    // Attach an event listener all elements with matching rel tags
    for ( ; i < elements.length; i += 1) {
        var e = elements[i];
        if (sc2objects.regex.test(e.getAttribute("rel"))) {
            e.onmousemove = function (ev) {
                var coords = getMouseCoords(ev);
                if (!coords) { return; }
                hovercard.style.top = (coords.y + 10) + "px";
                hovercard.style.left = (coords.x + 10) + "px";
                if (hovercard.style.display !== 'block') {
                    var that = this;
                    showHovercard(that, coords)
                }
            };
            
            if (!hovercard_customized) { e.style.cursor = "pointer" };
            
            // Hide or cancel hovercard on mouseout
            e.onmouseout = function () {
                hideHovercard();
            };
        }
    }
})();
