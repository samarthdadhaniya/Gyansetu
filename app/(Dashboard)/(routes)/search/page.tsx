import React from "react";
import { db } from "@/lib/db";
import { Categories } from "./_components/categories";
import { SearchInput } from "@/components/SearchInput";
import { getCourses, getUnpurchasedCourses } from "@/actions/get-courses";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { CourseList } from "@/components/CourseList";

interface SearchPageProps {
  searchParams: {
    title: string;
    categoryId: string;
  };
}

async function page({ searchParams }: SearchPageProps) {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const courses = await getCourses({
    userId,
    ...searchParams,
  });

  return (
    <>
      <div className="px-6 pt-6 md:hidden md:mb-0 block">
        <SearchInput />
      </div>
      <div className="p-6 space-y-4">
        <Categories items={categories} />
        <CourseList items={courses} />
      </div>
    </>
  );
}

export default page;
