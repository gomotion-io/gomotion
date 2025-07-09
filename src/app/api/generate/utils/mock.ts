import { GomotionSpec } from "@/gomotion-compiler/spec";
import { samples } from "@/gomotion-compiler/samples";

type Mock = {
  created_at: Video["created_at"];
  profile_id: string;
  composition: GomotionSpec;
};

export const mock: Mock = {
  created_at: new Date().toISOString(),
  profile_id: "8ca7f1bc-35f7-4810-99de-58795c9697ff",
  composition: samples,
};
