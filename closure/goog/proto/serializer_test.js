// Copyright 2007 The Closure Library Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

goog.module('goog.protoTest');
goog.setTestOnly();

const proto = goog.require('goog.proto');
const testSuite = goog.require('goog.testing.testSuite');

const serialize = proto.serialize;

/**
 * Returns an array with the given elements and length.
 * @param {!Array<T>} elems The elements in the array.
 * @param {number} length The length.
 * @return {!Array<T>} The original 'elems' array with its length changed.
 * @template T
 */
function withLength(elems, length) {
  elems.length = length;
  return elems;
}
testSuite({
  testArraySerialize() {
    assertEquals('Empty array', serialize([]), '[]');

    assertEquals('Normal array', serialize([0, 1, 2]), '[0,1,2]');
    assertEquals('Empty start', serialize([, 1, 2]), '[null,1,2]');
    assertEquals(
        'Empty start', serialize([, , , 3, 4]), '[null,null,null,3,4]');
    assertEquals('Empty middle', serialize([0, , 2]), '[0,null,2]');
    assertEquals('Empty middle', serialize([0, , , 3]), '[0,null,null,3]');
    assertEquals('Empty end', serialize(withLength([0, 1, 2], 4)), '[0,1,2]');
    assertEquals(
        'Empty start, middle and end', serialize([, , 2, , 4, null]),
        '[null,null,2,null,4]');
    assertEquals('All elements empty', serialize(withLength([], 3)), '[]');
    assertEquals(
        'Nested', serialize([, 1, [, 1, [, 1]]]), '[null,1,[null,1,[null,1]]]');
  },
});
