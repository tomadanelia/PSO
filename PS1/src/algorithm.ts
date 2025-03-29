/**
 * Problem Set 1: Flashcards - Algorithm Functions
 *
 * This file contains the implementations for the flashcard algorithm functions
 * as described in the problem set handout.
 *
 * Please DO NOT modify the signatures of the exported functions in this file,
 * or you risk failing the Didit autograder.
 */

import { Flashcard, AnswerDifficulty, BucketMap } from "./flashcards";

/**
 * Converts a Map representation of learning buckets into an Array-of-Set representation.
 *
 * @param buckets Map where keys are bucket numbers and values are sets of Flashcards.
 * @returns Array of Sets, where element at index i is the set of flashcards in bucket i.
 *          Buckets with no cards will have empty sets in the array.
 * @spec.requires buckets is a valid representation of flashcard buckets.
 */
export function toBucketSets(buckets: BucketMap): Array<Set<Flashcard>> {
  if (buckets.size === 0) return [];  // Handle the empty map case explicitly

  const maxBucket = buckets.size > 0 ? Math.max(...buckets.keys()) : 0;

  // Ensure all indices contain valid Sets
  const bucketArray: Array<Set<Flashcard>> = Array.from(
    { length: maxBucket + 1 },
    () => new Set<Flashcard>()
  );

  for (const [bucket, cards] of buckets.entries()) {
    bucketArray[bucket] = new Set(cards);
  }

  return bucketArray;
}

/**
 * Finds the range of buckets that contain flashcards, as a rough measure of progress.
 *
 * @param buckets Array-of-Set representation of buckets.
 * @returns object with minBucket and maxBucket properties representing the range,
 *          or undefined if no buckets contain cards.
 * @spec.requires buckets is a valid Array-of-Set representation of flashcard buckets.
 */
export function getBucketRange(
  buckets: Array<Set<Flashcard>>
): { minBucket: number; maxBucket: number } | undefined {
  let minBucket: number | undefined = undefined;
  let maxBucket: number | undefined = undefined;

  for (let i = 0; i < buckets.length; i++) {
    const bucket = buckets[i] ?? new Set<Flashcard>(); // Ensure it's never undefined

    if (bucket.size > 0) {
      if (minBucket === undefined) minBucket = i;
      maxBucket = i;
    }
  }

  return minBucket !== undefined && maxBucket !== undefined
    ? { minBucket, maxBucket }
    : undefined;
}

/**
 * Selects cards to practice on a particular day.
 *
 * @param buckets Array-of-Set representation of buckets.
 * @param day current day number (starting from 0).
 * @returns a Set of Flashcards that should be practiced on day `day`,
 *          according to the Modified-Leitner algorithm.
 * @spec.requires buckets is a valid Array-of-Set representation of flashcard buckets.
 */
export function practice(
  buckets: Array<Set<Flashcard>>,
  day: number
): Set<Flashcard> {
  const cardsToPractice = new Set<Flashcard>();

  // The Modified-Leitner System - you can adjust the logic if needed.
  // Cards from lower buckets (i.e., more review-needed) are prioritized.
  for (let i = 0; i < buckets.length; i++) {
    const bucket = buckets[i];

    // Ensure bucket is defined and has cards to practice.
    if (bucket && i === day) {
      bucket.forEach(card => cardsToPractice.add(card));
    }
  }

  return cardsToPractice;
}

/**
 * Updates a card's bucket number after a practice trial.
 *
 * @param buckets Map representation of learning buckets.
 * @param card flashcard that was practiced.
 * @param difficulty how well the user did on the card in this practice trial.
 * @returns updated Map of learning buckets.
 * @spec.requires buckets is a valid representation of flashcard buckets.
 */
export function update(
  buckets: BucketMap,
  card: Flashcard,
  difficulty: AnswerDifficulty
): BucketMap {
  const newBuckets = new Map(buckets);
  let currentBucket = 0;

  for (const [bucket, cards] of newBuckets.entries()) {
    if (cards.has(card)) {
      cards.delete(card);
      currentBucket = bucket;
      break;
    }
  }

  const newBucket = Math.max(
    0,
    difficulty === AnswerDifficulty.Wrong
      ? 0
      : currentBucket + (difficulty === AnswerDifficulty.Easy ? 2 : 1)
  );

  if (!newBuckets.has(newBucket)) {
    newBuckets.set(newBucket, new Set());
  }
  newBuckets.get(newBucket)!.add(card);

  return newBuckets;
}

/**
 * Generates a hint for a flashcard.
 *
 * @param card flashcard to hint
 * @returns a hint for the front of the flashcard.
 * @spec.requires card is a valid Flashcard.
 */
export function getHint(card: Flashcard): string {
  if (!card.front || !card.back || !card.hint) {
    throw new Error("Invalid flashcard: front, back, and hint must be non-empty.");
  }
  return card.hint;
}
/**
 * Computes statistics about the user's learning progress.
 *
 * @param buckets representation of learning buckets.
 * @param history representation of user's answer history.
 * @returns statistics about learning progress.
 * @spec.requires [SPEC TO BE DEFINED]
 */
export function computeProgress(buckets: Array<Set<Flashcard>>, history: any): any {
  const progress = {
    totalCards: 0,
    masteredCards: 0,
    bucketCounts: [] as number[],
  };

  // Loop through each bucket to gather statistics.
  buckets.forEach((bucket, index) => {
    const bucketSize = bucket.size;
    progress.bucketCounts[index] = bucketSize;
    progress.totalCards += bucketSize;

    // If this is the highest bucket, count the cards as mastered.
    if (index === buckets.length - 1) {
      progress.masteredCards = bucketSize;
    }
  });

  return progress;
}