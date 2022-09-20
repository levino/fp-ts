/**
 * @since 3.0.0
 */
import type * as bounded from './Bounded'
import * as eq from './Eq'
import type * as field from './Field'
import type * as ord from './Ord'
import type * as show_ from './Show'
import type { Semigroup } from './Semigroup'
import type { Monoid } from './Monoid'
import type { Magma } from './Magma'
import type { Refinement } from './Refinement'

// -------------------------------------------------------------------------------------
// refinements
// -------------------------------------------------------------------------------------

/**
 * @category refinements
 * @since 3.0.0
 */
export const isNumber: Refinement<unknown, number> = (u: unknown): u is number => typeof u === 'number'

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 3.0.0
 */
export const Eq: eq.Eq<number> = eq.EqStrict

/**
 * @category instances
 * @since 3.0.0
 */
export const Ord: ord.Ord<number> = {
  compare: (second) => (first) => first < second ? -1 : first > second ? 1 : 0
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Bounded: bounded.Bounded<number> = {
  compare: Ord.compare,
  top: Infinity,
  bottom: -Infinity
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Field: field.Field<number> = {
  add: (second) => (first) => first + second,
  zero: 0,
  mul: (second) => (first) => first * second,
  one: 1,
  sub: (second) => (first) => first - second,
  degree: () => 1,
  div: (second) => (first) => first / second,
  mod: (second) => (first) => first % second
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Show: show_.Show<number> = {
  show: (a) => JSON.stringify(a)
}

/**
 * @category instances
 * @since 3.0.0
 */
export const MagmaSub: Magma<number> = {
  concat: Field.sub
}

/**
 * `number` semigroup under addition.
 *
 * @example
 * import { SemigroupSum } from 'fp-ts/number'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(pipe(2, SemigroupSum.concat(3)), 5)
 *
 * @category instances
 * @since 3.0.0
 */
export const SemigroupSum: Semigroup<number> = {
  concat: (second) => (first) => first + second
}

/**
 * `number` semigroup under multiplication.
 *
 * @example
 * import { SemigroupProduct } from 'fp-ts/number'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(pipe(2, SemigroupProduct.concat(3)), 6)
 *
 * @category instances
 * @since 3.0.0
 */
export const SemigroupProduct: Semigroup<number> = {
  concat: (second) => (first) => first * second
}

/**
 * `number` monoid under addition.
 *
 * The `empty` value is `0`.
 *
 * @category instances
 * @since 3.0.0
 */
export const MonoidSum: Monoid<number> = {
  concat: SemigroupSum.concat,
  empty: 0
}

/**
 * `number` monoid under multiplication.
 *
 * The `empty` value is `1`.
 *
 * @category instances
 * @since 3.0.0
 */
export const MonoidProduct: Monoid<number> = {
  concat: SemigroupProduct.concat,
  empty: 1
}
