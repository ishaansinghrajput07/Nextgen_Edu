import { useQuery } from "@tanstack/react-query";

import {
  getUniversities,
} from "../api/universityApi";

export default function useUniversities() {
  return useQuery({
    queryKey: ["universities"],
    queryFn: getUniversities,
  });
}