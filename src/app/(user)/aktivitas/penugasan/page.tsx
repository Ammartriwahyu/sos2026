import { PenugasanContainer } from "@/feature/(user)/penugasan/container/PenugasanContainer";
import { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback={null}>
      <PenugasanContainer />
    </Suspense>
  );
};

export default page;
