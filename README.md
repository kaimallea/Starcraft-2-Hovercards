# SC2 Hovercards

## About

SC2 Hovercards are cards that appear when you hover over specific elements on a web page. The cards contain information specific to Starcraft 2 multiplayer game objects (units, structures, upgrades)  .

## Usage

To use, simply include the JS file at the _bottom_ of your `<body>` tag. It is _required_ to be at the bottom to ensure that it is loaded _after_ all other elements.

Any elements containing a `rel` attribute that references a SC2 multiplayer object will produce a hovercard when moused over.

### Example

    <!DOCTYPE html>
    <html lang="en">
      <body>
          <p>
            A span: <span rel="marine">A Marine!</span>
          </p>
          
          <p>
            A link: <a href="#" rel="battlecruiser">Battlecruiser</a>
          </p>
          
          <p>
            A list:
            <ul>
              <li rel="zergling">Zergling</li>
              <li rel="void ray">I hate Void Rays!</li>
              <li rel="command center">A structure that can fly</li>
              <li rel="chitinous plating">Chitinous Plating</li>
            </ul>
          </p>
          
          <script src="http://commondatastorage.googleapis.com/mallea/js/sc2-hovercards-min.js"></script>
      </body>
    </html>

## Hosted Version

For best performance (and convenience), I have hosted a minified copy of the latest version on [Google Storage][1], as shown in the example above. This guarantees it will always be available, is served in a compressed format (gzip) to browsers that support it (most modern browsers) and cached for two weeks. This reduces the total download size of the javascript to _5.2kb_! This is the easiest and recommended method for using it.

>[http://commondatastorage.googleapis.com/mallea/js/sc2-hovercards-min.js][2]

## Reference

Below is a listing of all the game objects that can be specified within a `rel` tag (case-insensitive):

### Protoss Units

* Archon
* Carrier
* Colossus
* Dark Templar
* High Templar
* Immortal
* Inteceptors
* Mothership
* Observer
* Phoenix
* Probe
* Sentry
* Stalker
* Void Ray
* Warp Prism
* Zealot

### Protoss Structures

* Assimilator
* Cybernetics Core
* Dark Shrine
* Fleet Beacon
* Forge
* Gateway
* Nexus
* Photon Cannon
* Pylon
* Robotics Bay
* Robotics Facility
* Stargate
* Templar Archives
* Twilight Council

### Protoss Upgrades

* Air Armor Level 1
* Air Armor Level 2
* Air Armor Level 3
* Air Weapons Level 1
* Air Weapons Level 2
* Air Weapons Level 3
* Blink
* Charge
* Extended Thermal Lances
* Flux Vanes
* Gravitic Booster
* Gravitic Drive
* Graviton Catapult
* Ground Armor Level 1
* Ground Armor Level 2
* Ground Armor Level 3
* Ground Weapons Level 1
* Ground Weapons Level 2
* Ground Weapons Level 3
* Hallucination
* Khaydarin Amulet
* Psionic Storm
* Shields Level 1
* Shields Level 2
* Shields Level 3
* Warpgate

### Terran Units

* Banshee
* Battlecruiser
* Ghost
* Hellion
* Marauder
* Marine
* Medivac
* MULE
* Raven
* Reaper
* SCV
* Siege Tank
* Thor
* Viking

### Terran Structures

* Armory
* Barracks
* Bunker
* Command Center
* Engineering Bay
* Factory
* Fusion Core
* Ghost Academy
* Missile Turret
* Reactor
* Refinery
* Sensor Tower
* Starport
* Supply Depot
* Tech Lab

### Terran Upgrades

* 250mm Strike Cannons
* Arm Silo with Nuke
* Behemoth Reactor
* Building Armor
* Caduceus Reactor
* Cloaking Field
* Combat Shield
* Concussive Shells
* Corvid Reactor
* Durable Materials
* Hi-Sec Auto Tracking
* Infantry Armor Level 1
* Infantry Armor Level 2
* Infantry Armor Level 3
* Infantry Weapons Level 1
* Infantry Weapons Level 2
* Infantry Weapons Level 3
* Infernal Pre-Igniter
* Moebius Reactor
* Neosteel Frames
* Nitro Packs
* Orbital Command
* Personal Cloaking
* Planetary Fortress
* Seeker Missile
* Ship Plating Level 1
* Ship Plating Level 2
* Ship Plating Level 3
* Ship Weapons Level 1
* Ship Weapons Level 2
* Ship Weapons Level 3
* Siege Tech
* Stimpack
* Vehicle Plating Level 1
* Vehicle Plating Level 2
* Vehicle Plating Level 3
* Vehicle Weapons Level 1
* Vehicle Weapons Level 2
* Vehicle Weapons Level 3
* Weapon Refit


### Zerg Units
 
* Baneling
* Brood Lord
* Corruptor
* Drone
* Hydralisk
* Infestor
* Larva
* Mutalisk
* Nydus Worm
* Overlord
* Overseer
* Queen
* Roach
* Ultralisk
* Zergling

### Zerg Structures

* Baneling Nest
* Creep Tumor
* Evolution Chamber
* Extractor
* Greater Spire
* Hatchery
* Hive
* Hydralisk Den
* Infestation Pit
* Lair
* Nydus Network
* Roach Warren
* Spawning Pool
* Spine Crawler
* Spire
* Spore Crawler
* Ultralisk Cavern

### Zerg Upgrades

* Adrenal Glands
* Centrifugal Hooks
* Chitinous Plating
* Flyer Attack Level 1
* Flyer Attack Level 2
* Flyer Attack Level 3
* Flyer Carapace Level 1
* Flyer Carapace Level 2
* Flyer Carapace Level 3
* Gilal Reconstitution
* Grooved Spines
* Ground Carapace Level 1
* Ground Carapace Level 2
* Ground Carapace Level 3
* Melee Attacks Level 1
* Melee Attacks Level 2
* Melee Attacks Level 3
* Metabolic Boost
* Missile Attacks Level 1
* Missile Attacks Level 2
* Missile Attacks Level 3
* Neural Parasite
* Pathogen Glands
* Pneumatized Carapace
* Tunneling Claws
* Ventral Sacs

[1]: http://code.google.com/apis/storage/ "Google Storage"
[2]: http://commondatastorage.googleapis.com/mallea/js/sc2-hovercards-min.js