var EventEmitter = require('events').EventEmitter
  , util = require('util')

/**
 * Creates a new instance of RingArray with the provided `size`.
 *
 * @param  {Number}    size The number of items in the RingArray.
 * @return {RingArray}      The newly-constructed RingArray.
 */
function RingArray(size) {
  if (!(this instanceof RingArray)) {
    return new RingArray(size)
  }

  if (typeof size !== 'number' || size < 1) {
    throw new Error('RingArray size must be a positive Number.')
  }

  Object.defineProperty(this, 'size', {
    value: size
  })

  this._items = new Array(size)
  this._nextIndex = 0
  this._overwrite = false
}
RingArray.createRingArray = RingArray
util.inherits(RingArray, EventEmitter)

/**
 * Pushes a new item onto the RingArray at its current write position. If an
 * item would be overwritten by this push, an `"overwrite"` event is fired with
 * that item as its only argument.
 *
 * @param  {Any}       item The item to be added.
 * @return {RingArray}      The RingArray instance, for cascading.
 */
RingArray.prototype.push = push
function push(item) {
  if (this._overwrite) {
    this.emit('overwrite', this._items[this._nextIndex])
  }

  this._items[this._nextIndex++] = item

  if (this._nextIndex >= this.size) {
    this._nextIndex = 0
    this._overwrite = true
  }

  return this
}

/**
 * Returns the item immediately following `index`. If `item` is passed in, it
 * will be checked for consistency against the item at `index`. If consistent
 * and there is no newer item, this method returns `null`.
 *
 * If either the consistency check is not requested or there is both
 * consistency and a newer item, this method returns that item.
 *
 * NOTE: If the same item is added multiple times, the consistency check can
 * produce false positives.
 *
 * @param  {Number} index  The index to follow.
 * @param  {Any}    [item] The item to check consistency against.
 * @return {Any}           The following item.
 */
RingArray.prototype.next = next
function next(index, item) {
  var nextIndex = (index + 1) % this.size

  if (item && this._nextIndex === nextIndex && item === this._items[index]) {
    return null;
  }

  return this._items[nextIndex];
}

/**
 * Returns a shallow copy of a portion of the items in the RingArray as an
 * Array.
 *
 * @param  {Number} begin Zero-based index at which to begin extraction.
 * @param  {Number} end   Zero-based index at which to end extraction. `slice`
 *                        extracts up to but not including end.
 * @return {Array}        A new Array with the `slice`d items.
 */
RingArray.prototype.slice = slice
function slice(begin, end) {
  return this._items.slice(begin, end)
}

/**
 * Returns a String representing the items in the RingArray.
 *
 * @return {String} A String representing the items in the RingArray.
 */
RingArray.prototype.toString = toString
function toString() {
  return String(this._items);
}

/*!
 * Export `RingArray`.
 */
module.exports = RingArray
