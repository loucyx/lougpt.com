import { broadcast } from "@simulcast/core";

export const { emit, emitSubmit, on, onSubmit, registry } = broadcast<{
	submit: SubmitEvent;
}>();
