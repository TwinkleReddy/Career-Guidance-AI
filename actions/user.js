"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { generateAIInsights } from "./dashboard";
import { checkUser } from "@/lib/checkUser";

export async function updateUser(data) {
  const { userId } = await auth();
  if (!userId) throw new Error("UnAuthorized");

  await checkUser()

  const user = await db.user.findUnique({
    where: {
      clerkUserId: userId,
    },
  });

  if (!user) throw new Error("User not found");

  try {
    const result = await db.$transaction(
      async (tx) => {
        let industryInsight = await tx.industryInsight.findUnique({
          where: {
            industry: data.industry, // Ensure you're passing the correct 'industry' here
          },
        });

        if (!industryInsight) {

          const insights = await generateAIInsights(data.industry);
          
              industryInsight = await db.industryInsight.create({
                data: {
                  industry: data.industry,
                  ...insights,
                  nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                },
              });
          
        }

        const updatedUser = await tx.user.update({
          where: {
            id: user.id,
          },
          data: {
            industry: data.industry, // Assuming you're also updating the user's industry
          },
        });

        return { industryInsight, updatedUser };
      },
      {
        timeout: 10000,
      }
    );

    return { success: true, ...result };
  } catch (error) {
    console.error("Error updating user and industry:", error.message);
    throw new Error("Failed to update profile: " + error.message);
  }
}

export async function getUserOnBoardingStatus() {
  const { userId } = await auth(); // ✅ You need this line to get userId

  if (!userId) throw new Error("UnAuthorized");

  await checkUser()

  try {
    const user = await db.user.findUnique({
      where: {
        clerkUserId: userId,
      },
      select: {
        industry: true,
      },
    });

    return {
      isOnboarded: !!user?.industry,
    };
  } catch (error) {
    console.error("Error checking onboarding status:", error.message);
    throw new Error("Failed to check onboarding status");
  }
}

export async function getUser() {
  const { userId } = await auth();
  if (!userId) throw new Error("UnAuthorized");

  await checkUser()

  try {
    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
      select: {
        industry: true,
        experience: true,
        skills: true,
        bio: true,
      },
    });

    return user;
  } catch (error) {
    console.error("Error fetching user:", error.message);
    throw new Error("Failed to fetch user data");
  }
}

export const getUserProfile = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
  await checkUser()

  const res = await fetch(`${baseUrl}/api/user/profile`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  })

  if (!res.ok) throw new Error('Failed to fetch profile')
  return res.json()
}



