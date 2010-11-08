# SC2 Hovercards

## About

SC2 Hovercards are cards that appear when you hover over specific elements on a web page. The cards contain information specific to Starcraft 2 multiplayer game objects.

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

[1]: http://code.google.com/apis/storage/ "Google Storage"
[2]: http://commondatastorage.googleapis.com/mallea/js/sc2-hovercards-min.js
