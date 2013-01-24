
# Overdrive

  An overdrive/distortion effect for the Web Audio API.

## Installation

    $ component install web-audio-components/overdrive

## Example Usage

```javascript
var context = new webkitAudioContext()
  , Overdrive = require("overdrive")
  , overdrive = new Overdrive(context, 2500, 0.5)
  , node = context.createOscillator();

node.connect(overdrive.input);
overdrive.connect(context.destination);
node.start(0);
```

For further examples, see the test files.

## API

### Overdrive(context, tone, drive)

Instantiate an Overdrive effect module. Expects an `AudioContext` as the first
parameter. Accepts AudioNode connections to the `.input` property.

**Parameters**

- `tone` Prefilter lowpass cutoff frequency.
- `drive` Distortion amount.

### .connect(node)

Connect an Overdrive module to an `AudioNode`.

### .disconnect()

Disconnect all outgoing connections from an Overdrive module.

## License

  Copyright (c) 2012 Nick Thompson

  Permission is hereby granted, free of charge, to any person
  obtaining a copy of this software and associated documentation
  files (the "Software"), to deal in the Software without
  restriction, including without limitation the rights to use,
  copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the
  Software is furnished to do so, subject to the following
  conditions:

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
  OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
  HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
  WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
  OTHER DEALINGS IN THE SOFTWARE.
