import { auth } from "@clerk/nextjs";
import { db } from "./db";
import { userSubscriptions } from "./db/schema";
import { eq } from "drizzle-orm";

// Constant representing the number of milliseconds in a day
const DAY_IN_MS = 1000 * 60 * 60 * 24;

/**
 * Checks if the authenticated user has a valid subscription.
 * @returns {boolean} - True if the subscription is valid, false otherwise.
 */
export const checkSubscription = async () => {
  try {
    // Retrieve the user ID using Clerk authentication
    const { userId } = await auth();

    // If the user is not authenticated, return false
    if (!userId) {
      return false;
    }

    // Query the database to fetch user subscriptions
    const userSubscriptionQuery = db
      .select()
      .from(userSubscriptions)
      .where(eq(userSubscriptions.userId, userId));

    // Execute the query and await the result
    const userSubscriptionsResult = await userSubscriptionQuery;

    // If no user subscriptions found, return false
    if (!userSubscriptionsResult || userSubscriptionsResult.length === 0) {
      return false;
    }

    // Extract the first user subscription (assuming there's only one)
    const userSubscription = userSubscriptionsResult[0];

    // Check if the subscription is valid based on conditions
    const isValid =
      userSubscription.stripePriceId &&
      userSubscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS >
        Date.now();

    return isValid;
  } catch (error) {
    // Log the error and return false
    console.error("Error checking subscription:", error);
    return false;
  }
};
