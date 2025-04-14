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
  if (buckets.size === 0) return []; // Handle the empty map case explicitly

  // Check that all keys (bucket numbers) are non-negative integers
  for (const key of buckets.keys()) {
    if (!Number.isInteger(key) || key < 0) {
      throw new Error(`Invalid bucket number: ${key}. All bucket numbers must be non-negative integers.`);
    }
  }

  const maxBucket = Math.max(...buckets.keys());

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
    const bucket = buckets[i] ?? new Set<Flashcard>(); 

    if (bucket.size > 0) {
      if (minBucket === undefined) minBucket = i;
      maxBucket = i;
    }
  }

  if (minBucket === undefined || maxBucket === undefined) return undefined;

  for (let i = minBucket; i <= maxBucket; i++) {
    if ((buckets[i] ?? new Set<Flashcard>()).size === 0) {
      return undefined; 
    }
  }

  return { minBucket, maxBucket };
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
export function practice(buckets: Array<Set<Flashcard>>, day: number): Set<Flashcard> {
  const reviewCards = new Set<Flashcard>();

  // Always review bucket 0
  if (buckets[0]) {
    for (const flashcard of buckets[0]) {
      reviewCards.add(flashcard);
    }
  }

  // Review other buckets on spaced days
  for (let i = 1; i < buckets.length; i++) {
    const repeatInterval = Math.pow(2, i);
    const currentBucket = buckets[i];

    if (currentBucket && day % repeatInterval === 0) {
      for (const flashcard of currentBucket) {
        reviewCards.add(flashcard);
      }
    }
  }

  return reviewCards;
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

  // Find and remove the card from its current bucket
  for (const [bucket, cards] of newBuckets.entries()) {
    if (cards.has(card)) {
      cards.delete(card);
      currentBucket = bucket;
      break;
    }
  }

  // Calculate new bucket based on difficulty
  let newBucket = 0;
  if (difficulty === AnswerDifficulty.Hard) {
    newBucket = currentBucket + 1;
  } else if (difficulty === AnswerDifficulty.Easy) {
    newBucket = currentBucket + 2;
  }

  // Add card to the new bucket
  if (!newBuckets.has(newBucket)) {
    newBuckets.set(newBucket, new Set());
  }

  newBuckets.get(newBucket)!.add(card);
  return newBuckets;
}


/**
 * Generates a hint for a flashcard.
 *
 * In language learning, hints may include part of speech or synonyms.
 * In science, hints may include definitions, formulas, or related terms.
 * In history, hints may include timelines or significant keywords.
 *
 * @param card flashcard to hint
 * @returns a hint that helps recall the answer side of the flashcard.
 * @spec.requires card is a valid Flashcard with non-empty front, back, and hint.
 * @spec.effects does not modify the input flashcard.
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
 * @param buckets - Array-of-Set representation of learning buckets.
 * @param history - User's answer history (can be extended to track performance over time).
 * @returns an object containing:
 *   - totalCards: total number of flashcards across all buckets,
 *   - masteredCards: number of cards in the highest bucket,
 *   - bucketCounts: number of cards per bucket index.
 *
 * @spec.requires buckets is a non-null, defined array of Sets of Flashcards.
 * @spec.effects does not mutate the input buckets or history.
 * @spec.ensures returns an object with non-negative integer statistics.
 */
export function computeProgress(
  buckets: Array<Set<Flashcard>>,
  history: any // can be refined to a structured type later
): {
  totalCards: number;
  masteredCards: number;
  bucketCounts: number[];
} {
  if (!Array.isArray(buckets)) {
    throw new Error("Buckets must be a defined array.");
  }

  const progress = {
    totalCards: 0,
    masteredCards: 0,
    bucketCounts: [] as number[],
  };

  buckets.forEach((bucket, index) => {
    const size = bucket?.size ?? 0;
    progress.bucketCounts[index] = size;
    progress.totalCards += size;

    if (index === buckets.length - 1) {
      progress.masteredCards = size;
    }
  });

  return progress;
}