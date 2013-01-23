
/**
 * Overdrive effect module for the Web Audio API.
 *
 * @param {AudioContext} context
 * @param {Number} tone Min: 0, Max: 20050
 * @param {Number} drive Min: 0, Max: 1.0
 */

function Overdrive (context, tone, drive) {
  this.input = context.createGainNode();
  this.output = context.createGainNode();

  // Internal AudioNodes
  this._ws = context.createWaveShaper();
  this._lowpass = context.createBiquadFilter();

  // AudioNode graph routing
  this.input.connect(this._lowpass);
  this._lowpass.connect(this._ws);
  this._ws.connect(this.output);

  // Defaults
  for (var prop in this.meta) {
    this[prop] = this.meta[prop].defaultValue;
  }
}

Overdrive.prototype = Object.create(null, {

  /**
   * AudioNode prototype `connect` method.
   *
   * @param {AudioNode} dest
   */

  connect: {
    value: function (dest) {
      this.output.connect(dest);
    }
  },

  /**
   * AudioNode prototype `disconnect` method.
   */

  disconnect: {
    value: function () {
      this.output.disconnect();
    }
  },

  /**
   * Module parameter metadata.
   */

  meta: {
    value: {
      drive: {
        min: 0.0,
        max: 1.0,
        defaultValue: 0.5,
        type: "pot"
      },
      tone: {
        min: 200,
        max: 18000,
        defaultValue: 3000,
        type: "pot"
      }
    }
  },

  /**
   * Drive parameter; controls the aggressiveness of the waveshaper curve.
   */

  drive: {
    enumerable: true,
    get: function () { return this._drive; },
    set: function (value) {
      var k = value * 100
        , n = 22050
        , curve = new Float32Array(n)
        , deg = Math.PI / 180;

      this._drive = value;
      for (var i = 0; i < n; i++) {
        var x = i * 2 / n - 1;
        curve[i] = (3 + k) * x * 20 * deg / (Math.PI + k * Math.abs(x));
      }
      this._ws.curve = curve;
    }
  },

  /**
   * Tone parameter; adjusts the pre-filter lowpass cutoff frequency.
   */

  tone: {
    enumerable: true,
    get: function () { return this._lowpass.frequency.value; },
    set: function (value) {
      this._lowpass.frequency.setValueAtTime(value, 0);
    }
  }

});

/**
 * Exports.
 */

module.exports = Overdrive;
