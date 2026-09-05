import { PenugasanContainer } from "@/feature/(user)/penugasan/container/PenugasanContainer";
import { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <PenugasanContainer />
    </Suspense>
  );
};

export default page;
