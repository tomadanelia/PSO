import assert from "assert";
import { AnswerDifficulty, Flashcard, BucketMap } from "../src/flashcards";
import {
  toBucketSets,
  getBucketRange,
  practice,
  update,
  getHint,
  computeProgress,
} from "../src/algorithm";

describe("toBucketSets()", () => {
  it("should return an empty array when given an empty bucket map", () => {
    const buckets: BucketMap = new Map();
    assert.deepStrictEqual(toBucketSets(buckets), []);
  });

  it("should return an array with one set when given one bucket", () => {
    const card = new Flashcard("what is in fridge", "nothing", "starts on n", ["hungryman"]);
    const buckets: BucketMap = new Map([[0, new Set([card])]]);
    assert.deepStrictEqual(toBucketSets(buckets), [new Set([card])]);
  });
});
describe("getBucketRange()", () => {
  it("should return the correct range for a given bucket set", () => {
    const buckets: Array<Set<Flashcard>> = [
      new Set(), // Bucket 0
      new Set([new Flashcard("Q1", "A1", "Hint",[])]), // Bucket 1
      new Set(), // Bucket 2
      new Set([new Flashcard("Q2", "A2", "Hint",[])]), // Bucket 3
    ];

    assert.deepStrictEqual(getBucketRange(buckets), { minBucket: 1, maxBucket: 3 });
  });

  it("should return undefined for empty bucket sets", () => {
    const emptyBuckets: Array<Set<Flashcard>> = [];
    assert.strictEqual(getBucketRange(emptyBuckets), undefined);
  });
});

describe("practice()", () => {
  it("should return the correct set of flashcards for a given day", () => {
    const card1 = new Flashcard("Q1", "A1", "Hint1",[]);
    const card2 = new Flashcard("Q2", "A2", "Hint2",[]);

    const buckets: Array<Set<Flashcard>> = [
      new Set([card1]), // Bucket 0
      new Set([card2]), // Bucket 1
    ];

    const practicedCards = practice(buckets, 0); // Should return cards in bucket 0

    assert(practicedCards.has(card1)); // 
    assert(!practicedCards.has(card2)); // 
  });
});

describe("update()", () => {
  it("should move a flashcard to the correct bucket based on difficulty", () => {
    const card = new Flashcard("Q", "A", "H", []);
    const buckets: BucketMap = new Map([[0, new Set([card])]]);

    // Update the flashcard with the correct difficulty value
    const updatedBuckets = update(buckets, card, AnswerDifficulty.Easy);

    // Check if the card has been moved correctly
    assert.strictEqual(updatedBuckets.has(2), true); // Moved 2 buckets up on "Easy"
    assert.strictEqual(updatedBuckets.get(2)!.has(card), true); // Ensures the card is in bucket 2
  });
});

describe("getHint()", () => {
  it("should return a hint for a flashcard", () => {
    const card = new Flashcard("Q", "A", "H", []);
    assert.strictEqual(getHint(card), "H");
  });
});

describe("computeProgress()", () => {
  it("should compute the progress correctly based on bucket distribution", () => {
    const buckets: Array<Set<Flashcard>> = [
      new Set(), // Bucket 0 (empty)
      new Set([new Flashcard("Q", "A", "H", [])]), // Bucket 1
      new Set([new Flashcard("Q2", "A2", "H2", [])]), // Bucket 2
    ];
    
    const history = {}; // Placeholder, adjust if needed
    const progress = computeProgress(buckets, history);

    // Expecting correct total card count and bucket distribution
    assert.strictEqual(progress.totalCards, 2);
    assert.strictEqual(progress.bucketCounts[1], 1);
    assert.strictEqual(progress.bucketCounts[2], 1);
  });
});
